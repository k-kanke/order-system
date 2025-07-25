import { useState } from "react";
import type { MenuCategory, MenuItem, TopCategory } from "../types/MenuItem";
import { ExpandableMenuCard } from "./ExpandableMenuCard";
// import { convertMenuItemToProduct} from "../utils/CategoryUtils";

export function MainCategoryBlock({ 
        category,
        // onSelectProduct,
        onConfirm,
        drinkOrder,
        foodOrder,
        topTab,
    }: { 
        category: TopCategory;
        // onSelectProduct: (product: Product) => void;
        onConfirm: (item: MenuItem, count: number, selectedSize: { label: string; price: number }) => void;
        drinkOrder?: MenuItem[];
        foodOrder?: MenuItem[];
        topTab: 'ドリンク' | 'フード'; 
    }) {
    
        const [selectedMenuCategory, setSelectedMenuCategory] = useState<MenuCategory | null>(null);

        let topCategoryName: 'ドリンク' | 'フード' = 'フード';
        if (category.code.startsWith('d')) {
            topCategoryName = 'ドリンク';
        }

        // debug
        // onsole.log("[debug] drinkOrder!!!:", drinkOrder)
        // console.log("[debug] foodOrder???:", foodOrder)

        const reorderItems: MenuItem[] = (topTab === 'ドリンク' ? drinkOrder : foodOrder) ?? [];
        // console.log("[debug] recorderItems!!!:", reorderItems)

        // console.log("[debug] categories!!!:", category)

        
        return (
            <section id={category.name} className="flex flex-col gap-y-4 px-2 pb-6">
                {/* おかわり表示（カテゴリが "おかわり" のときだけ） */}
                {category.name === 'おかわり' && (
                    <>
                        <h3 className="flex text-2xl font-extrabold text-gray-900 items-center px-2 mt-2 mb-2">
                            おかわり
                            <span className="flex-grow ml-2 border-t border-dashed border-gray-300"/>
                        </h3> 
                        
                        <div className="grid grid-cols-2 gap-4">
                            {category.children.flatMap(sub =>
                                sub.children
                                    .filter(menu => {
                                        const matched = reorderItems.some(item => item.subCategory === menu.name);
                                        // console.log(`[debug] checking menu.name="${menu.name}" → matched:`, matched);
                                        return matched;
                                    })
                                    .map(menu => {
                                        // image_url 取得する
                                        const image_url = menu.products.find((p) => p.url && p.url.trim() !== "")?.url || "/placeholder.jpg";

                                        return (
                                            <div
                                                key={`reorder-${menu.id}`}
                                                className="cursor-pointer"
                                                onClick={() => setSelectedMenuCategory(menu)}
                                            >
                                                <img
                                                    src={image_url}
                                                    className="w-full h-32 object-cover"
                                                    // alt={menu.name}  
                                                />
                                                <div className="text-start shadow-md p-2 rounded text-xs font-semibold min-h-[2rem] flex items-center justify-start">
                                                    {menu.name}
                                                </div>
                                            </div>
                                        )
                                    })
                            )}
                        </div>
                    </>
                )}

                {/* 商品表示 */}
                {category.name !== 'おかわり' && (
                    <>
                        <h3 className="flex text-2xl font-extrabold text-gray-900 items-center px-2 mt-2 mb-2">
                            {category.name}
                            <span className="flex-grow ml-2 border-t border-dashed border-gray-300"/>
                        </h3>               

                        <div>
                            {category.children.flatMap(sub => (
                                <div key={sub.id}>
                                    {!sub.name.includes(category.name) && (
                                        <h2 className="relative text-lg font-bold text-gray-800 px-1 mt-1 mb-3 pl-3">
                                            <span className="absolute left-0 top-1/2 transform -translate-y-1/2 h-5 w-1 rounded-full bg-blue-500" />
                                            {sub.name}
                                        </h2>
                                    )}

                                    <div className="grid grid-cols-2 gap-4 mb-5">
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
                    </>
                )}

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
                            topCategoryName={topCategoryName}
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