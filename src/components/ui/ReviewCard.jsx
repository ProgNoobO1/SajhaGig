import React from "react";
import { Avatar } from "./Avatar";
import StarRating from "./StarRating";
import { colors } from "../../constants/theme";

export default function ReviewCard({ name, country, flag, rating, timeAgo, comment }) {
  return (
    <div
      style={{
        display: "flex",
        gap: 14,
        padding: "20px 0",
        borderBottom: "1px solid #e8e8e8",
      }}
    >
      <Avatar name={name} size={42} bgColor="#3b4cb8" />

      <div style={{ flex: 1 }}>
        <p style={{ margin: 0, fontWeight: 600, color: colors.text.primary, fontSize: 14 }}>
          {name}
        </p>
        <p style={{ margin: "2px 0 6px", fontSize: 12, color: colors.text.muted }}>
          {flag} {country}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
          <StarRating rating={rating} size={16} />
          <span style={{ fontSize: 12, color: "#888" }}>{timeAgo}</span>
        </div>
        <p style={{ margin: 0, fontSize: 13, color: "#444", lineHeight: 1.5 }}>
          {comment}
        </p>
      </div>
    </div>
  );
}
