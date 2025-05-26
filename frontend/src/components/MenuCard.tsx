interface MenuItem {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
}


export function MenuCard({
    item,
    onAdd,
    onConfirm,
  }: {
    item: MenuItem;
    onAdd: () => void;
    onConfirm: () => void;
  }) {
    return (
      <div
        onClick={onConfirm}
        style={{
          width: "45%",
          border: "1px solid #ccc",
          margin: "0.5rem",
          borderRadius: "8px",
        }}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{ width: "100%", borderRadius: "8px 8px 0 0" }}
        />
        <div style={{ padding: "0.5rem" }}>
          <h4>{item.name}</h4>
          <p>¥ {item.price}</p>
          <button onClick={(e) => { e.stopPropagation(); onAdd(); }}>
            追加
          </button>
        </div>
      </div>
    );
  }
  

/*
export function MenuCard({ item, onAdd }: { item: MenuItem; onAdd: () => void }) {
    return (
        <div onClick={() => onConfirm(item)} style={{ width: '45%', border: '1px solid #ccc', margin: '0.5rem', borderRadius: '8px' }}>
            <img src={item.imageUrl} alt={item.name} style={{ width: '100%', borderRadius: '8px 8px 0 0' }} />
            <div style={{ padding: '0.5rem' }}>
                <h4>{item.name}</h4>
                <p>¥ {item.price}</p>
                <button onClick={() => onAdd(item)}>追加</button>
            </div>
        </div>
    );
}
*/
