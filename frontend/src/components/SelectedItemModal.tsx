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
              
              {/* サイズ選択 */}
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  flexDirection: "column",
                  marginBottom: "1.5rem",
                  marginTop: "1.5rem"
                }}
              >
                {item.sizes.map((size) => {
                  const isSelected = selectedSize.label === size.label;
                  return (
                    <label
                      key={size.label}
                      // onClick={() => setSelectedSize(size)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        padding: "0.5rem 1rem",
                        border: "none",
                        //border:
                        //  selectedSize.label === size.label
                        //</div>    ? "2px solid #3b82f6"
                        //    : "1px solid #ccc",
                        borderRadius: "6px",
                        background: isSelected ? "#eff6ff" : "transparent",
                        cursor: "pointer",
                        fontWeight: selectedSize.label === size.label ? "bold" : "normal",
                        transition: "background 0.2s",
                        color: "#111"
                      }}
                    >
                      {/* ラジオボタン（非表示） */}
                      <input
                        type="radio"
                        name="size"
                        checked={isSelected}
                        onChange={() => setSelectedSize(size)}
                        style={{ display: "none" }}
                      />

                      {/* チェックマーク表示部分 */}
                      <span
                        style={{
                          display: "inline-block",
                          width: "1.2rem",
                          height: "1.2rem",
                          marginRight: "0.75rem",
                          border: "2px solid #3b82f6",
                          borderRadius: "4px",
                          backgroundColor: isSelected ? "#3b82f6" : "transparent",
                          color: "#fff",
                          fontSize: "0.9rem",
                          textAlign: "center",
                          lineHeight: "1.1rem",
                          transition: "background 0.2s",
                        }}
                      >
                        {isSelected ? "✓" : ""}
                      </span>

                      {/* ラベルテキスト */}
                      <span>{size.label} : ¥{size.price}</span>
                    </label>
                  );
                })}
              </div>              
      
              {/* 数量調整 */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "1rem",
                  margin: "1rem 0",
                  marginBottom: "1.5rem",
                }}
              >
                <button 
                  onClick={() => setCount((c) => (c !== 1 ? c - 1 : c))}
                  style={{
                    fontSize: "1.5rem",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "#e5e7eb",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  −
                </button>
                <span style={{ fontSize: "1.8rem", fontWeight: "bold", width: "30px" }}>{count}</span>
                <button 
                  onClick={() => setCount((c) => c + 1)}
                  style={{
                    fontSize: "1.5rem",
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    background: "#e5e7eb",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  ＋
                </button>
              </div>

              <div 
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "1rem",
                  marginTop: "2rem",
                }}
              >
                <button 
                  onClick={onClose}
                  style={{
                    padding: "0.6rem 1.2rem",
                    background: "#f3f4f6",
                    color: "#374151",
                    borderRadius: "6px",
                    border: "1px solid #d1d5db",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  閉じる
                </button>
                <button
                  onClick={() => onConfirm(item, count, selectedSize)}
                  style={{
                    padding: "0.6rem 1.2rem",
                    background: "#3b82f6",
                    color: "#fff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  カートに追加
                </button>
              </div>
            </div>
          </div>
        );
}