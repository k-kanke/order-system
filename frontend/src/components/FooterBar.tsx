import type { CartItem } from "../types/MenuItem";

export function FooterBar({
    // total,
    cart,
    // onCheckout,
    onCartOpen, // カートボタン用
    // onHistoryOpen,
    onOrderConfirm, // 注文確定ボタン用
  }: {
    // total: number;
    cart: CartItem[];
    // onCheckout: () => void;
    onCartOpen: () => void;
    // onHistoryOpen: () => void;
    onOrderConfirm: () => void;
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
        <button 
          className="relative" 
          onClick={onCartOpen}
          style={{ fontSize: "2rem", background: "none", border: "none", cursor: "pointer" }}
        >
          🛒
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 rounded-full w-2 h-2 flex items-center justify-center" />
          )}
        </button>

        {/* 注文確定ボタン */}
        <button
          onClick={onOrderConfirm}
          disabled={cartCount === 0} // カートが空の場合は無効化
          style={{
            padding: "0.75rem 1.5rem",
            backgroundColor: "#28a745", // 緑色
            color: "white",
            border: "none",
            borderRadius: "0.5rem",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            opacity: cartCount === 0 ? 0.5 : 1, // 無効化時に半透明にする
          }}
        >
          注文を確定
        </button>
        {/*
        <span>合計: ¥ {total}</span>
        <button onClick={onHistoryOpen}>履歴</button>
        <button onClick={onCheckout}>会計</button>
        */}
      </footer>
    );
  }