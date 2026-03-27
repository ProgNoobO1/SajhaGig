import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { StarRating } from "../components/ui";
import { colors, borderRadius, shadows } from "../constants/theme";
import api from "../api/client";

const FALLBACK_CATEGORIES = [
  "Graphics & Design", "Digital Marketing", "Writing & Translation",
  "Video & Animation", "Music & Audio", "Programming & Tech",
  "Photography", "Business",
];

const HeartIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#e74c3c" : "none"} stroke={filled ? "#e74c3c" : "#aaa"} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

function GigCard({ gig }) {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  return (
    <div style={s.gigCard}
      onClick={() => navigate(`/gig/${gig.id}`)}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = shadows.hover; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = shadows.sm; }}
    >
      <div style={s.sellerRow}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <img src={gig.avatar} alt={gig.seller} style={s.sellerAvatar} />
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: colors.text.primary }}>{gig.seller}</div>
            <div style={{ fontSize: 10, fontWeight: 600, color: gig.badgeColor }}>{gig.badge}</div>
          </div>
        </div>
      </div>
      <img src={gig.img} alt={gig.title} style={s.gigImage} />
      <div style={{ padding: "10px 12px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
          <button onClick={e => { e.stopPropagation(); setLiked(l => !l); }} style={s.likeBtn}>
            <HeartIcon filled={liked} />
            <span style={{ fontSize: 11, color: "#aaa" }}>{gig.likes}</span>
          </button>
        </div>
        <p style={s.gigTitle}>{gig.title}</p>
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 6 }}>
          <StarRating rating={gig.rating} size={12} />
          <span style={{ fontSize: 11, fontWeight: 700, color: colors.text.primary }}>{gig.rating.toFixed(1)}</span>
          <span style={{ fontSize: 11, color: "#888" }}>({gig.reviews})</span>
        </div>
        <div style={{ fontSize: 11, color: "#aaa" }}>
          STARTING AT <span style={{ fontWeight: 700, color: colors.primary, fontSize: 13 }}>{gig.price}</span>
        </div>
      </div>
    </div>
  );
}

function CategoryBar({ active, onSelect, categories }) {
  return (
    <div style={s.categoryBar}>
      {categories.map(cat => (
        <button key={cat} onClick={() => onSelect(cat === active ? null : cat)}
          style={{ ...s.catBtn, ...(active === cat ? s.catBtnActive : {}) }}
          onMouseEnter={e => { if (cat !== active) e.currentTarget.style.color = "#fff"; }}
          onMouseLeave={e => { if (cat !== active) e.currentTarget.style.color = "#a8c4e8"; }}
        >{cat}</button>
      ))}
    </div>
  );
}

const CARD_WIDTH = 210;
function Carousel({ items }) {
  const scrollRef = useRef(null);
  const [page, setPage] = useState(0);
  const totalPages = 3;

  const scroll = (dir) => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = CARD_WIDTH * 5;
    el.scrollBy({ left: dir === "next" ? amount : -amount, behavior: "smooth" });
    setPage(p => dir === "next" ? Math.min(p + 1, totalPages - 1) : Math.max(p - 1, 0));
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <span style={{ fontWeight: 700, fontSize: 16, color: colors.primaryDark }}>Continue browsing →</span>
        <div style={{ display: "flex", gap: 8 }}>
          {["prev", "next"].map(dir => (
            <button key={dir} onClick={() => scroll(dir)} style={s.carouselBtn}>
              {dir === "prev" ? "‹" : "›"}
            </button>
          ))}
        </div>
      </div>
      <div ref={scrollRef} style={s.scrollTrack}>
        {items.map((g, i) => (
          <div key={i} style={{ minWidth: CARD_WIDTH, maxWidth: CARD_WIDTH, scrollSnapAlign: "start", flex: "0 0 auto" }}>
            <GigCard gig={{ ...g, avatar: `https://i.pravatar.cc/32?img=${(i % 12) + 1}` }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 6, marginTop: 16 }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <div key={i}
            onClick={() => { const el = scrollRef.current; if (el) { el.scrollTo({ left: i * CARD_WIDTH * 5, behavior: "smooth" }); setPage(i); } }}
            style={{ width: page === i ? 24 : 8, height: 8, borderRadius: 4, background: page === i ? colors.primary : "#d0d7e8", cursor: "pointer", transition: "width 0.25s, background 0.25s" }}
          />
        ))}
      </div>
    </div>
  );
}

export default function BrowseGigs() {
  const [activeCategory, setActiveCategory] = useState(null);
  const [gigs, setGigs] = useState([]);
  const [categories, setCategories] = useState(FALLBACK_CATEGORIES);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/gigs').then((data) => {
      const mapped = data.gigs.map((g, i) => ({
        id: g.id,
        seller: g.seller?.username || "seller",
        badge: g.seller?.badge || "",
        badgeColor: g.seller?.badgeColor || "#888",
        likes: g.likes >= 1000 ? `${(g.likes / 1000).toFixed(1)}K` : String(g.likes || 0),
        title: g.title,
        rating: Number(g.rating) || 0,
        reviews: g.reviewCount || 0,
        price: `₹${Number(g.price || 0).toLocaleString()}`,
        img: g.image || `https://picsum.photos/seed/gig${g.id}/300/180`,
        avatar: g.seller?.avatar || `https://i.pravatar.cc/32?img=${(i % 10) + 1}`,
      }));
      setGigs(mapped);
    }).catch(() => {}).finally(() => setLoading(false));

    api.get('/categories').then((data) => {
      setCategories(data.categories.map((c) => c.name));
    }).catch(() => {});
  }, []);

  const carouselGigs = [...gigs, ...gigs, ...gigs].slice(0, 15);

  return (
    <div style={s.page}>
      <Header />
      <CategoryBar active={activeCategory} onSelect={setActiveCategory} categories={categories} />

      <div style={{ flex: 1 }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "32px 16px" }}>
          <h2 style={{ fontSize: 26, fontWeight: 700, color: colors.primaryDark, marginBottom: 20 }}>Hey Ekta ,</h2>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 32 }}>
            {[0, 1].map(i => (
              <div key={i} style={s.ctaBanner}>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>Get a perfect gig Suggestion for a Service you need</div>
                  <div style={{ color: "rgba(255,255,255,0.75)", fontSize: 13 }}>Tell us what Service you need</div>
                </div>
                <div style={s.ctaArrow}>›</div>
              </div>
            ))}
          </div>

          <div style={s.carouselWrap}>
            <Carousel items={carouselGigs} />
          </div>

          <GigSection title="Most popular Gigs in" highlight="App Design" gigs={gigs} />
          <GigSection title="Gigs you may like" gigs={[...gigs, ...gigs]} />

          <div style={s.proSection}>
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: colors.primaryDark, margin: "0 0 4px" }}>
                  Verified Pro services in <span style={{ color: colors.accent }}>App Design</span>
                </h3>
                <p style={{ fontSize: 13, color: "#888", margin: 0 }}>Hand-vetted talent for all your professional needs.</p>
              </div>
              <a href="#" style={s.seeAll}>See All ›</a>
            </div>
            <div style={s.gigGrid}>
              {gigs.map((g, i) => <GigCard key={"pro" + i} gig={{ ...g, avatar: `https://i.pravatar.cc/32?img=${(i % 10) + 20}` }} />)}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

function GigSection({ title, highlight, gigs: sectionGigs }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h3 style={{ fontSize: 20, fontWeight: 700, color: colors.primaryDark, marginBottom: 20, marginTop: 0 }}>
        {title} {highlight && <span style={{ color: colors.accent }}>{highlight}</span>}
      </h3>
      <div style={s.gigGrid}>
        {sectionGigs.map((g, i) => <GigCard key={i} gig={{ ...g, avatar: `https://i.pravatar.cc/32?img=${(i % 10) + 10}` }} />)}
      </div>
    </div>
  );
}

const s = {
  page: { fontFamily: "'DM Sans', sans-serif", background: "#f7f8fa", minHeight: "100vh", display: "flex", flexDirection: "column" },
  categoryBar: { background: colors.primaryLight, padding: "0 32px", display: "flex", gap: 4, overflowX: "auto", flexShrink: 0 },
  catBtn: { background: "none", border: "none", color: "#a8c4e8", fontSize: 13, fontWeight: 500, cursor: "pointer", padding: "14px 18px", whiteSpace: "nowrap", borderBottom: "2px solid transparent", transition: "color 0.15s" },
  catBtnActive: { color: "#fff", fontWeight: 700, borderBottom: `2px solid ${colors.accent}` },
  ctaBanner: { background: colors.bg.ctaGreen, borderRadius: 14, padding: "24px 28px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" },
  ctaArrow: { width: 36, height: 36, background: "rgba(255,255,255,0.18)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 22 },
  carouselWrap: { background: colors.white, borderRadius: 16, padding: "20px 24px", marginBottom: 36, boxShadow: shadows.lg },
  carouselBtn: { width: 32, height: 32, borderRadius: "50%", border: "1.5px solid #dde3ef", background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 },
  scrollTrack: { display: "flex", gap: 14, overflowX: "auto", scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" },
  gigGrid: { display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 14 },
  gigCard: { background: colors.white, borderRadius: borderRadius.xl, overflow: "hidden", boxShadow: shadows.sm, border: `1px solid ${colors.gray[100]}`, minWidth: 0, transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer" },
  sellerRow: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px 4px" },
  sellerAvatar: { width: 28, height: 28, borderRadius: "50%", objectFit: "cover" },
  gigImage: { width: "100%", height: 140, objectFit: "cover", display: "block" },
  likeBtn: { background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", gap: 3 },
  gigTitle: { fontSize: 12.5, fontWeight: 500, color: colors.text.primary, margin: "0 0 8px", lineHeight: 1.45, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" },
  proSection: { background: colors.white, borderRadius: 16, padding: "24px 24px 28px", boxShadow: shadows.lg, marginBottom: 40 },
  seeAll: { display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, color: colors.accent, textDecoration: "none", whiteSpace: "nowrap", marginTop: 4 },
};
