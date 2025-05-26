import type { MenuItem } from "../types/MenuItem";

export function RecentOrders({
    items,
    onRepeat,
}: {
    items: MenuItem[];
    onRepeat: (item: MenuItem) => void;
}) {
    if (items.length === 0) return null;

    return (
        <section
            className="px-4 py-2 max-w-screen-md mx-auto"
            style={{ paddingTop: "1rem", paddingBottom: "1rem", marginTop: "10px", marginBottom: "10px" }}
        >
            <h3 className="text-lg font-semibold mb-2">最近の注文</h3>

            <div className="overflow-x-auto">
                <div className="flex gap-4 w-max">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="min-w-[120px] max-w-[140px] flex-shrink-0 border border-gray-300 rounded-lg p-2 bg-white"
                        >
                            <img src={item.imageUrl} alt={item.name} className="w-full rounded" />
                            <div className="text-sm">{item.name}</div>
                            <div className="font-bold text-sm">¥{item.price}</div>
                            <button
                                className="mt-1 w-full text-xs bg-blue-500 text-white py-1 rounded"
                                onClick={() => onRepeat(item)}
                            >
                                もう一度注文
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}