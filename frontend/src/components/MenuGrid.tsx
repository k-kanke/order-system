import { MenuCard } from "./MenuCard";
import type { MenuItem } from "../types/MenuItem";

export function MenuGrid({ items, onAdd }: { items: MenuItem[]; onAdd: (id: number) => void }) {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
            {items.map(item => (
                <MenuCard key={item.id} item={item} onAdd={() => onAdd(item.id)} />
            ))}
        </div>
    );
}