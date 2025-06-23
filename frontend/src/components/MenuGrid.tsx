import { MenuCard } from "./MenuCard";
import type { MenuItem, SubCategory, Tab } from "../types/MenuItem";
// import { RecommendedSlider } from "./RecommendedSlider";

interface MenuGridProps {
    items: MenuItem[];
    recomendedItems: MenuItem[];
    onConfirm: (item: MenuItem) => void;
    topTab: Tab;
}

export function MenuGrid({ items, recomendedItems, onConfirm, topTab }: MenuGridProps) {
    // カテゴリーごとにグループ分け
    const groupedItems = items.reduce((acc, item) => {
        const key: SubCategory = item.subCategory;
        if (!acc[key]) {
            acc[key] = [];
        }
        acc[key].push(item);
        return acc;
    }, {} as Record<SubCategory, MenuItem[]>);

    // サイドバーとメニューの順番を合わせる
    const sidebarOrder = topTab === 'ドリンク'
        ? ['おすすめ', 'ビール', 'サワー', 'ワイン', 'ハイボール', 'ソフトドリンク']
        :['おすすめ', '軽食', '揚げ物', 'ご飯もの', 'デザート'];


    return (
        <div className="flex flex-col gap-y-5">
            {/* おすすめメニュー */}
            <h3 className="text-2xl font-bold mb-4 px-2">おすすめ</h3> 
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
            

            {Object.keys(groupedItems)
                .sort((a, b) => {
                    return sidebarOrder.indexOf(a) - sidebarOrder.indexOf(b);
                })
                .map((subCategoryKey, index, array) => {
                    const subCategoryItems = groupedItems[subCategoryKey as SubCategory];
                    const isLast = index === array.length - 1;
            
                    return (
                        <div key={subCategoryKey}>
                            {/* 各サブカテゴリーセクションの開始位置にIDを設定 */}
                            {/* Intersection Observerとスクロール遷移のターゲットとなる要素 */}
                            {/* paddingTopとmarginTopで、スクロールしたときにタイトルがヘッダーの裏に隠れないように調整 */}
                            <div 
                                id={subCategoryKey} 
                                style={{ paddingTop: '20px', paddingBottom: '5px', marginTop: '-20px' }}
                            />
                            
                            {/* サブカテゴリーのタイトル */}
                            <h3 className="text-2xl font-bold mb-4 px-2">{subCategoryKey}</h3> 
                            
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
                        </div>
                    );
                })
            }
        </div>
    )
}