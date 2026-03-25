import { useState } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import Header from "../components/Header";
// ─────────────────────────────────────────────
//  SAMPLE DATA  (easy to edit!)
// ─────────────────────────────────────────────
const CATEGORIES = [
  "Graphics & Design",
  "Digital Marketing",
  "Writing & Translation",
  "Video & Animation",
  "Music & Audio",
  "Programming & Tech",
  "Photography",
  "Business",
];

const PROJECT_CARD = {
  badge: "Web Dev",
  status: "Open",
  title: "Build a Restaurant Website for Thamel",
  description:
    "Need a responsive site with menu, booking and contact form for a busy restaurant in...",
  weeks: 3,
  proposals: 5,
  tags: ["React", "CSS", "Node.js"],
  price: "₹8,674",
};

// Create an array of 5 identical cards (easy to replace with real data later)
const CARDS = Array(5).fill(PROJECT_CARD);



// ─────────────────────────────────────────────
//  SMALL REUSABLE COMPONENTS
// ─────────────────────────────────────────────

// Single project card
function ProjectCard({ card }) {
  return (
    <div style={styles.card}>
      {/* Top badges */}
      <div style={styles.cardBadgeRow}>
        <span style={styles.badgeBlue}>{card.badge}</span>
        <span style={styles.badgeGreen}>{card.status}</span>
      </div>

      {/* Title */}
      <h4 style={styles.cardTitle}>{card.title}</h4>

      {/* Description */}
      <p style={styles.cardDesc}>{card.description}</p>

      {/* Stats row */}
      <div style={styles.statsRow}>
        <span style={styles.stat}>⏱ {card.weeks} weeks</span>
        <span style={styles.stat}>📄 {card.proposals} proposals</span>
        <span style={styles.stat}>📅 Posted today</span>
      </div>

      {/* Skill tags */}
      <div style={styles.tagRow}>
        {card.tags.map((tag) => (
          <span key={tag} style={styles.tag}>{tag}</span>
        ))}
      </div>

      {/* Price */}
      <div style={styles.priceRow}>
        <span style={styles.priceLabel}>STARTING AT</span>
        <span style={styles.price}>{card.price}</span>
      </div>
    </div>
  );
}

// Row of 5 project cards with a section title
function CardSection({ title, highlight, bordered }) {
  return (
    <section style={{ ...styles.section, ...(bordered ? styles.borderedSection : {}) }}>
      <h2 style={styles.sectionTitle}>
        {title}{" "}
        <span style={styles.sectionHighlight}>{highlight}</span>
      </h2>
      <div style={styles.cardGrid}>
        {CARDS.map((card, i) => (
          <ProjectCard key={i} card={card} />
        ))}
      </div>
    </section>
   
  );
}

// ─────────────────────────────────────────────
//  HEADER
// ─────────────────────────────────────────────
// function Header() {
//   return (
//     <header style={styles.header}>
//       {/* Logo */}
//       <div style={styles.logo}>SajhaGig</div>

//       {/* Search bar */}
//       <div style={styles.searchWrap}>
//         <input
//           style={styles.searchInput}
//           placeholder="Search For Freelancers Or Services"
//         />
//         <button style={styles.searchBtn}>🔍</button>
//       </div>

//       {/* Nav links */}
//       <nav style={styles.nav}>
//   <Link to="/findwork" style={styles.navLink}>Find Work</Link>
//   <Link to="/browsegigs" style={styles.navLink}>Browse Gigs</Link>
//   <Link to="/dashboard" style={styles.navLink}>Dashboard</Link>
// </nav>

      // {/* Buyer toggle + avatar */}
      // <div style={styles.navRight}>
      //   <div style={styles.buyerToggle}>
      //     <span style={styles.toggleDot}></span>
      //     BUYER
      //   </div>
      //   <div style={styles.avatar}>👤</div>
      // </div>
    
  

// ─────────────────────────────────────────────
//  CATEGORY NAV BAR
// ─────────────────────────────────────────────
function CategoryBar() {
  const [active, setActive] = useState(0);
  return (
    <div style={styles.categoryBar}>
      {CATEGORIES.map((cat, i) => (
        <button
          key={cat}
          onClick={() => setActive(i)}
          style={{
            ...styles.catBtn,
            ...(active === i ? styles.catBtnActive : {}),
          }}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────
//  HERO / GREETING SECTION
// ─────────────────────────────────────────────
function HeroSection() {
  return (
    <div style={styles.hero}>
      <h1 style={styles.heroGreeting}>Hey Ekta ,</h1>
      <div style={styles.ctaRow}>
        <div style={styles.ctaBanner}>
          <div>
            <p style={styles.ctaTitle}>Get a perfect gig Suggestion for a Service you need</p>
            <p style={styles.ctaSub}>Tell us what Service you need</p>
          </div>
          <span style={styles.ctaArrow}>›</span>
        </div>
        <div style={styles.ctaBanner}>
          <div>
            <p style={styles.ctaTitle}>Get a perfect gig Suggestion for a Service you need</p>
            <p style={styles.ctaSub}>Tell us what Service you need</p>
          </div>
          <span style={styles.ctaArrow}>›</span>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
//  CONTINUE BROWSING CAROUSEL (simplified)
// ─────────────────────────────────────────────
function ContinueBrowsing() {
  return (
    <div style={styles.carouselWrap}>
      <div style={styles.carouselHeader}>
        <h3 style={styles.carouselTitle}>Continue browsing →</h3>
        <div>
          <button style={styles.arrowBtn}>‹</button>
          <button style={styles.arrowBtn}>›</button>
        </div>
      </div>
      <div style={styles.cardGrid}>
        {CARDS.map((card, i) => (
          <ProjectCard key={i} card={card} />
        ))}
      </div>
      {/* Dot indicators */}
      <div style={styles.dots}>
        <span style={{ ...styles.dot, background: "#1d4ed8" }}></span>
        <span style={styles.dot}></span>
        <span style={styles.dot}></span>
      </div>
    </div>
  );
}




//  MAIN APP  

export default function FindWork() {
  return (
    
    <div style={styles.page}>
      <Header />
      <CategoryBar />

      <main style={styles.main}>
        <HeroSection />
        <ContinueBrowsing />

        {/* Most popular Projects */}
        <CardSection
          title="Most popular Projects in"
          highlight="App Design"
          bordered={true}
        />

        {/* Projects you may like */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Projects you may like</h2>
          {/* Two rows of cards */}
          <div style={styles.cardGrid}>
            {CARDS.map((c, i) => <ProjectCard key={i} card={c} />)}
          </div>
          <div style={{ ...styles.cardGrid, marginTop: 16 }}>
            {CARDS.map((c, i) => <ProjectCard key={i} card={c} />)}
          </div>
        </section>

        {/* Verified Pro Services */}
        <section style={styles.section}>
          <div style={styles.proHeader}>
            <div>
              <h2 style={styles.sectionTitle}>
                Verified Pro services in{" "}
                <span style={styles.sectionHighlight}>App Design</span>
              </h2>
              <p style={styles.proSub}>Hand-vetted talent for all your professional needs.</p>
            </div>
            <a href="#" style={styles.seeAll}>See All ›</a>
          </div>
          <div style={styles.cardGrid}>
            {CARDS.map((c, i) => <ProjectCard key={i} card={c} />)}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// ─────────────────────────────────────────────
//  ALL STYLES  (plain JS objects — no CSS file needed)
// ─────────────────────────────────────────────
const styles = {
  // Page wrapper
  page: { fontFamily: "'Segoe UI', sans-serif", background: "#f5f6fa", minHeight: "100vh" },

  // ── Header ──
  header: {
    background: "#1a2b6d",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: 16,
    padding: "12px 32px",
    flexWrap: "wrap",
  },
  logo: { fontSize: 22, fontWeight: 700, color: "#fff", marginRight: 8 },
  searchWrap: { display: "flex", flex: 1, minWidth: 200, maxWidth: 400 },
  searchInput: {
    flex: 1,
    padding: "8px 12px",
    border: "none",
    borderRadius: "6px 0 0 6px",
    fontSize: 14,
    outline: "none",
  },
  searchBtn: {
    background: "#3b5bdb",
    border: "none",
    color: "#fff",
    padding: "8px 14px",
    borderRadius: "0 6px 6px 0",
    cursor: "pointer",
    fontSize: 16,
  },
  nav: { display: "flex", gap: 20 },
  navLink: { color: "#d0d8ff", textDecoration: "none", fontSize: 14 },
  navRight: { display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" },
  buyerToggle: {
    background: "#2563eb",
    color: "#fff",
    borderRadius: 20,
    padding: "4px 14px",
    fontSize: 13,
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    gap: 6,
  },
  toggleDot: {
    width: 10,
    height: 10,
    background: "#fff",
    borderRadius: "50%",
    display: "inline-block",
  },
  avatar: {
    width: 36,
    height: 36,
    background: "#374151",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 20,
  },

  // ── Category bar ──
  categoryBar: {
    background: "#fff",
    display: "flex",
    gap: 4,
    padding: "0 24px",
    borderBottom: "1px solid #e5e7eb",
    overflowX: "auto",
  },
  catBtn: {
    background: "none",
    border: "none",
    padding: "12px 14px",
    fontSize: 13,
    cursor: "pointer",
    color: "#374151",
    whiteSpace: "nowrap",
    borderBottom: "2px solid transparent",
  },
  catBtnActive: { color: "#1a2b6d", borderBottom: "2px solid #1a2b6d", fontWeight: 600 },

  // ── Main content ──
  main: { maxWidth: 1200, margin: "0 auto", padding: "0 24px 40px" },

  // ── Hero ──
  hero: { padding: "28px 0 16px" },
  heroGreeting: { fontSize: 26, fontWeight: 700, color: "#111827", marginBottom: 16 },
  ctaRow: { display: "flex", gap: 16, flexWrap: "wrap" },
  ctaBanner: {
    flex: 1,
    minWidth: 260,
    background: "linear-gradient(135deg, #22c55e, #16a34a)",
    color: "#fff",
    borderRadius: 10,
    padding: "18px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    cursor: "pointer",
  },
  ctaTitle: { fontSize: 15, fontWeight: 600, margin: 0 },
  ctaSub: { fontSize: 12, opacity: 0.85, margin: "4px 0 0" },
  ctaArrow: { fontSize: 28, fontWeight: 300 },

  // ── Carousel / Continue browsing ──
  carouselWrap: {
    background: "#fff",
    borderRadius: 12,
    padding: 20,
    margin: "24px 0",
    boxShadow: "0 1px 4px rgba(0,0,0,.08)",
  },
  carouselHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  carouselTitle: { fontSize: 16, fontWeight: 600, color: "#111" },
  arrowBtn: {
    background: "#f3f4f6",
    border: "1px solid #e5e7eb",
    borderRadius: 6,
    padding: "4px 10px",
    cursor: "pointer",
    fontSize: 18,
    marginLeft: 6,
  },
  dots: { display: "flex", justifyContent: "center", gap: 6, marginTop: 14 },
  dot: { width: 10, height: 10, borderRadius: "50%", background: "#d1d5db", display: "inline-block" },

  // ── Section wrapper ──
  section: { margin: "28px 0" },
  borderedSection: {
    border: "2px solid #3b5bdb",
    borderRadius: 12,
    padding: 20,
    background: "#fff",
  },
  sectionTitle: { fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 16 },
  sectionHighlight: { color: "#3b5bdb" },

  // ── Card grid ──
  cardGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: 16,
  },

  // ── Individual card ──
  card: {
    background: "#fff",
    border: "1px solid #e5e7eb",
    borderRadius: 10,
    padding: 14,
    boxShadow: "0 1px 3px rgba(0,0,0,.06)",
  },
  cardBadgeRow: { display: "flex", gap: 6, marginBottom: 8 },
  badgeBlue: {
    background: "#dbeafe",
    color: "#1d4ed8",
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 7px",
    borderRadius: 4,
  },
  badgeGreen: {
    background: "#dcfce7",
    color: "#15803d",
    fontSize: 10,
    fontWeight: 600,
    padding: "2px 7px",
    borderRadius: 4,
  },
  cardTitle: { fontSize: 13, fontWeight: 700, color: "#111", margin: "0 0 6px", lineHeight: 1.4 },
  cardDesc: { fontSize: 12, color: "#6b7280", margin: "0 0 10px", lineHeight: 1.5 },
  statsRow: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 },
  stat: { fontSize: 11, color: "#6b7280" },
  tagRow: { display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 },
  tag: {
    background: "#1e293b",
    color: "#fff",
    fontSize: 10,
    padding: "2px 8px",
    borderRadius: 4,
  },
  priceRow: { display: "flex", alignItems: "center", gap: 6, marginTop: 6 },
  priceLabel: { fontSize: 9, color: "#9ca3af", textTransform: "uppercase", letterSpacing: 0.5 },
  price: { fontSize: 13, fontWeight: 700, color: "#111" },

  // ── Verified Pro header row ──
  proHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 },
  proSub: { fontSize: 13, color: "#6b7280", margin: "4px 0 0" },
  seeAll: { color: "#3b5bdb", fontSize: 13, textDecoration: "none", fontWeight: 600 },

 
};
<Footer />