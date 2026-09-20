import test from "node:test";
import assert from "node:assert/strict";
import { meals, lineTotal } from "../lib/menu.ts";
test("two rice portions cost 3000 before delivery", () => {
  assert.equal(
    lineTotal({ key: "a", id: "jollof", qty: 2, extras: [], note: "" }),
    3000,
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
    5000,
  );
});
test("all rice options require at least two portions", () => {
  assert.ok(
    meals.filter((m) => m.category === "Rice").every((m) => m.min === 2),
  );
});
