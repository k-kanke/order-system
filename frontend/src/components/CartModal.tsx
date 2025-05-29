import type { CartItem } from "../types/MenuItem";

export function CartModal({
    cart,
    onClose,
    onOrder,
    onIncrease,
    onDecrease,
}: {
    cart: CartItem[];
    onClose: () => void;
    onOrder: () => void;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
}) {
    const total = cart.reduce((sum, item) => sum + item.selectedSize.price * item.count, 0);

    return (
        <div style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
        }}>
          <div style={{ background: "#fff", padding: "1rem", borderRadius: "8px", width: "80%" }}>
            <h2>カート内容</h2>
            {cart.length === 0 ? <p>カートは空です</p> : (
              <ul>
                {cart.map(item => (
                    <li key={item.id} style={{ marginBottom: '1rem' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>{item.name}({item.selectedSize.label})</span>
                        <div>
                            <button onClick={() => onDecrease(item.id)}>−</button>
                            <span style={{ margin: '0 1rem' }}>{item.count}</span>
                            <button onClick={() => onIncrease(item.id)}>＋</button>
                        </div>
                        </div>
                        <p>小計: ¥{item.selectedSize.price * item.count}</p>
                    </li>
                    ))}
              </ul>
            )}
            <p>合計: ¥{total}</p>
            <button onClick={onOrder}>注文する</button>
            <button onClick={onClose}>閉じる</button>
          </div>
        </div>
      );
}