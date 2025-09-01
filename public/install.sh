#!/usr/bin/env bash
set -euo pipefail

# Debian 12/11 bootstrap: Warp, Flathub, Synology Drive Client, KeePassXC, Brave, Vesktop (Vencord), Spotify, Unified Remote

require_root() { if [[ $EUID -ne 0 ]]; then echo "Run as root."; exit 1; fi; }
apt_install() { apt-get install -y --no-install-recommends "$@"; }
install_deb() { # robust local .deb install
  local f="$1"
  if ! apt -y install "$f"; then
    dpkg -i "$f" || true
    apt-get -f install -y
  fi
}

require_root
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt_install curl ca-certificates gpg

ARCH_DEB="$(dpkg --print-architecture)" # amd64, arm64, etc.

install -d -m 0755 /etc/apt/keyrings

# 1) Warp Terminal (official APT)
if [[ "$ARCH_DEB" =~ ^(amd64|arm64)$ ]]; then
  curl -fsSL https://releases.warp.dev/linux/keys/warp.asc | gpg --dearmor -o /etc/apt/keyrings/warpdotdev.gpg
  echo "deb [arch=${ARCH_DEB} signed-by=/etc/apt/keyrings/warpdotdev.gpg] https://releases.warp.dev/linux/deb stable main" \
    >/etc/apt/sources.list.d/warpdotdev.list
fi

# 2) Brave Browser (official APT)
curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg \
  https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg
curl -fsSLo /etc/apt/sources.list.d/brave-browser-release.sources \
  https://brave-browser-apt-release.s3.brave.com/brave-browser.sources

apt-get update
# Install APT-based apps now
if [[ "$ARCH_DEB" =~ ^(amd64|arm64)$ ]]; then apt_install warp-terminal; fi
apt_install brave-browser flatpak

# 3) Flathub + Flatpak apps
if ! flatpak remotes --system | grep -q '^flathub'; then
  flatpak remote-add --if-not-exists --system flathub https://dl.flathub.org/repo/flathub.flatpakrepo
fi
flatpak install -y --system flathub \
  org.keepassxc.KeePassXC \
  com.spotify.Client \
  dev.vencord.Vesktop

# 4) Synology Drive Client (x86_64 only; pull latest .deb from archive)
install_synology_drive() {
  if [[ "$ARCH_DEB" != "amd64" ]]; then
    echo "Synology Drive Client is only provided for x86_64 on Linux; skipping."
    return 0
  fi
  base="https://archive.synology.com/download/Utility/SynologyDriveClient"
  ver="$(curl -fsSL "$base/" | grep -oP 'href="\K[0-9]+\.[0-9]+\.[0-9]+-\d+(?=/)' | sort -V | tail -1 || true)"
  if [[ -z "${ver:-}" ]]; then echo "Could not detect Synology Drive version; skipping."; return 0; fi

  # Try common subpaths and pick a .deb
  url=""
  for sub in "Ubuntu/Installer/x86_64" "Ubuntu/x86_64" "" ; do
    page="$base/$ver/$sub"
    deb="$(curl -fsSL "$page/" 2>/dev/null | grep -oP 'href="\K[^"]+\.deb' | grep -E 'synology-drive-client.*(x86_64|amd64)\.deb' | head -1 || true)"
    if [[ -n "${deb:-}" ]]; then url="$page/$deb"; break; fi
  done
  if [[ -z "${url:-}" ]]; then echo "Could not locate Synology .deb under $ver; skipping."; return 0; fi

  tmp="/tmp/synology-drive-client.deb"
  echo "Downloading $url"
  curl -fL "$url" -o "$tmp"
  install_deb "$tmp"
}

# 5) Unified Remote Server (.deb direct; x64 only)
install_unified_remote() {
  if [[ "$ARCH_DEB" != "amd64" ]]; then
    echo "Unified Remote provides x64/x86/RPi builds only; skipping."
    return 0
  fi
  tmp="/tmp/unified-remote.deb"
  if ! curl -fL "https://www.unifiedremote.com/d/linux-x64-deb" -o "$tmp"; then
    curl -fL "http://www.unifiedremote.com/d/linux-x64-deb" -o "$tmp"
  fi
  install_deb "$tmp"
  systemctl enable --now urserver.service 2>/dev/null || true
}

install_synology_drive
install_unified_remote

echo "Done."
echo "Installed: warp-terminal (if supported), brave-browser, Flatpak+Flathub, KeePassXC, Spotify, Vesktop, Synology Drive Client (x86_64), Unified Remote (x86_64)."
