import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Header from "../components/Header"; // ← Import Header
import Footer from "../components/Footer";

// ── Data ──
const MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
const overviewData = MONTHS.map((month, i) => ({
  month,
  Jobs: [120, 80, 100, 140, 160, 90, 130, 170, 110, 150, 180, 100][i],
  Proposals: [60, 50, 70, 90, 110, 60, 80, 120, 70, 100, 130, 80][i],
}));
const analyticsData = [
  { name: "Jobs", value: 35, color: "#ef4444" },
  { name: "Applied Proposals", value: 25, color: "#14b8a6" },
  { name: "Proposals", value: 20, color: "#f59e0b" },
  { name: "Bookmarked Projects", value: 20, color: "#6366f1" },
];
const projects = [
  { client: "Amaze Tech", title: "Landing Page Redesign / Sales Page Redesign", type: "Hourly", location: "🇬🇧 UK", expiry: "6 Days Left", amount: "$320" },
  { client: "Amaze Tech", title: "Landing Page Redesign / Sales Page Redesign", type: "Hourly", location: "🇬🇧 UK", expiry: "6 Days Left", amount: "$320" },
];
const earnings = [
  { name: "Janet Paden",  date: "25 Apr 2025", amount: "$200", initials: "JP", color: "#6366f1" },
  { name: "Mary Hawkins", date: "12 May 2025", amount: "$350", initials: "MH", color: "#ec4899" },
  { name: "Laura Watson", date: "18 Jun 2025", amount: "$404", initials: "LW", color: "#f59e0b" },
  { name: "Jessica Mary", date: "25 Apr 2025", amount: "$145", initials: "JM", color: "#10b981" },
  { name: "Jessica Mary", date: "25 Apr 2025", amount: "$358", initials: "JM", color: "#14b8a6" },
];
const navItems = [
  { label: "Dashboard", icon: "⊞" },
  { label: "Projects", icon: "📁" },
  { label: "Reviews", icon: "⭐" },
  { label: "Portfolio", icon: "🗂️" },
  { label: "Chat", icon: "💬" },
  { label: "Logout", icon: "🚪" },
];

// ── StatCard Component ──
function StatCard({ icon, label, value, iconBg }) {
  return (
    <div style={styles.statCard}>
      <div style={{ ...styles.statIcon, background: iconBg }}>{icon}</div>
      <div>
        <p style={styles.statLabel}>{label}</p>
        <p style={styles.statValue}>{value}</p>
      </div>
    </div>
  );
}

// ── ProjectRow Component ──
function ProjectRow({ client, title, type, location, expiry, amount }) {
  return (
    <div style={styles.projectRow}>
      <div style={{ flex: 1 }}>
        <p style={styles.projectClient}>{client}</p>
        <p style={styles.projectTitle}>{title}</p>
        <div style={styles.projectMeta}>
          <span><strong>Project type</strong><br />{type}</span>
          <span><strong>Location</strong><br />{location}</span>
          <span><strong>Expiry</strong><br />{expiry}</span>
        </div>
      </div>
      <div style={styles.projectBadge}>{amount}</div>
    </div>
  );
}

// ── EarningRow Component ──
function EarningRow({ name, date, amount, initials, color }) {
  return (
    <div style={styles.earningRow}>
      <div style={{ ...styles.avatar, background: color }}>{initials}</div>
      <div style={{ flex: 1 }}>
        <p style={styles.earningName}>{name}</p>
        <p style={styles.earningDate}>Date: {date}</p>
      </div>
      <p style={styles.earningAmount}>{amount}</p>
    </div>
  );
}

// ── Dashboard Component ──
export default function Dashboard() {
  const [activeNav, setActiveNav] = useState("Dashboard");

  return (
    <div style={styles.page}>
      {/* Header */}
      <Header />

      {/* Banner */}
      <div style={styles.banner}>
        <h2 style={styles.bannerTitle}>Profile</h2>
        <p style={styles.bannerBreadcrumb}>Home &bull; Profile</p>
      </div>

      {/* Main Content */}
      <div style={styles.main}>
        {/* Sidebar */}
        <aside style={styles.sidebar}>
          <div style={styles.userInfo}>
            <div style={styles.userAvatarLg}>👤</div>
            <div>
              <p style={styles.userName}>John Smith</p>
              <p style={styles.userEmail}>walter@sample.com</p>
            </div>
          </div>
          <nav>
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => setActiveNav(item.label)}
                style={{
                  ...styles.navItem,
                  background: activeNav === item.label ? "#2563eb" : "transparent",
                  color: activeNav === item.label ? "#fff" : "#374151",
                }}
              >
                <span style={{ marginRight: 8 }}>{item.icon}</span>
                {item.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Right Content */}
        <div style={styles.content}>
          {/* Dashboard heading */}
          <h2 style={styles.sectionTitle}>Dashboard</h2>

          {/* Stat Cards */}
          <div style={styles.statsRow}>
            <StatCard icon="📋" label="Completed Jobs" value="30" iconBg="#dcfce7" />
            <StatCard icon="✅" label="Task Completed" value="5" iconBg="#dbeafe" />
            <StatCard icon="⭐" label="Reviews" value="25" iconBg="#fef9c3" />
            <StatCard icon="💲" label="Earning" value="$5962" iconBg="#fce7f3" />
          </div>

          {/* Charts Row */}
          <div style={styles.chartsRow}>
            {/* Overview Bar Chart */}
            <div style={{ ...styles.card, flex: 2 }}>
              <div style={styles.cardHeader}>
                <span style={styles.cardTitle}>Overview</span>
              </div>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={overviewData} barSize={8} barGap={2}>
                  <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Bar dataKey="Jobs" fill="#2563eb" radius={[4,4,0,0]} />
                  <Bar dataKey="Proposals" fill="#c7d2fe" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Analytics Donut Chart */}
            <div style={{ ...styles.card, flex: 1 }}>
              <span style={styles.cardTitle}>Analytics</span>
              <PieChart width={200} height={160}>
                <Pie
                  data={analyticsData}
                  cx={95} cy={75}
                  innerRadius={50} outerRadius={75}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {analyticsData.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </div>
          </div>

          {/* Bottom Row */}
          <div style={styles.bottomRow}>
            <div style={{ ...styles.card, flex: 1 }}>
              <div style={styles.cardHeader}>
                <span style={styles.cardTitle}>Ongoing Projects</span>
              </div>
              {projects.map((p, i) => <ProjectRow key={i} {...p} />)}
            </div>

            <div style={{ ...styles.card, flex: 1 }}>
              <span style={styles.cardTitle}>Recent Earnings</span>
              {earnings.map((e, i) => <EarningRow key={i} {...e} />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Styles ──
const styles = {
  page: { fontFamily: "'Segoe UI', sans-serif", background: "#f3f4f6", minHeight: "100vh", color: "#111827" },
  banner: { background: "#e9ecf4", textAlign: "center", padding: "28px 16px" },
  bannerTitle: { fontSize: 22, fontWeight: 700 },
  bannerBreadcrumb: { color: "#6b7280", fontSize: 13, marginTop: 4 },
  main: { display: "flex", gap: 0, maxWidth: 1100, margin: "32px auto", padding: "0 16px", alignItems: "flex-start" },
  sidebar: { width: 200, background: "#fff", borderRadius: 12, padding: 16, marginRight: 20, flexShrink: 0 },
  userInfo: { display: "flex", alignItems: "center", gap: 10, marginBottom: 20 },
  userAvatarLg: { width: 40, height: 40, borderRadius: "50%", background: "#e5e7eb", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20 },
  userName: { fontWeight: 600, fontSize: 14 },
  userEmail: { fontSize: 11, color: "#6b7280" },
  navItem: { display: "flex", alignItems: "center", width: "100%", padding: "9px 12px", borderRadius: 8, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 500, marginBottom: 4, textAlign: "left", transition: "background 0.2s" },
  content: { flex: 1, minWidth: 0 },
  sectionTitle: { fontSize: 20, fontWeight: 700, marginBottom: 16 },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 },
  statCard: { background: "#fff", borderRadius: 12, padding: 16, display: "flex", alignItems: "center", gap: 12, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  statIcon: { width: 40, height: 40, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
  statLabel: { fontSize: 11, color: "#6b7280" },
  statValue: { fontSize: 18, fontWeight: 700 },
  chartsRow: { display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" },
  card: { background: "#fff", borderRadius: 12, padding: 16, boxShadow: "0 1px 4px rgba(0,0,0,0.06)" },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardTitle: { fontWeight: 600, fontSize: 15, display: "block", marginBottom: 10 },
  bottomRow: { display: "flex", gap: 16, alignItems: "flex-start" },
  projectRow: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", borderBottom: "1px solid #f3f4f6", paddingBottom: 12, marginBottom: 12, gap: 12 },
  projectClient: { fontSize: 12, color: "#6b7280" },
  projectTitle: { fontSize: 13, fontWeight: 500, margin: "2px 0 8px" },
  projectMeta: { display: "flex", gap: 16, fontSize: 12, color: "#374151" },
  projectBadge: { background: "#2563eb", color: "#fff", borderRadius: 6, padding: "4px 10px", fontSize: 13, fontWeight: 600, flexShrink: 0 },
  earningRow: { display: "flex", alignItems: "center", gap: 10, paddingBottom: 10, marginBottom: 10, borderBottom: "1px solid #f3f4f6" },
  avatar: { width: 36, height: 36, borderRadius: "50%", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 600, fontSize: 13, flexShrink: 0 },
  earningName: { fontSize: 13, fontWeight: 500 },
  earningDate: { fontSize: 11, color: "#9ca3af" },
  earningAmount: { fontWeight: 600, fontSize: 13, color: "#111827", marginLeft: "auto" },
};