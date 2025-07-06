import type { Product, TopCategory } from "../types/MenuItem";
import { ExpandableMenuCard } from "./ExpandableMenuCard";
// import { SubCategoryBlock } from "./SubCategoryBlock";

export function MainCategoryBlock({ 
        category,
        onSelectProduct,
    }: { 
        category: TopCategory;
        onSelectProduct: (product: Product) => void;
    }) {
    return (
        <div id={category.name} className="flex flex-col gap-y-4 px-2 pb-6">
            <h3 className="flex text-2xl items-center font-bold px-2 mb-2">
                {category.name}
                <span className="flex-grow ml-2 border-t border-dashed border-gray-300"/>
            </h3>

            {category.children.map(sub => (
                <div key={sub.id}>
                    {!sub.name.includes(category.name) && (
                        <h4 className="text-lg font-semibold text-gray-700 px-2">{sub.name}</h4>
                    )}

                    <div className="grid grid-cols-2 gap-3 mt-2">
                        {sub.children
                            .map(menu => (
                                <ExpandableMenuCard
                                    key={menu.id}
                                    category={menu}
                                    onSelectProduct={onSelectProduct}
                                />
                        ))}
                    </div>
                </div>
            ))}
        </div>  
    );
  }