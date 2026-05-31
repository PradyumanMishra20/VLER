"use client";

import { products } from "@/data/products";
import { adminOrders, adminMetrics, revenueData } from "@/data/mock-admin";
import { formatPrice } from "@/lib/utils";
import { useCurrencyStore } from "@/store/currency";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/motion/page-transition";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Package, ShoppingCart, Percent } from "lucide-react";

function MetricCard({
  label,
  value,
  change,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: number;
  icon: React.ElementType;
}) {
  const positive = change >= 0;
  return (
    <div className="border border-border-strong p-6 bg-background-elevated">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs uppercase tracking-[0.15em] text-foreground-subtle">
          {label}
        </span>
        <Icon className="h-4 w-4 text-foreground-subtle" />
      </div>
      <p className="text-2xl font-display">{value}</p>
      <div
        className={cn(
          "flex items-center gap-1 mt-2 text-xs",
          positive ? "text-foreground-muted" : "text-accent"
        )}
      >
        {positive ? (
          <TrendingUp className="h-3 w-3" />
        ) : (
          <TrendingDown className="h-3 w-3" />
        )}
        {Math.abs(change)}% vs last month
      </div>
    </div>
  );
}

export default function AdminPage() {
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));
  const currency = useCurrencyStore((s) => s.currency);

  return (
    <PageTransition>
      <div className="pt-24 md:pt-28 pb-section">
        <div className="page-container">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="editorial-subheading mb-3">Admin</p>
              <h1 className="editorial-heading">Dashboard</h1>
            </div>
            <Button variant="outline" size="sm">
              Export Report
            </Button>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            <MetricCard
              label="Revenue"
              value={formatPrice(adminMetrics.revenue, currency)}
              change={adminMetrics.revenueChange}
              icon={ShoppingCart}
            />
            <MetricCard
              label="Orders"
              value={String(adminMetrics.orders)}
              change={adminMetrics.ordersChange}
              icon={Package}
            />
            <MetricCard
              label="Conversion"
              value={`${adminMetrics.conversion}%`}
              change={adminMetrics.conversionChange}
              icon={Percent}
            />
            <MetricCard
              label="Avg. Order"
              value={formatPrice(adminMetrics.avgOrder, currency)}
              change={adminMetrics.avgOrderChange}
              icon={TrendingUp}
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8 mb-12">
            <div className="border border-border-strong p-6 bg-background-elevated">
              <h2 className="text-xs uppercase tracking-[0.15em] mb-8">
                Revenue — Last 5 Months
              </h2>
              <div className="flex items-end gap-4 h-48">
                {revenueData.map((d) => (
                  <div key={d.month} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className="w-full bg-foreground/80 transition-all"
                      style={{ height: `${(d.revenue / maxRevenue) * 100}%` }}
                    />
                    <span className="text-[10px] text-foreground-subtle">{d.month}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border border-border-strong p-6 bg-background-elevated">
              <h2 className="text-xs uppercase tracking-[0.15em] mb-8">
                Conversion Metrics
              </h2>
              <div className="space-y-6">
                {[
                  { label: "Add to cart rate", value: 8.4 },
                  { label: "Checkout completion", value: 62 },
                  { label: "Return customer rate", value: 24 },
                ].map((metric) => (
                  <div key={metric.label}>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-foreground-muted">{metric.label}</span>
                      <span>{metric.value}%</span>
                    </div>
                    <div className="h-px bg-border-strong">
                      <div
                        className="h-px bg-foreground transition-all"
                        style={{ width: `${metric.value}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Tabs defaultValue="orders">
            <TabsList>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-[0.1em] text-foreground-subtle">
                      <th className="py-4 pr-4">Order</th>
                      <th className="py-4 pr-4">Customer</th>
                      <th className="py-4 pr-4">Date</th>
                      <th className="py-4 pr-4">Status</th>
                      <th className="py-4 text-right">Total</th>
                      <th className="py-4 pl-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {adminOrders.map((order) => (
                      <tr key={order.id} className="border-b border-border">
                        <td className="py-4 pr-4">{order.id}</td>
                        <td className="py-4 pr-4 text-foreground-muted">
                          {order.customer}
                        </td>
                        <td className="py-4 pr-4 text-foreground-muted">
                          {order.date}
                        </td>
                        <td className="py-4 pr-4">
                          <span className="text-xs uppercase tracking-wider">
                            {order.status}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          {formatPrice(order.total, currency)}
                        </td>
                        <td className="py-4 pl-4 text-right">
                          <Button variant="ghost" size="sm">
                            Manage
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="products">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border text-left text-xs uppercase tracking-[0.1em] text-foreground-subtle">
                      <th className="py-4 pr-4">Product</th>
                      <th className="py-4 pr-4">Category</th>
                      <th className="py-4 pr-4">Price</th>
                      <th className="py-4 pr-4">Variants</th>
                      <th className="py-4" />
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product) => (
                      <tr key={product.id} className="border-b border-border">
                        <td className="py-4 pr-4">{product.name}</td>
                        <td className="py-4 pr-4 text-foreground-muted capitalize">
                          {product.category}
                        </td>
                        <td className="py-4 pr-4">{formatPrice(product.price, currency)}</td>
                        <td className="py-4 pr-4 text-foreground-muted">
                          {product.variants.length}
                        </td>
                        <td className="py-4 text-right">
                          <Button variant="ghost" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            <TabsContent value="inventory">
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {products.flatMap((p) =>
                  p.variants.slice(0, 3).map((v) => (
                    <div
                      key={v.id}
                      className="flex items-center justify-between border border-border p-4 text-sm"
                    >
                      <span>
                        {p.name} — {v.color} / {v.size}
                      </span>
                      <span
                        className={cn(
                          "text-xs",
                          v.stock <= 5 ? "text-accent" : "text-foreground-muted"
                        )}
                      >
                        {v.stock} in stock
                      </span>
                    </div>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageTransition>
  );
}
