import { useState } from "react";
import Footer from "../components/Footer";

//  STEP 1 — ALL DATA  (swap image URLs with your own!)


// Profile image
const PROFILE_IMG = "https://randomuser.me/api/portraits/men/32.jpg";

// Sidebar navigation icons (from flaticon CDN)
const SIDEBAR_LINKS = [
  { icon: "https://cdn-icons-png.flaticon.com/512/1946/1946488.png", label: "Dashboard" },
  { icon: "https://cdn-icons-png.flaticon.com/512/1161/1161388.png", label: "Projects" },
  { icon: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png", label: "Reviews" },
  { icon: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png", label: "Chat" },
  { icon: "https://cdn-icons-png.flaticon.com/512/1828/1828479.png", label: "Logout" },
];

const PROJECT_SUB_LINKS = [
  "All Projects",
  "Ongoing Projects",
  "Completed Projects",
  "Pending Projects",
  "Cancelled Projects",
  "Expired Projects",
];

// Avatar images for project cards
const AVATARS = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/46.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/22.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/men/77.jpg",
];

// Project icon images
const PROJECT_ICONS = {
  meal:   "https://cdn-icons-png.flaticon.com/512/2515/2515263.png",
  job:    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  sub:    "https://cdn-icons-png.flaticon.com/512/2991/2991108.png",
  task:   "https://cdn-icons-png.flaticon.com/512/906/906175.png",
  resume: "https://cdn-icons-png.flaticon.com/512/2920/2920072.png",
};

const PROJECTS = [
  {
    icon: PROJECT_ICONS.meal,
    name: "Meal Planner App",
    description: "Build an app that helps users manage their expenses and savings.",
    type: "Hourly", price: "$400", hiredOn: "01 Jan 2025",
    location: "UK", expiry: "4 Days Left",
    tags: ["React", "HTML5", "Sketch"],
    status: "open",
    avatars: [AVATARS[0], AVATARS[1], AVATARS[2], AVATARS[3]],
  },
  {
    icon: PROJECT_ICONS.job,
    name: "Job Application Tracker",
    description: "Helps job seekers manage applications, interviews, and follow-ups.",
    type: "Fixed", price: "$300", hiredOn: "12 Jan 2025",
    location: "UK", expiry: "2 Days Left",
    tags: ["HTML5", "Sketch"],
    status: "open",
    avatars: [AVATARS[4], AVATARS[5]],
  },
  {
    icon: PROJECT_ICONS.sub,
    name: "Subscription Manager",
    description: "An app for task management, deadlines, Pomodoro timers, and goal tracking.",
    type: "Fixed", price: "$200",
    location: "UK", expiry: "4 Days Left",
    proposals: "22 Proposal", status: "proposal",
  },
  {
    icon: PROJECT_ICONS.sub,
    name: "Subscription Manager",
    description: "Tracks active subscriptions and alerts users about payments.",
    type: "Fixed", price: "$500",
    location: "UK", expiry: "4 Days Left",
    proposals: "09 Proposal", status: "proposal",
  },
  {
    icon: PROJECT_ICONS.task,
    name: "Task & Productivity Manager",
    description: "An app for task management, deadlines, Pomodoro timers, and goal tracking.",
    type: "Hourly", price: "$400",
    location: "UK", expiry: "4 Days Left",
    rating: 5.0, status: "completed",
    avatars: [AVATARS[1]],
  },
  {
    icon: PROJECT_ICONS.resume,
    name: "AI Resume Builder",
    description: "Generates optimized resumes using AI based on user input.",
    type: "Hourly", price: "$200",
    location: "UK", expiry: "4 Days Left",
    rating: 4.0, status: "completed",
    avatars: [AVATARS[0]],
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
        <div style={s.buyerToggle}>
          <span style={s.dot} /> Buyer
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
        <div style={s.profileBanner} />
        <div style={s.profileAvatarWrap}>
          <img src={PROFILE_IMG} alt="Walter Griffin" style={s.profileAvatar} />
        </div>
        <p style={s.profileName}>Walter Griffin</p>
        <p style={s.profileEmail}>walter@sample.com</p>
      </div>

      {/* Nav links */}
      <nav>
        {SIDEBAR_LINKS.map((link, i) => (
          <div key={link.label}>
            <button
              onClick={() => setActiveMain(i)}
              style={{ ...s.sideLink, ...(activeMain === i ? s.sideLinkActive : {}) }}
            >
              <img src={link.icon} alt={link.label} style={s.sideIcon} />
              <span style={{ flex: 1 }}>{link.label}</span>
              {link.label === "Projects" && (
                <span style={s.dropArrow}>{activeMain === i ? "▲" : "▼"}</span>
              )}
            </button>

            {/* Sub-links shown only when Projects is active */}
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
      </nav>
    </aside>
  );
}

// Small skill tag
function Tag({ label }) {
  return <span style={s.tag}>{label}</span>;
}

// Overlapping avatar circles
function AvatarGroup({ avatars }) {
  if (!avatars) return null;
  return (
    <div style={s.avatarGroup}>
      {avatars.map((src, i) => (
        <img
          key={i} src={src} alt="user"
          style={{ ...s.miniAvatar, marginLeft: i === 0 ? 0 : -8 }}
        />
      ))}
    </div>
  );
}

// Star rating row
function Stars({ rating }) {
  const full  = Math.floor(rating);
  const empty = 5 - full;
  return (
    <span style={s.stars}>
      {"★".repeat(full)}{"☆".repeat(empty)} ({rating.toFixed(1)})
    </span>
  );
}

// Single project card
function ProjectCard({ project }) {
  const isCompleted = project.status === "completed";
  const isProposal  = project.status === "proposal";

  return (
    <div style={s.projectCard}>

      {/* ── Top row: icon, name, description, avatars / proposal badge ── */}
      <div style={s.pcTop}>
        <img src={project.icon} alt={project.name} style={s.pcIcon} />
        <div style={{ flex: 1 }}>
          <p style={s.pcName}>{project.name}</p>
          <p style={s.pcDesc}>{project.description}</p>
        </div>
        {project.avatars && <AvatarGroup avatars={project.avatars} />}
        {isProposal && (
          <span style={s.proposalBadge}>{project.proposals}</span>
        )}
      </div>

      {/* ── Meta row: type, price, hired on, location, expiry ── */}
      <div style={s.pcMeta}>
        <div style={s.metaCol}>
          <p style={s.metaLabel}>Project Type</p>
          <p style={s.metaValue}>{project.type}</p>
        </div>
        <div style={s.metaCol}>
          <p style={s.metaLabel}>Price</p>
          <p style={s.metaValue}>{project.price}</p>
        </div>
        {project.hiredOn && (
          <div style={s.metaCol}>
            <p style={s.metaLabel}>Hired on</p>
            <p style={s.metaValue}>{project.hiredOn}</p>
          </div>
        )}
        <div style={s.metaCol}>
          <p style={s.metaLabel}>Location</p>
          <p style={s.metaValue}>{project.location}</p>
        </div>
        <div style={s.metaCol}>
          <p style={s.metaLabel}>Expiry</p>
          <p style={s.metaValue}>{project.expiry}</p>
        </div>

        {/* Skill tags for open projects */}
        {project.tags && (
          <div style={s.tagGroup}>
            {project.tags.map((t) => <Tag key={t} label={t} />)}
            <span style={s.moreTag}>+</span>
          </div>
        )}

        {/* Buttons for proposal projects */}
        {isProposal && (
          <div style={s.actionBtns}>
            <button style={s.viewProposalBtn}>View Proposal</button>
            <button style={s.editProfileBtn}>Edit Profile</button>
          </div>
        )}

        {/* Completed badge + stars */}
        {isCompleted && (
          <div style={s.completedGroup}>
            <span style={s.completedBadge}>✓ Completed</span>
            <Stars rating={project.rating} />
          </div>
        )}
      </div>
    </div>
  );
}

// Page number buttons
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
  const [activeMain,  setActiveMain]  = useState(1); // Projects open by default
  const [activeSub,   setActiveSub]   = useState(0); // All Projects selected
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
          <h3 style={s.allProjectsTitle}>All Projects</h3>
          {PROJECTS.map((project, i) => (
            <ProjectCard key={i} project={project} />
          ))}
          <Pagination current={currentPage} setCurrent={setCurrentPage} />
        </main>
      </div>

      <Footer />
    </div>
  );
}


//  STEP 4 — ALL STYLES

const s = {
  page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: "#f1f5f9", minHeight: "100vh" },

  // ── Header ──
  header: {
    background: "#1a2b6d", color: "#fff", display: "flex",
    alignItems: "center", gap: 12, padding: "12px 28px", flexWrap: "wrap",
  },
  logo: { fontSize: 22, fontWeight: 700, fontStyle: "italic", color: "#fff", marginRight: 8 },
  searchWrap: { display: "flex", flex: 1, minWidth: 180, maxWidth: 380 },
  searchInput: {
    flex: 1, padding: "8px 12px", border: "none",
    borderRadius: "6px 0 0 6px", fontSize: 13, outline: "none",
  },
  searchBtn: {
    background: "#3b5bdb", border: "none", padding: "0 12px",
    borderRadius: "0 6px 6px 0", cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  nav: { display: "flex", gap: 18 },
  navLink: { color: "#c7d2fe", textDecoration: "none", fontSize: 14 },
  headerRight: { display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" },
  buyerToggle: {
    background: "#2563eb", color: "#fff", borderRadius: 20,
    padding: "4px 14px", fontSize: 13, fontWeight: 600,
    display: "flex", alignItems: "center", gap: 6,
  },
  dot: { width: 10, height: 10, background: "#fff", borderRadius: "50%", display: "inline-block" },
  headerAvatar: {
    width: 36, height: 36, borderRadius: "50%",
    objectFit: "cover", border: "2px solid #fff",
  },

  // ── Banner ──
  banner: {
    background: "linear-gradient(135deg,#e8ecf8,#f1f5f9)",
    textAlign: "center", padding: "28px 0", borderBottom: "1px solid #e5e7eb",
  },
  bannerTitle: { fontSize: 22, fontWeight: 700, color: "#1a2b6d", margin: 0 },
  breadcrumb: { fontSize: 13, color: "#6b7280", margin: "6px 0 0" },

  // ── Layout ──
  contentArea: { display: "flex", maxWidth: 1200, margin: "0 auto", padding: "28px 20px" },

  // ── Sidebar ──
  sidebar: { width: 210, minWidth: 190, marginRight: 24 },
  profileCard: {
    background: "#fff", borderRadius: 10, marginBottom: 16,
    boxShadow: "0 1px 4px rgba(0,0,0,.07)", overflow: "hidden",
  },
  profileBanner: { background: "linear-gradient(135deg,#c7d2fe,#e8ecf8)", height: 60 },
  profileAvatarWrap: { display: "flex", justifyContent: "center", marginTop: -28 },
  profileAvatar: {
    width: 56, height: 56, borderRadius: "50%", objectFit: "cover",
    border: "3px solid #fff", boxShadow: "0 2px 8px rgba(0,0,0,.15)",
  },
  profileName: { fontWeight: 700, fontSize: 15, color: "#111", margin: "8px 0 0", textAlign: "center" },
  profileEmail: { fontSize: 12, color: "#6b7280", margin: "4px 0 14px", textAlign: "center" },

  sideLink: {
    display: "flex", alignItems: "center", gap: 10, width: "100%",
    background: "none", border: "none", padding: "10px 14px", borderRadius: 8,
    fontSize: 14, color: "#374151", cursor: "pointer", textAlign: "left", marginBottom: 2,
  },
  sideLinkActive: { background: "#eef2ff", color: "#1d4ed8", fontWeight: 600 },
  sideIcon: { width: 18, height: 18, objectFit: "contain", opacity: 0.65 },
  dropArrow: { fontSize: 10, color: "#9ca3af" },

  subLinks: { paddingLeft: 20, paddingBottom: 4 },
  subLink: {
    display: "block", width: "100%", background: "none", border: "none",
    padding: "7px 14px", fontSize: 13, color: "#6b7280",
    cursor: "pointer", textAlign: "left", borderRadius: 6,
  },
  subLinkActive: { color: "#1d4ed8", fontWeight: 600, background: "#f0f4ff" },

  // ── Main ──
  main: { flex: 1, minWidth: 0 },
  allProjectsTitle: { fontSize: 17, fontWeight: 700, color: "#111", marginBottom: 16, marginTop: 0 },

  // ── Project card ──
  projectCard: {
    background: "#fff", borderRadius: 10, padding: "16px 18px",
    marginBottom: 14, boxShadow: "0 1px 3px rgba(0,0,0,.07)",
  },
  pcTop: { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 },
  pcIcon: {
    width: 44, height: 44, borderRadius: 10, objectFit: "contain",
    background: "#f1f5f9", padding: 6, flexShrink: 0,
  },
  pcName: { fontSize: 14, fontWeight: 700, color: "#111", margin: 0 },
  pcDesc: { fontSize: 12, color: "#6b7280", margin: "3px 0 0" },

  avatarGroup: { display: "flex", alignItems: "center" },
  miniAvatar: {
    width: 28, height: 28, borderRadius: "50%", objectFit: "cover",
    border: "2px solid #fff", boxShadow: "0 1px 3px rgba(0,0,0,.1)",
  },

  proposalBadge: {
    background: "#f97316", color: "#fff", fontSize: 11, fontWeight: 600,
    padding: "3px 10px", borderRadius: 5, whiteSpace: "nowrap", alignSelf: "flex-start",
  },

  pcMeta: {
    display: "flex", alignItems: "center", flexWrap: "wrap",
    gap: 20, paddingTop: 10, borderTop: "1px solid #f3f4f6",
  },
  metaCol: { minWidth: 70 },
  metaLabel: { fontSize: 11, color: "#9ca3af", margin: 0, fontWeight: 500 },
  metaValue: { fontSize: 13, fontWeight: 600, color: "#111", margin: "2px 0 0" },

  tagGroup: { display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap" },
  tag: {
    background: "#f1f5f9", color: "#374151", fontSize: 11,
    padding: "3px 10px", borderRadius: 5, border: "1px solid #e5e7eb",
  },
  moreTag: {
    width: 22, height: 22, background: "#1a2b6d", color: "#fff", borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 700, cursor: "pointer",
  },

  actionBtns: { display: "flex", gap: 8, marginLeft: "auto" },
  viewProposalBtn: {
    background: "#1a2b6d", color: "#fff", border: "none",
    borderRadius: 7, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
  },
  editProfileBtn: {
    background: "#fff", color: "#1a2b6d", border: "1px solid #1a2b6d",
    borderRadius: 7, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer",
  },

  completedGroup: { display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" },
  completedBadge: {
    background: "#22c55e", color: "#fff", fontSize: 11, fontWeight: 600,
    padding: "3px 10px", borderRadius: 5,
  },
  stars: { fontSize: 12, color: "#f59e0b" },

  // ── Pagination ──
  pagination: { display: "flex", gap: 6, justifyContent: "center", marginTop: 24 },
  pageBtn: {
    width: 32, height: 32, border: "1px solid #e5e7eb", background: "#fff",
    borderRadius: 6, cursor: "pointer", fontSize: 13, color: "#374151",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  pageBtnActive: { background: "#1a2b6d", color: "#fff", border: "1px solid #1a2b6d", fontWeight: 700 },
  pageDots: { display: "flex", alignItems: "center", fontSize: 16, color: "#9ca3af" },

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
    border: "1px solid rgba(255,255,255,.2)",
    background: "rgba(255,255,255,0.08)",
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  socialImg: {
    width: 14, height: 14, objectFit: "contain",
    filter: "brightness(0) invert(1)",
  },
};
