import { MenuCard } from "./MenuCard";
import type { MenuItem } from "../types/MenuItem";

export function MenuGrid({
    items,
    onAdd,
    onConfirm,
}: {
    items: MenuItem[];
    onAdd: (item: MenuItem) => void;
    onConfirm: (item: MenuItem) => void;
}) {
    return (
        <div className="grid grid-cols-2 gap-x-2 gap-y-4 p-2">
            {items.map((item) => (
                <MenuCard
                    key={item.id}
                    item={item}
                    onAdd={() => onAdd(item)}
                    onConfirm={() => onConfirm(item)}
                />
            ))}
        </div>
    );
}