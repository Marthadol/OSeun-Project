import Link from "next/link";
import { notFound } from "next/navigation";
import { roles, type Role } from "@/lib/roles";
import { PortalHeader } from "@/components/portal-header";
export function generateStaticParams() {
  return Object.keys(roles).map((role) => ({ role }));
}
export default async function RolePage({
  params,
}: {
  params: Promise<{ role: string }>;
}) {
  const { role } = await params;
  if (!Object.hasOwn(roles, role)) notFound();
  const r = roles[role as Role];
  return (
    <main className="portal">
      <PortalHeader />
      <span className="eyebrow">WORKSPACE PREVIEW</span>
      <h1>{r.name}</h1>
      <p>{r.intro}</p>
      <div className="demo-banner">
        Starter screen. Authentication, permissions and backend workflows still
        need implementation.
      </div>
      <div className="portal-grid">
        <section className="portal-card">
          <h2>Planned capabilities</h2>
          <ul>
            {r.features.map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
        </section>
        {(role === "staff" || role === "admin") && (
          <>
            <Link className="portal-card" href="/workspaces/staff/inventory">
              <h2>Inventory</h2>
              <p>
                Explore ingredient quantities, reorder levels and sample stock
                movements.
              </p>
              <small>Open inventory demo →</small>
            </Link>
            <Link className="portal-card" href="/workspaces/staff/menu">
              <h2>Menu management</h2>
              <p>Preview item availability controls and portion pricing.</p>
              <small>Open menu demo →</small>
            </Link>
          </>
        )}
      </div>
    </main>
  );
}
