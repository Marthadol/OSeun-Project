export const roles = {
  admin: {
    name: "Admin / Restaurant owner",
    intro: "Oversee the restaurant and its operations.",
    features: [
      "Restaurant settings and staff permissions",
      "Orders, payments and refunds",
      "Menu, inventory oversight and reports",
      "Company accounts, gift cards and delivery partners",
    ],
  },
  staff: {
    name: "Restaurant staff",
    intro: "Keep the kitchen menu and stock up to date.",
    features: [
      "Manage inventory and stock movements",
      "Maintain menu items and availability",
    ],
  },
  company: {
    name: "Company",
    intro: "A workspace for authorized company representatives.",
    features: [
      "Company profile and representatives",
      "Bulk meal orders and delivery schedules",
      "Company invoices and order history",
    ],
  },
  rider: {
    name: "Rider",
    intro: "Review assigned deliveries and delivery progress.",
    features: [
      "Assigned deliveries",
      "Pickup and delivery status",
      "Delivery confirmation",
    ],
  },
  logistics: {
    name: "Logistics agency",
    intro: "Coordinate riders and restaurant deliveries.",
    features: [
      "Agency profile and authorized users",
      "Rider assignments",
      "Delivery tracking and history",
    ],
  },
} as const;
export type Role = keyof typeof roles;
