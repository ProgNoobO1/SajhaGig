import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Badge } from "../components/ui";
import { colors, borderRadius, shadows } from "../constants/theme";
import api from "../api/client";

const FALLBACK_CATEGORIES = [
  "Graphics & Design", "Digital Marketing", "Writing & Translation",
  "Video & Animation", "Music & Audio", "Programming & Tech",
  "Photography", "Business",
];

const FALLBACK_CARD = {
  id: 1,
  badge: "Web Dev",
  status: "Open",
  title: "Build a Restaurant Website for Thamel",
  description: "Need a responsive site with menu, booking and contact form for a busy restaurant in...",
  weeks: 3,
  proposals: 5,
  tags: ["React", "CSS", "Node.js"],
  price: "₹8,674",
};

function ProjectCard({ card }) {
  const navigate = useNavigate();
  return (
    <div style={s.card} onClick={() => navigate(`/job/${card.id}`)} role="button" tabIndex={0}>
      <div style={{ display: "flex", gap: 6, marginBottom: 8 }}>
        <Badge variant="blue">{card.badge}</Badge>
        <Badge variant="green">{card.status}</Badge>
      </div>
      <h4 style={s.cardTitle}>{card.title}</h4>
      <p style={s.cardDesc}>{card.description}</p>
      <div style={s.statsRow}>
        <span style={s.stat}>⏱ {card.weeks} weeks</span>
        <span style={s.stat}>📄 {card.proposals} proposals</span>
        <span style={s.stat}>📅 Posted today</span>
      </div>
      <div style={s.tagRow}>
        {card.tags.map((tag) => <Badge key={tag} variant="dark">{tag}</Badge>)}
      </div>
      <div style={s.priceRow}>
        <span style={s.priceLabel}>STARTING AT</span>
        <span style={s.price}>{card.price}</span>
      </div>
    </div>
  );
}

function CategoryBar({ categories }) {
  const [active, setActive] = useState(0);
  return (
    <div style={s.categoryBar}>
      {categories.map((cat, i) => (
        <button key={cat} onClick={() => setActive(i)}
          style={{ ...s.catBtn, ...(active === i ? s.catBtnActive : {}) }}
        >{cat}</button>
      ))}
    </div>
  );
}

function CardSection({ title, highlight, bordered, cards }) {
  return (
    <section style={{ ...s.section, ...(bordered ? s.borderedSection : {}) }}>
      <h2 style={s.sectionTitle}>
        {title} {highlight && <span style={s.sectionHighlight}>{highlight}</span>}
      </h2>
      <div style={s.cardGrid}>
        {cards.map((card, i) => <ProjectCard key={i} card={card} />)}
      </div>
    </section>
  );
}

export default function FindWork() {
  const [jobs, setJobs] = useState([]);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/jobs').then((data) => {
      const mapped = (data.jobs || []).map((j) => ({
        id: j.id,
        badge: j.category || "Web Dev",
        status: j.status === "open" ? "Open" : j.status,
        title: j.title,
        description: j.description?.slice(0, 90) + "..." || "",
        weeks: Math.ceil((j.budgetMax || 8674) / 3000),
        proposals: j.proposalCount || 0,
        tags: j.skills || [],
        price: `₹${Number(j.budgetMax || 0).toLocaleString()}`,
      }));
      setJobs(mapped);
    }).catch(() => {
      setJobs(Array(5).fill(FALLBACK_CARD));
    }).finally(() => setLoading(false));

    api.get('/categories').then((data) => {
      setCategories(data.categories.map((c) => c.name));
    }).catch(() => {});
  }, []);

  const cards = jobs.length ? jobs : Array(5).fill(FALLBACK_CARD);

  return (
    <div style={s.page}>
      <Header />
      <CategoryBar categories={categories} />

      <main style={s.main}>
        {/* Hero Section */}
        <div style={{ padding: "28px 0 16px" }}>
          <h1 style={{ fontSize: 26, fontWeight: 700, color: colors.text.primary, marginBottom: 16 }}>Hey Ekta ,</h1>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[0, 1].map(i => (
              <div key={i} style={s.ctaBanner}>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 600, margin: 0, color: "#fff" }}>Get a perfect gig Suggestion for a Service you need</p>
                  <p style={{ fontSize: 12, opacity: 0.85, margin: "4px 0 0", color: "#fff" }}>Tell us what Service you need</p>
                </div>
                <span style={{ fontSize: 28, fontWeight: 300, color: "#fff" }}>›</span>
              </div>
            ))}
          </div>
        </div>

        {/* Continue browsing */}
        <div style={s.carouselWrap}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontSize: 16, fontWeight: 600, color: colors.text.primary }}>Continue browsing →</h3>
            <div>
              <button style={s.arrowBtn}>‹</button>
              <button style={s.arrowBtn}>›</button>
            </div>
          </div>
          <div style={s.cardGrid}>
            {cards.map((card, i) => <ProjectCard key={i} card={card} />)}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 14 }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: colors.accentDark, display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: colors.gray[300], display: "inline-block" }} />
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: colors.gray[300], display: "inline-block" }} />
          </div>
        </div>

        <CardSection title="Most popular Projects in" highlight="App Design" bordered cards={cards} />

        <section style={s.section}>
          <h2 style={s.sectionTitle}>Projects you may like</h2>
          <div style={s.cardGrid}>
            {cards.map((c, i) => <ProjectCard key={i} card={c} />)}
          </div>
          <div style={{ ...s.cardGrid, marginTop: 16 }}>
            {cards.map((c, i) => <ProjectCard key={"r" + i} card={c} />)}
          </div>
        </section>

        <section style={s.section}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
            <div>
              <h2 style={s.sectionTitle}>
                Verified Pro services in <span style={s.sectionHighlight}>App Design</span>
              </h2>
              <p style={{ fontSize: 13, color: colors.text.muted, margin: "4px 0 0" }}>Hand-vetted talent for all your professional needs.</p>
            </div>
            <a href="#" style={{ color: colors.accent, fontSize: 13, textDecoration: "none", fontWeight: 600 }}>See All ›</a>
          </div>
          <div style={s.cardGrid}>
            {cards.map((c, i) => <ProjectCard key={i} card={c} />)}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

const s = {
  page: { fontFamily: "'Segoe UI', sans-serif", background: "#f5f6fa", minHeight: "100vh" },
  categoryBar: { background: colors.white, display: "flex", gap: 4, padding: "0 24px", borderBottom: `1px solid ${colors.gray[200]}`, overflowX: "auto" },
  catBtn: { background: "none", border: "none", padding: "12px 14px", fontSize: 13, cursor: "pointer", color: colors.text.secondary, whiteSpace: "nowrap", borderBottom: "2px solid transparent" },
  catBtnActive: { color: colors.primary, borderBottom: `2px solid ${colors.primary}`, fontWeight: 600 },
  main: { maxWidth: 1200, margin: "0 auto", padding: "0 24px 40px" },
  ctaBanner: { flex: 1, minWidth: 260, background: colors.bg.ctaGreen, color: colors.white, borderRadius: borderRadius.lg, padding: "18px 20px", display: "flex", justifyContent: "space-between", alignItems: "center", cursor: "pointer" },
  carouselWrap: { background: colors.white, borderRadius: borderRadius.xl, padding: 20, margin: "24px 0", boxShadow: shadows.sm },
  arrowBtn: { background: colors.gray[100], border: `1px solid ${colors.gray[200]}`, borderRadius: 6, padding: "4px 10px", cursor: "pointer", fontSize: 18, marginLeft: 6 },
  section: { margin: "28px 0" },
  borderedSection: { border: `2px solid ${colors.accent}`, borderRadius: borderRadius.xl, padding: 20, background: colors.white },
  sectionTitle: { fontSize: 18, fontWeight: 700, color: colors.text.primary, marginBottom: 16 },
  sectionHighlight: { color: colors.accent },
  cardGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 16 },
  card: { background: colors.white, border: `1px solid ${colors.gray[200]}`, borderRadius: borderRadius.lg, padding: 14, boxShadow: shadows.sm, cursor: "pointer", transition: "box-shadow 0.2s" },
  cardTitle: { fontSize: 13, fontWeight: 700, color: colors.text.primary, margin: "0 0 6px", lineHeight: 1.4 },
  cardDesc: { fontSize: 12, color: colors.text.muted, margin: "0 0 10px", lineHeight: 1.5 },
  statsRow: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 },
  stat: { fontSize: 11, color: colors.text.muted },
  tagRow: { display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 10 },
  priceRow: { display: "flex", alignItems: "center", gap: 6, marginTop: 6 },
  priceLabel: { fontSize: 9, color: colors.gray[400], textTransform: "uppercase", letterSpacing: 0.5 },
  price: { fontSize: 13, fontWeight: 700, color: colors.text.primary },
};
