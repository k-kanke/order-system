import type { MenuItem } from "../types/MenuItem";
import { useState } from "react";

export function SelectedItemModal({
    item,
    onClose,
    onConfirm,
}: {
    item: MenuItem;
    onClose: () => void;
    onConfirm: (item: MenuItem, count: number, selectedSize: { label: string; price: number }) => void;
}) {
    const [count, setCount] = useState(1);
    const [selectedSize, setSelectedSize] = useState(item.sizes[0]); 

    return (
        <div style={{
            position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
            background: "rgba(0,0,0,0.5)", zIndex: 9999, display: "flex", justifyContent: "center", alignItems: "center", pointerEvents: "auto",
          }}>
            <div style={{
              background: "#fff", padding: "1rem", borderRadius: "8px", width: "90%", maxWidth: "400px", maxHeight: "80vh", overflowY: "auto", paddingBottom: "5rem",
              textAlign: "center"
            }}>
              <img src={item.imageUrl} alt={item.name} style={{ width: "100%", borderRadius: "8px" }} />
              <h2>{item.name}</h2>
              
              {/* サイズ選択 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "0.5rem",
                  marginTop: "1rem",
                }}
              >
                {item.sizes.map((size) => (
                  <button
                    key={size.label}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: "0.5rem 1rem",
                      border:
                        selectedSize.label === size.label
                          ? "2px solid #3b82f6"
                          : "1px solid #ccc",
                      borderRadius: "4px",
                      background:
                        selectedSize.label === size.label ? "#eff6ff" : "#fff",
                      cursor: "pointer",
                    }}
                  >
                    {size.label}（¥{size.price}）
                  </button>
                ))}
              </div>

              <p style={{ marginTop: "1rem" }}>
                ¥{selectedSize.price * count}
              </p>

              
      
              {/* 数量調整 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  margin: "1rem 0",
                }}
              >
                <button onClick={() => setCount((c) => Math.max(1, c - 1))}>−</button>
                <span>{count}</span>
                <button onClick={() => setCount((c) => c + 1)}>＋</button>
              </div>

              <button
                onClick={() => onConfirm(item, count, selectedSize)}
                style={{
                  background: "#3b82f6",
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  marginRight: "1rem",
                }}
              >
                カートに追加
              </button>

              <button onClick={onClose}>閉じる</button>
            </div>
          </div>
        );
}