import type { SubCategory } from "../types/MenuItem";

interface CategorySidebarProps {
    selected: SubCategory;
    onChange: (tab: SubCategory) => void;
    categories: SubCategory[];
}

export function CategorySidebar({ selected, onChange, categories }: CategorySidebarProps) {
    return (
        <div 
            style={{
                display: 'flex',
                flexDirection: 'column',
                width: '72px', 
                backgroundColor: '#f8f8f8', 
                // paddingTop: '5px',
                overflowY: 'auto',
                height: '100%',
            }}
            className="shadow-md"
        >
            {categories.map(category => (
                <div
                    key={category}
                    onClick={() => onChange(category)}
                    style={{
                        boxSizing: 'border-box',
                        padding: '13px 6px', 
                        height: '50px',
                        alignItems: 'center',
                        cursor: 'pointer',
                        whiteSpace: 'normal',
                        wordBreak: 'break-word',
                        textAlign: 'center', // テキストを左揃えにする
                        fontWeight: selected === category ? 'bold' : 'normal',
                        color: selected === category ? '#007bff' : '#555',
                        backgroundColor: selected === category ? 'white' : 'transparent', // 選択時に背景色を白に
                        borderLeft: selected === category ? '4px solid #007bff' : '4px solid transparent', // アクティブなカテゴリーに左線
                        transition: 'all 0.2s ease', 
                        fontSize: 'clamp(10px, 3vw, 14px)',
                        display: 'block',
                    }}
                >
                    {category}
                </div>
            ))}
        </div>
    )
}