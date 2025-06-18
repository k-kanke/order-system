import type { SubCategory } from "../types/MenuItem";

interface CategorySidebarProps {
    selected: SubCategory;
    onChange: (tab: SubCategory) => void;
    categories: SubCategory[];
}

export function CategorySidebar({ selected, onChange, categories }: CategorySidebarProps) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column', // 垂直方向に並べる
            width: '70px', // サイドバーの幅
            backgroundColor: '#f8f8f8', // サイドバーの背景色
            // borderRight: '1px solid #eee', // 右側に区切り線
            paddingTop: '5px', // 上部のパディング
            overflowY: 'auto', // カテゴリーが多い場合にスクロール可能にする
        }}>
            {categories.map(category => (
                <div
                    key={category}
                    onClick={() => onChange(category)}
                    style={{
                        padding: '10px 2px', // 上下のパディングを増やしてタップしやすく
                        cursor: 'pointer',
                        whiteSpace: 'nowrap',
                        textAlign: 'left', // テキストを左揃えにする
                        fontWeight: selected === category ? 'bold' : 'normal',
                        color: selected === category ? '#007bff' : '#555',
                        backgroundColor: selected === category ? 'white' : 'transparent', // 選択時に背景色を白に
                        borderLeft: selected === category ? '4px solid #007bff' : '4px solid transparent', // アクティブなカテゴリーに左線
                        transition: 'all 0.2s ease', // スムーズなアニメーション
                    }}
                >
                    {category}
                </div>
            ))}
        </div>
    )
}