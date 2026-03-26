import React from "react";
import { useNavigate } from "react-router-dom";
import { colors, borderRadius, shadows } from "../../constants/theme";

const CLIENT_LINKS = [
  { icon: "🏠", label: "Dashboard", path: "/client/dashboard" },
  { icon: "📁", label: "Projects", path: "/client/projects" },
  { icon: "⭐", label: "Reviews", path: "/client/reviews" },
  { icon: "💬", label: "Chat", path: null },
  { icon: "🚪", label: "Logout", path: "/login" },
];

const FREELANCER_LINKS = [
  { icon: "🏠", label: "Dashboard", path: "/freelancer/dashboard" },
  { icon: "📁", label: "Projects", path: "/freelancer/projects" },
  { icon: "⭐", label: "Reviews", path: "/freelancer/reviews" },
  { icon: "🗂️", label: "Portfolio", path: "/freelancer/portfolio" },
  { icon: "💬", label: "Chat", path: null },
  { icon: "🚪", label: "Logout", path: "/login" },
];

export default function DashboardSidebar({
  role = "client",
  links,
  activeLabel,
  onLinkClick,
  subLinks,
  activeSubIndex,
  onSubLinkClick,
  expandLabel = "Projects",
  profileName = "Walter Griffin",
  profileEmail = "walter@sample.com",
  profileImg,
}) {
  const navigate = useNavigate();
  const navLinks = links || (role === "freelancer" ? FREELANCER_LINKS : CLIENT_LINKS);

  const handleClick = (link) => {
    onLinkClick(link.label);
    if (link.path) {
      navigate(link.path);
    }
  };

  return (
    <aside style={s.sidebar}>
      {/* Profile card */}
      <div style={s.profileCard}>
        {profileImg ? (
          <img src={profileImg} alt={profileName} style={s.profileAvatar} />
        ) : (
          <div style={s.profileAvatarPlaceholder}>👤</div>
        )}
        <p style={s.profileName}>{profileName}</p>
        <p style={s.profileEmail}>{profileEmail}</p>
      </div>

      {/* Navigation */}
      <nav style={s.sideNav}>
        {navLinks.map((link) => {
          const isActive = activeLabel === link.label;
          return (
            <div key={link.label}>
              <button
                onClick={() => handleClick(link)}
                style={{ ...s.sideLink, ...(isActive ? s.sideLinkActive : {}) }}
              >
                <span style={{ fontSize: 16 }}>{link.icon}</span>
                <span style={{ flex: 1 }}>{link.label}</span>
                {link.label === expandLabel && subLinks && (
                  <span style={{ fontSize: 10, opacity: 0.7 }}>
                    {isActive ? "▲" : "▼"}
                  </span>
                )}
              </button>

              {link.label === expandLabel && isActive && subLinks && (
                <div style={s.subLinks}>
                  {subLinks.map((sub, j) => (
                    <button
                      key={sub}
                      onClick={() => onSubLinkClick?.(j)}
                      style={{
                        ...s.subLink,
                        ...(activeSubIndex === j ? s.subLinkActive : {}),
                      }}
                    >
                      {sub}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}

const s = {
  sidebar: { width: 210, minWidth: 190, flexShrink: 0 },
  profileCard: {
    background: colors.white,
    borderRadius: borderRadius.lg,
    padding: "20px 16px",
    textAlign: "center",
    marginBottom: 12,
    boxShadow: shadows.sm,
  },
  profileAvatar: {
    width: 60,
    height: 60,
    borderRadius: "50%",
    objectFit: "cover",
    border: "3px solid #e8ecf8",
    marginBottom: 8,
  },
  profileAvatarPlaceholder: {
    fontSize: 44,
    marginBottom: 8,
  },
  profileName: { fontWeight: 700, fontSize: 15, color: colors.text.primary, margin: "0 0 2px" },
  profileEmail: { fontSize: 12, color: colors.text.muted, margin: 0 },

  sideNav: {
    background: colors.white,
    borderRadius: borderRadius.lg,
    boxShadow: shadows.sm,
    overflow: "hidden",
  },
  sideLink: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    width: "100%",
    background: "none",
    border: "none",
    padding: "12px 16px",
    fontSize: 14,
    color: colors.text.secondary,
    cursor: "pointer",
    textAlign: "left",
    borderLeft: "3px solid transparent",
    fontFamily: "inherit",
  },
  sideLinkActive: {
    background: colors.primary,
    color: colors.white,
    borderLeft: `3px solid ${colors.accentTeal}`,
    fontWeight: 600,
  },

  subLinks: { background: "#f8faff", paddingBottom: 4 },
  subLink: {
    display: "block",
    width: "100%",
    background: "none",
    border: "none",
    padding: "8px 16px 8px 44px",
    fontSize: 13,
    color: colors.text.muted,
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "inherit",
  },
  subLinkActive: { color: colors.primary, fontWeight: 700 },
};
