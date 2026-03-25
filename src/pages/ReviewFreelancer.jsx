import { useState } from "react";


const reviews = [
  {
    id: 1,
    name: "marvinachi",
    country: "United States",
    flag: "🇺🇸",
    rating: 5,
    time: "2 months ago",
    text: "Great work! I wanted a video to showcase my fitness app and the designer delivered an excellent job and on time. highly satisfied. thank you!",
  },
  {
    id: 2,
    name: "marvinachi",
    country: "United States",
    flag: "🇺🇸",
    rating: 5,
    time: "2 months ago",
    text: "Great work! I wanted a video to showcase my fitness app and the designer delivered an excellent job and on time. highly satisfied. thank you!",
  },
  {
    id: 3,
    name: "marvinachi",
    country: "United States",
    flag: "🇺🇸",
    rating: 5,
    time: "2 months ago",
    text: "Great work! I wanted a video to showcase my fitness app and the designer delivered an excellent job and on time. highly satisfied. thank you!",
  },
  {
    id: 4,
    name: "marvinachi",
    country: "United States",
    flag: "🇺🇸",
    rating: 5,
    time: "2 months ago",
    text: "Great work! I wanted a video to showcase my fitness app and the designer delivered an excellent job and on time. highly satisfied. thank you!",
  },
];

const StarRating = ({ rating }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((s) => (
      <svg key={s} width="14" height="14" viewBox="0 0 24 24" fill={s <= rating ? "#FFA800" : "#ddd"}>
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ))}
    <span style={{ fontSize: 13, color: "#555", marginLeft: 4 }}>{rating}</span>
  </div>
);

const Avatar = ({ name, size = 36 }) => {
  const initials = name.slice(0, 2).toUpperCase();
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        background: "#e0e0e0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: size * 0.35,
        fontWeight: 600,
        color: "#888",
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
};

const NavItem = ({ icon, label, active, hasDropdown, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      padding: "10px 14px",
      borderRadius: 6,
      cursor: "pointer",
      background: active ? "#1D4ED8" : "transparent",
      color: active ? "#fff" : "#444",
      fontWeight: active ? 600 : 400,
      fontSize: 14,
      marginBottom: 2,
      transition: "background 0.15s",
    }}
  >
    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
      <span style={{ fontSize: 15 }}>{icon}</span>
      <span>{label}</span>
    </div>
    {hasDropdown && (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <polyline points="6 9 12 15 18 9" />
      </svg>
    )}
  </div>
);

export default function ReviewFreelancer() {
  const [activePage, setActivePage] = useState(1);
  const [activeNav, setActiveNav] = useState("Reviews");
  const totalPages = 10;

  const getPageNumbers = () => {
    if (totalPages <= 5) return Array.from({ length: totalPages }, (_, i) => i + 1);
    if (activePage <= 3) return [1, 2, 3, "...", totalPages];
    if (activePage >= totalPages - 2) return [1, "...", totalPages - 2, totalPages - 1, totalPages];
    return [1, "...", activePage, "...", totalPages];
  };

  return (
    <div style={{ fontFamily: "'Poppins', 'Segoe UI', sans-serif", background: "#f4f6f9", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Poppins', sans-serif; }
        .nav-item:hover { background: #f0f4ff !important; }
        .page-btn:hover { background: #e8edf5 !important; }
        .footer-link:hover { text-decoration: underline; cursor: pointer; }
      `}</style>

      {/* Top Navbar */}
      <nav style={{
        background: "#1a3a6b",
        padding: "0 32px",
        display: "flex",
        alignItems: "center",
        height: 60,
        gap: 24,
      }}>
        {/* Logo */}
        <div style={{ color: "#fff", fontFamily: "Georgia, serif", fontSize: 22, fontStyle: "italic", fontWeight: 700, whiteSpace: "nowrap" }}>
          SajhaGig
        </div>

        {/* Search */}
        <div style={{ flex: 1, maxWidth: 340, position: "relative" }}>
          <input
            placeholder="Search For Freelancers Or Services"
            style={{
              width: "100%",
              padding: "8px 40px 8px 14px",
              borderRadius: 6,
              border: "none",
              fontSize: 13,
              outline: "none",
              fontFamily: "Poppins, sans-serif",
            }}
          />
          <button style={{
            position: "absolute", right: 0, top: 0, bottom: 0,
            background: "#2563EB", border: "none", borderRadius: "0 6px 6px 0",
            padding: "0 12px", cursor: "pointer", display: "flex", alignItems: "center",
          }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
              <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button>
        </div>

        {/* Nav Links */}
        <div style={{ display: "flex", gap: 24, alignItems: "center", marginLeft: 8 }}>
          {["Find Work", "Browse Gigs", "Dashboard"].map((item) => (
            <span key={item} style={{ color: "#cbd5e1", fontSize: 14, cursor: "pointer", whiteSpace: "nowrap" }}>{item}</span>
          ))}
        </div>

        {/* Toggle + Avatar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginLeft: "auto" }}>
          <div style={{
            background: "#2563EB", borderRadius: 20, padding: "4px 10px",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{ width: 22, height: 12, background: "#fff", borderRadius: 10, position: "relative" }}>
              <div style={{ width: 10, height: 10, background: "#2563EB", borderRadius: "50%", position: "absolute", right: 1, top: 1 }} />
            </div>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 500 }}>Seller</span>
          </div>
          <div style={{
            width: 36, height: 36, borderRadius: "50%", background: "#111",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid #fff",
          }}>
            <span style={{ fontSize: 16 }}>👤</span>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <div style={{
        background: "#e8edf5",
        textAlign: "center",
        padding: "28px 0 22px",
        marginBottom: 28,
      }}>
        <h1 style={{ fontSize: 24, fontWeight: 700, color: "#1a1a2e", marginBottom: 8 }}>Dashboard</h1>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 13, color: "#888" }}>
          <span>Home</span>
          <span style={{ color: "#2563EB", fontSize: 6 }}>●</span>
          <span>Dashboard</span>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ maxWidth: 820, margin: "0 auto 40px", padding: "0 16px" }}>
        <div style={{
          display: "flex",
          border: "2px solid #2563EB",
          borderRadius: 10,
          background: "#fff",
          overflow: "hidden",
          minHeight: 520,
        }}>
          {/* Sidebar */}
          <div style={{
            width: 200,
            borderRight: "2px dashed #a0bfee",
            padding: "20px 12px",
            flexShrink: 0,
          }}>
            {/* User Info */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, paddingBottom: 14, borderBottom: "1px solid #eee" }}>
              <div style={{
                width: 40, height: 40, borderRadius: "50%", background: "#ccc",
                overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center"
              }}>
                <span style={{ fontSize: 22 }}>👨‍💼</span>
              </div>
              <div>
                <div style={{ fontWeight: 600, fontSize: 13, color: "#1a1a2e" }}>John Smith</div>
                <div style={{ fontSize: 11, color: "#888" }}>walter@sample.com</div>
              </div>
            </div>

            {/* Nav Items */}
            {[
              { icon: "⊞", label: "Dashboard" },
              { icon: "📁", label: "Projects", hasDropdown: true },
              { icon: "⭐", label: "Reviews" },
              { icon: "🖼️", label: "Portfolio" },
              { icon: "💬", label: "Chat" },
              { icon: "↩", label: "Logout" },
            ].map(({ icon, label, hasDropdown }) => (
              <div
                key={label}
                className="nav-item"
                onClick={() => setActiveNav(label)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "9px 12px",
                  borderRadius: 6,
                  cursor: "pointer",
                  background: activeNav === label ? "#1D4ED8" : "transparent",
                  color: activeNav === label ? "#fff" : "#444",
                  fontWeight: activeNav === label ? 600 : 400,
                  fontSize: 13,
                  marginBottom: 2,
                  transition: "background 0.15s",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span>{icon}</span>
                  <span>{label}</span>
                </div>
                {hasDropdown && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                )}
              </div>
            ))}
          </div>

          {/* Reviews Panel */}
          <div style={{ flex: 1, padding: "20px 24px" }}>
            <h2 style={{ fontSize: 17, fontWeight: 600, color: "#1a1a2e", marginBottom: 16 }}>Reviews</h2>

            {reviews.map((review, idx) => (
              <div key={review.id}>
                <div style={{ display: "flex", gap: 12, paddingBottom: 16, paddingTop: idx === 0 ? 0 : 16 }}>
                  <Avatar name={review.name} size={36} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                      <span style={{ fontWeight: 600, fontSize: 14, color: "#1a1a2e" }}>{review.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 5, marginBottom: 5 }}>
                      <span>{review.flag}</span>
                      <span style={{ fontSize: 12, color: "#666" }}>{review.country}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                      <StarRating rating={review.rating} />
                      <span style={{ fontSize: 12, color: "#888" }}>{review.time}</span>
                    </div>
                    <p style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{review.text}</p>
                  </div>
                </div>
                {idx < reviews.length - 1 && <hr style={{ border: "none", borderTop: "1px solid #eee" }} />}
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div style={{
          border: "2px dashed #a0bfee",
          borderTop: "none",
          borderRadius: "0 0 10px 10px",
          padding: "14px 0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 4,
          background: "#fff",
          marginTop: -2,
        }}>
          {/* Prev */}
          <button
            className="page-btn"
            onClick={() => setActivePage((p) => Math.max(1, p - 1))}
            style={{
              width: 32, height: 32, borderRadius: 6, border: "1px solid #e0e0e0",
              background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#555",
            }}
          >
            ‹
          </button>

          {getPageNumbers().map((page, idx) =>
            page === "..." ? (
              <span key={`ellipsis-${idx}`} style={{ padding: "0 6px", color: "#888", fontSize: 14 }}>…</span>
            ) : (
              <button
                key={page}
                className="page-btn"
                onClick={() => setActivePage(page)}
                style={{
                  width: 32, height: 32, borderRadius: 6,
                  border: activePage === page ? "none" : "1px solid #e0e0e0",
                  background: activePage === page ? "#2563EB" : "#fff",
                  color: activePage === page ? "#fff" : "#555",
                  fontWeight: activePage === page ? 700 : 400,
                  fontSize: 14, cursor: "pointer",
                  fontFamily: "Poppins, sans-serif",
                }}
              >
                {page}
              </button>
            )
          )}

          {/* Next */}
          <button
            className="page-btn"
            onClick={() => setActivePage((p) => Math.min(totalPages, p + 1))}
            style={{
              width: 32, height: 32, borderRadius: 6, border: "1px solid #e0e0e0",
              background: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
              color: "#555",
            }}
          >
            ›
          </button>
        </div>
      </div>

      
    </div>
  );
}
