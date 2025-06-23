import type { MenuItem } from "../types/MenuItem";

interface Props {
  items: MenuItem[];
  onSelect: (item: MenuItem) => void;
}

export function RecommendedSlider({ items, onSelect }: Props) {
  return (
    <div className="px-4 mb-6">
      <h3 className="text-lg font-bold mb-2">おすすめメニュー</h3>

      <div className="overflow-x-auto">      
        <div className="flex gap-4 pb-2 hide-scrollbar flex-nowrap">
            {items.map(item => (
            <div
                key={item.id}
                onClick={() => onSelect(item)}
                className=" bg-white shadow rounded-lg cursor-pointer flex-shrink-0 h-[200px] w-[140px]"
            >
                <img
                src={item.imageUrl}
                alt={item.name}
                className="w-full h-32 object-cover rounded-t-lg"
                />
            </div>
            ))}
        </div>
      </div>
    </div>
  );
}
