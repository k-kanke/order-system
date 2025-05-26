import type { CartItem } from "../types/MenuItem";

export function CartModal({
    cart,
    onClose,
    onOrder,
}: {
    cart: CartItem[];
    onClose: () => void;
    onOrder: () => void;
}) {
    const total = cart.reduce((sum, item) => sum + item.price * item.count, 0);

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
                  <li key={item.id}>{item.name} × {item.count}（¥{item.price * item.count}）</li>
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