import Link from "next/link";
export default function NotFound() {
  return (
    <main className="portal">
      <h1>Page not found</h1>
      <p>That workspace does not exist.</p>
      <Link href="/workspaces">Browse workspaces</Link>
    </main>
  );
}
