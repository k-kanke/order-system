import { RecentOrderCard } from "./RecentOrderCard"; // 追加
import type { CartItem } from "../types/MenuItem";

export function RecentOrders({
  items,
  onRepeat,
  onClose,
}: {
  items: CartItem[];
  onRepeat: (item: CartItem) => void;
  onClose: () => void;
}) {
  // if (items.length === 0) return null;

  return (
    <section className="px-4 py-2 max-w-screen-md mx-auto">
      <div className="overflow-x-auto">
        <div className="flex gap-3 w-max">
            {items.length === 0 ? (
                <div className="text-sm text-gray-400">まだ注文がありません。</div>
            ) : (
                items.map((item) => (
                <RecentOrderCard key={item.id} item={item} onRepeat={onRepeat} />
                ))
            )}
        </div>
      </div>

      <div className="mt-2 text-right">
        <button
          onClick={onClose}
          className="text-xs text-blue-500 hover:underline flex items-center justify-end gap-1"
        >
          <span className="text-lg">▲</span>
          {/*<span>非表示</span>*/}
        </button>
      </div>
    </section>
  );
}
