
export function FooterBar({
    total,
    onCheckout,
    onCartOpen, // ← カートボタン用
    onHistoryOpen,
  }: {
    total: number;
    onCheckout: () => void;
    onCartOpen: () => void;
    onHistoryOpen: () => void;
  }) {
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
        <button onClick={onCartOpen}>🛒</button>
        <span>合計: ¥ {total}</span>
        <button onClick={onHistoryOpen}>履歴</button>
        <button onClick={onCheckout}>会計</button>
      </footer>
    );
  }