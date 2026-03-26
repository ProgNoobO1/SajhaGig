import React from "react";
import { colors } from "../../constants/theme";

export default function PageBanner({ title = "Dashboard", breadcrumb = "Home > Dashboard" }) {
  return (
    <div
      style={{
        background: colors.bg.banner,
        textAlign: "center",
        padding: "28px 0 24px",
        borderBottom: `1px solid ${colors.gray[200]}`,
      }}
    >
      <h2 style={{ fontSize: 22, fontWeight: 700, color: colors.primary, margin: 0 }}>
        {title}
      </h2>
      <p style={{ fontSize: 13, color: colors.text.muted, margin: "6px 0 0" }}>
        {breadcrumb}
      </p>
    </div>
  );
}
