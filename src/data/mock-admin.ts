export const revenueData = [
  { month: "Jan", revenue: 184000, orders: 28 },
  { month: "Feb", revenue: 162000, orders: 24 },
  { month: "Mar", revenue: 231000, orders: 35 },
  { month: "Apr", revenue: 207000, orders: 31 },
  { month: "May", revenue: 248000, orders: 38 },
];

export const adminOrders = [
  {
    id: "VELR-1045",
    customer: "Jordan Lee",
    total: 11297,
    status: "processing" as const,
    date: "2025-05-23",
  },
  {
    id: "VELR-1044",
    customer: "Sam Rivera",
    total: 5999,
    status: "shipped" as const,
    date: "2025-05-22",
  },
  {
    id: "VELR-1043",
    customer: "Taylor Kim",
    total: 18498,
    status: "delivered" as const,
    date: "2025-05-20",
  },
];

export const adminMetrics = {
  revenue: 248000,
  revenueChange: 12.4,
  orders: 38,
  ordersChange: 8.2,
  conversion: 3.2,
  conversionChange: -0.4,
  avgOrder: 6526,
  avgOrderChange: 5.1,
};
