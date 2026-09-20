export const meals = [
  {
    id: "jollof",
    name: "Smoky party jollof",
    category: "Rice",
    price: 1500,
    min: 2,
    unit: "portion",
    tag: "The crowd favourite",
    desc: "Slow-cooked in a rich pepper sauce, with that unmistakable smoky finish.",
    tone: "orange",
  },
  {
    id: "fried",
    name: "Nigerian fried rice",
    category: "Rice",
    price: 1800,
    min: 2,
    unit: "portion",
    tag: "Colourful & flavourful",
    desc: "Golden rice tossed with crisp vegetables, sweet corn and fragrant spices.",
    tone: "green",
  },
  {
    id: "chicken",
    name: "Peppered chicken",
    category: "Proteins",
    price: 3000,
    min: 1,
    unit: "piece",
    tag: "A little heat",
    desc: "Tender grilled chicken, finished with our rich, freshly made pepper sauce.",
    tone: "orange",
  },
  {
    id: "beef",
    name: "Slow-cooked beef",
    category: "Proteins",
    price: 1500,
    min: 1,
    unit: "piece",
    tag: "Rich & tender",
    desc: "Succulent beef simmered in a deeply seasoned tomato and pepper stew.",
    tone: "red",
  },
  {
    id: "plantain",
    name: "Golden fried plantain",
    category: "Sides",
    price: 1000,
    min: 1,
    unit: "portion",
    tag: "Sweet on the side",
    desc: "Ripe plantain, fried until golden at the edges and soft in the middle.",
    tone: "gold",
  },
  {
    id: "zobo",
    name: "Chilled hibiscus zobo",
    category: "Drinks",
    price: 1200,
    min: 1,
    unit: "bottle",
    tag: "Fresh & refreshing",
    desc: "Our tangy hibiscus drink with ginger and pineapple. Served chilled, 500 ml.",
    tone: "red",
  },
];
export type Meal = (typeof meals)[number];
export type Line = {
  key: string;
  id: string;
  qty: number;
  extras: string[];
  note: string;
};
export const extraOptions = [
  { id: "chicken", name: "Peppered chicken", price: 3000 },
  { id: "plantain", name: "Fried plantain", price: 1000 },
];
export const money = (n: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(n);
export const lineTotal = (l: Line) =>
  (meals.find((m) => m.id === l.id)!.price +
    extraOptions
      .filter((e) => l.extras.includes(e.id))
      .reduce((s, e) => s + e.price, 0)) *
  l.qty;
