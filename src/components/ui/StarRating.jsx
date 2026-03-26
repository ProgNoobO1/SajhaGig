import React from "react";
import { colors } from "../../constants/theme";

export default function StarRating({ rating, size = 14, showValue = false }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill={star <= rating ? colors.star : "#d0d0d0"}
        >
          <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
        </svg>
      ))}
      {showValue && (
        <span style={{ fontSize: size - 1, color: colors.text.muted, marginLeft: 4 }}>
          {typeof rating === "number" ? rating.toFixed(1) : rating}
        </span>
      )}
    </div>
  );
}
