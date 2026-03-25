import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Link } from "react-router-dom";



const STATS = [
  { icon: "📋", label: "Projects Posted", value: 75,  color: "#3b82f6" },
  { icon: "🔄", label: "Ongoing Projects", value: 10, color: "#22c55e" },
  { icon: "✅", label: "Completed Projects",value: 65, color: "#f97316" },
  { icon: "⭐", label: "Reviews",           value: 25, color: "#eab308" },
];

const SIDEBAR_LINKS = [
  { icon: "🏠", label: "Dashboard",  active: true  },
  { icon: "📁", label: "Projects",   active: false },
  { icon: "⭐", label: "Reviews",    active: false },
  { icon: "💬", label: "Chat",       active: false },
  { icon: "🚪", label: "Logout",     active: false },
];

// Simple sparkline data (0-4k range)
const CHART_POINTS = [
  { day: "Sun", val: 1000 },
  { day: "Mon", val: 1800 },
  { day: "Tue", val: 800  },
  { day: "Wed", val: 2500 },
  { day: "Thu", val: 3200 },
  { day: "Fri", val: 2100 },
  { day: "Sat", val: 3800 },
];

const ONGOING_PROJECTS = [
  {
    company: "Dreamguystech",
    title: "Website Designer Required For Directory Theme",
    budget: "$120",
    type: "Hourly",
    location: "UK",
    expiry: "6 Days Left",
  },
  {
    company: "Dreamguystech",
    title: "Landing Page Redesign / Sales Page Redesign",
    budget: "$120",
    type: "Hourly",
    location: "UK",
    expiry: "6 Days Left",
  },
];

const TRANSACTIONS = [
  { icon: "💳", name: "Wallet Top-up", date: "25 Apr 2025", amount: "+$20.50", positive: true  },
  { icon: "🛒", name: "Purchase",      date: "25 Apr 2025", amount: "-$62.80", positive: false },
  { icon: "📁", name: "Project",       date: "10 May 2025", amount: "-$20.50", positive: false },
  { icon: "💰", name: "Income",        date: "18 Jun 2025", amount: "+$72.80", positive: true  },
  { icon: "💳", name: "Wallet Top-up", date: "25 Apr 2025", amount: "+$62.80", positive: true  },
];

const JOBS = [
  { title: "Website Designer Required", type: "Hourly",    budget: "$2222", created: "29 Sep 2023", expiring: "10 Oct 2023", proposals: 47, color: "#ef4444" },
  { title: "Create desktop applications",type: "Full Time", budget: "$5782", created: "21 Sep 2023", expiring: "05 Oct 2023", proposals: 35, color: "#f97316" },
  { title: "PHP Javascript Projects",    type: "Part time", budget: "$4879", created: "17 Sep 2023", expiring: "29 Sep 2023", proposals: 28, color: "#f97316" },
  { title: "Website Designer Required", type: "Hourly",    budget: "$3651", created: "11 Sep 2023", expiring: "24 Sep 2023", proposals: 52, color: "#3b82f6" },
  { title: "Swift / SwiftUI Developer", type: "Hourly",    budget: "$2789", created: "05 Sep 2023", expiring: "17 Sep 2023", proposals: 38, color: "#ef4444" },
  { title: "Full-stack Developer",       type: "Part time", budget: "$7653", created: "01 Sep 2023", expiring: "13 Sep 2023", proposals: 48, color: "#3b82f6" },
];



// ── Page title banner ───────────────────────────────────
function PageBanner() {
  return (
    <div style={s.banner}>
      <h2 style={s.bannerTitle}>Dashboard</h2>
      <p style={s.breadcrumb}>Home &rsaquo; Dashboard</p>
    </div>
  );
}

// ── Left sidebar with profile + links ──────────────────
function Sidebar({ active, setActive }) {
  return (
    <aside style={s.sidebar}>
      {/* Profile card */}
      <div style={s.profileCard}>
        <div style={s.profileAvatar}>👤</div>
        <p style={s.profileName}>Walter Griffin</p>
        <p style={s.profileEmail}>walter@sample.com</p>
      </div>

      {/* Navigation links */}
      <nav>
        {SIDEBAR_LINKS.map((link, i) => (
          <button
            key={link.label}
            onClick={() => setActive(i)}
            style={{
              ...s.sideLink,
              ...(active === i ? s.sideLinkActive : {}),
            }}
          >
            <span>{link.icon}</span>
            <span>{link.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

// ── One stat card (Projects Posted, etc.) ──────────────
function StatCard({ stat }) {
  return (
    <div style={s.statCard}>
      <div style={{ ...s.statIcon, background: stat.color + "22", color: stat.color }}>
        {stat.icon}
      </div>
      <div>
        <p style={s.statLabel}>{stat.label}</p>
        <p style={s.statValue}>{stat.value}</p>
      </div>
    </div>
  );
}

// ── Simple SVG line chart ───────────────────────────────
function LineChart() {
  const W = 420, H = 160, PAD = 20;
  const maxVal = 4000;
  // Convert data points to SVG coordinates
  const pts = CHART_POINTS.map((p, i) => {
    const x = PAD + (i / (CHART_POINTS.length - 1)) * (W - PAD * 2);
    const y = H - PAD - (p.val / maxVal) * (H - PAD * 2);
    return { x, y, ...p };
  });
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.x},${p.y}`).join(" ");
  const areaPath = linePath + ` L${pts[pts.length-1].x},${H} L${pts[0].x},${H} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height: "auto" }}>
      {/* Area fill */}
      <path d={areaPath} fill="rgba(239,68,68,0.1)" />
      {/* Line */}
      <path d={linePath} fill="none" stroke="#ef4444" strokeWidth="2" />
      {/* Dots */}
      {pts.map((p) => (
        <circle key={p.day} cx={p.x} cy={p.y} r="4" fill="#ef4444" />
      ))}
      {/* Day labels */}
      {pts.map((p) => (
        <text key={p.day+"lbl"} x={p.x} y={H-2} textAnchor="middle" fontSize="10" fill="#9ca3af">
          {p.day}
        </text>
      ))}
      {/* Y-axis labels */}
      {[0,1000,2000,3000,4000].map((v) => {
        const y = H - PAD - (v / maxVal) * (H - PAD * 2);
        return (
          <text key={v} x={2} y={y+4} fontSize="9" fill="#9ca3af">
            {v === 0 ? "0" : v/1000 + "k"}
          </text>
        );
      })}
    </svg>
  );
}

// ── Donut chart for Analytics ──────────────────────────
function DonutChart() {
  // Each slice: [label, value, color]
  const slices = [
    ["Jobs",               40, "#3b82f6"],
    ["Proposals",          25, "#ef4444"],
    ["Applied Proposals",  20, "#22c55e"],
    ["Bookmarked Projects",15, "#a855f7"],
  ];
  const total = slices.reduce((s, x) => s + x[1], 0);
  let startAngle = -Math.PI / 2;
  const R = 60, r = 35, cx = 80, cy = 80;

  const arcs = slices.map(([label, val, color]) => {
    const angle = (val / total) * 2 * Math.PI;
    const x1 = cx + R * Math.cos(startAngle);
    const y1 = cy + R * Math.sin(startAngle);
    startAngle += angle;
    const x2 = cx + R * Math.cos(startAngle);
    const y2 = cy + R * Math.sin(startAngle);
    const largeArc = angle > Math.PI ? 1 : 0;
    const ix1 = cx + r * Math.cos(startAngle);
    const iy1 = cy + r * Math.sin(startAngle);
    const ix2 = cx + r * Math.cos(startAngle - angle);
    const iy2 = cy + r * Math.sin(startAngle - angle);
    const d = `M${x1},${y1} A${R},${R} 0 ${largeArc} 1 ${x2},${y2}
               L${ix1},${iy1} A${r},${r} 0 ${largeArc} 0 ${ix2},${iy2} Z`;
    return { d, color, label, val };
  });

  return (
    <div style={{ display:"flex", alignItems:"center", gap:16 }}>
      <svg viewBox="0 0 160 160" style={{ width:160, minWidth:140 }}>
        {arcs.map((a) => <path key={a.label} d={a.d} fill={a.color} />)}
        <text x={cx} y={cy-6} textAnchor="middle" fontSize="10" fill="#6b7280">Total</text>
        <text x={cx} y={cy+8} textAnchor="middle" fontSize="14" fontWeight="700" fill="#111">{total}</text>
      </svg>
      <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
        {arcs.map((a) => (
          <div key={a.label} style={{ display:"flex", alignItems:"center", gap:6 }}>
            <span style={{ width:10,height:10,borderRadius:"50%",background:a.color,display:"inline-block" }}/>
            <span style={{ fontSize:11, color:"#6b7280" }}>{a.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── One ongoing project row ─────────────────────────────
function ProjectRow({ project }) {
  return (
    <div style={s.projectRow}>
      <div style={s.projectTop}>
        <div>
          <p style={s.projectCompany}>{project.company}</p>
          <p style={s.projectTitle}>{project.title}</p>
        </div>
        <span style={s.projectBudget}>{project.budget}</span>
      </div>
      <div style={s.projectMeta}>
        <span style={s.metaItem}><b>Project type</b><br/>{project.type}</span>
        <span style={s.metaItem}><b>Location</b><br/>{project.location}</span>
        <span style={s.metaItem}><b>Expiry</b><br/>{project.expiry}</span>
      </div>
    </div>
  );
}

// ── One transaction row ─────────────────────────────────
function TransactionRow({ tx }) {
  return (
    <div style={s.txRow}>
      <span style={s.txIcon}>{tx.icon}</span>
      <div style={{ flex:1 }}>
        <p style={s.txName}>{tx.name}</p>
        <p style={s.txDate}>{tx.date}</p>
      </div>
      <span style={{ ...s.txAmount, color: tx.positive ? "#22c55e" : "#ef4444" }}>
        {tx.amount}
      </span>
      <span style={s.txArrow}>›</span>
    </div>
  );
}

// ── Jobs table ──────────────────────────────────────────
function JobsTable() {
  return (
    <div style={s.tableWrap}>
      <table style={s.table}>
        <thead>
          <tr>
            {["Details","Job Type","Budget","Create On","Expiring On","Proposals","Action"]
              .map((h) => <th key={h} style={s.th}>{h}</th>)}
          </tr>
        </thead>
        <tbody>
          {JOBS.map((job, i) => (
            <tr key={i} style={i % 2 === 0 ? {} : { background:"#f9fafb" }}>
              <td style={s.td}>{job.title}</td>
              <td style={s.td}>{job.type}</td>
              <td style={s.td}>{job.budget}</td>
              <td style={s.td}>{job.created}</td>
              <td style={s.td}>{job.expiring}</td>
              <td style={s.td}>
                <span style={{
                  ...s.proposalBadge,
                  background: job.color,
                }}>
                  {job.proposals}
                </span>
              </td>
              <td style={s.td}><span style={s.eyeBtn}>👁</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


// ═══════════════════════════════════════════════════════
//  STEP 3 — MAIN APP  (assembles everything)
// ═══════════════════════════════════════════════════════
export default function ClientDashboard() {
  const [activeLink, setActiveLink] = useState(0);

  return (
    <div style={s.page}>
      <Header />
      <PageBanner />

      {/* ── Content area: sidebar + main ── */}
      <div style={s.contentArea}>

        {/* Left sidebar */}
        <Sidebar active={activeLink} setActive={setActiveLink} />

        {/* Right main panel */}
        <main style={s.main}>

          {/* Top action row */}
          <div style={s.topRow}>
            <h3 style={s.dashTitle}>Dashboard</h3>
            <div style={s.topRowRight}>
              <button style={s.postBtn}>+ Post New Project</button>
              <select style={s.yearSelect}>
                <option>2025 – 2026</option>
                <option>2024 – 2025</option>
              </select>
            </div>
          </div>

          {/* Stat cards */}
          <div style={s.statsGrid}>
            {STATS.map((stat) => <StatCard key={stat.label} stat={stat} />)}
          </div>

          {/* Overview chart + Analytics donut */}
          <div style={s.twoCol}>
            <div style={s.card}>
              <div style={s.cardHeader}>
                <h4 style={s.cardTitle}>Overview</h4>
                <select style={s.smallSelect}><option>This Week</option></select>
              </div>
              <LineChart />
            </div>
            <div style={s.card}>
              <h4 style={s.cardTitle}>Analytics</h4>
              <DonutChart />
            </div>
          </div>

          {/* Ongoing Projects + Recent Transactions */}
          <div style={s.twoCol}>
            <div style={s.card}>
              <div style={s.cardHeader}>
                <h4 style={s.cardTitle}>Ongoing Projects</h4>
                <a href="#" style={s.viewAll}>View All</a>
              </div>
              {ONGOING_PROJECTS.map((p, i) => (
                <ProjectRow key={i} project={p} />
              ))}
            </div>
            <div style={s.card}>
              <h4 style={s.cardTitle}>Recent Transactions</h4>
              {TRANSACTIONS.map((tx, i) => (
                <TransactionRow key={i} tx={tx} />
              ))}
            </div>
          </div>

          {/* Recently Posted Jobs table */}
          <div style={s.card}>
            <div style={s.cardHeader}>
              <h4 style={s.cardTitle}>Recently Posted Jobs</h4>
              <input style={s.searchSmall} placeholder="🔍 Search" />
            </div>
            <JobsTable />
          </div>

        </main>
      </div>

  
      <Footer />
    </div>
  );
}

// ═══════════════════════════════════════════════════════
//  STEP 4 — ALL STYLES  (plain JS — no CSS file needed)
// ═══════════════════════════════════════════════════════
const s = {
  page: { fontFamily:"'Segoe UI',Arial,sans-serif", background:"#f1f5f9", minHeight:"100vh" },

  // Banner
  banner: { background:"linear-gradient(135deg,#e8ecf8,#f1f5f9)", textAlign:"center",
            padding:"28px 0", borderBottom:"1px solid #e5e7eb" },
  bannerTitle: { fontSize:22, fontWeight:700, color:"#1a2b6d", margin:0 },
  breadcrumb: { fontSize:13, color:"#6b7280", margin:"6px 0 0" },

  // Layout
  contentArea: { display:"flex", gap:0, maxWidth:1200, margin:"0 auto", padding:"28px 20px" },

  // Sidebar
  sidebar: { width:200, minWidth:180, marginRight:24 },
  profileCard: { background:"#fff", borderRadius:10, padding:"20px 16px", textAlign:"center",
                 marginBottom:16, boxShadow:"0 1px 4px rgba(0,0,0,.07)" },
  profileAvatar: { fontSize:44, marginBottom:8 },
  profileName: { fontWeight:700, fontSize:15, color:"#111", margin:0 },
  profileEmail: { fontSize:12, color:"#6b7280", margin:"4px 0 0" },
  sideLink: { display:"flex", alignItems:"center", gap:10, width:"100%", background:"none",
              border:"none", padding:"10px 14px", borderRadius:8, fontSize:14,
              color:"#374151", cursor:"pointer", textAlign:"left", marginBottom:2 },
  sideLinkActive: { background:"#eef2ff", color:"#1d4ed8", fontWeight:600 },

  // Main
  main: { flex:1, minWidth:0 },
  topRow: { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 },
  dashTitle: { fontSize:18, fontWeight:700, color:"#111", margin:0 },
  topRowRight: { display:"flex", gap:10, alignItems:"center" },
  postBtn: { background:"#1a2b6d", color:"#fff", border:"none", borderRadius:7,
             padding:"8px 16px", fontSize:13, fontWeight:600, cursor:"pointer" },
  yearSelect: { border:"1px solid #d1d5db", borderRadius:6, padding:"7px 10px", fontSize:13 },

  // Stat cards
  statsGrid: { display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(160px,1fr))",
               gap:14, marginBottom:20 },
  statCard: { background:"#fff", borderRadius:10, padding:"16px", display:"flex",
              alignItems:"center", gap:12, boxShadow:"0 1px 3px rgba(0,0,0,.07)" },
  statIcon: { width:42, height:42, borderRadius:10, display:"flex",
              alignItems:"center", justifyContent:"center", fontSize:20 },
  statLabel: { fontSize:12, color:"#6b7280", margin:0 },
  statValue: { fontSize:22, fontWeight:700, color:"#111", margin:"2px 0 0" },

  // Two-column layout
  twoCol: { display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 },

  // Generic card
  card: { background:"#fff", borderRadius:10, padding:"18px",
          boxShadow:"0 1px 3px rgba(0,0,0,.07)", marginBottom:16 },
  cardHeader: { display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 },
  cardTitle: { fontSize:15, fontWeight:700, color:"#111", margin:0 },
  viewAll: { fontSize:12, color:"#3b5bdb", textDecoration:"none" },
  smallSelect: { border:"1px solid #e5e7eb", borderRadius:5, padding:"3px 8px", fontSize:12 },

  // Ongoing projects
  projectRow: { border:"1px solid #e5e7eb", borderRadius:8, padding:"12px", marginBottom:10 },
  projectTop: { display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 },
  projectCompany: { fontSize:13, fontWeight:600, color:"#111", margin:0 },
  projectTitle: { fontSize:12, color:"#6b7280", margin:"2px 0 0" },
  projectBudget: { background:"#22c55e", color:"#fff", fontSize:12, fontWeight:600,
                   padding:"2px 10px", borderRadius:5 },
  projectMeta: { display:"flex", gap:20 },
  metaItem: { fontSize:11, color:"#374151" },

  // Transactions
  txRow: { display:"flex", alignItems:"center", gap:12, padding:"10px 0",
           borderBottom:"1px solid #f3f4f6" },
  txIcon: { fontSize:22 },
  txName: { fontSize:13, fontWeight:600, color:"#111", margin:0 },
  txDate: { fontSize:11, color:"#9ca3af", margin:"2px 0 0" },
  txAmount: { fontSize:13, fontWeight:700 },
  txArrow: { fontSize:18, color:"#9ca3af" },

  // Jobs table
  tableWrap: { overflowX:"auto" },
  table: { width:"100%", borderCollapse:"collapse", fontSize:13 },
  th: { textAlign:"left", padding:"10px 12px", background:"#f9fafb",
        color:"#374151", fontWeight:600, borderBottom:"1px solid #e5e7eb" },
  td: { padding:"10px 12px", borderBottom:"1px solid #f3f4f6", color:"#374151" },
  proposalBadge: { color:"#fff", fontSize:11, fontWeight:700, padding:"2px 8px",
                   borderRadius:5, display:"inline-block" },
  eyeBtn: { cursor:"pointer", fontSize:16 },
  searchSmall: { border:"1px solid #e5e7eb", borderRadius:6, padding:"6px 12px", fontSize:13 },

  
};
