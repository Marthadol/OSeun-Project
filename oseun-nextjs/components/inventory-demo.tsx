"use client";
import { useState } from "react";
const initial = [
  { id: "rice", name: "Raw rice", unit: "kg", qty: 25, reorder: 10 },
  { id: "oil", name: "Vegetable oil", unit: "litres", qty: 8, reorder: 10 },
  { id: "chicken", name: "Chicken", unit: "pieces", qty: 40, reorder: 15 },
  { id: "plantain", name: "Plantain", unit: "pieces", qty: 18, reorder: 20 },
];
export function InventoryDemo() {
  const [items, setItems] = useState(initial);
  const [search, setSearch] = useState("");
  const [log, setLog] = useState<string[]>([]);
  function move(id: string, delta: number) {
    const item = items.find((i) => i.id === id)!;
    if (item.qty + delta < 0) return;
    setItems(
      items.map((i) => (i.id === id ? { ...i, qty: i.qty + delta } : i)),
    );
    setLog((old) => [
      `${item.name}: ${delta > 0 ? "received" : "used"} 1 ${item.unit}.`,
      ...old,
    ]);
  }
  return (
    <>
      <div className="portal-toolbar">
        <label>
          Find an ingredient{" "}
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inventory"
          />
        </label>
        <button
          className="primary"
          onClick={() => {
            setItems(initial);
            setLog([]);
          }}
        >
          Reset demo stock
        </button>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Ingredient</th>
              <th>Stock on hand</th>
              <th>Reorder at</th>
              <th>Status</th>
              <th>Adjust demo stock</th>
            </tr>
          </thead>
          <tbody>
            {items
              .filter((i) =>
                i.name.toLowerCase().includes(search.toLowerCase()),
              )
              .map((i) => (
                <tr key={i.id}>
                  <td>{i.name}</td>
                  <td>
                    {i.qty} {i.unit}
                  </td>
                  <td>
                    {i.reorder} {i.unit}
                  </td>
                  <td className={i.qty <= i.reorder ? "stock-low" : ""}>
                    {i.qty <= i.reorder ? "Reorder needed" : "In stock"}
                  </td>
                  <td>
                    <div className="stock-controls">
                      <button
                        aria-label={`Use one ${i.unit} of ${i.name}`}
                        disabled={i.qty === 0}
                        onClick={() => move(i.id, -1)}
                      >
                        −1
                      </button>
                      <button
                        aria-label={`Receive one ${i.unit} of ${i.name}`}
                        onClick={() => move(i.id, 1)}
                      >
                        +1
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <section className="portal-card">
        <h2>Demo stock movements</h2>
        <div role="status">
          {log.length ? (
            <ul>
              {log.slice(0, 8).map((v, i) => (
                <li key={i}>{v}</li>
              ))}
            </ul>
          ) : (
            <p>No movements yet. Use the controls to receive or use stock.</p>
          )}
        </div>
      </section>
    </>
  );
}
