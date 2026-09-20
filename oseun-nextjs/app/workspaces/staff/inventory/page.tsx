import { PortalHeader } from "@/components/portal-header";
import { InventoryDemo } from "@/components/inventory-demo";
export default function Inventory() {
  return (
    <main className="portal">
      <PortalHeader />
      <span className="eyebrow">RESTAURANT STAFF</span>
      <h1>Inventory management</h1>
      <p>
        Inventory is an entity managed by staff. Ingredient stock is separate
        from the customer menu.
      </p>
      <div className="demo-banner">
        Sample stock only. Changes stay in this page and reset on reload.
        Recipes, purchases and order deductions are not connected.
      </div>
      <InventoryDemo />
    </main>
  );
}
