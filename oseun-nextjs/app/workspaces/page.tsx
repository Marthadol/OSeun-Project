import Link from "next/link";
import { roles } from "@/lib/roles";
import { PortalHeader } from "@/components/portal-header";
export default function Workspaces() {
  return (
    <main className="portal">
      <PortalHeader />
      <span className="eyebrow">O’SEUN FOODS</span>
      <h1>One restaurant. Six perspectives.</h1>
      <p>
        Explore the customer experience and the starter workspaces for your team
        and partners.
      </p>
      <div className="demo-banner">
        Development preview — these links do not sign you in. Role permissions
        and real data are not connected.
      </div>
      <div className="portal-grid">
        <Link className="portal-card" href="/">
          <h2>Customer</h2>
          <p>
            Explore meals, choose portions, build a cart and preview checkout.
          </p>
          <small>Open customer menu →</small>
        </Link>
        {Object.entries(roles).map(([key, r]) => (
          <Link className="portal-card" href={`/workspaces/${key}`} key={key}>
            <h2>{r.name}</h2>
            <p>{r.intro}</p>
            <small>Explore workspace →</small>
          </Link>
        ))}
      </div>
    </main>
  );
}
