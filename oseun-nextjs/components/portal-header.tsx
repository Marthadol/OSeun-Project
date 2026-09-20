import Link from "next/link";
import { Brand } from "@/components/brand";
export function PortalHeader() {
  return (
    <header className="portal-header">
      <Link href="/" aria-label="Customer menu">
        <Brand />
      </Link>
      <nav className="portal-nav">
        <Link href="/">Customer menu</Link>
        <Link href="/workspaces">All workspaces</Link>
      </nav>
    </header>
  );
}
