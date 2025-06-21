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
            flexDirection: 'column',
            width: '70px', 
            backgroundColor: '#f8f8f8', 
            // paddingTop: '5px',
            overflowY: 'auto', 
        }}>
            {categories.map(category => (
                <div
                    key={category}
                    onClick={() => onChange(category)}
                    style={{
                        boxSizing: 'border-box',
                        padding: '20px 4px', // 上下のパディングを増やしてタップしやすく
                        cursor: 'pointer',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        textAlign: 'left', // テキストを左揃えにする
                        fontWeight: selected === category ? 'bold' : 'normal',
                        color: selected === category ? '#007bff' : '#555',
                        backgroundColor: selected === category ? 'white' : 'transparent', // 選択時に背景色を白に
                        borderLeft: selected === category ? '4px solid #007bff' : '4px solid transparent', // アクティブなカテゴリーに左線
                        transition: 'all 0.2s ease', // スムーズなアニメーション
                        fontSize: 'clamp(10px, 3vw, 14px)'
                    }}
                >
                    {category}
                </div>
            ))}
        </div>
    )
}