import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Label,
} from "recharts";
import { DashboardLayout } from "../components/layout";
import { StatCard, Avatar } from "../components/ui";
import { colors, borderRadius, shadows } from "../constants/theme";
import api from "../api/client";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const overviewData = DAYS.map((day, i) => ({
  day,
  Jobs: [8, 15, 10, 35, 12, 28, 18][i],
  "Applied Proposals": [5, 10, 8, 20, 10, 22, 14][i],
}));

const analyticsData = [
  { name: "Jobs", value: 35, color: colors.danger },
  { name: "Applied Proposals", value: 25, color: "#14b8a6" },
  { name: "Proposals", value: 20, color: colors.warning },
  { name: "Bookmarked Projects", value: 20, color: "#6366f1" },
];

const projects = [
  { client: "Amaze Tech", title: "Landing Page Redesign / Sales Page Redesign", type: "Hourly", location: "UK", expiry: "6 Days Left", amount: "$320" },
  { client: "Amaze Tech", title: "Landing Page Manager / Sales Page Redesign", type: "Hourly", location: "UK", expiry: "6 Days Left", amount: "$320" },
];

const earnings = [
  { name: "Junaid Paden", date: "25 Jul 2025", amount: "$215", initials: "JP", color: "#6366f1" },
  { name: "Marcus Williams", date: "12 Nov 2025", amount: "$190", initials: "MW", color: "#ec4899" },
  { name: "Laura Johnson", date: "18 Jun 2025", amount: "$64", initials: "LJ", color: colors.warning },
  { name: "Jessica Mary", date: "25 Apr 2025", amount: "$214", initials: "JM", color: "#10b981" },
  { name: "Jessica Mary", date: "25 Jul 2025", amount: "$198", initials: "JM", color: "#14b8a6" },
];

function ProjectRow({ client, title, type, location, expiry, amount }) {
  return (
    <div style={s.projectRow}>
      <div style={{ flex: 1 }}>
        <p style={s.projectClient}>{client}</p>
        <p style={s.projectTitle}>{title}</p>
        <div style={s.projectMeta}>
          <span><strong>Project type</strong><br />{type}</span>
          <span><strong>Location</strong><br />{location}</span>
          <span><strong>Expiry</strong><br />{expiry}</span>
        </div>
      </div>
      <div style={s.projectBadge}>{amount}</div>
    </div>
  );
}

function EarningRow({ name, date, amount, initials, color }) {
  return (
    <div style={s.earningRow}>
      <Avatar name={initials} size={36} bgColor={color} />
      <div style={{ flex: 1 }}>
        <p style={s.earningName}>{name}</p>
        <p style={s.earningDate}>Date: {date}</p>
      </div>
      <p style={s.earningAmount}>{amount}</p>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.gray[400]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  );
}

export default function FreelancerDashboard() {
  const [activeLabel, setActiveLabel] = useState("Dashboard");
  const navigate = useNavigate();
  const [stats, setStats] = useState({ completedJobs: 50, taskCompleted: 25, reviews: 25, earning: "$5862" });
  const [projectList, setProjectList] = useState(projects);
  const [earningsList, setEarningsList] = useState(earnings);

  useEffect(() => {
    api.get('/dashboard/freelancer').then((data) => {
      if (data.stats) setStats({
        completedJobs: data.stats.completedJobs || 50,
        taskCompleted: data.stats.taskCompleted || 25,
        reviews: data.stats.reviews || 25,
        earning: `$${data.stats.totalEarnings || 5862}`,
      });
      if (data.projects?.length) setProjectList(data.projects.map((p) => ({
        client: p.clientName || "Client",
        title: p.name || p.title,
        type: p.projectType || "Hourly",
        location: "UK",
        expiry: p.deadline ? `${Math.ceil((new Date(p.deadline) - new Date()) / 86400000)} Days Left` : "6 Days Left",
        amount: `$${p.price || 0}`,
      })));
      if (data.transactions?.length) setEarningsList(data.transactions.map((t, i) => ({
        name: t.name,
        date: new Date(t.createdAt).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
        amount: `$${Math.abs(t.amount)}`,
        initials: t.name.split(" ").map(w => w[0]).join("").slice(0, 2),
        color: ["#6366f1", "#ec4899", colors.warning, "#10b981", "#14b8a6"][i % 5],
      })));
    }).catch(() => {});
  }, []);

  return (
    <DashboardLayout
      role="freelancer"
      bannerTitle="Dashboard"
      breadcrumb="Home > Dashboard"
      activeLabel={activeLabel}
      onLinkClick={setActiveLabel}
      profileName="John Smith"
      profileEmail="john@sample.com"
    >
      <div style={s.topRow}>
        <h2 style={s.dashTitle}>Dashboard</h2>
        <button style={s.createGigBtn} onClick={() => navigate("/freelancer/create-gig")}>+ Create Gig</button>
      </div>

      {/* Stat Cards */}
      <div style={s.statsRow}>
        <StatCard icon="📋" label="Completed Jobs" value={stats.completedJobs} iconBg="#dcfce7" />
        <StatCard icon="✅" label="Task Completed" value={stats.taskCompleted} iconBg="#dbeafe" />
        <StatCard icon="⭐" label="Reviews" value={stats.reviews} iconBg="#fef9c3" />
        <StatCard icon="💲" label="Earning" value={stats.earning} iconBg="#fce7f3" />
      </div>

      {/* Charts */}
      <div style={s.chartsRow}>
        <div style={{ ...s.card, flex: 2 }}>
          <div style={s.cardHeader}>
            <span style={s.cardTitle}>Overview</span>
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: colors.accentDark, display: "inline-block" }} />
                <span style={{ fontSize: 11, color: colors.text.muted }}>Jobs</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: 2, background: "#c7d2fe", display: "inline-block" }} />
                <span style={{ fontSize: 11, color: colors.text.muted }}>Applied Proposals</span>
              </div>
              <select style={s.smallSelect}><option>DM</option></select>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={overviewData} barSize={8} barGap={2}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="Jobs" fill={colors.accentDark} radius={[4, 4, 0, 0]} />
              <Bar dataKey="Applied Proposals" fill="#c7d2fe" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ ...s.card, flex: 1 }}>
          <span style={s.cardTitle}>Analytics</span>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <PieChart width={160} height={160}>
              <Pie data={analyticsData} cx={75} cy={75} innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                {analyticsData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
                <Label value="Total" position="center" style={{ fontSize: 14, fontWeight: 700, fill: colors.text.primary }} />
              </Pie>
            </PieChart>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px 12px", marginTop: 8 }}>
            {analyticsData.map((a) => (
              <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, display: "inline-block", flexShrink: 0 }} />
                <span style={{ fontSize: 11, color: colors.text.muted, whiteSpace: "nowrap" }}>{a.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Row */}
      <div style={s.bottomRow}>
        <div style={{ ...s.card, flex: 1 }}>
          <div style={s.cardHeader}>
            <span style={s.cardTitle}>Ongoing Projects</span>
            <a href="#" style={s.viewAll}>View All</a>
          </div>
          {projectList.map((p, i) => <ProjectRow key={i} {...p} />)}
        </div>

        <div style={{ ...s.card, flex: 1 }}>
          <span style={s.cardTitle}>Recent Earnings</span>
          {earningsList.map((e, i) => <EarningRow key={i} {...e} />)}
        </div>
      </div>
    </DashboardLayout>
  );
}

const s = {
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  dashTitle: { fontSize: 18, fontWeight: 700, color: colors.text.primary, margin: 0 },
  createGigBtn: { background: colors.success, color: colors.white, border: "none", borderRadius: 7, padding: "0 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", height: 38, display: "flex", alignItems: "center" },
  statsRow: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 },
  chartsRow: { display: "flex", gap: 16, marginBottom: 20, alignItems: "flex-start" },
  card: { background: colors.white, borderRadius: borderRadius.xl, padding: 16, boxShadow: shadows.sm },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardTitle: { fontWeight: 600, fontSize: 15, display: "block", marginBottom: 10 },
  smallSelect: { border: `1px solid ${colors.gray[300]}`, borderRadius: 6, padding: "3px 10px", fontSize: 13 },
  viewAll: { fontSize: 12, color: colors.accent, textDecoration: "none" },
  bottomRow: { display: "flex", gap: 16, alignItems: "flex-start" },
  projectRow: { display: "flex", alignItems: "flex-start", justifyContent: "space-between", border: `1px solid ${colors.gray[200]}`, borderRadius: 8, padding: 12, marginBottom: 10, gap: 12 },
  projectClient: { fontSize: 12, color: colors.text.muted, margin: 0 },
  projectTitle: { fontSize: 13, fontWeight: 500, margin: "2px 0 8px" },
  projectMeta: { display: "flex", gap: 16, fontSize: 12, color: colors.text.secondary },
  projectBadge: { background: colors.success, color: colors.white, borderRadius: 6, padding: "4px 10px", fontSize: 13, fontWeight: 600, flexShrink: 0 },
  earningRow: { display: "flex", alignItems: "center", gap: 10, paddingBottom: 10, marginBottom: 10, borderBottom: `1px solid ${colors.gray[100]}` },
  earningName: { fontSize: 13, fontWeight: 500, margin: 0 },
  earningDate: { fontSize: 11, color: colors.gray[400], margin: "2px 0 0" },
  earningAmount: { fontWeight: 600, fontSize: 13, color: colors.text.primary, marginLeft: "auto" },
};
