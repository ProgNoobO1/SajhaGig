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

const PROJECT_SUB_LINKS = [
  "My Proposal",
  "Ongoing Projects",
  "Completed Projects",
  "Cancelled Projects",
];

const PROJECT_ICONS = {
  render:    "https://cdn-icons-png.flaticon.com/512/2721/2721620.png",
  landing:   "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  woo:       "https://cdn-icons-png.flaticon.com/512/2991/2991108.png",
  fullstack: "https://cdn-icons-png.flaticon.com/512/906/906175.png",
  video:     "https://cdn-icons-png.flaticon.com/512/2920/2920072.png",
};

const CLIENT_AVATARS = {
  hayley: "https://randomuser.me/api/portraits/women/44.jpg",
  hayden: "https://randomuser.me/api/portraits/men/46.jpg",
  lily:   "https://randomuser.me/api/portraits/women/65.jpg",
  emma:   "https://randomuser.me/api/portraits/women/12.jpg",
  cody:   "https://randomuser.me/api/portraits/men/77.jpg",
};

const PROPOSALS = [
  {
    id: 1,
    icon: PROJECT_ICONS.render,
    title: "3D Renders and Amazon Product Store Images/Video",
    description: "Build an app that helps users manage their expenses and savings.",
    clientPrice: "$599.00 (Fixed)",
    jobType: "Hourly",
    price: "$500.00",
    clientName: "Hayley Melba",
    clientAvatar: CLIENT_AVATARS.hayley,
  },
  {
    id: 2,
    icon: PROJECT_ICONS.landing,
    title: "Landing Page Redesign / Sales Page Redesign (Not Entire Web)",
    description: "Build an app that helps users manage their expenses and savings.",
    clientPrice: "$460.00 (Fixed)",
    jobType: "Hourly",
    price: "$450.00",
    clientName: "Hayden Partridge",
    clientAvatar: CLIENT_AVATARS.hayden,
  },
  {
    id: 3,
    icon: PROJECT_ICONS.woo,
    title: "WooCommerce Product Page Back Up Restoration",
    description: "Build an app that helps users manage their expenses and savings.",
    clientPrice: "$550.00 (Fixed)",
    jobType: "Hourly",
    price: "$550.00",
    clientName: "Lily Lipscombe",
    clientAvatar: CLIENT_AVATARS.lily,
  },
  {
    id: 4,
    icon: PROJECT_ICONS.fullstack,
    title: "Full-stack Developer to help us to build our",
    description: "Build an app that helps users manage their expenses and savings.",
    clientPrice: "$400.00 (Fixed)",
    jobType: "Hourly",
    price: "$400.00",
    clientName: "Emma Isaly",
    clientAvatar: CLIENT_AVATARS.emma,
  },
  {
    id: 5,
    icon: PROJECT_ICONS.landing,
    title: "Landing Page Redesign / Sales Page Redesign (Not Entire Web)",
    description: "Build an app that helps users manage their expenses and savings.",
    clientPrice: "$430.00 (Fixed)",
    jobType: "Hourly",
    price: "$450.00",
    clientName: "Cody Cornish",
    clientAvatar: CLIENT_AVATARS.cody,
  },
  {
    id: 6,
    icon: PROJECT_ICONS.video,
    title: "Video animator to bring some illustrations to life",
    description: "Build an app that helps users manage their expenses and savings.",
    clientPrice: "$430.00 (Fixed)",
    jobType: "Hourly",
    price: "$450.00",
    clientName: "Cody Cornish",
    clientAvatar: CLIENT_AVATARS.cody,
  },
];



// ═══════════════════════════════════════════════════════
//  STEP 2 — REUSABLE COMPONENTS
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
        {/* Seller toggle pill */}
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

function Sidebar({ activeMain, setActiveMain, activeSub, setActiveSub }) {
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
          <div key={link.label}>
            <button
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
                <span style={s.dropArrow}>{activeMain === i ? "▲" : "▼"}</span>
              )}
            </button>

            {link.label === "Projects" && activeMain === i && (
              <div style={s.subLinks}>
                {PROJECT_SUB_LINKS.map((sub, j) => (
                  <button
                    key={sub}
                    onClick={() => setActiveSub(j)}
                    style={{ ...s.subLink, ...(activeSub === j ? s.subLinkActive : {}) }}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </aside>
  );
}

function ProposalCard({ proposal }) {
  return (
    <div style={s.card}>
      {/* Top: icon + title + desc + View Project button */}
      <div style={s.cardTop}>
        <img src={proposal.icon} alt={proposal.title} style={s.cardIcon} />
        <div style={{ flex: 1 }}>
          <p style={s.cardTitle}>{proposal.title}</p>
          <p style={s.cardDesc}>{proposal.description}</p>
        </div>
        <button style={s.viewBtn}>✦ View Project</button>
      </div>

      {/* Divider */}
      <div style={s.divider} />

      {/* Meta: Client Price | Job Type | Price | Client | Edit | Delete */}
      <div style={s.cardMeta}>
        <div style={s.metaCol}>
          <p style={s.metaLabel}>Client Price</p>
          <p style={s.metaValue}>{proposal.clientPrice}</p>
        </div>
        <div style={s.metaCol}>
          <p style={s.metaLabel}>Job Type</p>
          <p style={s.metaValue}>{proposal.jobType}</p>
        </div>
        <div style={s.metaCol}>
          <p style={s.metaLabel}>Price</p>
          <p style={s.metaValue}>{proposal.price}</p>
        </div>
        <div style={s.metaCol}>
          <p style={s.metaLabel}>Client</p>
          <div style={s.clientRow}>
            <img src={proposal.clientAvatar} alt={proposal.clientName} style={s.clientAvatar} />
            <p style={{ ...s.metaValue, margin: 0 }}>{proposal.clientName}</p>
          </div>
        </div>
        <div style={s.cardActions}>
          <button style={s.editBtn}>✏ Edit Proposal</button>
          <button style={s.deleteBtn}>🗑 Delete Proposal</button>
        </div>
      </div>
    </div>
  );
}

function Pagination({ current, setCurrent }) {
  return (
    <div style={s.pagination}>
      <button style={s.pageBtn} onClick={() => setCurrent(Math.max(1, current - 1))}>‹</button>
      {[1, 2, 3].map((n) => (
        <button
          key={n}
          style={{ ...s.pageBtn, ...(current === n ? s.pageBtnActive : {}) }}
          onClick={() => setCurrent(n)}
        >
          {n}
        </button>
      ))}
      <span style={s.pageDots}>…</span>
      <button style={s.pageBtn} onClick={() => setCurrent(10)}>10</button>
      <button style={s.pageBtn} onClick={() => setCurrent(Math.min(10, current + 1))}>›</button>
    </div>
  );
}



// ═══════════════════════════════════════════════════════
//  STEP 3 — MAIN APP
// ═══════════════════════════════════════════════════════
export default function App() {
  const [activeMain,  setActiveMain]  = useState(1);
  const [activeSub,   setActiveSub]   = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div style={s.page}>
      <Header />
      <PageBanner />

      <div style={s.contentArea}>
        <Sidebar
          activeMain={activeMain} setActiveMain={setActiveMain}
          activeSub={activeSub}   setActiveSub={setActiveSub}
        />
        <main style={s.main}>
          <h3 style={s.sectionTitle}>My Proposals</h3>
          {PROPOSALS.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} />
          ))}
          <Pagination current={currentPage} setCurrent={setCurrentPage} />
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
  dropArrow: { fontSize: 10, opacity: 0.7 },

  subLinks: { background: "#f8faff", paddingBottom: 4 },
  subLink: {
    display: "block", width: "100%", background: "none", border: "none",
    padding: "8px 16px 8px 44px", fontSize: 13, color: "#6b7280",
    cursor: "pointer", textAlign: "left",
  },
  subLinkActive: { color: "#1a2b6d", fontWeight: 700 },

  // ── Main ──
  main: { flex: 1, minWidth: 0 },
  sectionTitle: { fontSize: 17, fontWeight: 700, color: "#111", marginBottom: 16, marginTop: 0 },

  // ── Proposal Card ──
  card: {
    background: "#fff", borderRadius: 10, padding: "16px 20px",
    marginBottom: 14, boxShadow: "0 1px 3px rgba(0,0,0,.07)",
  },
  cardTop: { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 },
  cardIcon: {
    width: 44, height: 44, borderRadius: 8, objectFit: "contain",
    background: "#f1f5f9", padding: 6, flexShrink: 0,
  },
  cardTitle: { fontSize: 14, fontWeight: 700, color: "#1a2b6d", margin: "0 0 3px" },
  cardDesc: { fontSize: 12, color: "#6b7280", margin: 0 },
  viewBtn: {
    background: "#1a2b6d", color: "#fff", border: "none",
    borderRadius: 7, padding: "8px 16px", fontSize: 12,
    fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0,
  },
  divider: { borderTop: "1px solid #f3f4f6", marginBottom: 12 },

  cardMeta: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: 24 },
  metaCol: { minWidth: 80 },
  metaLabel: { fontSize: 11, color: "#9ca3af", margin: "0 0 2px", fontWeight: 500 },
  metaValue: { fontSize: 13, fontWeight: 600, color: "#111", margin: 0 },

  clientRow: { display: "flex", alignItems: "center", gap: 6, marginTop: 2 },
  clientAvatar: { width: 24, height: 24, borderRadius: "50%", objectFit: "cover", border: "1px solid #e5e7eb" },

  cardActions: { display: "flex", gap: 14, marginLeft: "auto", alignItems: "center" },
  editBtn: { background: "none", border: "none", fontSize: 12, color: "#6b7280", cursor: "pointer" },
  deleteBtn: { background: "none", border: "none", fontSize: 12, color: "#ef4444", cursor: "pointer" },

  // ── Pagination ──
  pagination: { display: "flex", gap: 6, justifyContent: "center", marginTop: 24 },
  pageBtn: {
    width: 32, height: 32, border: "1px solid #e5e7eb", background: "#fff",
    borderRadius: 6, cursor: "pointer", fontSize: 13, color: "#374151",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  pageBtnActive: { background: "#1a2b6d", color: "#fff", border: "1px solid #1a2b6d", fontWeight: 700 },
  pageDots: { display: "flex", alignItems: "center", fontSize: 16, color: "#9ca3af" },

 
};
