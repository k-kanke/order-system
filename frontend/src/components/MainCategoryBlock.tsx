import type { TopCategory } from "../types/MenuItem";
import { SubCategoryBlock } from "./SubCategoryBlock";

export function MainCategoryBlock({ category }: { category: TopCategory }) {
    return (
      <div className="mb-6">
        <h2 className="text-3xl font-bold px-2 mb-2">{category.name}</h2>
        {category.children.map(sub => (
          <SubCategoryBlock key={sub.id} subCategory2={sub} />
        ))}
      </div>
    );
  }