import type { MenuItem } from "../types/MenuItem";


export function MenuCard({
    item,
    // onAdd,
    onConfirm,
  }: {
    item: MenuItem;
    onAdd: () => void;
    onConfirm: () => void;
  }) {
    return (
      <div
        onClick={onConfirm}
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer w-full"
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          className="w-full h-36 object-cover"
        />
        <div className="p-2">
          <h4 className="text-base font-bold">{item.name}</h4>
          <p className="text-sm text-gray-600">
            ¥ {Math.min(...item.sizes.map(size => size.price))} ~ {/* 価格が一つなら~を消去するよう後で条件分岐 */}
          </p>
        </div>
      </div>
    );
  }
