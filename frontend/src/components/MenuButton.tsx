import { useState } from "react";
import type { MenuCategory } from "../types/MenuItem";

export function MenuButton({ menu }: { menu: MenuCategory }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button
        className="w-full bg-gray-100 rounded p-2 text-left font-medium"
        onClick={() => setOpen(prev => !prev)}
      >
        {menu.name}
      </button>
      {open && (
        <div className="mt-2 pl-2">
          {menu.products.map(product => (
            <div key={product.productId} className="p-2 border-b text-sm">
              {product.productName}（¥{product.price}）
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
