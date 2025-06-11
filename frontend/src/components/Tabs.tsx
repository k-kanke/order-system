import type { Tab } from "../types/MenuItem";

interface TabsProps {
    selected: Tab;
    onChange: (tab: Tab) => void;
}

export function Tabs({ selected, onChange }: TabsProps) {
    const tabs: Tab[] = ['おすすめ', 'おかわり', 'フード', 'ドリンク', 'ゴルフ']
    return (
        <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem', padding: '0.2rem' }}>
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    style={{ 
                        fontWeight: selected === tab ? 'bold' : 'normal',
                        padding: '0.2rem 0.7rem', // タブボタンのスタイルを調整
                        border: '1px solid #ccc',
                        borderRadius: '0.5rem',
                        backgroundColor: selected === tab ? '#e0e0e0' : 'white',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap', // タブのテキストが改行されないように
                    }}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}