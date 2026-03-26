import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Badge } from "../components/ui";
import { colors, borderRadius, shadows } from "../constants/theme";

// ── Category Bar ──
const CATEGORIES = [
  "Development & IT", "AI Services", "Design & Creative",
  "Sales & Marketing", "Admin & Customer Support", "More",
];

function CategoryBar() {
  const [active, setActive] = useState(2);
  return (
    <div style={st.categoryBar}>
      {CATEGORIES.map((cat, i) => (
        <button key={cat} onClick={() => setActive(i)}
          style={{ ...st.catBtn, ...(active === i ? st.catBtnActive : {}) }}
        >{cat}</button>
      ))}
    </div>
  );
}

// ── Sample Job Data ──
const JOB = {
  title: "Build a graphic",
  postedAgo: "12 hours ago",
  location: "Worldwide",
  summary: {
    jobTitle: "Proposal Graphic Designer – Premium Process Infographic (Painting Industry)",
    description: [
      "We're looking for a talented graphic designer to create a high-end, visually engaging infographic for our proposal documents.",
      "This graphic will represent our Communication & Delivery Process for major painting projects (strata and commercial), and needs to feel clean, premium, and easy to follow — something that builds trust and impresses clients at proposal stage.",
    ],
    whatWeNeed: "A triple-page infographic (A4 portrait) that visually maps out our process in a portrait timeline or flow format.",
    designRequirements: [
      "Minimal and modern",
      "Easy to read at a glance",
      "Professionally structured (corporate, not playful)",
      "Aligned with a premium service brand",
    ],
  },
  price: "$50.00",
  priceType: "Fixed price",
  level: "Intermediate",
  levelSub: "Experience Level",
  remote: true,
  projectType: "One-time project",
  skills: ["Canva", "Graphic Design", "Illustration"],
  activity: {
    proposals: "Less than 5",
    lastViewed: "11 hours ago",
    interviewing: 0,
    invitesSent: 0,
    unansweredInvites: 0,
  },
  client: {
    memberSince: "Feb 9, 2020",
    country: "Australia",
    localTime: "5:19 AM",
  },
  similarJobs: [
    {
      title: "VIP Logo Re-imagined",
      postedAgo: "Hourly: Posted 7 months ago",
      skills: ["Logo Design", "Graphic Design", "Print Design"],
    },
    {
      title: "Fix T-Shirt Artwork - Anti Alias/Ghost on Artwork",
      postedAgo: "Fixed price: Posted 8 months ago",
      skills: ["Adobe Illustrator", "Graphic Design", "Print Design"],
    },
  ],
  howItWorks: [
    { img: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=300&h=200&fit=crop", title: "Create your free profile", desc: "Highlight your skills and experience, show your portfolio, and set your ideal pay rate." },
    { img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=300&h=200&fit=crop", title: "Work the way you want", desc: "Apply for jobs, create easy-to-buy projects, or access exclusive opportunities that come to you." },
    { img: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=300&h=200&fit=crop", title: "Get paid securely", desc: "From contract to payment, we help you work safely and get paid securely." },
  ],
  aboutStats: [
    { value: "4.9/5", label: "(Average rating of clients by professionals)", hasStars: true },
    { value: "G2 2021", label: "#1 freelance platform" },
    { value: "49,000+", label: "Signed contract every week" },
    { value: "$2.3B", label: "Freelancers earned on SajhaGIG in 2020" },
  ],
  otherClientJobs: [
    { title: "Build a graphic", type: "Fixed-price" },
    { title: "Graphic Design Needed for Creative Project", type: "Hourly" },
  ],
};

// ── Icons ──
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.gray[400]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const GlobeIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={colors.gray[400]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const DollarIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.success} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const BarChartIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.orange} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

const MapPinIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={colors.gray[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

// ── Main Page ──
export default function JobDetail() {
  const navigate = useNavigate();

  return (
    <div style={st.page}>
      <Header />
      <CategoryBar />

      <main style={st.main}>
        {/* Title + Apply */}
        <div style={st.titleRow}>
          <h1 style={st.title}>{JOB.title}</h1>
          <button style={st.applyBtn} onClick={() => navigate("/find-work")}>
            Apply Now
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
          </button>
        </div>

        {/* Meta */}
        <div style={st.metaRow}>
          <span style={st.metaItem}><ClockIcon /> Posted {JOB.postedAgo}</span>
          <span style={st.metaItem}><GlobeIcon /> {JOB.location}</span>
        </div>

        <div style={st.divider} />

        {/* Summary */}
        <section style={st.section}>
          <h3 style={st.sectionLabel}>Summary</h3>
          <p style={st.subLabel}>Job Title</p>
          <p style={st.bodyText}>{JOB.summary.jobTitle}</p>

          <p style={st.subLabel}>Job Description:</p>
          {JOB.summary.description.map((p, i) => (
            <p key={i} style={st.bodyText}>{p}</p>
          ))}

          <p style={st.subLabel}>What We Need Designed:</p>
          <p style={st.bodyText}>{JOB.summary.whatWeNeed}</p>

          <p style={st.subLabel}>The design should be:</p>
          <ul style={st.reqList}>
            {JOB.summary.designRequirements.map((r, i) => (
              <li key={i} style={st.reqItem}>{r}</li>
            ))}
          </ul>
        </section>

        <div style={st.divider} />

        {/* Job Details Row */}
        <section style={st.detailsRow}>
          <div style={st.detailItem}>
            <DollarIcon />
            <div>
              <div style={st.detailValue}>{JOB.price}</div>
              <div style={st.detailLabel}>{JOB.priceType}</div>
            </div>
          </div>
          <div style={st.detailItem}>
            <BarChartIcon />
            <div>
              <div style={st.detailValue}>{JOB.level}</div>
              <div style={st.detailLabel}>{JOB.levelSub}</div>
            </div>
          </div>
          <div style={st.detailItem}>
            <MapPinIcon />
            <div>
              <div style={st.detailValue}>Remote Job</div>
            </div>
          </div>
        </section>

        {/* Project Type */}
        <div style={{ ...st.detailItem, marginBottom: 24 }}>
          <BriefcaseIcon />
          <div>
            <div style={st.detailValue}>{JOB.projectType}</div>
            <div style={st.detailLabel}>Project Type</div>
          </div>
        </div>

        <div style={st.divider} />

        {/* Skills and Expertise */}
        <section style={st.section}>
          <h3 style={st.sectionTitle}>Skills and Expertise</h3>
          <p style={st.subLabel}>Mandatory skills</p>
          <div style={st.tagRow}>
            {JOB.skills.map((skill) => (
              <Badge key={skill} variant="gray" style={{ fontSize: 12, padding: "5px 14px", borderRadius: borderRadius.pill, border: `1px solid ${colors.gray[200]}` }}>
                {skill}
              </Badge>
            ))}
          </div>
        </section>

        <div style={st.divider} />

        {/* Activity on this job */}
        <section style={st.section}>
          <h3 style={st.sectionTitle}>Activity on this job</h3>
          <div style={st.activityRow}>
            <span style={st.activityItem}>Proposals: <strong>{JOB.activity.proposals}</strong></span>
            <span style={st.activityItem}>Last viewed by client: <strong>{JOB.activity.lastViewed}</strong></span>
            <span style={st.activityItem}>Interviewing: <strong>{JOB.activity.interviewing}</strong></span>
            <span style={st.activityItem}>Invites sent: <strong>{JOB.activity.invitesSent}</strong></span>
            <span style={st.activityItem}>Unanswered invites: <strong>{JOB.activity.unansweredInvites}</strong></span>
          </div>
        </section>

        <div style={st.divider} />

        {/* About the client */}
        <section style={st.section}>
          <h3 style={st.sectionTitle}>About the client</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <span style={st.clientInfo}>Member since {JOB.client.memberSince}</span>
            <span style={st.clientInfo}>{JOB.client.country}</span>
            <span style={st.clientInfo}>{JOB.client.localTime}</span>
          </div>
        </section>

        <div style={st.divider} />

        {/* Similar Jobs */}
        <section style={st.section}>
          <h3 style={st.sectionTitle}>Explore similar jobs on Upwork</h3>
          <div style={st.similarGrid}>
            {JOB.similarJobs.map((job, i) => (
              <div key={i} style={st.similarCard}>
                <a href="#" style={st.similarTitle}>{job.title}</a>
                <p style={st.similarMeta}>{job.postedAgo}</p>
                <div style={st.tagRow}>
                  {job.skills.map((sk) => (
                    <Badge key={sk} variant="gray" style={{ fontSize: 11, padding: "4px 10px", borderRadius: borderRadius.pill, border: `1px solid ${colors.gray[200]}` }}>
                      {sk}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <div style={st.divider} />

        {/* How it works */}
        <section style={st.section}>
          <h3 style={{ ...st.sectionTitle, fontSize: 20, marginBottom: 20 }}>How it works</h3>
          <div style={st.howGrid}>
            {JOB.howItWorks.map((item, i) => (
              <div key={i} style={st.howCard}>
                <div style={st.howImgWrap}>
                  <img src={item.img} alt={item.title} style={st.howImg} />
                </div>
                <h4 style={st.howTitle}>{item.title}</h4>
                <p style={st.howDesc}>{item.desc}</p>
              </div>
            ))}
          </div>
          <div style={st.createProfileRow}>
            <span style={{ fontSize: 14, color: colors.text.secondary }}>Want to get started?</span>
            <a href="/signup/freelancer" style={st.createProfileLink}>
              Create a profile
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </a>
          </div>
        </section>

        <div style={st.divider} />

        {/* About SajhaGIG */}
        <section style={st.section}>
          <h3 style={{ ...st.sectionTitle, fontSize: 20, marginBottom: 20 }}>About SajhaGIG</h3>
          <div style={st.statsGrid}>
            {JOB.aboutStats.map((stat, i) => (
              <div key={i}>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                  {stat.hasStars && <span style={{ color: colors.star, fontSize: 14 }}>★★★★★</span>}
                  <span style={{ fontSize: 18, fontWeight: 700, color: colors.text.primary }}>{stat.value}</span>
                </div>
                <p style={{ fontSize: 13, color: colors.gray[500], margin: 0, lineHeight: 1.4 }}>{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <div style={st.divider} />

        {/* Find the best freelance jobs */}
        <section style={st.section}>
          <h3 style={{ ...st.sectionTitle, fontSize: 20, marginBottom: 8 }}>Find the best freelance jobs</h3>
          <p style={{ fontSize: 14, color: colors.gray[600], margin: "0 0 18px", lineHeight: 1.6 }}>
            Growing your career is as easy as creating a free profile and finding work like this that fits your skills.
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <button style={st.findWorkBtn} onClick={() => navigate("/find-work")}>Find Work</button>
            <a href="#" style={st.watchDemo}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill={colors.accent} stroke="none"><circle cx="12" cy="12" r="10" /><polygon points="10,8 16,12 10,16" fill="white" /></svg>
              Watch a demo
            </a>
          </div>
          <p style={{ fontSize: 13, color: colors.gray[500], margin: "0 0 12px" }}>Trusted by</p>
          <div style={st.trustedRow}>
            {["Microsoft", "airbnb", "bissell", "GoDaddy"].map((brand) => (
              <span key={brand} style={st.trustedBrand}>{brand}</span>
            ))}
          </div>
        </section>

        <div style={st.divider} />

        {/* Other open jobs by this Client */}
        <section style={{ ...st.section, marginBottom: 0 }}>
          <h3 style={{ ...st.sectionTitle, fontSize: 16 }}>Other open jobs by this Client ({JOB.otherClientJobs.length})</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {JOB.otherClientJobs.map((job, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <a href="#" style={{ fontSize: 14, color: colors.accent, textDecoration: "underline" }}>{job.title}</a>
                <span style={{ fontSize: 13, color: colors.gray[500] }}>{job.type}</span>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

// ── Styles ──
const st = {
  page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: "#fff", minHeight: "100vh" },

  // Category bar
  categoryBar: { background: colors.white, display: "flex", gap: 4, padding: "0 24px", borderBottom: `1px solid ${colors.gray[200]}`, overflowX: "auto" },
  catBtn: { background: "none", border: "none", padding: "12px 14px", fontSize: 13, cursor: "pointer", color: colors.text.secondary, whiteSpace: "nowrap", borderBottom: "2px solid transparent", fontFamily: "inherit" },
  catBtnActive: { color: colors.primary, borderBottom: `2px solid ${colors.primary}`, fontWeight: 600 },

  // Main
  main: { maxWidth: 820, margin: "0 auto", padding: "28px 24px 50px" },

  // Title
  titleRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12, gap: 20, flexWrap: "wrap" },
  title: { fontSize: 24, fontWeight: 700, color: colors.text.primary, margin: 0 },
  applyBtn: {
    display: "flex", alignItems: "center", gap: 8,
    padding: "10px 24px", background: colors.primary, color: "white",
    border: "none", borderRadius: borderRadius.md, fontSize: 14,
    fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
    whiteSpace: "nowrap",
  },

  // Meta
  metaRow: { display: "flex", gap: 20, alignItems: "center", marginBottom: 20 },
  metaItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: colors.gray[500] },

  // Section
  section: { marginBottom: 24 },
  sectionLabel: { fontSize: 13, fontWeight: 600, color: colors.text.secondary, margin: "0 0 8px" },
  sectionTitle: { fontSize: 16, fontWeight: 700, color: colors.text.primary, margin: "0 0 14px" },
  subLabel: { fontSize: 13, fontWeight: 600, color: colors.text.secondary, margin: "12px 0 4px" },
  bodyText: { fontSize: 14, color: colors.gray[600], lineHeight: 1.7, margin: "0 0 8px" },

  // Requirements list
  reqList: { paddingLeft: 20, margin: "4px 0 0" },
  reqItem: { fontSize: 14, color: colors.gray[600], lineHeight: 1.8 },

  // Divider
  divider: { height: 1, background: colors.gray[200], margin: "20px 0" },

  // Details row
  detailsRow: { display: "flex", gap: 40, flexWrap: "wrap", marginBottom: 20 },
  detailItem: { display: "flex", alignItems: "center", gap: 10 },
  detailValue: { fontSize: 14, fontWeight: 600, color: colors.text.primary },
  detailLabel: { fontSize: 12, color: colors.gray[500], marginTop: 1 },

  // Tags
  tagRow: { display: "flex", gap: 8, flexWrap: "wrap" },

  // Activity
  activityRow: { display: "flex", gap: 24, flexWrap: "wrap" },
  activityItem: { fontSize: 13, color: colors.gray[500] },

  // Client
  clientInfo: { fontSize: 13, color: colors.gray[600] },

  // Similar jobs
  similarGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 },
  similarCard: { border: `1px solid ${colors.gray[200]}`, borderRadius: borderRadius.lg, padding: 16 },
  similarTitle: { fontSize: 14, fontWeight: 600, color: colors.accent, textDecoration: "none", display: "block", marginBottom: 6 },
  similarMeta: { fontSize: 12, color: colors.gray[500], margin: "0 0 10px" },

  // How it works
  howGrid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 },
  howCard: {},
  howImgWrap: { borderRadius: borderRadius.lg, overflow: "hidden", marginBottom: 12, background: "#5BA892" },
  howImg: { width: "100%", height: 160, objectFit: "cover", display: "block", mixBlendMode: "multiply", opacity: 0.85 },
  howTitle: { fontSize: 15, fontWeight: 700, color: colors.text.primary, margin: "0 0 6px" },
  howDesc: { fontSize: 13, color: colors.gray[500], margin: 0, lineHeight: 1.55 },
  createProfileRow: { display: "flex", alignItems: "center", gap: 4, marginTop: 20, paddingTop: 16, borderTop: `1px solid ${colors.gray[200]}` },
  createProfileLink: { display: "flex", alignItems: "center", gap: 4, fontSize: 14, fontWeight: 600, color: colors.text.primary, textDecoration: "underline", textUnderlineOffset: 2 },

  // About stats
  statsGrid: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 },

  // Find work CTA
  findWorkBtn: {
    padding: "10px 24px", background: colors.primary, color: "white",
    border: "none", borderRadius: borderRadius.md, fontSize: 14,
    fontWeight: 600, cursor: "pointer", fontFamily: "inherit",
  },
  watchDemo: { display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: colors.accent, textDecoration: "none" },
  trustedRow: { display: "flex", alignItems: "center", gap: 32 },
  trustedBrand: { fontSize: 18, fontWeight: 700, color: colors.gray[400], letterSpacing: 0.5 },
};
