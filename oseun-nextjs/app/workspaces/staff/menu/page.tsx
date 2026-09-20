import { PortalHeader } from "@/components/portal-header";
import { MenuManagement } from "@/components/menu-management";
export default function Menu() {
  return (
    <main className="portal">
      <PortalHeader />
      <h1>Menu management</h1>
      <p>Maintain portion pricing and availability.</p>
      <div className="demo-banner">
        Availability switches are local UI examples. They do not update the
        customer menu until a shared backend is connected.
      </div>
      <MenuManagement />
    </main>
  );
}
