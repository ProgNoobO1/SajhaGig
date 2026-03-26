import React from "react";
import { colors, borderRadius, shadows } from "../../constants/theme";

export default function StatCard({ icon, label, value, color, iconBg }) {
  const bg = iconBg || (color ? color + "22" : colors.accent + "22");
  const iconColor = color || colors.accent;

  return (
    <div
      style={{
        background: colors.white,
        borderRadius: borderRadius.xl,
        padding: 16,
        display: "flex",
        alignItems: "center",
        gap: 12,
        boxShadow: shadows.sm,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: borderRadius.lg,
          background: bg,
          color: iconColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 18,
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div>
        <p style={{ fontSize: 11, color: colors.text.muted, margin: 0 }}>{label}</p>
        <p style={{ fontSize: 18, fontWeight: 700, color: colors.text.primary, margin: "2px 0 0" }}>
          {value}
        </p>
      </div>
    </div>
  );
}
