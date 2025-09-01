#!/usr/bin/env bash
set -euo pipefail

# Debian bootstrap for: Warp, Flathub, Synology Drive Client, KeePassXC, Brave, Vesktop (Vencord), Spotify, Unified Remote
# Usage: wget -O deb-bootstrap.sh https://example.com/deb-bootstrap.sh && sudo bash deb-bootstrap.sh

require_root() { if [[ $EUID -ne 0 ]]; then echo "Run as root (use sudo)."; exit 1; fi; }
apt_install() { apt-get install -y --no-install-recommends "$@"; }

require_root
export DEBIAN_FRONTEND=noninteractive
apt-get update
apt_install curl ca-certificates gpg apt-transport-https jq

ARCH_DEB="$(dpkg --print-architecture)"                  # e.g., amd64, arm64
ARCH_WARP="$ARCH_DEB"                                    # warp uses amd64/arm64 names
if [[ "$ARCH_DEB" != "amd64" && "$ARCH_DEB" != "arm64" ]]; then
  echo "Unsupported CPU architecture: $ARCH_DEB"; exit 1
fi

# 1) Warp Terminal (APT repo)
install_warp() {
  install -d -m 0755 /etc/apt/keyrings
  curl -fsSL https://releases.warp.dev/linux/keys/warp.asc | gpg --dearmor -o /etc/apt/keyrings/warpdotdev.gpg
  echo "deb [arch=${ARCH_WARP} signed-by=/etc/apt/keyrings/warpdotdev.gpg] https://releases.warp.dev/linux/deb stable main" \
    >/etc/apt/sources.list.d/warpdotdev.list
  apt-get update
  apt_install warp-terminal
}

# 2) Flatpak + Flathub (system-wide)
install_flathub() {
  apt_install flatpak
  # Add system remote if missing
  if ! flatpak remotes --system | grep -q '^flathub'; then
    flatpak remote-add --if-not-exists --system flathub https://dl.flathub.org/repo/flathub.flatpakrepo
  fi
}

# 3) Brave Browser (official APT)
install_brave() {
  curl -fsSLo /usr/share/keyrings/brave-browser-archive-keyring.gpg \
    https://brave-browser-apt-release.s3.brave.com/brave-browser-archive-keyring.gpg
  curl -fsSLo /etc/apt/sources.list.d/brave-browser-release.sources \
    https://brave-browser-apt-release.s3.brave.com/brave-browser.sources
  apt-get update
  apt_install brave-browser
}

# 4) KeePassXC (Flathub)
install_keepassxc() {
  flatpak install -y --system flathub org.keepassxc.KeePassXC
}

# 5) Spotify (Flathub)
install_spotify() {
  flatpak install -y --system flathub com.spotify.Client
}

# 6) Vencord via Vesktop (Flathub)
install_vesktop() {
  flatpak install -y --system flathub dev.vencord.Vesktop
  echo "Note: Vesktop is a third-party Discord client mod. Use at your own risk."
}

# 7) Synology Drive Client (latest from Synology archive)
install_synology_drive() {
  if [[ "$ARCH_DEB" != "amd64" ]]; then
    echo "Synology Drive Client .deb is only published for x86_64; skipping."; return 0
  fi
  base="https://archive.synology.com/download/Utility/SynologyDriveClient"
  latest_ver="$(curl -fsSL "$base/" | grep -oP '(?<=href=\")\\d+\\.\\d+\\.\\d+-\\d+(?=/)' | sort -V | tail -1 || true)"
  if [[ -z "${latest_ver:-}" ]]; then echo "Could not detect latest Synology Drive version."; return 1; fi
  build="${latest_ver##*-}"
  url="$base/$latest_ver/synology-drive-client-$build.x86_64.deb"
  tmp="/tmp/synology-drive-client-${build}.deb"
  echo "Downloading Synology Drive Client $latest_ver ..."
  curl -fL "$url" -o "$tmp"
  apt-get install -y "$tmp" || (dpkg -i "$tmp" || true; apt-get -f install -y)
}

# 8) Unified Remote Server (.deb direct)
install_unified_remote() {
  if [[ "$ARCH_DEB" == "amd64" ]]; then id="linux-x64-deb"
  elif [[ "$ARCH_DEB" == "i386" || "$ARCH_DEB" == "i686" ]]; then id="linux-x86-deb"
  else echo "Unified Remote provides x64/x86/RPi only; skipping."; return 0; fi

  tmp="/tmp/urserver.deb"
  if ! curl -fL "https://www.unifiedremote.com/d/${id}" -o "$tmp"; then
    echo "HTTPS failed, retrying over HTTP ..."
    curl -fL "http://www.unifiedremote.com/d/${id}" -o "$tmp"
  fi
  apt-get install -y "$tmp" || (dpkg -i "$tmp" || true; apt-get -f install -y)
  systemctl enable --now urserver.service 2>/dev/null || true
}

install_warp
install_flathub
install_brave
install_keepassxc
install_spotify
install_vesktop
install_synology_drive
install_unified_remote

echo "Done."
echo "Apps installed: warp-terminal, brave-browser, KeePassXC, Spotify, Vesktop, Synology Drive Client, Unified Remote."
