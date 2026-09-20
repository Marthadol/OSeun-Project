import test from "node:test";
import assert from "node:assert/strict";
import { meals, lineTotal, DELIVERY_FEE } from "../lib/menu.ts";
test("two rice portions cost 2000 before delivery", () => {
  assert.equal(
    lineTotal({ key: "a", id: "jollof", qty: 2, extras: [], note: "" }),
    2000,
  );
});
test("extras are priced for each portion", () => {
  assert.equal(
    lineTotal({
      key: "b",
      id: "jollof",
      qty: 2,
      extras: ["plantain"],
      note: "",
    }),
    4000,
  );
});
test("all rice options require at least two portions", () => {
  assert.ok(
    meals.filter((m) => m.category === "Rice").every((m) => m.min === 2),
  );
});

test("both rice dishes cost 1000 per portion", () => {
  for (const meal of meals.filter((m) => m.category === "Rice")) {
    assert.equal(meal.price, 1000);
    assert.equal(
      lineTotal({ key: meal.id, id: meal.id, qty: 2, extras: [], note: "" }) +
        DELIVERY_FEE,
      3500,
    );
  }
});
