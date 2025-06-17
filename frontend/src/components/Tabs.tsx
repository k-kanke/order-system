import type { Tab } from "../types/MenuItem";

interface TabsProps {
    selected: Tab;
    onChange: (tab: Tab) => void;
}

export function Tabs({ selected, onChange }: TabsProps) {
    const tabs: Tab[] = ['ゴルフ', 'ドリンク', 'フード']
    return (
        <div style={{ 
            display: 'flex', 
            overflowX: 'auto', 
            justifyContent: 'space-around',
            padding: '0.2rem',
            width: '100%',
            backgroundColor: '#f9f9f9',
        }}>
            {tabs.map(tab => (
                <div
                    key={tab}
                    onClick={() => onChange(tab)}
                    style={{ 
                        fontWeight: selected === tab ? 'bold' : 'normal',
                        padding: '0.60rem 0', 
                        color: selected === tab ? '#007bff' : '#555',
                        backgroundColor: 'white',
                        cursor: 'pointer',
                        whiteSpace: 'nowrap', // タブのテキストが改行されないように
                        flexGrow: 1,
                        textAlign: 'center',
                        minWidth: '0',
                        transition: 'color 0.3s ease, border-bottom 0.3s ease', 
                    }}
                >
                    {tab}
                </div>
            ))}
        </div>
    );
}