import { AppShell } from '@/components/AppShell'

export const dynamic = 'force-dynamic'

/**
 * Layout for the bot-scoped legal documents (/discordbot/terms, /discordbot/privacy).
 *
 * It uses the same shell as the rest of the site, but with `renderChildrenInline`
 * so the legal text is rendered directly into the served HTML instead of being
 * injected client-side through the split-content context (which would leave a
 * plain GET with an empty document).
 */

export default function LegalLayout({ children }: { children: React.ReactNode }) {
  return <AppShell renderChildrenInline>{children}</AppShell>
}
