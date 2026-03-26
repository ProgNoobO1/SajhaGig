// src/components/Header.jsx
import React from "react";

export default function Header() {
  return (
    <nav style={styles.navbar}>
      {/* Logo */}
      <span style={styles.logo}>SajhaGig</span>

      {/* Search box */}
      <div style={styles.searchBox}>
        <input placeholder="Search For Freelancers Or Services" style={styles.searchInput} />
        <button style={styles.searchBtn}>🔍</button>
      </div>

      {/* Nav links */}
      <div style={styles.navLinks}>
        <a href="#" style={styles.navLink}>Find Work</a>
        <a href="#" style={styles.navLink}>Browse Gigs</a>
        <a href="#" style={styles.navLink}>Dashboard</a>
      </div>

      {/* Seller toggle pill */}
      <div style={styles.sellerPill}>
        <span style={styles.sellerDot} />
        <span style={{ color: "#fff", fontSize: 13 }}>Seller</span>
      </div>

      {/* Avatar */}
      <div style={styles.userAvatar} />
    </nav>
  );
}

// ── Styles used by Header ──
const styles = {
  navbar: {
    background: "#1e2a6e",
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "12px 24px",
    flexWrap: "wrap",
  },
  logo: {
    color: "#fff",
    fontWeight: 700,
    fontSize: 20,
    marginRight: 8,
  },
  searchBox: {
    display: "flex",
    flex: 1,
    maxWidth: 340,
    borderRadius: 8,
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
    background: "#2563eb",
    border: "none",
    padding: "0 14px",
    cursor: "pointer",
    color: "#fff",
    fontSize: 14,
  },
  navLinks: {
    display: "flex",
    gap: 20,
    marginLeft: "auto",
  },
  navLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: 14,
  },
  sellerPill: {
    background: "#374151",
    borderRadius: 20,
    display: "flex",
    alignItems: "center",
    gap: 6,
    padding: "4px 12px",
  },
  sellerDot: {
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
    background: "#374151",
  },
};