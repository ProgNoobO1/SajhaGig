import React from "react";

const variants = {
  blue: { background: "#dbeafe", color: "#1d4ed8" },
  green: { background: "#dcfce7", color: "#15803d" },
  orange: { background: "#f97316", color: "#fff" },
  red: { background: "#ef4444", color: "#fff" },
  gray: { background: "#f1f5f9", color: "#374151" },
  dark: { background: "#1e293b", color: "#fff" },
  success: { background: "#22c55e", color: "#fff" },
  primary: { background: "#1a2b6d", color: "#fff" },
};

export default function Badge({ children, variant = "gray", style = {} }) {
  const v = variants[variant] || variants.gray;
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: "3px 10px",
        borderRadius: 5,
        whiteSpace: "nowrap",
        display: "inline-block",
        ...v,
        ...style,
      }}
    >
      {children}
    </span>
  );
}
