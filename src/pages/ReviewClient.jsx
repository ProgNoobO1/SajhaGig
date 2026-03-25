import { useState } from "react";
import Footer from "../components/Footer";

// ── Star Rating Component ──────────────────────────────────────────────────
// Shows filled / empty stars based on the `rating` prop (1-5)
function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: "2px" }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          style={{ color: star <= rating ? "#f5a623" : "#d0d0d0", fontSize: "16px" }}
        >
          ★
        </span>
      ))}
    </div>
  );
}

// ── Single Review Card ─────────────────────────────────────────────────────
function ReviewCard({ name, country, flag, rating, timeAgo, comment }) {
  return (
    <div
      style={{
        display: "flex",
        gap: "14px",
        padding: "20px 0",
        borderBottom: "1px solid #e8e8e8",
      }}
    >
      {/* Avatar Circle */}
      <div
        style={{
          width: "42px",
          height: "42px",
          borderRadius: "50%",
          backgroundColor: "#3b4cb8",
          color: "#fff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontWeight: "700",
          fontSize: "16px",
          flexShrink: 0,
        }}
      >
        {name.charAt(0).toUpperCase()}
      </div>

      {/* Review Body */}
      <div style={{ flex: 1 }}>
        {/* Name */}
        <p style={{ margin: 0, fontWeight: "600", color: "#222", fontSize: "14px" }}>
          {name}
        </p>

        {/* Country */}
        <p style={{ margin: "2px 0 6px", fontSize: "12px", color: "#666" }}>
          {flag} {country}
        </p>

        {/* Stars + Time */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
          <StarRating rating={rating} />
          <span style={{ fontSize: "12px", color: "#888" }}>{timeAgo}</span>
        </div>

        {/* Comment Text */}
        <p style={{ margin: 0, fontSize: "13px", color: "#444", lineHeight: "1.5" }}>
          {comment}
        </p>
      </div>
    </div>
  );
}

// ── Sidebar Navigation Link ────────────────────────────────────────────────
function SidebarLink({ icon, label, active, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "10px 14px",
        borderRadius: "6px",
        cursor: "pointer",
        backgroundColor: active ? "#eef0fb" : "transparent",
        color: active ? "#3b4cb8" : "#555",
        fontWeight: active ? "600" : "400",
        fontSize: "14px",
        marginBottom: "4px",
        transition: "background 0.2s",
      }}
    >
      <span>{icon}</span>
      <span>{label}</span>
    </div>
  );
}

// ── Pagination Component ───────────────────────────────────────────────────
function Pagination({ currentPage, totalPages, onPageChange }) {
  // Show first few pages + last page with dots
  const visiblePages = [1, 2, 3];

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "6px",
        marginTop: "24px",
      }}
    >
      {/* Previous arrow */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={pageButtonStyle(false, currentPage === 1)}
      >
        ‹
      </button>

      {/* Page numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={pageButtonStyle(page === currentPage, false)}
        >
          {page}
        </button>
      ))}

      {/* Dots */}
      <span style={{ fontSize: "14px", color: "#888", padding: "0 4px" }}>...</span>

      {/* Last page */}
      <button
        onClick={() => onPageChange(totalPages)}
        style={pageButtonStyle(currentPage === totalPages, false)}
      >
        {totalPages}
      </button>

      {/* Next arrow */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={pageButtonStyle(false, currentPage === totalPages)}
      >
        ›
      </button>
    </div>
  );
}

// Helper to build page button styles
function pageButtonStyle(isActive, isDisabled) {
  return {
    width: "32px",
    height: "32px",
    borderRadius: "6px",
    border: isActive ? "none" : "1px solid #ddd",
    backgroundColor: isActive ? "#3b4cb8" : "#fff",
    color: isActive ? "#fff" : isDisabled ? "#ccc" : "#444",
    cursor: isDisabled ? "not-allowed" : "pointer",
    fontSize: "13px",
    fontWeight: isActive ? "700" : "400",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.2s",
  };
}

// ── Sample Review Data ─────────────────────────────────────────────────────
const REVIEWS = [
  {
    id: 1,
    name: "marvinachi",
    country: "United States",
    flag: "🇺🇸",
    rating: 4,
    timeAgo: "2 months ago",
    comment:
      "Great work! I wanted a video to showcase my fitness app and the designer delivered an excellent job and on time. Highly satisfied, thank you!",
  },
  {
    id: 2,
    name: "marvinachi",
    country: "United States",
    flag: "🇺🇸",
    rating: 5,
    timeAgo: "2 months ago",
    comment:
      "Great work! I wanted a video to showcase my fitness app and the designer delivered an excellent job and on time. Highly satisfied, thank you!",
  },
  {
    id: 3,
    name: "marvinachi",
    country: "United States",
    flag: "🇺🇸",
    rating: 4,
    timeAgo: "2 months ago",
    comment:
      "Great work! I wanted a video to showcase my fitness app and the designer delivered an excellent job and on time. Highly satisfied, thank you!",
  },
  {
    id: 4,
    name: "marvinachi",
    country: "United States",
    flag: "🇺🇸",
    rating: 4,
    timeAgo: "2 months ago",
    comment:
      "Great work! I wanted a video to showcase my fitness app and the designer delivered an excellent job and on time. Highly satisfied, thank you!",
  },
];

// ── Main App Component ─────────────────────────────────────────────────────
export default function ReviewClient() {
  // Track which sidebar item is active
  const [activeNav, setActiveNav] = useState("Reviews");
  // Track current pagination page
  const [currentPage, setCurrentPage] = useState(1);

  const sidebarLinks = [
    { icon: "⊞", label: "Dashboard" },
    { icon: "📁", label: "Projects" },
    { icon: "★", label: "Reviews" },
    { icon: "💬", label: "Chat" },
    { icon: "⎋", label: "Logout" },
  ];

  return (
    <div style={{ fontFamily: "'Segoe UI', sans-serif", minHeight: "100vh", backgroundColor: "#f4f5f9" }}>

      {/* ── Top Navigation Bar ── */}
      <nav
        style={{
          backgroundColor: "#fff",
          padding: "0 24px",
          height: "56px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
        }}
      >
        {/* Logo */}
        <div style={{ fontWeight: "800", fontSize: "20px", color: "#3b4cb8" }}>
          SajhaGig
        </div>

        {/* Search Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
          <input
            type="text"
            placeholder="Search For Freelancers Or Services"
            style={{
              padding: "8px 14px",
              border: "1px solid #ddd",
              borderRadius: "6px 0 0 6px",
              fontSize: "13px",
              width: "220px",
              outline: "none",
            }}
          />
          <button
            style={{
              padding: "8px 14px",
              backgroundColor: "#3b4cb8",
              color: "#fff",
              border: "none",
              borderRadius: "0 6px 6px 0",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            🔍
          </button>
        </div>

        {/* Nav Links */}
        <div style={{ display: "flex", alignItems: "center", gap: "20px", fontSize: "14px" }}>
          <span style={{ cursor: "pointer", color: "#333" }}>Find Work</span>
          <span style={{ cursor: "pointer", color: "#333" }}>Browse Gigs</span>
          <span style={{ cursor: "pointer", color: "#333", fontWeight: "600" }}>Dashboard</span>

          {/* Buyer Toggle */}
          <div
            style={{
              backgroundColor: "#3b4cb8",
              color: "#fff",
              padding: "5px 14px",
              borderRadius: "20px",
              fontSize: "13px",
              fontWeight: "600",
            }}
          >
            Buyer
          </div>

          {/* Avatar */}
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              backgroundColor: "#222",
              cursor: "pointer",
            }}
          />
        </div>
      </nav>

      {/* ── Page Header Banner ── */}
      <div
        style={{
          backgroundColor: "#eef0fb",
          textAlign: "center",
          padding: "22px",
          marginBottom: "24px",
        }}
      >
        <h1 style={{ margin: 0, fontSize: "22px", color: "#222" }}>Dashboard</h1>
        <p style={{ margin: "4px 0 0", fontSize: "13px", color: "#666" }}>
          Home • Dashboard
        </p>
      </div>

      {/* ── Main Content Area ── */}
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "0 16px 40px",
          display: "flex",
          gap: "24px",
          alignItems: "flex-start",
        }}
      >

        {/* ── Left Sidebar ── */}
        <div
          style={{
            width: "180px",
            flexShrink: 0,
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "20px 12px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          {/* Profile Info */}
          <div style={{ textAlign: "center", marginBottom: "20px" }}>
            <div
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                backgroundColor: "#ccc",
                margin: "0 auto 10px",
                overflow: "hidden",
              }}
            >
              {/* Placeholder avatar image */}
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  backgroundColor: "#bbb",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                }}
              >
                👤
              </div>
            </div>
            <p style={{ margin: 0, fontWeight: "700", fontSize: "14px", color: "#222" }}>
              Walter Griffin
            </p>
            <p style={{ margin: "2px 0 0", fontSize: "11px", color: "#888" }}>
              walter@example.com
            </p>
          </div>

          {/* Navigation Links */}
          {sidebarLinks.map((link) => (
            <SidebarLink
              key={link.label}
              icon={link.icon}
              label={link.label}
              active={activeNav === link.label}
              onClick={() => setActiveNav(link.label)}
            />
          ))}
        </div>

        {/* ── Right Content: Reviews ── */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#fff",
            borderRadius: "12px",
            padding: "24px",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}
        >
          <h2 style={{ margin: "0 0 4px", fontSize: "18px", color: "#222" }}>Reviews</h2>

          {/* Review List */}
          {REVIEWS.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}

          {/* Pagination */}
          <Pagination
            currentPage={currentPage}
            totalPages={10}
            onPageChange={(page) => {
              if (page >= 1 && page <= 10) setCurrentPage(page);
            }}
          />
        </div>
      </div>

      {/*   FOOTER */}
           <Footer />

    </div>
  );
}
