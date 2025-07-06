import type { SubCategory2 } from "../types/MenuItem";
import { MenuButton } from "./MenuButton";

export function SubCategoryBlock({ subCategory2 }: { subCategory2: SubCategory2 }) {
    return (
      <div className="mb-4">
        <h3 className="text-xl font-semibold px-2">{subCategory2.name}</h3>
        <div className="grid grid-cols-2 gap-2 px-2">
          {subCategory2.children.map(menu => (
            <MenuButton key={menu.id} menu={menu} />
          ))}
        </div>
      </div>
    );
  }
  