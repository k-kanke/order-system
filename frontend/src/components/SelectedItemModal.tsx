import type { MenuItem } from "../types/MenuItem";
import { useState } from "react";

export function SelectedItemModal({
    item,
    onClose,
    onConfirm,
}: {
    item: MenuItem;
    onClose: () => void;
    onConfirm: (item: MenuItem, count: number) => void;
}) {
    const [count, setCount] = useState(1);

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", pointerEvents: "auto",
          }}>
            <div style={{
              background: "#fff", padding: "1rem", borderRadius: "8px", width: "80%", maxWidth: "400px", maxHeight: "80vh", overflowY: "auto", paddingBottom: "5rem",
              textAlign: "center"
            }}>
              <img src={item.imageUrl} alt={item.name} style={{ width: "100%", borderRadius: "8px" }} />
              <h2>{item.name}</h2>
              <p>¥{item.price}</p>
              <p>(合計: ¥{item.price*count})</p>
      
              <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "1rem", margin: "1rem 0" }}>
                <button onClick={() => setCount(c => Math.max(1, c - 1))}>−</button>
                <span>{count}</span>
                <button onClick={() => setCount(c => c + 1)}>＋</button>
              </div>
      
              <button onClick={() => onConfirm(item, count)}>カートに追加</button>
              <button onClick={onClose} style={{ marginLeft: "1rem" }}>閉じる</button>
            </div>
          </div>
        );
}