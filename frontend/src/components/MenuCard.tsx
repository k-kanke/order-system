interface MenuItem {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}

export function MenuCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
    return (
        <div style={{ width: '45%', border: '1px solid #ccc', margin: '0.5rem', borderRadius: '8px' }}>
            <img src={item.imageUrl} alt={item.name} style={{ width: '100%', borderRadius: '8px 8px 0 0' }} />
            <div style={{ padding: '0.5rem' }}>
                <h4>{item.name}</h4>
                <p>¥ {item.price}</p>
                <button onClick={onAdd}>追加</button>
            </div>
        </div>
    );
}