import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { colors, borderRadius } from "../constants/theme";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isBuyer = !location.pathname.startsWith("/freelancer");

  const dashboardPath = isBuyer ? "/client/dashboard" : "/freelancer/dashboard";

  const navLinks = [
    { label: "Find Work", path: "/find-work" },
    { label: "Browse Gigs", path: "/browse-gigs" },
    { label: "Dashboard", path: dashboardPath },
  ];

  const handleToggle = () => {
    if (isBuyer) {
      navigate("/freelancer/dashboard");
    } else {
      navigate("/client/dashboard");
    }
  };

  return (
    <nav style={s.navbar}>
      <Link to="/" style={s.logo}>SajhaGig</Link>

      <div style={s.searchBox}>
        <input placeholder="Search For Freelancers Or Services" style={s.searchInput} />
        <button style={s.searchBtn}>🔍</button>
      </div>

      <div style={s.navLinks}>
        {navLinks.map((link) => (
          <Link key={link.label} to={link.path} style={s.navLink}>
            {link.label}
          </Link>
        ))}
      </div>

      <div onClick={handleToggle} style={s.togglePill}>
        <span style={{ ...s.toggleDot, background: isBuyer ? colors.success : "#9ca3af" }} />
        <span style={{ color: colors.white, fontSize: 13, fontWeight: 600 }}>
          {isBuyer ? "Buyer" : "Seller"}
        </span>
      </div>

      {user ? (
        <div style={{ ...s.userAvatar, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700 }} onClick={() => navigate(isBuyer ? "/client/profile" : "/freelancer/profile")}>
          {user.initials || "U"}
        </div>
      ) : (
        <Link to="/login" style={{ color: "#c7d2fe", textDecoration: "none", fontSize: 14 }}>Login</Link>
      )}
    </nav>
  );
}

const s = {
  navbar: {
    background: colors.primary,
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "12px 24px",
    flexWrap: "wrap",
  },
  logo: {
    color: colors.white,
    fontWeight: 700,
    fontSize: 20,
    marginRight: 8,
    textDecoration: "none",
    fontStyle: "italic",
  },
  searchBox: {
    display: "flex",
    flex: 1,
    maxWidth: 380,
    borderRadius: borderRadius.md,
    overflow: "hidden",
  },
  searchInput: {
    flex: 1,
    padding: "8px 12px",
    border: "none",
    outline: "none",
    fontSize: 13,
  },
  searchBtn: {
    background: colors.accentDark,
    border: "none",
    padding: "0 14px",
    cursor: "pointer",
    color: colors.white,
    fontSize: 14,
  },
  navLinks: {
    display: "flex",
    gap: 20,
    marginLeft: "auto",
  },
  navLink: {
    color: "#c7d2fe",
    textDecoration: "none",
    fontSize: 14,
  },
  togglePill: {
    background: colors.gray[600],
    borderRadius: borderRadius.pill,
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 12px",
    cursor: "pointer",
    userSelect: "none",
  },
  toggleDot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#9ca3af",
    display: "inline-block",
  },
  userAvatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    background: colors.gray[600],
    cursor: "pointer",
  },
};
