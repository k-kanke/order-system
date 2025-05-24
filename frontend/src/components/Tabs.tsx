type Tab = 'おすすめ' | '全て' | 'フード' | 'ドリンク';

interface TabsProps {
    selected: Tab;
    onChange: (tab: Tab) => void;
}

export function Tabs({ selected, onChange }: TabsProps) {
    const tabs: Tab[] = ['おすすめ', '全て', 'フード', 'ドリンク']
    return (
        <div style={{ display: 'flex', overflowX: 'auto', gap: '1rem', padding: '0.5rem' }}>
            {tabs.map(tab => (
                <button
                    key={tab}
                    onClick={() => onChange(tab)}
                    style={{ fontWeight: selected === tab ? 'bold' : 'normal' }}
                >
                    {tab}
                </button>
            ))}
        </div>
    );
}