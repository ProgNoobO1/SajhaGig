import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Badge, StarRating } from "../components/ui";
import { colors, borderRadius, shadows } from "../constants/theme";

// ── Sample Data ──
const PROFILE = {
  initials: "RC",
  name: "Ram Chaudhary",
  verified: true,
  role: "Business Owner",
  location: "Kathmandu, Nepal",
  memberSince: "Jan 2024",
  tags: [
    { icon: "🍽️", label: "Restaurant & Hospitality" },
    { icon: "📍", label: "Thamel, KTM" },
  ],
  stats: [
    { value: "8", label: "Projects", color: colors.accent },
    { value: "6", label: "Hired", color: colors.accent },
    { value: "Rs.45K", label: "Spent", color: colors.success },
    { value: "4.8★", label: "Avg Rating", color: colors.warning },
    { value: "95%", label: "On-time Pay", color: colors.accent },
  ],
  about: [
    "Business owner operating two restaurants in the Thamel area of Kathmandu. Regularly hires freelancers for web design, digital marketing, and content creation to grow the business's online presence.",
    "Prefers freelancers who communicate clearly, provide daily updates, and deliver work on time. Fast to respond and process payments.",
  ],
  lookingFor: [
    { icon: "💬", title: "Clear Communication", desc: "Daily check-ins and quick responses to feedback" },
    { icon: "📦", title: "On-time Delivery", desc: "Meeting agreed deadlines is a top priority" },
  ],
  activeProjects: [
    { title: "Restaurant Website Redesign", status: "Open", statusColor: "green", budget: "Rs. 15K - 18K", timeline: "3 weeks", extra: "7 proposals received" },
    { title: "Social Media Content (3 months)", status: "In Progress", statusColor: "orange", budget: "Rs. 8K/mo", timeline: "Ongoing", extra: "Hired: Ekta R." },
  ],
  hireHistory: [
    { name: "Sulav Shrestha", initials: "SS", color: "#2dd4a8", project: "Restaurant Website", amount: "Rs. 15K", rating: 5 },
    { name: "Ekta Rai", initials: "ER", color: "#a855f7", project: "Logo Design", amount: "Rs. 3K", rating: 5 },
    { name: "Bikash Thapa", initials: "BT", color: "#3b82f6", project: "Menu Photography", amount: "Rs. 8K", rating: 4 },
  ],
  projects: [
    { category: "Web Dev", title: "Restaurant Website for Thamel", desc: "Online menu, table booking, Instagram integration for our Thamel restaurant.", status: "Open", statusExtra: "7 proposals", budget: "Rs. 15K-18K", skills: ["React", "Node.js", "Instagram API"], action: "View Project", actionFilled: true },
    { category: "Marketing", title: "Social Media Manager for 3 Months", desc: "Handle Instagram, Facebook and TikTok content for the restaurant brand.", status: "In Progress", budget: "Rs. 8K/mo", skills: ["Instagram", "Copywriting", "Canva"], action: "View Details", actionFilled: false },
    { category: "Design", title: "Logo & Brand Identity Refresh", desc: "Complete brand refresh for the restaurant including logo, menu design, signage.", status: "Completed", budget: "Rs. 10K", skills: ["Illustrator", "Branding"], action: "Closed", actionFilled: false },
    { category: "Video", title: "Promotional Video for New Menu", desc: "Short 60-second promo video showcasing new dishes for social media campaign.", status: "Completed", budget: "Rs. 7K", skills: ["Video Editing", "After Effects"], action: "Closed", actionFilled: false },
  ],
  reputation: {
    avg: "4.8",
    label: "Excellent Client",
    traits: ["Clear briefs", "Fast payment", "Professional to work with"],
  },
  reviewsGiven: [
    { name: "Sulav Shrestha", initials: "SS", color: "#2dd4a8", rating: 5, project: "Restaurant Website", timeAgo: "2 days ago", comment: "Excellent developer who understood the brief immediately. Delivered ahead of schedule and even added extra features we didn't ask for. Highly recommend!" },
    { name: "Ekta Rai", initials: "ER", color: "#a855f7", rating: 5, project: "Social Media Management", timeAgo: "1 week ago", comment: "Creative and reliable. Our instagram engagement doubled in the first month. Very professional to work with and very creative with content ideas." },
    { name: "Bikash Thapa", initials: "BT", color: "#3b82f6", rating: 4, project: "Menu Photography", timeAgo: "1 month ago", comment: "Good quality photos. Could have been a bit faster but the final results were excellent." },
    { name: "Anita Sharma", initials: "AS", color: "#f59e0b", rating: 5, project: "Logo Design", timeAgo: "2 months ago", comment: "Very talented designer. Captured our brand vision perfectly on the first try." },
    { name: "Deepak Gurung", initials: "DG", color: "#ef4444", rating: 5, project: "Video Production", timeAgo: "3 months ago", comment: "The promo video was stunning. Great attention to detail and very smooth editing." },
    { name: "Sita Maharjan", initials: "SM", color: "#22c55e", rating: 4, project: "Content Writing", timeAgo: "3 months ago", comment: "Well-written content that matched our tone. Delivered on time with minimal revisions needed." },
  ],
};

// ── Icons ──
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const MsgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const VerifiedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.accent} stroke="white" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// ── Edit Profile Modal ──
function EditProfileModal({ profile, onClose }) {
  const [form, setForm] = useState({
    fullName: profile.name,
    company: "Chaudhary Restaurants",
    industry: "Restaurant & Hospitality",
    location: "Thamel, Kathmandu",
    about: profile.about[0],
    website: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  return (
    <div style={em.overlay} onClick={onClose}>
      <div style={em.modal} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={em.header}>
          <h2 style={em.title}>Edit Client Profile</h2>
          <button onClick={onClose} style={em.closeBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={colors.gray[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Profile Photo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 22 }}>
          <div style={{ width: 56, height: 56, borderRadius: borderRadius.lg, background: "#7c3aed", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 }}>
            {profile.initials}
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: colors.text.primary, marginBottom: 4 }}>Profile Photo</div>
            <button style={em.changePhotoBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.gray[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>
              Change Photo
            </button>
          </div>
        </div>

        {/* Full Name + Company */}
        <div style={em.row}>
          <div style={em.field}>
            <label style={em.label}>Full Name</label>
            <input type="text" value={form.fullName} onChange={handleChange("fullName")} style={em.input} />
          </div>
          <div style={em.field}>
            <label style={em.label}>Company / Business</label>
            <input type="text" value={form.company} onChange={handleChange("company")} style={em.input} />
          </div>
        </div>

        {/* Industry + Location */}
        <div style={em.row}>
          <div style={em.field}>
            <label style={em.label}>Industry</label>
            <select value={form.industry} onChange={handleChange("industry")} style={em.select}>
              <option>Restaurant & Hospitality</option>
              <option>Technology</option>
              <option>Education</option>
              <option>Healthcare</option>
              <option>Retail</option>
              <option>Other</option>
            </select>
          </div>
          <div style={em.field}>
            <label style={em.label}>Location</label>
            <input type="text" value={form.location} onChange={handleChange("location")} style={em.input} />
          </div>
        </div>

        {/* About */}
        <div style={{ marginBottom: 18 }}>
          <label style={em.label}>About <span style={{ fontWeight: 400, color: colors.gray[400] }}>(shown to freelancers)</span></label>
          <textarea value={form.about} onChange={handleChange("about")} rows={3} style={em.textarea} />
        </div>

        {/* Website */}
        <div style={{ marginBottom: 24 }}>
          <label style={em.label}>Website <span style={{ fontWeight: 400, color: colors.gray[400] }}>(optional)</span></label>
          <input type="url" placeholder="https://yourwebsite.com" value={form.website} onChange={handleChange("website")} style={em.input} />
        </div>

        {/* Actions */}
        <div style={em.actions}>
          <button onClick={onClose} style={em.cancelBtn}>Cancel</button>
          <button onClick={onClose} style={em.saveBtn}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ── Edit Modal Styles ──
const em = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" },
  modal: { background: "white", borderRadius: borderRadius.xl, padding: "28px 32px", width: "min(520px, 92vw)", maxHeight: "90vh", overflowY: "auto", position: "relative" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 },
  title: { fontSize: 18, fontWeight: 700, color: colors.text.primary, margin: 0 },
  closeBtn: { background: "none", border: "none", cursor: "pointer", padding: 4 },
  changePhotoBtn: { display: "flex", alignItems: "center", gap: 6, background: colors.gray[100], border: `1px solid ${colors.gray[200]}`, borderRadius: borderRadius.md, padding: "6px 12px", fontSize: 12, fontWeight: 500, color: colors.gray[600], cursor: "pointer", fontFamily: "inherit" },
  row: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 18 },
  field: {},
  label: { display: "block", fontSize: 13, fontWeight: 600, color: colors.text.secondary, marginBottom: 6 },
  input: { width: "100%", padding: "10px 14px", border: `1px solid ${colors.gray[300]}`, borderRadius: borderRadius.md, fontSize: 14, color: colors.text.primary, outline: "none", fontFamily: "inherit", boxSizing: "border-box" },
  select: { width: "100%", padding: "10px 14px", border: `1px solid ${colors.gray[300]}`, borderRadius: borderRadius.md, fontSize: 14, color: colors.text.primary, outline: "none", fontFamily: "inherit", boxSizing: "border-box", background: "white", appearance: "auto" },
  textarea: { width: "100%", padding: "10px 14px", border: `1px solid ${colors.gray[300]}`, borderRadius: borderRadius.md, fontSize: 14, color: colors.text.primary, outline: "none", fontFamily: "inherit", boxSizing: "border-box", resize: "vertical", lineHeight: 1.6 },
  actions: { display: "flex", justifyContent: "flex-end", gap: 12 },
  cancelBtn: { padding: "10px 20px", background: "white", color: colors.text.secondary, border: `1px solid ${colors.gray[300]}`, borderRadius: borderRadius.md, fontSize: 14, fontWeight: 500, cursor: "pointer", fontFamily: "inherit" },
  saveBtn: { padding: "10px 28px", background: colors.primary, color: "white", border: "none", borderRadius: borderRadius.md, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
};

// ── Banner ──
function ProfileBanner({ profile, onEdit }) {
  return (
    <div style={st.banner}>
      <div style={st.bannerInner}>
        <div style={st.bannerTop}>
          <div style={st.avatar}>{profile.initials}</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={st.nameRow}>
              <h1 style={st.name}>{profile.name}</h1>
              {profile.verified && (
                <Badge variant="blue" style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                  <VerifiedIcon /> Verified Client
                </Badge>
              )}
            </div>
            <p style={st.infoLine}>
              {profile.role} · {profile.location} · Member since {profile.memberSince}
            </p>
            <div style={st.tagRow}>
              {profile.tags.map((t) => (
                <span key={t.label} style={st.tag}>{t.icon} {t.label}</span>
              ))}
            </div>
            <div style={st.statsRow}>
              {profile.stats.map((s, i) => (
                <div key={i} style={st.statItem}>
                  <span style={{ ...st.statValue, color: s.color }}>{s.value}</span>
                  <span style={st.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={st.actionCol}>
            <button style={st.editBtn} onClick={onEdit}><EditIcon /> Edit Profile</button>
            <button style={st.msgBtn}><MsgIcon /> Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tabs ──
function TabNav({ active, onChange }) {
  const tabs = ["Overview", "Projects", "Reviews Given"];
  return (
    <div style={st.tabRow}>
      {tabs.map((tab) => (
        <button key={tab} onClick={() => onChange(tab)}
          style={{ ...st.tab, ...(active === tab ? st.tabActive : {}) }}
        >{tab}</button>
      ))}
    </div>
  );
}

// ── Active Project Card ──
function ProjectCard({ project }) {
  const statusColors = { Open: "green", "In Progress": "orange", Completed: "blue" };
  return (
    <div style={st.projectCard}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
        <h4 style={{ fontSize: 14, fontWeight: 600, color: colors.text.primary, margin: 0 }}>{project.title}</h4>
        <Badge variant={statusColors[project.status] || "gray"}>{project.status}</Badge>
      </div>
      <p style={{ fontSize: 12, color: colors.gray[500], margin: "0 0 4px" }}>Budget: {project.budget} · {project.timeline}</p>
      <p style={{ fontSize: 12, color: colors.accent, margin: 0 }}>{project.extra}</p>
    </div>
  );
}

// ── Hire History Item ──
function HireItem({ hire }) {
  return (
    <div style={st.hireItem}>
      <div style={{ ...st.hireAvatar, background: hire.color }}>{hire.initials}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: colors.text.primary }}>{hire.name}</div>
        <div style={{ fontSize: 12, color: colors.gray[500] }}>{hire.project} · {hire.amount}</div>
      </div>
      <StarRating rating={hire.rating} size={12} />
    </div>
  );
}

// ── Review Card ──
function ReviewGivenCard({ review }) {
  return (
    <div style={st.reviewCard}>
      <div style={st.reviewTop}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ ...st.hireAvatar, background: review.color }}>{review.initials}</div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: colors.text.primary }}>{review.name}</div>
            <div style={{ fontSize: 12, color: colors.gray[400] }}>{review.timeAgo} · {review.project}</div>
          </div>
        </div>
        <StarRating rating={review.rating} size={13} />
      </div>
      <p style={{ fontSize: 14, color: colors.gray[600], margin: 0, lineHeight: 1.65 }}>{review.comment}</p>
    </div>
  );
}

// ── Project Grid Card (Projects tab) ──
function ProjectGridCard({ project }) {
  const statusStyles = {
    Open: { color: colors.success, border: colors.success },
    "In Progress": { color: colors.orange, border: colors.orange },
    Completed: { color: "#0d9488", border: "#0d9488" },
  };
  const sty = statusStyles[project.status] || statusStyles.Open;

  return (
    <div style={st.pCard}>
      {/* Top: Category + Status */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <Badge variant="gray" style={{ fontSize: 12, padding: "4px 12px", borderRadius: borderRadius.pill, border: `1px solid ${colors.gray[300]}` }}>
          {project.category}
        </Badge>
        <span style={{ fontSize: 12, fontWeight: 600, color: sty.color, border: `1.5px solid ${sty.border}`, borderRadius: borderRadius.pill, padding: "3px 12px" }}>
          {project.status}{project.statusExtra ? ` · ${project.statusExtra}` : ""}
        </span>
      </div>

      {/* Title + Description */}
      <h4 style={{ fontSize: 16, fontWeight: 700, color: colors.text.primary, margin: "0 0 8px" }}>{project.title}</h4>
      <p style={{ fontSize: 13, color: colors.gray[500], margin: "0 0 16px", lineHeight: 1.6 }}>{project.desc}</p>

      {/* Skills */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 16 }}>
        {project.skills.map((sk) => (
          <Badge key={sk} variant="gray" style={{ fontSize: 11, padding: "4px 12px", borderRadius: borderRadius.pill, border: `1px solid ${colors.gray[200]}` }}>
            {sk}
          </Badge>
        ))}
      </div>

      <div style={{ height: 1, background: colors.gray[200], marginBottom: 14 }} />

      {/* Price + Action */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 16, fontWeight: 700, color: colors.success }}>{project.budget}</span>
        <button style={project.actionFilled ? st.pBtnFilled : st.pBtnOutline}>{project.action}</button>
      </div>
    </div>
  );
}

// ── Main Page ──
export default function ClientProfile() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [showEdit, setShowEdit] = useState(false);

  return (
    <div style={st.page}>
      <Header />
      <ProfileBanner profile={PROFILE} onEdit={() => setShowEdit(true)} />

      <div style={st.container}>
        <TabNav active={activeTab} onChange={setActiveTab} />

        {activeTab === "Overview" && (
          <div style={st.contentRow}>
            <div style={st.leftCol}>
              <section style={st.card}>
                <h3 style={st.cardTitle}>About</h3>
                {PROFILE.about.map((p, i) => (
                  <p key={i} style={st.aboutText}>{p}</p>
                ))}
              </section>
              <section style={st.card}>
                <h3 style={st.cardTitle}>What I Look For in Freelancers</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {PROFILE.lookingFor.map((item, i) => (
                    <div key={i} style={{ display: "flex", gap: 12 }}>
                      <span style={st.lookIcon}>{item.icon}</span>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: colors.text.primary, marginBottom: 2 }}>{item.title}</div>
                        <div style={{ fontSize: 13, color: colors.gray[500] }}>{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
            <div style={st.rightCol}>
              <section style={st.card}>
                <h3 style={st.cardTitle}>Active Projects</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {PROFILE.activeProjects.map((p, i) => (
                    <ProjectCard key={i} project={p} />
                  ))}
                </div>
              </section>
              <section style={st.card}>
                <h3 style={st.cardTitle}>Hire History</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {PROFILE.hireHistory.map((h, i) => (
                    <HireItem key={i} hire={h} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === "Projects" && (
          <div style={st.pGrid}>
            {PROFILE.projects.map((p, i) => (
              <ProjectGridCard key={i} project={p} />
            ))}
          </div>
        )}

        {activeTab === "Reviews Given" && (
          <div style={{ maxWidth: 740, marginTop: 20 }}>
            <section style={st.card}>
              <h3 style={st.cardTitle}>Reviews Given ({PROFILE.reviewsGiven.length})</h3>

              {/* Reputation Summary */}
              <div style={st.repCard}>
                <div style={{ display: "flex", alignItems: "flex-end", gap: 16 }}>
                  <div>
                    <span style={st.repScore}>{PROFILE.reputation.avg}</span>
                    <div style={{ marginTop: 4 }}><StarRating rating={parseFloat(PROFILE.reputation.avg)} size={14} /></div>
                    <span style={{ fontSize: 12, color: colors.gray[400], marginTop: 2, display: "block" }}>avg given</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 14, color: colors.gray[600], marginBottom: 4 }}>
                      Reputation: <strong style={{ color: colors.success }}>{PROFILE.reputation.label}</strong>
                    </div>
                    <div style={{ fontSize: 13, color: colors.gray[400] }}>
                      {PROFILE.reputation.traits.join(" · ")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Review List */}
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {PROFILE.reviewsGiven.map((r, i) => (
                  <ReviewGivenCard key={i} review={r} />
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      <Footer />

      {showEdit && (
        <EditProfileModal profile={PROFILE} onClose={() => setShowEdit(false)} />
      )}
    </div>
  );
}

// ── Styles ──
const st = {
  page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: colors.bg.page, minHeight: "100vh" },
  container: { maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" },

  // Banner
  banner: { background: `linear-gradient(135deg, ${colors.primary} 0%, #3b1f8e 100%)`, padding: "28px 0 0" },
  bannerInner: { maxWidth: 1100, margin: "0 auto", padding: "0 24px 24px" },
  bannerTop: { display: "flex", gap: 20, alignItems: "flex-start" },
  avatar: {
    width: 72, height: 72, borderRadius: borderRadius.lg,
    background: "#7c3aed", color: "white",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 24, fontWeight: 700, letterSpacing: 1, flexShrink: 0,
  },
  nameRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" },
  name: { fontSize: 22, fontWeight: 700, color: "white", margin: 0 },
  infoLine: { fontSize: 13, color: "rgba(255,255,255,0.7)", margin: "0 0 10px" },
  tagRow: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 },
  tag: {
    fontSize: 12, color: "rgba(255,255,255,0.85)",
    background: "rgba(255,255,255,0.12)", padding: "4px 14px",
    borderRadius: borderRadius.pill, border: "1px solid rgba(255,255,255,0.15)",
  },
  statsRow: { display: "flex", gap: 24, flexWrap: "wrap" },
  statItem: { display: "flex", flexDirection: "column", alignItems: "center" },
  statValue: { fontSize: 16, fontWeight: 700 },
  statLabel: { fontSize: 11, color: "rgba(255,255,255,0.6)" },
  actionCol: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 },
  editBtn: {
    display: "flex", alignItems: "center", gap: 6,
    padding: "8px 18px", background: "rgba(255,255,255,0.12)", color: "white",
    border: "1px solid rgba(255,255,255,0.2)", borderRadius: borderRadius.md,
    fontSize: 13, fontWeight: 500, cursor: "pointer", fontFamily: "inherit",
  },
  msgBtn: {
    display: "flex", alignItems: "center", gap: 6,
    padding: "8px 20px", background: colors.accent, color: "white",
    border: "none", borderRadius: borderRadius.md, fontSize: 13,
    fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
  },

  // Tabs
  tabRow: {
    display: "flex", gap: 0, background: "white",
    borderRadius: `${borderRadius.lg}px ${borderRadius.lg}px 0 0`,
    borderBottom: `1px solid ${colors.gray[200]}`, marginTop: -1,
  },
  tab: {
    padding: "14px 24px", background: "none", border: "none",
    borderBottom: "3px solid transparent",
    fontSize: 14, fontWeight: 500, color: colors.gray[500],
    cursor: "pointer", fontFamily: "inherit",
  },
  tabActive: { color: colors.primary, borderBottomColor: colors.primary, fontWeight: 600, background: "white" },

  // Content
  contentRow: { display: "flex", gap: 24, alignItems: "flex-start", marginTop: 20 },
  leftCol: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 20 },
  rightCol: { width: 320, flexShrink: 0, display: "flex", flexDirection: "column", gap: 20 },

  // Card
  card: { background: "white", borderRadius: borderRadius.lg, padding: 24, boxShadow: shadows.sm, border: `1px solid ${colors.gray[200]}` },
  cardTitle: { fontSize: 17, fontWeight: 700, color: colors.text.primary, margin: "0 0 14px" },

  // About
  aboutText: { fontSize: 14, color: colors.gray[600], lineHeight: 1.7, margin: "0 0 10px" },

  // Look for
  lookIcon: { fontSize: 20, width: 36, height: 36, borderRadius: borderRadius.md, background: colors.gray[100], display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },

  // Project card
  projectCard: { border: `1px solid ${colors.gray[200]}`, borderRadius: borderRadius.md, padding: 14 },

  // Hire item
  hireItem: { display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: `1px solid ${colors.gray[100]}` },
  hireAvatar: {
    width: 36, height: 36, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0,
  },

  // Reputation card
  repCard: {
    background: colors.gray[50], border: `1px solid ${colors.gray[200]}`,
    borderRadius: borderRadius.lg, padding: "18px 20px", marginBottom: 8,
  },
  repScore: { fontSize: 36, fontWeight: 700, color: colors.primary, lineHeight: 1 },

  // Review card
  reviewCard: { padding: "18px 0", borderBottom: `1px solid ${colors.gray[200]}` },
  reviewTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },

  // Project grid (Projects tab)
  pGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 },
  pCard: {
    background: "white", borderRadius: borderRadius.xl, padding: 22,
    border: `1px solid ${colors.gray[200]}`, boxShadow: shadows.sm,
  },
  pBtnFilled: {
    padding: "8px 20px", background: colors.primary, color: "white",
    border: "none", borderRadius: borderRadius.md, fontSize: 13,
    fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
  },
  pBtnOutline: {
    padding: "8px 20px", background: "white", color: colors.text.secondary,
    border: `1px solid ${colors.gray[300]}`, borderRadius: borderRadius.md,
    fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
  },
};
