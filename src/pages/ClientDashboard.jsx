import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/layout";
import { StatCard } from "../components/ui";
import { colors, borderRadius, shadows } from "../constants/theme";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Label,
} from "recharts";
import api from "../api/client";

const CATEGORIES = [
  "Web Development", "Mobile Development", "UI/UX Design", "Graphic Design",
  "Digital Marketing", "Content Writing", "Video & Animation", "Data Science",
];
const EXPERIENCE_LEVELS = ["Any Level", "Entry Level", "Intermediate", "Expert"];

function PostProjectModal({ open, onClose }) {
  const [form, setForm] = useState({
    title: "", category: "Web Development", experience: "Any Level",
    description: "", minBudget: "", maxBudget: "",
    subCategory: "Web Development", duration: "Any Level",
    skills: "",
  });

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  if (!open) return null;

  return (
    <div style={m.overlay} onClick={onClose}>
      <div style={m.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={m.header}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={colors.primary} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
              <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
              <line x1="8" y1="10" x2="16" y2="10" />
              <line x1="8" y1="14" x2="16" y2="14" />
              <line x1="8" y1="18" x2="12" y2="18" />
            </svg>
            <h2 style={m.title}>Post a New Project</h2>
          </div>
          <button onClick={onClose} style={m.closeBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Form */}
        <div style={m.body}>
          {/* Project Title */}
          <div style={m.fieldFull}>
            <label style={m.label}>Project Title</label>
            <input style={m.input} placeholder="Eg Building a freelancing website" value={form.title} onChange={update("title")} />
          </div>

          {/* Category + Experience Level */}
          <div style={m.row}>
            <div style={m.fieldHalf}>
              <label style={m.label}>Category</label>
              <select style={m.select} value={form.category} onChange={update("category")}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={m.fieldHalf}>
              <label style={m.label}>Experience Level</label>
              <select style={m.select} value={form.experience} onChange={update("experience")}>
                {EXPERIENCE_LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          {/* Description */}
          <div style={m.fieldFull}>
            <label style={m.label}>Description</label>
            <textarea style={m.textarea} placeholder="Describe your project in detail....." value={form.description} onChange={update("description")} rows={6} />
          </div>

          {/* Min Budget + Max Budget */}
          <div style={m.row}>
            <div style={m.fieldHalf}>
              <label style={m.label}>Min Budget (Rs.)</label>
              <input style={m.input} placeholder="5000" value={form.minBudget} onChange={update("minBudget")} />
            </div>
            <div style={m.fieldHalf}>
              <label style={m.label}>Max Budget (Rs.)</label>
              <input style={m.input} placeholder="20000" value={form.maxBudget} onChange={update("maxBudget")} />
            </div>
          </div>

          {/* Category + Experience Level (row 2) */}
          <div style={m.row}>
            <div style={m.fieldHalf}>
              <label style={m.label}>Category</label>
              <select style={m.select} value={form.subCategory} onChange={update("subCategory")}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={m.fieldHalf}>
              <label style={m.label}>Experience Level</label>
              <select style={m.select} value={form.duration} onChange={update("duration")}>
                {EXPERIENCE_LEVELS.map((l) => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>

          {/* Required Skills */}
          <div style={m.fieldFull}>
            <label style={m.label}>Required Skills</label>
            <input style={m.input} placeholder="React, HTML, CSS, Django, MySQL" value={form.skills} onChange={update("skills")} />
          </div>

          {/* Post Project Button */}
          <button style={m.submitBtn} onClick={() => {
            api.post('/jobs', {
              title: form.title, category: form.category,
              experienceLevel: form.experience.toLowerCase().replace(" ", "_"),
              description: form.description,
              budgetMin: Number(form.minBudget) || 0,
              budgetMax: Number(form.maxBudget) || 0,
              budgetType: "fixed",
              skills: form.skills.split(",").map(s => s.trim()).filter(Boolean),
            }).then(() => onClose()).catch(() => onClose());
          }}>Post Project</button>
        </div>
      </div>
    </div>
  );
}

const m = {
  overlay: { position: "fixed", inset: 0, background: "rgba(30, 58, 138, 0.85)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { background: colors.white, borderRadius: 24, width: 580, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 60px rgba(0,0,0,0.25)" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "24px 32px 0" },
  title: { fontSize: 20, fontWeight: 700, color: colors.text.primary, margin: 0 },
  closeBtn: { background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" },
  body: { padding: "24px 32px 32px" },
  row: { display: "flex", gap: 16, marginBottom: 18 },
  fieldFull: { marginBottom: 18 },
  fieldHalf: { flex: 1 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: colors.text.primary, marginBottom: 6 },
  input: { width: "100%", height: 38, padding: "0 10px", border: `1px solid ${colors.gray[300]}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", color: colors.text.secondary },
  select: { width: "100%", height: 38, padding: "0 10px", border: `1px solid ${colors.gray[300]}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", color: colors.text.secondary, background: colors.white, appearance: "auto", cursor: "pointer" },
  textarea: { width: "100%", padding: "8px 10px", border: `1px solid ${colors.gray[300]}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", color: colors.text.secondary, resize: "vertical", minHeight: 100 },
  submitBtn: { width: "100%", padding: "13px 0", background: colors.primary, color: colors.white, border: "none", borderRadius: 10, fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginTop: 6 },
};

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const overviewData = DAYS.map((day, i) => ({
  day,
  Jobs: [10, 18, 12, 38, 15, 32, 20][i],
  Proposals: [8, 12, 10, 22, 14, 28, 16][i],
}));

const analyticsData = [
  { name: "Jobs", value: 40, color: colors.accent },
  { name: "Proposals", value: 25, color: colors.danger },
  { name: "Applied Proposals", value: 20, color: colors.success },
  { name: "Bookmarked Projects", value: 15, color: colors.purple },
];

const ONGOING_PROJECTS = [
  { company: "Dreamguystech", title: "Website Designer Required For Directory Theme", budget: "$120", type: "Hourly", location: "UK", expiry: "6 Days Left" },
  { company: "Dreamguystech", title: "Landing Page Redesign / Sales Page Redesign", budget: "$120", type: "Hourly", location: "UK", expiry: "6 Days Left" },
];

const TRANSACTIONS = [
  { name: "Wallet Top-up", date: "25 Apr 2025", amount: "+$20.50", positive: true, iconColor: "#8b5cf6" },
  { name: "Purchase", date: "25 Apr 2025", amount: "-$62.80", positive: false, iconColor: "#3b82f6" },
  { name: "Project", date: "10 May 2025", amount: "-$20.50", positive: false, iconColor: "#22c55e" },
  { name: "Income", date: "18 Jun 2025", amount: "+$72.80", positive: true, iconColor: "#f97316" },
  { name: "Wallet Top-up", date: "25 Apr 2025", amount: "+$62.80", positive: true, iconColor: "#8b5cf6" },
];

const JOBS = [
  { title: "Website Designer Required", type: "Hourly", budget: "$2222", created: "29 Sep 2023", expiring: "10 Oct 2023", proposals: 47, color: colors.danger },
  { title: "Create desktop applications", type: "Full Time", budget: "$5782", created: "21 Sep 2023", expiring: "05 Oct 2023", proposals: 35, color: colors.orange },
  { title: "PHP Javascript Projects", type: "Part time", budget: "$4879", created: "17 Sep 2023", expiring: "29 Sep 2023", proposals: 28, color: colors.orange },
  { title: "Website Designer Required", type: "Hourly", budget: "$3651", created: "11 Sep 2023", expiring: "24 Sep 2023", proposals: 52, color: colors.accent },
  { title: "Swift / SwiftUI Developer", type: "Hourly", budget: "$2789", created: "05 Sep 2023", expiring: "17 Sep 2023", proposals: 38, color: colors.danger },
  { title: "Full-stack Developer", type: "Part time", budget: "$7653", created: "01 Sep 2023", expiring: "13 Sep 2023", proposals: 48, color: colors.accent },
];

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
        <span style={s.metaItem}><b>Project type</b><br />{project.type}</span>
        <span style={s.metaItem}><b>Location</b><br />{project.location}</span>
        <span style={s.metaItem}><b>Expiry</b><br />{project.expiry}</span>
      </div>
    </div>
  );
}

function TransactionRow({ tx }) {
  return (
    <div style={s.txRow}>
      <span style={{ ...s.txIconCircle, background: tx.iconColor + "18" }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={tx.iconColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2" ry="2" />
          <line x1="1" y1="10" x2="23" y2="10" />
        </svg>
      </span>
      <div style={{ flex: 1 }}>
        <p style={s.txName}>{tx.name}</p>
        <p style={s.txDate}>{tx.date}</p>
      </div>
      <span style={{ ...s.txAmount, color: tx.positive ? colors.success : colors.danger }}>
        {tx.amount}
      </span>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.gray[400]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </div>
  );
}

function JobsTable({ jobsList }) {
  return (
    <div style={{ overflowX: "auto" }}>
      <table style={s.table}>
        <thead>
          <tr>
            {["Details", "Job Type", "Budget", "Created On", "Expiring On", "Proposals", "Action"]
              .map((h) => <th key={h} style={s.th}>{h} {h !== "Action" && <span style={{ fontSize: 9, opacity: 0.5 }}>▼</span>}</th>)}
          </tr>
        </thead>
        <tbody>
          {jobsList.map((job, i) => (
            <tr key={i} style={i % 2 === 0 ? {} : { background: colors.gray[50] }}>
              <td style={s.td}>{job.title}</td>
              <td style={s.td}>{job.type}</td>
              <td style={s.td}>{job.budget}</td>
              <td style={s.td}>{job.created}</td>
              <td style={s.td}>{job.expiring}</td>
              <td style={s.td}>
                <span style={{ ...s.proposalBadge, background: job.color }}>{job.proposals}</span>
              </td>
              <td style={s.td}><span style={{ cursor: "pointer", fontSize: 16 }}>👁</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function ClientDashboard() {
  const [activeLabel, setActiveLabel] = useState("Dashboard");
  const [showPostModal, setShowPostModal] = useState(false);
  const [stats, setStats] = useState({ projectsPosted: 75, ongoingProjects: 10, completedProjects: 65, reviews: 25 });
  const [ongoingProjects, setOngoingProjects] = useState(ONGOING_PROJECTS);
  const [transactions, setTransactions] = useState(TRANSACTIONS);
  const [jobs, setJobs] = useState(JOBS);

  useEffect(() => {
    api.get('/dashboard/client').then((data) => {
      if (data.stats) setStats(data.stats);
      if (data.projects?.length) setOngoingProjects(data.projects.map((p) => ({
        company: p.freelancerName || "Freelancer",
        title: p.name || p.title,
        budget: `$${p.price || 0}`,
        type: p.projectType || "Hourly",
        location: "UK",
        expiry: p.deadline ? `${Math.ceil((new Date(p.deadline) - new Date()) / 86400000)} Days Left` : "6 Days Left",
      })));
      if (data.transactions?.length) setTransactions(data.transactions.map((t) => ({
        name: t.name, date: new Date(t.createdAt).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
        amount: `${t.type === "credit" ? "+" : "-"}$${Math.abs(t.amount).toFixed(2)}`,
        positive: t.type === "credit",
        iconColor: t.type === "credit" ? "#8b5cf6" : "#3b82f6",
      })));
      if (data.jobs?.length) setJobs(data.jobs.map((j) => ({
        title: j.title, type: j.budgetType || "Hourly",
        budget: `$${j.budgetMax || 0}`,
        created: new Date(j.createdAt).toLocaleDateString("en-US", { day: "2-digit", month: "short", year: "numeric" }),
        expiring: "10 Oct 2023", proposals: j.proposalCount || 0,
        color: j.proposalCount > 40 ? colors.danger : colors.orange,
      })));
    }).catch(() => {});
  }, []);

  return (
    <DashboardLayout
      role="client"
      activeLabel={activeLabel}
      onLinkClick={setActiveLabel}
    >
      <PostProjectModal open={showPostModal} onClose={() => setShowPostModal(false)} />
      <div style={s.topRow}>
        <h3 style={s.dashTitle}>Dashboard</h3>
        <div style={s.topRowRight}>
          <button style={s.postBtn} onClick={() => setShowPostModal(true)}>+ Post New Project</button>
          <select style={s.yearSelect}>
            <option>2025 - 2026</option>
            <option>2024 - 2025</option>
          </select>
        </div>
      </div>

      {/* Stat cards */}
      <div style={s.statsGrid}>
        <StatCard icon="📋" label="Projects Posted" value={stats.projectsPosted} color={colors.accent} />
        <StatCard icon="🔄" label="Ongoing Projects" value={stats.ongoingProjects} color={colors.success} />
        <StatCard icon="✅" label="Completed Projects" value={stats.completedProjects} color={colors.orange} />
        <StatCard icon="⭐" label="Reviews" value={stats.reviews} color={colors.warning} />
      </div>

      {/* Charts */}
      <div style={s.twoCol}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <h4 style={s.cardTitle}>Overview</h4>
            <select style={s.smallSelect}><option>This Week</option></select>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={overviewData}>
              <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="Jobs" stroke={colors.accentDark} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              <Line type="monotone" dataKey="Proposals" stroke={colors.danger} strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div style={s.card}>
          <h4 style={s.cardTitle}>Analytics</h4>
          <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
            <PieChart width={160} height={160}>
              <Pie data={analyticsData} cx={75} cy={75} innerRadius={45} outerRadius={70} dataKey="value" strokeWidth={0}>
                {analyticsData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
                <Label value="Total" position="center" style={{ fontSize: 14, fontWeight: 700, fill: colors.text.primary }} />
              </Pie>
            </PieChart>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px 16px" }}>
              {analyticsData.map((a) => (
                <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: a.color, display: "inline-block", flexShrink: 0 }} />
                  <span style={{ fontSize: 11, color: colors.text.muted, whiteSpace: "nowrap" }}>{a.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Ongoing Projects + Transactions */}
      <div style={s.twoCol}>
        <div style={s.card}>
          <div style={s.cardHeader}>
            <h4 style={s.cardTitle}>Ongoing Projects</h4>
            <a href="#" style={s.viewAll}>View All</a>
          </div>
          {ongoingProjects.map((p, i) => <ProjectRow key={i} project={p} />)}
        </div>
        <div style={s.card}>
          <h4 style={s.cardTitle}>Recent Transactions</h4>
          {transactions.map((tx, i) => <TransactionRow key={i} tx={tx} />)}
        </div>
      </div>

      {/* Jobs Table */}
      <div style={s.card}>
        <div style={s.cardHeader}>
          <h4 style={s.cardTitle}>Recently Posted Jobs</h4>
          <input style={s.searchSmall} placeholder="🔍 Search" />
        </div>
        <JobsTable jobsList={jobs} />
      </div>
    </DashboardLayout>
  );
}

const s = {
  topRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
  dashTitle: { fontSize: 18, fontWeight: 700, color: colors.text.primary, margin: 0 },
  topRowRight: { display: "flex", gap: 10, alignItems: "center" },
  postBtn: { background: colors.primary, color: colors.white, border: "none", borderRadius: 7, padding: "0 16px", fontSize: 13, fontWeight: 600, cursor: "pointer", height: 38, display: "flex", alignItems: "center" },
  yearSelect: { border: `1px solid ${colors.gray[300]}`, borderRadius: 6, padding: "0 10px", fontSize: 13, height: 38 },
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 14, marginBottom: 20 },
  twoCol: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 },
  card: { background: colors.white, borderRadius: borderRadius.lg, padding: 18, boxShadow: shadows.sm, marginBottom: 16 },
  cardHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  cardTitle: { fontSize: 15, fontWeight: 700, color: colors.text.primary, margin: 0 },
  viewAll: { fontSize: 12, color: colors.accent, textDecoration: "none" },
  smallSelect: { border: `1px solid ${colors.gray[300]}`, borderRadius: 6, padding: "3px 10px", fontSize: 13 },
  projectRow: { border: `1px solid ${colors.gray[200]}`, borderRadius: 8, padding: 12, marginBottom: 10 },
  projectTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 },
  projectCompany: { fontSize: 13, fontWeight: 600, color: colors.text.primary, margin: 0 },
  projectTitle: { fontSize: 12, color: colors.text.muted, margin: "2px 0 0" },
  projectBudget: { background: colors.success, color: colors.white, fontSize: 12, fontWeight: 600, padding: "2px 10px", borderRadius: 5 },
  projectMeta: { display: "flex", gap: 20 },
  metaItem: { fontSize: 11, color: colors.text.secondary },
  txRow: { display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: `1px solid ${colors.gray[100]}` },
  txIconCircle: { width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  txName: { fontSize: 13, fontWeight: 600, color: colors.text.primary, margin: 0 },
  txDate: { fontSize: 11, color: colors.gray[400], margin: "2px 0 0" },
  txAmount: { fontSize: 13, fontWeight: 700 },
  table: { width: "100%", borderCollapse: "collapse", fontSize: 13 },
  th: { textAlign: "left", padding: "10px 12px", background: colors.gray[50], color: colors.text.secondary, fontWeight: 600, borderBottom: `1px solid ${colors.gray[200]}` },
  td: { padding: "10px 12px", borderBottom: `1px solid ${colors.gray[100]}`, color: colors.text.secondary },
  proposalBadge: { color: colors.white, fontSize: 11, fontWeight: 700, padding: "2px 8px", borderRadius: 5, display: "inline-block" },
  searchSmall: { border: `1px solid ${colors.gray[300]}`, borderRadius: 6, padding: "6px 12px", fontSize: 13 },
};
