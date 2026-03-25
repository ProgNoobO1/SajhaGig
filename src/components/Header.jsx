import { Link } from "react-router-dom";

export default function Header() {
    return (
      <header style={s.header}>
        <div style={s.logo}>SajhaGig</div>
        <div style={s.searchWrap}>
          <input style={s.searchInput} placeholder="Search For Freelancers Or Services" />
          <button style={s.searchBtn}>🔍</button>
        </div>
        <nav style={s.nav}>
        <Link to="/findwork" style={s.navLink}>Find Work</Link>
        <Link to="/browsegigs" style={s.navLink}>Browse Gigs</Link>
        <Link to="/freelancerdashboard" style={s.navLink}>Dashboard</Link>
        </nav>
        <div style={s.headerRight}>
          <div style={s.buyerToggle}><span style={s.dot}/>Buyer</div>
          <div style={s.avatar}>👤</div>
        </div>
      </header>
    );
  }

  const s = {
    page: { fontFamily:"'Segoe UI',Arial,sans-serif", background:"#f1f5f9", minHeight:"100vh" },
  
    // Header
    header: { background:"#1a2b6d", color:"#fff", display:"flex", alignItems:"center",
              gap:12, padding:"12px 28px", flexWrap:"wrap" },
    logo: { fontSize:22, fontWeight:700, fontStyle:"italic", color:"#fff", marginRight:8 },
    searchWrap: { display:"flex", flex:1, minWidth:180, maxWidth:380 },
    searchInput: { flex:1, padding:"8px 12px", border:"none", borderRadius:"6px 0 0 6px",
                   fontSize:13, outline:"none" },
    searchBtn: { background:"#3b5bdb", border:"none", color:"#fff", padding:"8px 12px",
                 borderRadius:"0 6px 6px 0", cursor:"pointer" },
    nav: { display:"flex", gap:18 },
    navLink: { color:"#c7d2fe", textDecoration:"none", fontSize:14 },
    headerRight: { display:"flex", alignItems:"center", gap:10, marginLeft:"auto" },
    buyerToggle: { background:"#2563eb", color:"#fff", borderRadius:20, padding:"4px 14px",
                   fontSize:13, fontWeight:600, display:"flex", alignItems:"center", gap:6 },
    dot: { width:10, height:10, background:"#fff", borderRadius:"50%", display:"inline-block" },
    avatar: { width:36, height:36, background:"#374151", borderRadius:"50%",
              display:"flex", alignItems:"center", justifyContent:"center", fontSize:20 },
    }  