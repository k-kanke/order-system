import { useState } from "react";
import type { MenuCategory, MenuItem, TopCategory } from "../types/MenuItem";
import { ExpandableMenuCard } from "./ExpandableMenuCard";

export function MainCategoryBlock({ 
        category,
        // onSelectProduct,
        onConfirm,
    }: { 
        category: TopCategory;
        // onSelectProduct: (product: Product) => void;
        onConfirm: (item: MenuItem, count: number, selectedSize: { label: string; price: number }) => void;
    }) {
    
        const [selectedMenuCategory, setSelectedMenuCategory] = useState<MenuCategory | null>(null);

        return (
            <section id={category.name} className="flex flex-col gap-y-4 px-2 pb-6">
                <h3 className="flex text-2xl items-center font-bold px-2 mb-2">
                    {category.name}
                    <span className="flex-grow ml-2 border-t border-dashed border-gray-300"/>
                </h3>

                <div>
                    {category.children.flatMap(sub => (
                        <div key={sub.id}>
                            {!sub.name.includes(category.name) && (
                                <h3 className="text-sm font-semibold text-gray-600 px-1 mb-1">{sub.name}</h3>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                {sub.children.map(menu => (
                                    <div
                                        key={menu.id}
                                        className="cursor-pointer"
                                        onClick={() => setSelectedMenuCategory(menu)}
                                    >
                                        <div>
                                            <img 
                                                src="/placeholder.jpg" // 仮の画像 
                                                // alt={menu.name}
                                                className="w-full h-32 object-cover" 
                                            />
                                            <div className="text-start shadow-md p-2 rounded text-xs font-semibold min-h-[2rem] flex items-center justify-start">
                                                {menu.name} 
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* モーダル表示 */}
                {selectedMenuCategory && (
                    <div className="fixed inset-0 bg-white z-[1000] overflow-y-auto p-4">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">{selectedMenuCategory.name}</h2>
                            <button
                                onClick={() => setSelectedMenuCategory(null)}
                                className="text-2xl"
                            >
                                ✖
                            </button>
                        </div>
          
                        <ExpandableMenuCard
                            category={selectedMenuCategory}
                            topCategoryName={category.name}
                            onConfirm={(item, count, selectedSize) => {
                                onConfirm(item, count, selectedSize);
                                setSelectedMenuCategory(null); // カートを閉じる
                            }}
                        />
                    </div>
                )}
            </section>  
        );
  }