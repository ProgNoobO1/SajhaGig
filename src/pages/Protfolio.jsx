import { useState } from "react";
import Footer from "../components/Footer";

// ═══════════════════════════════════════════════════════
//  STEP 1 — ALL DATA
// ═══════════════════════════════════════════════════════

const PROFILE_IMG = "https://randomuser.me/api/portraits/men/32.jpg";

const SIDEBAR_LINKS = [
  { icon: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png", label: "Dashboard" },
  { icon: "https://cdn-icons-png.flaticon.com/512/1161/1161388.png", label: "Projects" },
  { icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", label: "Reviews" },
  { icon: "https://cdn-icons-png.flaticon.com/512/3143/3143198.png", label: "Portfolio" },
  { icon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png", label: "Chat" },
  { icon: "https://cdn-icons-png.flaticon.com/512/1828/1828479.png", label: "Logout" },
];

// Portfolio cards — using Picsum for realistic website mockup images
const PORTFOLIO_ITEMS = [
  {
    id: 1,
    title: "Razor Website Design",
    rating: 5.0,
    image: "https://picsum.photos/seed/razor-web/460/300",
  },
  {
    id: 2,
    title: "Transport Website",
    rating: 5.0,
    image: "https://picsum.photos/seed/transport-web/460/300",
  },
  {
    id: 3,
    title: "Wordpress Website",
    rating: 5.0,
    image: "https://picsum.photos/seed/wordpress-web/460/300",
  },
  {
    id: 4,
    title: "Healthcare Website",
    rating: 5.0,
    image: "https://picsum.photos/seed/healthcare-web/460/300",
  },
  {
    id: 5,
    title: "Inquiry Website",
    rating: 5.0,
    image: "https://picsum.photos/seed/inquiry-web/460/300",
  },
  {
    id: 6,
    title: "Ecommerce Website",
    rating: 5.0,
    image: "https://picsum.photos/seed/ecommerce-web/460/300",
  },
  {
    id: 7,
    title: "Mobile App",
    rating: 5.0,
    image: "https://picsum.photos/seed/mobile-app/460/300",
  },
  {
    id: 8,
    title: "Law Website",
    rating: 5.0,
    image: "https://picsum.photos/seed/law-web/460/300",
  },
  {
    id: 9,
    title: "Ecommerce Website",
    rating: 5.0,
    image: "https://picsum.photos/seed/hotel-ecommerce/460/300",
  },
];





// ═══════════════════════════════════════════════════════
//  STEP 2 — SMALL REUSABLE COMPONENTS
// ═══════════════════════════════════════════════════════

function Header() {
  return (
    <header style={s.header}>
      <div style={s.logo}>SajhaGig</div>

      <div style={s.searchWrap}>
        <input style={s.searchInput} placeholder="Search For Freelancers Or Services" />
        <button style={s.searchBtn}>
          <img
            src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
            alt="search" width={16}
            style={{ filter: "brightness(0) invert(1)" }}
          />
        </button>
      </div>

      <nav style={s.nav}>
        <a href="#" style={s.navLink}>Find Work</a>
        <a href="#" style={s.navLink}>Browse Gigs</a>
        <a href="#" style={s.navLink}>Dashboard</a>
      </nav>

      <div style={s.headerRight}>
        <div style={s.sellerToggle}>
          <span style={s.toggleTrack}>
            <span style={s.toggleThumb} />
          </span>
          Seller
        </div>
        <img src={PROFILE_IMG} alt="User" style={s.headerAvatar} />
      </div>
    </header>
  );
}

function PageBanner() {
  return (
    <div style={s.banner}>
      <h2 style={s.bannerTitle}>Dashboard</h2>
      <p style={s.breadcrumb}>Home &rsaquo; Dashboard</p>
    </div>
  );
}

function Sidebar({ activeMain, setActiveMain }) {
  return (
    <aside style={s.sidebar}>
      {/* Profile card */}
      <div style={s.profileCard}>
        <img src={PROFILE_IMG} alt="John Smith" style={s.profileAvatar} />
        <p style={s.profileName}>John Smith</p>
        <p style={s.profileEmail}>walter@sample.com</p>
      </div>

      {/* Nav */}
      <div style={s.sideNav}>
        {SIDEBAR_LINKS.map((link, i) => (
          <button
            key={link.label}
            onClick={() => setActiveMain(i)}
            style={{ ...s.sideLink, ...(activeMain === i ? s.sideLinkActive : {}) }}
          >
            <img
              src={link.icon}
              alt={link.label}
              style={{
                ...s.sideIcon,
                filter: activeMain === i ? "brightness(0) invert(1)" : "opacity(0.5)",
              }}
            />
            <span style={{ flex: 1 }}>{link.label}</span>
            {link.label === "Projects" && (
              <span style={s.dropArrow}>▼</span>
            )}
          </button>
        ))}
      </div>
    </aside>
  );
}

// Star rating display
function Stars({ rating }) {
  const full  = Math.floor(rating);
  const empty = 5 - full;
  return (
    <span style={s.stars}>
      {"★".repeat(full)}{"☆".repeat(empty)}{" "}
      <span style={s.ratingNum}>{rating.toFixed(1)}</span>
    </span>
  );
}

// Icon button (edit / delete) shown on card hover — always visible for simplicity
function CardIconBtn({ color, icon }) {
  return (
    <div style={{ ...s.cardIconBtn, background: color }}>
      <span style={{ fontSize: 10 }}>{icon}</span>
    </div>
  );
}

// Single portfolio card
function PortfolioCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ ...s.portfolioCard, ...(hovered ? s.portfolioCardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Action icons top-right */}
      <div style={s.cardTopIcons}>
        <CardIconBtn color="#6c63ff" icon="✏" />
        <CardIconBtn color="#ff4d4f" icon="🗑" />
      </div>

      {/* Image fills the card */}
      <img src={item.image} alt={item.title} style={s.cardImage} />

      {/* Overlay at bottom */}
      <div style={s.cardOverlay}>
        <div style={s.cardBottom}>
          <div>
            <p style={s.cardTitle}>{item.title}</p>
            <Stars rating={item.rating} />
          </div>
          <div style={s.arrowBtn}>→</div>
        </div>
      </div>
    </div>
  );
}




// ═══════════════════════════════════════════════════════
//  STEP 3 — MAIN APP
// ═══════════════════════════════════════════════════════
export default function App() {
  // 3 = Portfolio (index in SIDEBAR_LINKS)
  const [activeMain, setActiveMain] = useState(3);

  return (
    <div style={s.page}>
      <Header />
      <PageBanner />

      <div style={s.contentArea}>
        <Sidebar activeMain={activeMain} setActiveMain={setActiveMain} />

        <main style={s.main}>
          {/* Section header */}
          <div style={s.sectionHeader}>
            <h3 style={s.sectionTitle}>Bookmarked Projects</h3>
            <button style={s.addPortfolioBtn}>+ Add Portfolio</button>
          </div>

          {/* 3-column grid */}
          <div style={s.grid}>
            {PORTFOLIO_ITEMS.map((item) => (
              <PortfolioCard key={item.id} item={item} />
            ))}
          </div>
        </main>
      </div>

      <Footer />
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  STEP 4 — ALL STYLES
// ═══════════════════════════════════════════════════════
const s = {
  page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: "#f1f5f9", minHeight: "100vh" },

  // ── Header ──
  header: {
    background: "#1a2b6d", color: "#fff", display: "flex",
    alignItems: "center", gap: 16, padding: "12px 28px", flexWrap: "wrap",
  },
  logo: { fontSize: 22, fontWeight: 700, fontStyle: "italic", color: "#fff", marginRight: 8 },
  searchWrap: { display: "flex", flex: 1, minWidth: 180, maxWidth: 380 },
  searchInput: {
    flex: 1, padding: "8px 12px", border: "none",
    borderRadius: "6px 0 0 6px", fontSize: 13, outline: "none",
  },
  searchBtn: {
    background: "#00bcd4", border: "none", padding: "0 14px",
    borderRadius: "0 6px 6px 0", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  nav: { display: "flex", gap: 20 },
  navLink: { color: "#c7d2fe", textDecoration: "none", fontSize: 14 },
  headerRight: { display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" },
  sellerToggle: {
    background: "#fff", color: "#1a2b6d", borderRadius: 20,
    padding: "5px 14px 5px 6px", fontSize: 13, fontWeight: 700,
    display: "flex", alignItems: "center", gap: 8,
  },
  toggleTrack: {
    width: 28, height: 16, background: "#1a2b6d", borderRadius: 10,
    display: "flex", alignItems: "center", padding: "0 3px",
  },
  toggleThumb: { width: 10, height: 10, background: "#fff", borderRadius: "50%", marginLeft: "auto" },
  headerAvatar: { width: 36, height: 36, borderRadius: "50%", objectFit: "cover", border: "2px solid #fff" },

  // ── Banner ──
  banner: {
    background: "linear-gradient(135deg, #e8ecf8 0%, #dde3f5 100%)",
    textAlign: "center", padding: "32px 0 24px", borderBottom: "1px solid #e5e7eb",
  },
  bannerTitle: { fontSize: 24, fontWeight: 700, color: "#1a2b6d", margin: 0 },
  breadcrumb: { fontSize: 13, color: "#6b7280", margin: "6px 0 0" },

  // ── Layout ──
  contentArea: {
    display: "flex", maxWidth: 1100, margin: "32px auto",
    padding: "0 20px", gap: 28,
  },

  // ── Sidebar ──
  sidebar: { width: 210, minWidth: 190, flexShrink: 0 },
  profileCard: {
    background: "#fff", borderRadius: 10, padding: "20px 16px",
    textAlign: "center", marginBottom: 12,
    boxShadow: "0 1px 4px rgba(0,0,0,.07)",
  },
  profileAvatar: {
    width: 60, height: 60, borderRadius: "50%", objectFit: "cover",
    border: "3px solid #e8ecf8", marginBottom: 8,
  },
  profileName: { fontWeight: 700, fontSize: 15, color: "#111", margin: "0 0 2px" },
  profileEmail: { fontSize: 12, color: "#6b7280", margin: 0 },

  sideNav: { background: "#fff", borderRadius: 10, boxShadow: "0 1px 4px rgba(0,0,0,.07)", overflow: "hidden" },
  sideLink: {
    display: "flex", alignItems: "center", gap: 10, width: "100%",
    background: "none", border: "none", padding: "12px 16px",
    fontSize: 14, color: "#374151", cursor: "pointer", textAlign: "left",
    borderLeft: "3px solid transparent",
  },
  sideLinkActive: { background: "#1a2b6d", color: "#fff", borderLeft: "3px solid #00bcd4", fontWeight: 600 },
  sideIcon: { width: 18, height: 18, objectFit: "contain" },
  dropArrow: { fontSize: 10, opacity: 0.6 },

  // ── Main ──
  main: { flex: 1, minWidth: 0 },
  sectionHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  sectionTitle: { fontSize: 17, fontWeight: 700, color: "#111", margin: 0 },
  addPortfolioBtn: {
    background: "#1a2b6d", color: "#fff", border: "none",
    borderRadius: 7, padding: "9px 18px", fontSize: 13,
    fontWeight: 600, cursor: "pointer",
  },

  // ── Portfolio Grid ──
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: 16,
  },

  // ── Portfolio Card ──
  portfolioCard: {
    position: "relative", borderRadius: 12, overflow: "hidden",
    boxShadow: "0 2px 8px rgba(0,0,0,.1)",
    transition: "transform 0.2s, box-shadow 0.2s",
    cursor: "pointer", height: 220,
    background: "#000",
  },
  portfolioCardHover: {
    transform: "translateY(-4px)",
    boxShadow: "0 8px 24px rgba(0,0,0,.18)",
  },
  cardImage: {
    width: "100%", height: "100%", objectFit: "cover",
    display: "block", opacity: 0.85,
  },

  // Edit / Delete icons (top right)
  cardTopIcons: {
    position: "absolute", top: 10, right: 10,
    display: "flex", gap: 6, zIndex: 2,
  },
  cardIconBtn: {
    width: 26, height: 26, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    color: "#fff", cursor: "pointer",
    boxShadow: "0 1px 4px rgba(0,0,0,.3)",
  },

  // Bottom overlay
  cardOverlay: {
    position: "absolute", bottom: 0, left: 0, right: 0,
    background: "linear-gradient(transparent, rgba(0,0,0,0.75))",
    padding: "28px 14px 12px",
  },
  cardBottom: {
    display: "flex", alignItems: "flex-end", justifyContent: "space-between",
  },
  cardTitle: { color: "#fff", fontWeight: 700, fontSize: 13, margin: "0 0 4px" },
  stars: { color: "#f59e0b", fontSize: 12 },
  ratingNum: { color: "#fff", fontSize: 11 },
  arrowBtn: {
    width: 28, height: 28, borderRadius: "50%",
    background: "rgba(255,255,255,0.2)", color: "#fff",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 14, border: "1px solid rgba(255,255,255,0.4)",
    flexShrink: 0,
  },

  // ── Footer ──
  footer: { background: "#1a2b6d", color: "#a5b4fc", padding: "48px 40px 0" },
  footerGrid: {
    display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
    gap: 32, paddingBottom: 40,
  },
  footerColTitle: { color: "#fff", fontSize: 15, fontWeight: 700, marginBottom: 14, marginTop: 0 },
  footerList: { listStyle: "none", padding: 0, margin: 0 },
  footerLink: { color: "#a5b4fc", textDecoration: "none", fontSize: 13, lineHeight: "2.2", display: "block" },
  footerDivider: { borderTop: "1px solid rgba(255,255,255,.15)" },
  footerBottom: {
    display: "flex", alignItems: "center", justifyContent: "space-between",
    flexWrap: "wrap", gap: 12, padding: "20px 0",
  },
  footerLogo: { color: "#fff", fontSize: 20, fontWeight: 700, fontStyle: "italic" },
  footerCopy: { color: "#6b7280", fontSize: 13 },
  socialRow: { display: "flex", gap: 12 },
  socialIconWrap: {
    width: 30, height: 30, borderRadius: "50%",
    border: "1px solid rgba(255,255,255,.2)", background: "rgba(255,255,255,0.08)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  socialImg: { width: 14, height: 14, objectFit: "contain", filter: "brightness(0) invert(1)" },
};
