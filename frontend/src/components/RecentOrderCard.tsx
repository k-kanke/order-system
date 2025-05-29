import type { CartItem } from "../types/MenuItem";

export function RecentOrderCard({
  item,
  onRepeat,
}: {
  item: CartItem;
  onRepeat: (item: CartItem) => void;
}) {
  return (
    <div
      className="min-w-[110px] max-w-[110px] flex-shrink-0 border border-gray-300 rounded-md p-2 bg-white"
    >
      <img
        src={item.imageUrl}
        alt={item.name}
        className="w-full h-[70px] object-cover rounded"
      />
      <button
        className="mt-1 w-full text-[10px] bg-blue-500 text-white py-1 rounded"
        onClick={() => onRepeat(item)}
      >
        追加
      </button>
    </div>
  );
}
