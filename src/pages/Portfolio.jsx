import { useState } from "react";
import { DashboardLayout } from "../components/layout";
import { StarRating } from "../components/ui";
import { colors, borderRadius, shadows } from "../constants/theme";

const PORTFOLIO_ITEMS = [
  { id: 1, title: "Razor Website Design", rating: 5.0, image: "https://picsum.photos/seed/razor-web/460/300" },
  { id: 2, title: "Transport Website", rating: 5.0, image: "https://picsum.photos/seed/transport-web/460/300" },
  { id: 3, title: "Wordpress Website", rating: 5.0, image: "https://picsum.photos/seed/wordpress-web/460/300" },
  { id: 4, title: "Healthcare Website", rating: 5.0, image: "https://picsum.photos/seed/healthcare-web/460/300" },
  { id: 5, title: "Inquiry Website", rating: 5.0, image: "https://picsum.photos/seed/inquiry-web/460/300" },
  { id: 6, title: "Ecommerce Website", rating: 5.0, image: "https://picsum.photos/seed/ecommerce-web/460/300" },
  { id: 7, title: "Mobile App", rating: 5.0, image: "https://picsum.photos/seed/mobile-app/460/300" },
  { id: 8, title: "Law Website", rating: 5.0, image: "https://picsum.photos/seed/law-web/460/300" },
  { id: 9, title: "Ecommerce Website", rating: 5.0, image: "https://picsum.photos/seed/hotel-ecommerce/460/300" },
];

function CardIconBtn({ color, icon }) {
  return (
    <div style={{ ...s.cardIconBtn, background: color }}>
      <span style={{ fontSize: 10 }}>{icon}</span>
    </div>
  );
}

function PortfolioCard({ item }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      style={{ ...s.portfolioCard, ...(hovered ? s.portfolioCardHover : {}) }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div style={s.cardTopIcons}>
        <CardIconBtn color="#6c63ff" icon="✏" />
        <CardIconBtn color="#ff4d4f" icon="🗑" />
      </div>

      <img src={item.image} alt={item.title} style={s.cardImage} />

      <div style={s.cardOverlay}>
        <div style={s.cardBottom}>
          <div>
            <p style={s.cardTitle}>{item.title}</p>
            <StarRating rating={item.rating} size={12} showValue />
          </div>
          <div style={s.arrowBtn}>→</div>
        </div>
      </div>
    </div>
  );
}

export default function Portfolio() {
  const [activeLabel, setActiveLabel] = useState("Portfolio");

  return (
    <DashboardLayout
      role="freelancer"
      activeLabel={activeLabel}
      onLinkClick={setActiveLabel}
      profileName="John Smith"
      profileEmail="walter@sample.com"
    >
      <div style={s.sectionHeader}>
        <h3 style={s.sectionTitle}>Bookmarked Projects</h3>
        <button style={s.addPortfolioBtn}>+ Add Portfolio</button>
      </div>

      <div style={s.grid}>
        {PORTFOLIO_ITEMS.map((item) => (
          <PortfolioCard key={item.id} item={item} />
        ))}
      </div>
    </DashboardLayout>
  );
}

const s = {
  sectionHeader: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  sectionTitle: { fontSize: 17, fontWeight: 700, color: colors.text.primary, margin: 0 },
  addPortfolioBtn: { background: colors.primary, color: colors.white, border: "none", borderRadius: 7, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
  grid: { display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 },
  portfolioCard: { position: "relative", borderRadius: borderRadius.xl, overflow: "hidden", boxShadow: shadows.md, transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer", height: 220, background: "#000" },
  portfolioCardHover: { transform: "translateY(-4px)", boxShadow: shadows.hover },
  cardImage: { width: "100%", height: "100%", objectFit: "cover", display: "block", opacity: 0.85 },
  cardTopIcons: { position: "absolute", top: 10, right: 10, display: "flex", gap: 6, zIndex: 2 },
  cardIconBtn: { width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: colors.white, cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.3)" },
  cardOverlay: { position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,0.75))", padding: "28px 14px 12px" },
  cardBottom: { display: "flex", alignItems: "flex-end", justifyContent: "space-between" },
  cardTitle: { color: colors.white, fontWeight: 700, fontSize: 13, margin: "0 0 4px" },
  arrowBtn: { width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,0.2)", color: colors.white, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, border: "1px solid rgba(255,255,255,0.4)", flexShrink: 0 },
};
