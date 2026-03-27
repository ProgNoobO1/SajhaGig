import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Badge, StarRating, ReviewCard } from "../components/ui";
import { colors, borderRadius, shadows } from "../constants/theme";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

// ── Sample Data ──
const PROFILE = {
  initials: "SS",
  name: "Sulav Shrestha",
  verified: true,
  topRated: true,
  title: "Full Stack Developer",
  location: "Kathmandu, Nepal",
  rate: "Rs. 25/hr",
  memberSince: "Jan 2024",
  skills: ["React", "Node.js", "MySQL", "Tailwind", "Express.js", "MongoDB", "TypeScript"],
  stats: [
    { value: "4.9", label: "Rating", icon: "★" },
    { value: "24", label: "Jobs Done" },
    { value: "Rs.82K", label: "Earned" },
    { value: "98%", label: "On-time" },
    { value: "100%", label: "Rehire" },
  ],
  about: [
    "Full stack developer with 3+ years building web applications for Nepali businesses and NGOs. I specialize in React and Node.js with strong focus on clean code, performance, and great UX. Previously worked with startups in Thamel and NGOs across Kathmandu.",
    "Currently pursuing B.Sc. IT at Itahari International College. Available for freelance projects part-time.",
  ],
  portfolio: [
    { title: "SajloGig Platform", desc: "Freelancing marketplace for Nepal — full stack with React + Node.js + MySQL" },
    { title: "NGO Website", desc: "Donation system and volunteer management for Kathmandu NGO" },
    { title: "E-commerce Store", desc: "Full shopping experience with payment integration and admin panel" },
    { title: "School Dashboard", desc: "Student management system with grade tracking and parent portal" },
    { title: "Restaurant Website", desc: "Menu, table booking, and social media integration for Thamel restaurant" },
    { title: "Food Delivery App", desc: "React Native mobile app with real-time order tracking for Pokhara" },
  ],
  activeGigs: [
    { title: "Modern Logo Design", price: "Rs. 2,500" },
    { title: "React Landing Page", price: "Rs. 6,000" },
    { title: "Full Stack Web App", price: "Rs. 15,000" },
  ],
  gigCards: [
    { title: "Modern logo and brand identity", icon: "🎨", rating: 4.8, reviews: 48, price: "Rs. 2,500", bg: "#fce4ec" },
    { title: "React landing page — clean & responsive", icon: "💻", rating: 4.7, reviews: 22, price: "Rs. 6,000", bg: "#e3f2fd" },
    { title: "Full stack web application (React + Node)", icon: "🚀", rating: 4.9, reviews: 12, price: "Rs. 15,000", bg: "#e8f5e9" },
    { title: "REST API development with Node & Express", icon: "⚙️", rating: 4.6, reviews: 8, price: "Rs. 5,000", bg: "#fff3e0" },
    { title: "Database design and optimization (MySQL)", icon: "🗄️", rating: 4.8, reviews: 15, price: "Rs. 3,500", bg: "#f3e5f5" },
    { title: "Bug fixing and code review", icon: "🐛", rating: 5.0, reviews: 31, price: "Rs. 1,500", bg: "#e0f7fa" },
  ],
  reviews: [
    { name: "Ram Chaudhary", initials: "RC", color: "#2dd4a8", rating: 5, timeAgo: "2 days ago", project: "Restaurant Website", comment: "Excellent work! Delivered on time and went beyond expectations. Will definitely hire again." },
    { name: "Priya Magar", initials: "PM", color: "#a855f7", rating: 5, timeAgo: "1 week ago", project: "Logo Design", comment: "Very professional and creative. The final logo perfectly captures our brand identity." },
    { name: "Bishal Tamang", initials: "BT", color: "#3b82f6", rating: 4, timeAgo: "2 weeks ago", project: "E-commerce Site", comment: "Good work overall. Responsive to feedback and made all requested changes." },
    { name: "Sita Maharjan", initials: "SM", color: "#f59e0b", rating: 5, timeAgo: "3 weeks ago", project: "NGO Website", comment: "Amazing developer! Built exactly what we needed. The donation system works flawlessly." },
    { name: "Ankit Sharma", initials: "AS", color: "#ef4444", rating: 5, timeAgo: "1 month ago", project: "Dashboard App", comment: "Clean code and great communication throughout the project. Highly recommended!" },
    { name: "Deepa Gurung", initials: "DG", color: "#22c55e", rating: 4, timeAgo: "1 month ago", project: "API Development", comment: "Solid backend work. Well-documented API endpoints and fast delivery." },
  ],
};

// ── Verified Badge Icon ──
const VerifiedIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={colors.accent} stroke="white" strokeWidth="2">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

// ── Pencil Icon ──
const EditIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

// ── Message Icon ──
const MsgIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

// ── Profile Banner ──
function ProfileBanner({ profile, onEdit }) {
  return (
    <div style={st.banner}>
      <div style={st.bannerInner}>
        {/* Top Row: Avatar + Info + Actions */}
        <div style={st.bannerTop}>
          <div style={st.avatarWrap}>
            <div style={st.avatar}>{profile.initials}</div>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            {/* Name + Badges */}
            <div style={st.nameRow}>
              <h1 style={st.name}>{profile.name}</h1>
              {profile.verified && (
                <Badge variant="blue" style={{ fontSize: 11, display: "flex", alignItems: "center", gap: 4 }}>
                  <VerifiedIcon /> Verified
                </Badge>
              )}
              {profile.topRated && <Badge variant="green">Top Rated</Badge>}
            </div>
            {/* Info line */}
            <p style={st.infoLine}>
              {profile.title} · {profile.location} · {profile.rate} · Member since {profile.memberSince}
            </p>
            {/* Skills */}
            <div style={st.skillRow}>
              {profile.skills.map((sk) => (
                <span key={sk} style={st.skillTag}>{sk}</span>
              ))}
            </div>
            {/* Stats */}
            <div style={st.statsRow}>
              {profile.stats.map((s, i) => (
                <div key={i} style={st.statItem}>
                  <span style={st.statValue}>
                    {s.value}{s.icon && <span style={{ color: colors.star }}>{s.icon}</span>}
                  </span>
                  <span style={st.statLabel}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* Actions */}
          <div style={st.actionCol}>
            <a href="#" onClick={(e) => { e.preventDefault(); onEdit && onEdit(); }} style={st.editLink}><EditIcon /> Edit Profile</a>
            <button style={st.msgBtn}><MsgIcon /> Message</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tab Navigation ──
function TabNav({ active, onChange }) {
  const tabs = ["Overview", "Gigs", "Reviews", "Portfolio"];
  return (
    <div style={st.tabRow}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          style={{ ...st.tab, ...(active === tab ? st.tabActive : {}) }}
        >{tab}</button>
      ))}
    </div>
  );
}

// ── Portfolio Card ──
function PortfolioCard({ item }) {
  return (
    <div style={st.portfolioCard}>
      <h4 style={st.portfolioTitle}>{item.title}</h4>
      <p style={st.portfolioDesc}>{item.desc}</p>
    </div>
  );
}

// ── Active Gig Card ──
function GigCard({ gig }) {
  return (
    <div style={st.gigCard}>
      <h4 style={st.gigTitle}>{gig.title}</h4>
      <span style={st.gigPrice}>From {gig.price}</span>
    </div>
  );
}

// ── Gig Grid Card (for Gigs tab) ──
function GigGridCard({ gig }) {
  return (
    <div style={st.gigGridCard}>
      <div style={{ ...st.gigGridImg, background: gig.bg }}>
        <span style={{ fontSize: 40 }}>{gig.icon}</span>
      </div>
      <div style={st.gigGridBody}>
        <h4 style={st.gigGridTitle}>{gig.title}</h4>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 10 }}>
          <StarRating rating={gig.rating} size={12} />
          <span style={{ fontSize: 12, color: colors.gray[400] }}>({gig.reviews})</span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: colors.success }}>{gig.price}</span>
          <button style={st.orderBtn}>Order</button>
        </div>
      </div>
    </div>
  );
}

// ── Review Card (full) ──
function ProfileReviewCard({ review }) {
  return (
    <div style={st.reviewCard}>
      <div style={st.reviewTop}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ ...st.reviewAvatar, background: review.color }}>{review.initials}</div>
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

// ── Mini Review Card (sidebar) ──
function MiniReview({ review }) {
  return (
    <div style={st.miniReview}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: colors.text.primary }}>{review.name}</span>
        <StarRating rating={review.rating} size={12} />
      </div>
      <p style={{ fontSize: 13, color: colors.gray[500], margin: 0, lineHeight: 1.5 }}>{review.comment}</p>
    </div>
  );
}

// ── Edit Profile Modal (Freelancer) ──
function EditProfileModal({ onClose }) {
  const [form, setForm] = useState({
    fullName: PROFILE.name,
    title: PROFILE.title,
    rate: "25",
    skills: PROFILE.skills.join(", "),
    location: PROFILE.location,
    about: PROFILE.about.join("\n\n"),
    website: "",
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleChange = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  return (
    <div style={em.overlay} onClick={onClose}>
      <div style={em.modal} onClick={(e) => e.stopPropagation()}>
        <div style={em.header}>
          <h2 style={em.title}>Edit Freelancer Profile</h2>
          <button onClick={onClose} style={em.closeBtn}>&times;</button>
        </div>

        <div style={em.avatarRow}>
          <div style={em.avatarPreview}>{PROFILE.initials}</div>
          <button style={em.changePhotoBtn}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" /></svg>
            Change Photo
          </button>
        </div>

        <div style={em.row2}>
          <div style={em.field}>
            <label style={em.label}>Full Name</label>
            <input style={em.input} value={form.fullName} onChange={handleChange("fullName")} />
          </div>
          <div style={em.field}>
            <label style={em.label}>Title / Role</label>
            <input style={em.input} value={form.title} onChange={handleChange("title")} placeholder="e.g. Full Stack Developer" />
          </div>
        </div>

        <div style={em.row2}>
          <div style={em.field}>
            <label style={em.label}>Hourly Rate (Rs.)</label>
            <input style={em.input} type="number" value={form.rate} onChange={handleChange("rate")} />
          </div>
          <div style={em.field}>
            <label style={em.label}>Location</label>
            <input style={em.input} value={form.location} onChange={handleChange("location")} />
          </div>
        </div>

        <div style={em.field}>
          <label style={em.label}>Skills <span style={em.hint}>(comma separated)</span></label>
          <input style={em.input} value={form.skills} onChange={handleChange("skills")} placeholder="React, Node.js, MySQL..." />
        </div>

        <div style={em.field}>
          <label style={em.label}>About <span style={em.hint}>(shown on your profile)</span></label>
          <textarea style={em.textarea} rows={3} value={form.about} onChange={handleChange("about")} />
        </div>

        <div style={em.field}>
          <label style={em.label}>Website / Portfolio URL <span style={em.hint}>(optional)</span></label>
          <input style={em.input} value={form.website} onChange={handleChange("website")} placeholder="https://yoursite.com" />
        </div>

        <div style={em.actions}>
          <button onClick={onClose} style={em.cancelBtn}>Cancel</button>
          <button onClick={onClose} style={em.saveBtn}>Save Changes</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ──
export default function FreelancerProfile() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [showEdit, setShowEdit] = useState(false);
  const { user } = useAuth();
  const [profile, setProfile] = useState(PROFILE);

  useEffect(() => {
    if (!user) return;
    api.get(`/users/${user.id}`).then((data) => {
      const u = data.user;
      if (u) {
        setProfile((prev) => ({
          ...prev,
          initials: u.initials || prev.initials,
          name: `${u.firstName} ${u.lastName}`,
          title: u.freelancerProfile?.title || prev.title,
          location: u.location || prev.location,
          rate: u.freelancerProfile?.hourlyRate ? `Rs. ${u.freelancerProfile.hourlyRate}/hr` : prev.rate,
          skills: u.skills?.length ? u.skills : prev.skills,
          stats: [
            { value: String(u.freelancerProfile?.rating || prev.stats[0].value), label: "Rating", icon: "★" },
            { value: String(u.freelancerProfile?.jobsCompleted || prev.stats[1].value), label: "Jobs Done" },
            { value: u.freelancerProfile?.totalEarnings ? `Rs.${(u.freelancerProfile.totalEarnings / 1000).toFixed(0)}K` : prev.stats[2].value, label: "Earned" },
            { value: u.freelancerProfile?.onTimeDelivery || prev.stats[3].value, label: "On-time" },
            { value: u.freelancerProfile?.rehireRate || prev.stats[4].value, label: "Rehire" },
          ],
          about: u.bio ? [u.bio] : prev.about,
        }));
      }
    }).catch(() => {});

    api.get(`/reviews/user/${user.id}`).then((data) => {
      if (data.reviews?.length) {
        setProfile((prev) => ({
          ...prev,
          reviews: data.reviews.map((r) => ({
            name: r.reviewerName || "User",
            initials: (r.reviewerName || "U").split(" ").map(w => w[0]).join(""),
            color: ["#2dd4a8", "#a855f7", "#3b82f6", "#f59e0b", "#ef4444", "#22c55e"][Math.floor(Math.random() * 6)],
            rating: r.rating,
            timeAgo: r.timeAgo || "recently",
            project: r.projectName || "Project",
            comment: r.comment,
          })),
        }));
      }
    }).catch(() => {});
  }, [user]);

  return (
    <div style={st.page}>
      <Header />
      <ProfileBanner profile={profile} onEdit={() => setShowEdit(true)} />
      {showEdit && <EditProfileModal onClose={() => setShowEdit(false)} />}

      <div style={st.container}>
        <TabNav active={activeTab} onChange={setActiveTab} />

        {/* ── Tab Content ── */}
        {activeTab === "Overview" && (
          <div style={st.contentRow}>
            <div style={st.leftCol}>
              <section style={st.card}>
                <h3 style={st.cardTitle}>About Me</h3>
                {profile.about.map((p, i) => (
                  <p key={i} style={st.aboutText}>{p}</p>
                ))}
              </section>
              <section style={st.card}>
                <h3 style={st.cardTitle}>Portfolio</h3>
                <div style={st.portfolioGrid}>
                  {profile.portfolio.map((item, i) => (
                    <PortfolioCard key={i} item={item} />
                  ))}
                </div>
              </section>
            </div>
            <div style={st.rightCol}>
              <section style={st.card}>
                <h3 style={st.cardTitle}>Active Gigs</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {profile.activeGigs.map((gig, i) => (
                    <GigCard key={i} gig={gig} />
                  ))}
                </div>
              </section>
              <section style={st.card}>
                <h3 style={st.cardTitle}>Recent Reviews</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  {profile.reviews.map((review, i) => (
                    <MiniReview key={i} review={review} />
                  ))}
                </div>
              </section>
            </div>
          </div>
        )}

        {activeTab === "Gigs" && (
          <div style={st.gigGrid}>
            {profile.gigCards.map((gig, i) => (
              <GigGridCard key={i} gig={gig} />
            ))}
          </div>
        )}

        {activeTab === "Reviews" && (
          <div style={{ maxWidth: 740, marginTop: 20 }}>
            <section style={st.card}>
              <h3 style={st.cardTitle}>All Reviews ({profile.reviews.length * 8})</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
                {profile.reviews.map((review, i) => (
                  <ProfileReviewCard key={i} review={review} />
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === "Portfolio" && (
          <div style={st.portfolioFullGrid}>
            {profile.portfolio.map((item, i) => (
              <PortfolioCard key={i} item={item} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}

// ── Styles ──
const st = {
  page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: colors.bg.page, minHeight: "100vh" },
  container: { maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" },

  // ── Banner ──
  banner: { background: colors.primary, padding: "28px 0 0" },
  bannerInner: { maxWidth: 1100, margin: "0 auto", padding: "0 24px 24px" },
  bannerTop: { display: "flex", gap: 20, alignItems: "flex-start" },
  avatarWrap: { flexShrink: 0 },
  avatar: {
    width: 72, height: 72, borderRadius: borderRadius.lg,
    background: "#2dd4a8", color: "white",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 24, fontWeight: 700, letterSpacing: 1,
  },
  nameRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexWrap: "wrap" },
  name: { fontSize: 22, fontWeight: 700, color: "white", margin: 0 },
  infoLine: { fontSize: 13, color: "rgba(255,255,255,0.7)", margin: "0 0 12px" },
  skillRow: { display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 },
  skillTag: {
    fontSize: 11, fontWeight: 500, color: colors.text.secondary,
    background: "white", padding: "4px 12px",
    borderRadius: borderRadius.pill, border: `1px solid ${colors.gray[200]}`,
  },
  statsRow: { display: "flex", gap: 24, flexWrap: "wrap" },
  statItem: { display: "flex", flexDirection: "column", alignItems: "center" },
  statValue: { fontSize: 16, fontWeight: 700, color: "white" },
  statLabel: { fontSize: 11, color: "rgba(255,255,255,0.6)" },
  actionCol: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 10, flexShrink: 0 },
  editLink: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 500, color: "rgba(255,255,255,0.8)", textDecoration: "none" },
  msgBtn: {
    display: "flex", alignItems: "center", gap: 6,
    padding: "8px 20px", background: colors.accent, color: "white",
    border: "none", borderRadius: borderRadius.md, fontSize: 13,
    fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
    whiteSpace: "nowrap",
  },

  // ── Tabs ──
  tabRow: {
    display: "flex", gap: 0, background: "white",
    borderRadius: `${borderRadius.lg}px ${borderRadius.lg}px 0 0`,
    borderBottom: `1px solid ${colors.gray[200]}`,
    marginTop: -1,
  },
  tab: {
    padding: "14px 24px", background: "none", border: "none",
    borderBottom: "3px solid transparent",
    fontSize: 14, fontWeight: 500, color: colors.gray[500],
    cursor: "pointer", fontFamily: "inherit",
  },
  tabActive: {
    color: colors.primary, borderBottomColor: colors.primary, fontWeight: 600,
    background: "white",
  },

  // ── Content ──
  contentRow: { display: "flex", gap: 24, alignItems: "flex-start", marginTop: 20 },
  leftCol: { flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 20 },
  rightCol: { width: 300, flexShrink: 0, display: "flex", flexDirection: "column", gap: 20 },

  // ── Card ──
  card: {
    background: "white", borderRadius: borderRadius.lg,
    padding: 24, boxShadow: shadows.sm,
    border: `1px solid ${colors.gray[200]}`,
  },
  cardTitle: { fontSize: 17, fontWeight: 700, color: colors.text.primary, margin: "0 0 14px" },

  // ── About ──
  aboutText: { fontSize: 14, color: colors.gray[600], lineHeight: 1.7, margin: "0 0 10px" },

  // ── Portfolio ──
  portfolioGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 },
  portfolioFullGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginTop: 20 },
  portfolioCard: {
    background: "white", border: `1px solid ${colors.gray[200]}`, borderRadius: borderRadius.lg,
    padding: 20, transition: "box-shadow 0.2s", cursor: "pointer",
    boxShadow: shadows.sm,
  },
  portfolioTitle: { fontSize: 15, fontWeight: 700, color: colors.text.primary, margin: "0 0 8px" },
  portfolioDesc: { fontSize: 13, color: colors.gray[500], margin: 0, lineHeight: 1.55 },

  // ── Gig Card ──
  gigCard: {
    border: `1px solid ${colors.gray[200]}`, borderRadius: borderRadius.md,
    padding: "12px 16px", cursor: "pointer", transition: "box-shadow 0.2s",
  },
  gigTitle: { fontSize: 14, fontWeight: 600, color: colors.text.primary, margin: "0 0 2px" },
  gigPrice: { fontSize: 13, color: colors.success, fontWeight: 500 },

  // ── Review Card (full) ──
  reviewCard: { padding: "18px 0", borderBottom: `1px solid ${colors.gray[200]}` },
  reviewTop: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 },
  reviewAvatar: {
    width: 36, height: 36, borderRadius: "50%",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 13, fontWeight: 700, color: "white", flexShrink: 0,
  },

  // ── Mini Review (sidebar) ──
  miniReview: { borderBottom: `1px solid ${colors.gray[100]}`, paddingBottom: 12 },

  // ── Gig Grid (Gigs tab) ──
  gigGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginTop: 20 },
  gigGridCard: {
    background: "white", borderRadius: borderRadius.xl,
    border: `1px solid ${colors.gray[200]}`, overflow: "hidden",
    boxShadow: shadows.sm, transition: "box-shadow 0.2s", cursor: "pointer",
  },
  gigGridImg: {
    height: 140, display: "flex", alignItems: "center", justifyContent: "center",
  },
  gigGridBody: { padding: "14px 18px 18px" },
  gigGridTitle: { fontSize: 14, fontWeight: 600, color: colors.text.primary, margin: "0 0 6px", lineHeight: 1.4 },
  orderBtn: {
    padding: "6px 18px", background: colors.primary, color: "white",
    border: "none", borderRadius: borderRadius.md, fontSize: 12,
    fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
  },
};

// ── Edit Modal Styles ──
const em = {
  overlay: {
    position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
  modal: {
    background: "white", borderRadius: borderRadius.xl, padding: "28px 32px",
    width: "min(520px, 92vw)", maxHeight: "90vh", overflowY: "auto",
  },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  title: { fontSize: 18, fontWeight: 700, color: colors.text.primary, margin: 0 },
  closeBtn: {
    background: "none", border: "none", fontSize: 24, color: colors.gray[400],
    cursor: "pointer", lineHeight: 1,
  },
  avatarRow: { display: "flex", alignItems: "center", gap: 16, marginBottom: 20 },
  avatarPreview: {
    width: 56, height: 56, borderRadius: borderRadius.lg, background: "#2dd4a8",
    color: "white", display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 20, fontWeight: 700,
  },
  changePhotoBtn: {
    display: "flex", alignItems: "center", gap: 6, padding: "8px 16px",
    border: `1px solid ${colors.gray[300]}`, borderRadius: borderRadius.md,
    background: "white", fontSize: 13, fontWeight: 500, color: colors.text.secondary,
    cursor: "pointer", fontFamily: "inherit",
  },
  row2: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 },
  field: { marginBottom: 14 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: colors.text.primary, marginBottom: 6 },
  hint: { fontWeight: 400, color: colors.gray[400] },
  input: {
    width: "100%", padding: "9px 12px", border: `1px solid ${colors.gray[300]}`,
    borderRadius: borderRadius.md, fontSize: 14, fontFamily: "inherit",
    outline: "none", boxSizing: "border-box",
  },
  textarea: {
    width: "100%", padding: "9px 12px", border: `1px solid ${colors.gray[300]}`,
    borderRadius: borderRadius.md, fontSize: 14, fontFamily: "inherit",
    outline: "none", resize: "vertical", boxSizing: "border-box",
  },
  actions: { display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 20 },
  cancelBtn: {
    padding: "9px 22px", border: `1px solid ${colors.gray[300]}`, borderRadius: borderRadius.md,
    background: "white", fontSize: 14, fontWeight: 600, color: colors.text.secondary,
    cursor: "pointer", fontFamily: "inherit",
  },
  saveBtn: {
    padding: "9px 22px", border: "none", borderRadius: borderRadius.md,
    background: colors.primary, fontSize: 14, fontWeight: 600, color: "white",
    cursor: "pointer", fontFamily: "inherit",
  },
};
