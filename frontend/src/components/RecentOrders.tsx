import type { MenuItem } from "../types/MenuItem";
import { RecentOrderCard } from "./RecentOrderCard"; // 追加

export function RecentOrders({
  items,
  onRepeat,
}: {
  items: MenuItem[];
  onRepeat: (item: MenuItem) => void;
}) {
  if (items.length === 0) return null;

  return (
    <section className="px-4 py-2 max-w-screen-md mx-auto">
      <h3 className="text-lg font-semibold mb-2">最近の注文</h3>
      <div className="overflow-x-auto">
        <div className="flex gap-3 w-max">
          {items.map((item) => (
            <RecentOrderCard key={item.id} item={item} onRepeat={onRepeat} />
          ))}
        </div>
      </div>
    </section>
  );
}
