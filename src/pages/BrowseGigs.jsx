import { useState, useRef } from "react";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const gigs = [
  { id: 1, seller: "cc__creative",    badge: "Top Rated Seller", badgeColor: "#00c9a7", likes: "32.4K", title: "I will design UI UX for mobile app with figma for ios",        rating: 5.0, reviews: 570, price: "₹8,674", img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=300&h=180&fit=crop", avatar: "https://i.pravatar.cc/32?img=1" },
  { id: 2, seller: "creativesmith99", badge: "Level 2 Seller",   badgeColor: "#888",    likes: "3.4K",  title: "I will create a professional business website design",          rating: 4.8, reviews: 57,  price: "₹4,674", img: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=300&h=180&fit=crop", avatar: "https://i.pravatar.cc/32?img=2" },
  { id: 3, seller: "cc__creative",    badge: "Top Rated Seller", badgeColor: "#00c9a7", likes: "32.4K", title: "I will design UI UX for mobile app with figma for ios",        rating: 5.0, reviews: 570, price: "₹8,674", img: "https://images.unsplash.com/photo-1616469829167-0bd76a80c913?w=300&h=180&fit=crop", avatar: "https://i.pravatar.cc/32?img=3" },
  { id: 4, seller: "creativesmith99", badge: "Level 2 Seller",   badgeColor: "#888",    likes: "3.4K",  title: "I will create a professional business website design",          rating: 4.8, reviews: 57,  price: "₹4,674", img: "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=300&h=180&fit=crop", avatar: "https://i.pravatar.cc/32?img=4" },
  { id: 5, seller: "cc__creative",    badge: "Top Rated Seller", badgeColor: "#00c9a7", likes: "32.4K", title: "I will design UI UX for mobile app with figma for ios",        rating: 5.0, reviews: 570, price: "₹8,674", img: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=180&fit=crop", avatar: "https://i.pravatar.cc/32?img=5" },
  { id: 6, seller: "designpro_k",     badge: "Top Rated Seller", badgeColor: "#00c9a7", likes: "18.2K", title: "I will build a stunning landing page in React and Tailwind",   rating: 4.9, reviews: 320, price: "₹6,299", img: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=300&h=180&fit=crop", avatar: "https://i.pravatar.cc/32?img=6" },
  { id: 7, seller: "webwizard22",     badge: "Level 2 Seller",   badgeColor: "#888",    likes: "5.1K",  title: "I will design a modern e-commerce UI for your store",           rating: 4.7, reviews: 88,  price: "₹5,499", img: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=300&h=180&fit=crop", avatar: "https://i.pravatar.cc/32?img=7" },
  { id: 8, seller: "cc__creative",    badge: "Top Rated Seller", badgeColor: "#00c9a7", likes: "21.3K", title: "I will create a full brand identity with logo and guidelines",  rating: 5.0, reviews: 412, price: "₹9,999", img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=300&h=180&fit=crop", avatar: "https://i.pravatar.cc/32?img=8" },
  { id: 9, seller: "creativesmith99", badge: "Level 2 Seller",   badgeColor: "#888",    likes: "4.8K",  title: "I will design a sleek dashboard UI for your SaaS product",     rating: 4.6, reviews: 64,  price: "₹4,999", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=300&h=180&fit=crop", avatar: "https://i.pravatar.cc/32?img=9" },
  { id: 10, seller: "pixelcraft_s",   badge: "Top Rated Seller", badgeColor: "#00c9a7", likes: "11.7K", title: "I will design mobile app UI screens with smooth animations",    rating: 4.9, reviews: 198, price: "₹7,749", img: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=300&h=180&fit=crop", avatar: "https://i.pravatar.cc/32?img=10" },
];

const categories = ["Graphics & Design","Digital Marketing","Writing & Translation","Video & Animation","Music & Audio","Programming & Tech","Photography","Business"];

/* ─────────────────────────────────────────
   ICONS
───────────────────────────────────────── */
const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="#f5a623">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const HeartIcon = ({ filled }) => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill={filled ? "#e74c3c" : "none"} stroke={filled ? "#e74c3c" : "#aaa"} strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const DotsIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="#888">
    <circle cx="12" cy="5" r="1.5" /><circle cx="12" cy="12" r="1.5" /><circle cx="12" cy="19" r="1.5" />
  </svg>
);

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ChevronRight = ({ color = "white", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

const ChevronLeft = ({ color = "#555", size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5">
    <path d="M15 18l-6-6 6-6" />
  </svg>
);

/* ─────────────────────────────────────────
   GIG CARD
───────────────────────────────────────── */
function GigCard({ gig }) {
  const [liked, setLiked] = useState(false);
  return (
    <div
      style={{ background:"#fff", borderRadius:12, overflow:"hidden", boxShadow:"0 2px 12px rgba(0,0,0,0.07)", border:"1px solid #f0f0f0", minWidth:0, transition:"transform 0.2s, box-shadow 0.2s", cursor:"pointer" }}
      onMouseEnter={e => { e.currentTarget.style.transform="translateY(-4px)"; e.currentTarget.style.boxShadow="0 8px 28px rgba(0,0,0,0.13)"; }}
      onMouseLeave={e => { e.currentTarget.style.transform=""; e.currentTarget.style.boxShadow="0 2px 12px rgba(0,0,0,0.07)"; }}
    >
      {/* Seller row */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 12px 4px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <img src={gig.avatar} alt={gig.seller} style={{ width:28, height:28, borderRadius:"50%", objectFit:"cover" }} />
          <div>
            <div style={{ fontSize:12, fontWeight:700, color:"#222" }}>{gig.seller}</div>
            <div style={{ fontSize:10, fontWeight:600, color:gig.badgeColor }}>{gig.badge}</div>
          </div>
        </div>
        <button style={{ background:"none", border:"none", cursor:"pointer", padding:0 }}><DotsIcon /></button>
      </div>

      {/* Thumbnail */}
      <img src={gig.img} alt={gig.title} style={{ width:"100%", height:140, objectFit:"cover", display:"block" }} />

      {/* Body */}
      <div style={{ padding:"10px 12px 12px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:6 }}>
          <button onClick={e => { e.stopPropagation(); setLiked(l => !l); }} style={{ background:"none", border:"none", cursor:"pointer", padding:0, display:"flex", alignItems:"center", gap:3 }}>
            <HeartIcon filled={liked} />
            <span style={{ fontSize:11, color:"#aaa" }}>{gig.likes}</span>
          </button>
        </div>
        <p style={{ fontSize:12.5, fontWeight:500, color:"#222", margin:"0 0 8px", lineHeight:1.45, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
          {gig.title}
        </p>
        <div style={{ display:"flex", alignItems:"center", gap:4, marginBottom:6 }}>
          <StarIcon />
          <span style={{ fontSize:11, fontWeight:700, color:"#222" }}>{gig.rating.toFixed(1)}</span>
          <span style={{ fontSize:11, color:"#888" }}>({gig.reviews})</span>
        </div>
        <div style={{ fontSize:11, color:"#aaa" }}>
          STARTING AT <span style={{ fontWeight:700, color:"#1a3a6b", fontSize:13 }}>{gig.price}</span>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   CAROUSEL  (Continue Browsing)
───────────────────────────────────────── */
const CARD_WIDTH = 210; // approx card + gap

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
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <span style={{ fontWeight:700, fontSize:16, color:"#1a2a4a" }}>Continue browsing →</span>
        <div style={{ display:"flex", gap:8 }}>
          <button
            onClick={() => scroll("prev")}
            style={{ width:32, height:32, borderRadius:"50%", border:"1.5px solid #dde3ef", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"border-color 0.15s, background 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#f0f4ff"; e.currentTarget.style.borderColor="#b0bcdc"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.borderColor="#dde3ef"; }}
          >
            <ChevronLeft color="#555" size={15} />
          </button>
          <button
            onClick={() => scroll("next")}
            style={{ width:32, height:32, borderRadius:"50%", border:"1.5px solid #dde3ef", background:"#fff", cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"border-color 0.15s, background 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background="#f0f4ff"; e.currentTarget.style.borderColor="#b0bcdc"; }}
            onMouseLeave={e => { e.currentTarget.style.background="#fff"; e.currentTarget.style.borderColor="#dde3ef"; }}
          >
            <ChevronRight color="#555" size={15} />
          </button>
        </div>
      </div>

      {/* Scrollable track — hidden scrollbar */}
      <div
        ref={scrollRef}
        style={{ display:"flex", gap:14, overflowX:"auto", scrollSnapType:"x mandatory", scrollbarWidth:"none", msOverflowStyle:"none" }}
      >
        <style>{`.carousel-hide::-webkit-scrollbar{display:none}`}</style>
        {items.map((g, i) => (
          <div key={i} style={{ minWidth:CARD_WIDTH, maxWidth:CARD_WIDTH, scrollSnapAlign:"start", flex:"0 0 auto" }}>
            <GigCard gig={{ ...g, avatar:`https://i.pravatar.cc/32?img=${(i % 12) + 1}` }} />
          </div>
        ))}
      </div>

      {/* Dots */}
      <div style={{ display:"flex", justifyContent:"center", gap:6, marginTop:16 }}>
        {Array.from({ length: totalPages }).map((_, i) => (
          <div key={i} onClick={() => {
            const el = scrollRef.current;
            if (el) { el.scrollTo({ left: i * CARD_WIDTH * 5, behavior:"smooth" }); setPage(i); }
          }}
            style={{ width: page === i ? 24 : 8, height:8, borderRadius:4, background: page === i ? "#1a3a6b" : "#d0d7e8", cursor:"pointer", transition:"width 0.25s, background 0.25s" }}
          />
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function BrowseGigs() {
  const [search, setSearch] = useState("");
  const [isBuyer, setIsBuyer] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  // 15 carousel items (3 pages × 5 cards)
  const carouselGigs = [...gigs, ...gigs, ...gigs].slice(0, 15);
  const navLinks = [
    { label: "Find Work", path: "/findwork" },
    { label: "Browse Gigs", path: "/browsegigs" },
    { label: "Dashboard", path: "/dashboard" }
  ];
  

  return (
    <div style={{ fontFamily:"'DM Sans', sans-serif", background:"#f7f8fa", minHeight:"100vh", display:"flex", flexDirection:"column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Pacifico&display=swap');
        * { box-sizing: border-box; }
      `}</style>

      {/* ══════════════ NAVBAR ══════════════ */}
      <nav style={{ background:"#1a3a6b", padding:"0 32px", display:"flex", alignItems:"center", gap:24, height:70, flexShrink:0 }}>
        <span style={{ fontFamily:"'Pacifico', cursive", fontSize:26, color:"#fff", letterSpacing:1, marginRight:8 }}>SajhaGig</span>

        <div style={{ flex:1, maxWidth:420, display:"flex", alignItems:"center", background:"#fff", borderRadius:10, overflow:"hidden" }}>
          <input
            value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search For Freelancers Or Services"
            style={{ flex:1, border:"none", outline:"none", padding:"10px 16px", fontSize:13.5, color:"#333" }}
          />
          <button style={{ background:"#3b82f6", border:"none", padding:"0 18px", height:42, cursor:"pointer", display:"flex", alignItems:"center" }}>
            <SearchIcon />
          </button>
        </div>

        
<div style={{ display:"flex", gap:24, marginLeft:"auto" }}>
  {navLinks.map(link => (
    <a 
      key={link.label} 
      href={link.path}   // ✅ different path for each
      style={{ 
        color:"#c8d8f0", 
        fontSize:14, 
        fontWeight:500, 
        textDecoration:"none", 
        transition:"color 0.15s" 
      }}
      onMouseEnter={e => e.target.style.color="#fff"} 
      onMouseLeave={e => e.target.style.color="#c8d8f0"}
    >
      {link.label}
    </a>
  ))}
</div>

        <div onClick={() => setIsBuyer(b => !b)}
          style={{ display:"flex", alignItems:"center", background:"#fff", borderRadius:30, padding:"5px 14px 5px 8px", cursor:"pointer", gap:8, userSelect:"none" }}
        >
          <div style={{ width:28, height:28, borderRadius:"50%", background: isBuyer ? "#fff" : "#1a3a6b", border:"2px solid #1a3a6b", transition:"background 0.2s" }} />
          <span style={{ fontSize:13, fontWeight:700, color:"#1a3a6b" }}>{isBuyer ? "BUYER" : "SELLER"}</span>
        </div>

        <div style={{ width:40, height:40, borderRadius:"50%", border:"2px solid #3b82f6", overflow:"hidden", cursor:"pointer" }}>
          <img src="https://i.pravatar.cc/40?img=9" alt="user" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
        </div>
      </nav>

      {/* ══════════════ CATEGORY BAR ══════════════ */}
      <div style={{ background:"#1e4080", padding:"0 32px", display:"flex", gap:4, overflowX:"auto", flexShrink:0 }}>
        {categories.map(cat => (
          <button key={cat} onClick={() => setActiveCategory(cat === activeCategory ? null : cat)}
            style={{ background:"none", border:"none", color: activeCategory===cat ? "#fff" : "#a8c4e8", fontSize:13, fontWeight: activeCategory===cat ? 700 : 500, cursor:"pointer", padding:"14px 18px", whiteSpace:"nowrap", borderBottom: activeCategory===cat ? "2px solid #3b82f6" : "2px solid transparent", transition:"color 0.15s" }}
            onMouseEnter={e => { if (cat!==activeCategory) e.currentTarget.style.color="#fff"; }}
            onMouseLeave={e => { if (cat!==activeCategory) e.currentTarget.style.color="#a8c4e8"; }}
          >{cat}</button>
        ))}
      </div>

      {/* ══════════════ MAIN CONTENT ══════════════ */}
      <div style={{ flex:1 }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"32px 16px" }}>

          {/* Greeting */}
          <h2 style={{ fontSize:26, fontWeight:700, color:"#1a2a4a", marginBottom:20 }}>Hey Ekta ,</h2>

          {/* CTA Banners — both green */}
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:32 }}>
            {[0,1].map(i => (
              <div key={i}
                style={{ background:"linear-gradient(135deg, #1e5c3a 0%, #28a25e 100%)", borderRadius:14, padding:"24px 28px", display:"flex", alignItems:"center", justifyContent:"space-between", cursor:"pointer", transition:"opacity 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.opacity="0.92"}
                onMouseLeave={e => e.currentTarget.style.opacity="1"}
              >
                <div>
                  <div style={{ color:"#fff", fontWeight:700, fontSize:16, marginBottom:4 }}>Get a perfect gig Suggestion for a Service you need</div>
                  <div style={{ color:"rgba(255,255,255,0.75)", fontSize:13 }}>Tell us what Service you need</div>
                </div>
                <div style={{ width:36, height:36, background:"rgba(255,255,255,0.18)", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}>
                  <ChevronRight />
                </div>
              </div>
            ))}
          </div>

          {/* ── Continue Browsing (functional carousel) ── */}
          <div style={{ background:"#fff", borderRadius:16, padding:"20px 24px", marginBottom:36, boxShadow:"0 2px 14px rgba(0,0,0,0.05)" }}>
            <Carousel items={carouselGigs} />
          </div>

          {/* ── Most Popular Gigs ── */}
          <div style={{ marginBottom:40 }}>
            <h3 style={{ fontSize:20, fontWeight:700, color:"#1a2a4a", marginBottom:20, marginTop:0 }}>
              Most popular Gigs in <span style={{ color:"#3b82f6" }}>App Design</span>
            </h3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:14 }}>
              {gigs.map(g => <GigCard key={g.id + "p"} gig={g} />)}
            </div>
          </div>

          {/* ── Gigs You May Like ── */}
          <div style={{ marginBottom:40 }}>
            <h3 style={{ fontSize:20, fontWeight:700, color:"#1a2a4a", marginBottom:20, marginTop:0 }}>
              Gigs you may like
            </h3>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:14 }}>
              {[...gigs, ...gigs].map((g, i) => (
                <GigCard key={"like"+i} gig={{ ...g, avatar:`https://i.pravatar.cc/32?img=${(i%10)+10}` }} />
              ))}
            </div>
          </div>

          {/* ── Verified Pro Services ── */}
          <div style={{ background:"#fff", borderRadius:16, padding:"24px 24px 28px", boxShadow:"0 2px 14px rgba(0,0,0,0.05)", marginBottom:40 }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:20 }}>
              <div>
                <h3 style={{ fontSize:20, fontWeight:700, color:"#1a2a4a", margin:"0 0 4px" }}>
                  Verified Pro services in <span style={{ color:"#3b82f6" }}>App Design</span>
                </h3>
                <p style={{ fontSize:13, color:"#888", margin:0 }}>Hand-vetted talent for all your professional needs.</p>
              </div>
              <a href="#"
                style={{ display:"flex", alignItems:"center", gap:4, fontSize:13, fontWeight:600, color:"#3b82f6", textDecoration:"none", whiteSpace:"nowrap", marginTop:4 }}
                onMouseEnter={e => e.currentTarget.style.opacity="0.75"}
                onMouseLeave={e => e.currentTarget.style.opacity="1"}
              >
                See All <ChevronRight color="#3b82f6" size={14} />
              </a>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:14 }}>
              {gigs.map((g, i) => (
                <GigCard key={"pro"+i} gig={{ ...g, avatar:`https://i.pravatar.cc/32?img=${(i%10)+20}` }} />
              ))}
            </div>
          </div>

        </div>
      </div>

    
      {/*   FOOTER */}
      <Footer />
      
          
    </div>
  );
}
