import React from "react";
import { colors, borderRadius } from "../../constants/theme";

export default function Pagination({ current, total = 10, onPageChange }) {
  const getPageNumbers = () => {
    if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 3) return [1, 2, 3, "...", total];
    if (current >= total - 2) return [1, "...", total - 2, total - 1, total];
    return [1, "...", current, "...", total];
  };

  const btnBase = {
    width: 32,
    height: 32,
    borderRadius: borderRadius.sm,
    border: "1px solid #e5e7eb",
    background: colors.white,
    cursor: "pointer",
    fontSize: 13,
    color: colors.text.secondary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "inherit",
  };

  const btnActive = {
    ...btnBase,
    background: colors.primary,
    color: colors.white,
    border: `1px solid ${colors.primary}`,
    fontWeight: 700,
  };

  const btnDisabled = {
    ...btnBase,
    color: "#ccc",
    cursor: "not-allowed",
  };

  return (
    <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 24 }}>
      <button
        style={current === 1 ? btnDisabled : btnBase}
        onClick={() => current > 1 && onPageChange(current - 1)}
        disabled={current === 1}
      >
        &#8249;
      </button>

      {getPageNumbers().map((page, idx) =>
        page === "..." ? (
          <span
            key={`dots-${idx}`}
            style={{ display: "flex", alignItems: "center", fontSize: 14, color: "#888", padding: "0 4px" }}
          >
            ...
          </span>
        ) : (
          <button
            key={page}
            style={page === current ? btnActive : btnBase}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        )
      )}

      <button
        style={current === total ? btnDisabled : btnBase}
        onClick={() => current < total && onPageChange(current + 1)}
        disabled={current === total}
      >
        &#8250;
      </button>
    </div>
  );
}
