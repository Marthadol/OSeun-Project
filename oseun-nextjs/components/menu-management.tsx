"use client";
import { useState } from "react";
import { meals, money } from "@/lib/menu";
export function MenuManagement() {
  const [unavailable, setUnavailable] = useState<string[]>([]);
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Menu item</th>
            <th>Price per unit</th>
            <th>Minimum</th>
            <th>Demo availability</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((m) => (
            <tr key={m.id}>
              <td>{m.name}</td>
              <td>
                {money(m.price)} / {m.unit}
              </td>
              <td>
                {m.min} {m.unit}
                {m.min > 1 ? "s" : ""}
              </td>
              <td>
                <label>
                  <input
                    type="checkbox"
                    checked={!unavailable.includes(m.id)}
                    onChange={() =>
                      setUnavailable((v) =>
                        v.includes(m.id)
                          ? v.filter((id) => id !== m.id)
                          : [...v, m.id],
                      )
                    }
                  />{" "}
                  Available
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
