import type { CartItem } from "../types/MenuItem";

export function FooterBar({
    total,
    cart,
    onCheckout,
    onCartOpen, // ← カートボタン用
    onHistoryOpen,
  }: {
    total: number;
    cart: CartItem[];
    onCheckout: () => void;
    onCartOpen: () => void;
    onHistoryOpen: () => void;
  }) {
    const cartCount = cart.reduce((sum, item) => sum + item.count, 0);

    return (
      <footer
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
          background: "#fff",
          borderTop: "1px solid #ccc",
        }}
        >
        <button className="relative" onClick={onCartOpen}>
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2 flex items-center justify-center" />
          )}
        </button>
        <span>合計: ¥ {total}</span>
        <button onClick={onHistoryOpen}>履歴</button>
        <button onClick={onCheckout}>会計</button>
      </footer>
    );
  }