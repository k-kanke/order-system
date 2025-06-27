import { MenuCard } from "./MenuCard";
import type { CartItem, MenuItem, SubCategory, Tab } from "../types/MenuItem";
import { useMemo } from "react";
// import { RecommendedSlider } from "./RecommendedSlider";

interface MenuGridProps {
    items: MenuItem[];
    recomendedItems: MenuItem[];
    onConfirm: (item: MenuItem) => void;
    topTab: Tab;
    orderHistory: CartItem[][];
}

export function MenuGrid({ items, recomendedItems, onConfirm, topTab, orderHistory }: MenuGridProps) {
    // カテゴリーごとにグループ分け
    const groupedItems = items.reduce((acc, item) => {
        const key: SubCategory = item.subCategory;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {} as Record<SubCategory, MenuItem[]>);

    // ドリンク履歴から「おかわり」候補を抽出（重複排除）
    const repeatDrinkItems = useMemo(() => {
        const seen = new Map<number, MenuItem>();
        orderHistory.flat().forEach(item => {
            if (item.category === 'ドリンク' && !seen.has(item.id)) {
                seen.set(item.id, item);
            }
        });
        return Array.from(seen.values());
    }, [orderHistory]);

    const repeatFoodItems = useMemo(() => {
        const seen = new Map<number, MenuItem>();
        orderHistory.flat().forEach(item => {
            if (item.category === 'フード' && !seen.has(item.id)) {
                seen.set(item.id, item);
            }
        });
        return Array.from(seen.values());
    }, [orderHistory]);

    // サイドバーとメニューの順番を合わせる
    const sidebarOrder = topTab === 'ドリンク'
        ? ['おすすめ', 'ビール', 'サワー', 'ワイン', 'ハイボール', 'ソフトドリンク']
        :['おすすめ', '軽食', '揚げ物', 'ご飯もの', 'デザート'];


    return (
        <div id="おすすめ" className="flex flex-col gap-y-5 bg-white rounded-xl shadow-sm">
            {/* おすすめメニュー */}
            <h3 className="flex items-center text-2xl font-bold px-2">
                おすすめ
                <span className="flex-grow ml-2 border-t border-dashed border-gray-300"/>
            </h3> 
            <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-2">
                {recomendedItems.length > 0 && (
                    recomendedItems.map(item => (
                        <MenuCard
                            key={item.id}
                            item={item}
                            onConfirm={() => onConfirm(item)}
                        />
                    ))
                )}
            </div>

            {/* おかわりセクション（ドリンクタブ） */}
            {topTab === 'ドリンク' && repeatDrinkItems.length > 0 && (
                <div>
                    <div
                        id="おかわり"
                        style={{ minHeight: '20px', paddingTop: '10px', paddingBottom: '10px', marginTop: '-20px' }}
                    />
                    <h3 className="flex items-center text-2xl font-bold mb-2 px-2">
                        おかわり
                        <span className="flex-grow ml-2 border-t border-dashed border-gray-300"/>
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-2">
                        {repeatDrinkItems.map(item => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                onConfirm={() => onConfirm(item)}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* おかわりセクション（フードタブ） */}
            {topTab === 'フード' && repeatFoodItems.length > 0 && (
                <div>
                    <div
                        id="おかわり"
                        style={{ minHeight: '20px', paddingTop: '10px', paddingBottom: '10px', marginTop: '-20px' }}
                    />
                    <h3 className="flex items-center text-2xl font-bold mb-2 px-2">
                        おかわり
                        <span className="flex-grow ml-2 border-t border-dashed border-gray-300"/>
                    </h3>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3 px-2">
                        {repeatFoodItems.map(item => (
                            <MenuCard
                                key={item.id}
                                item={item}
                                onConfirm={() => onConfirm(item)}
                            />
                        ))}
                    </div>
                </div>
            )}
            

            {Object.keys(groupedItems)
                .sort((a, b) => {
                    return sidebarOrder.indexOf(a) - sidebarOrder.indexOf(b);
                })
                .map((subCategoryKey, index, array) => {
                    const subCategoryItems = groupedItems[subCategoryKey as SubCategory];
                    const isLast = index === array.length - 1;
            
                    return (
                        <section
                            key={subCategoryKey}
                            className="pt-3 pb-3 last:border-0"
                            id={subCategoryKey}
                        >
                            {/* サブカテゴリーのタイトル */}
                            <h3 className="flex items-center text-2xl font-bold mb-2 px-2">
                                {subCategoryKey}
                                <span className="flex-grow ml-2 border-t border-dashed border-gray-300"/>
                            </h3> 
                            
                            {/* そのサブカテゴリーに属するメニューカードのグリッド */}
                            <div 
                                className={`grid grid-cols-2 gap-x-4 gap-y-3 px-2 ${isLast ? 'pb-40' : ''}`}
                            >
                                {subCategoryItems.map(item => (
                                    <MenuCard
                                        key={item.id}
                                        item={item}
                                        onConfirm={() => onConfirm(item)}
                                    />
                                ))}
                            </div>
                        </section>                
                    );
                })
            }
        </div>
    )
}