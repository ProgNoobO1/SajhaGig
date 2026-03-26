import React from "react";
import { colors } from "../../constants/theme";

export function Avatar({ src, name, size = 36, bgColor }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name || "avatar"}
        style={{
          width: size,
          height: size,
          borderRadius: "50%",
          objectFit: "cover",
          border: "2px solid #fff",
          flexShrink: 0,
        }}
      />
    );
  }

  const initials = name
    ? name.slice(0, 2).toUpperCase()
    : "?";

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: bgColor || colors.primary,
        color: colors.white,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 700,
        fontSize: size * 0.35,
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}

export function AvatarGroup({ avatars = [], size = 28 }) {
  if (!avatars.length) return null;
  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      {avatars.map((src, i) => (
        <img
          key={i}
          src={src}
          alt="user"
          style={{
            width: size,
            height: size,
            borderRadius: "50%",
            objectFit: "cover",
            border: "2px solid #fff",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            marginLeft: i === 0 ? 0 : -8,
          }}
        />
      ))}
    </div>
  );
}
