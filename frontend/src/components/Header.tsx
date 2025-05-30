

interface HeaderProps {
  onCheckout: () => void; 
  onHistoryOpen: () => void;
}

export default function Header({ onCheckout, onHistoryOpen }: HeaderProps) {
    return (
      <header className="bg-blue-600 text-white shadow-md px-4 py-3 flex justify-between items-center">
        
        {/* 右側の履歴ボタン */}
        <button
          onClick={onHistoryOpen}
          style={{
            background: "none",
            border: "1px solid white", // 白い枠線
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem", // アイコンとテキストの間隔
            cursor: "pointer",
          }}
        >
          <span>履歴</span>
        </button>
        
        <h5 className="text-2xl font-semibold text-center tracking-wide">
          ORDER SYSTEM
        </h5>

        {/* 右側の会計ボタン */}
        <button
          onClick={onCheckout}
          style={{
            background: "none",
            border: "1px solid white", // 白い枠線
            borderRadius: "0.5rem",
            padding: "0.5rem 1rem",
            color: "white",
            display: "flex",
            alignItems: "center",
            gap: "0.5rem", // アイコンとテキストの間隔
            cursor: "pointer",
          }}
        >
          <span>会計</span>
        </button>

      </header>
    );
  }
  