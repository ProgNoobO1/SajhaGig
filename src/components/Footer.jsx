import React from "react";


const footerCols = [
  { title: "Categories",    links: ["Graphics & Design","Digital Marketing","Writing & Translation","Video & Animation","Music & Audio"] },
  { title: "About",         links: ["Press & News","Partnerships","Privacy Policy","Terms of Service","Intellectual Property"] },
  { title: "Support",       links: ["Help & Support","Trust & Safety","Selling on SajhaGig","Buying on SajhaGig","Contact Us"] },
  { title: "Community",     links: ["Events","Blog","Forum","Podcast","Affiliates"] },
  { title: "More From Us",  links: ["SajhaGig Pro","SajhaGig Business","SajhaGig Logo Maker","SajhaGig Guides","Get Inspired"] },
];

const socialLinks = [
  { label: "Twitter",   path: "M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0012 7v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" },
  { label: "Facebook",  path: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  { label: "LinkedIn",  path: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z M4 6a2 2 0 100-4 2 2 0 000 4z" },
  { label: "Pinterest", path: "M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.23-5.22 1.23-5.22s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.33.67 1.33 1.48 0 .9-.58 2.25-.87 3.5-.25 1.04.52 1.89 1.54 1.89 1.85 0 3.09-2.37 3.09-5.17 0-2.14-1.44-3.63-3.5-3.63-2.39 0-3.79 1.79-3.79 3.64 0 .72.28 1.5.62 1.92.07.08.08.15.06.24l-.23.94c-.04.15-.13.18-.29.11-1.07-.5-1.74-2.06-1.74-3.32 0-2.69 1.96-5.17 5.65-5.17 2.97 0 5.27 2.11 5.27 4.93 0 2.94-1.85 5.3-4.43 5.3-.87 0-1.68-.45-1.95-.98l-.53 1.98c-.19.74-.71 1.67-1.06 2.23.8.25 1.65.38 2.53.38 5.52 0 10-4.48 10-10S17.52 2 12 2z" },
  { label: "Instagram", path: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5a1 1 0 100-2 1 1 0 000 2z M7.5 2h9A5.5 5.5 0 0122 7.5v9A5.5 5.5 0 0116.5 22h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z" },
];

/* ─────────────────────────────────────────
   FOOTER COMPONENT
───────────────────────────────────────── */
export default function Footer() {
  return (
    <footer style={{ background:"#1a3a6b", color:"#fff", marginTop:"auto" }}>

      {/* Top Links */}
      <div style={{ padding:"56px 40px 40px", display:"grid", gridTemplateColumns:"repeat(5, 1fr)", gap:32 }}>
        {footerCols.map((col, i) => (
          <div key={i}>
            <h3 style={{ fontWeight:700, fontSize:13, marginBottom:16, textTransform:"uppercase" }}>
              {col.title}
            </h3>

            <ul style={{ listStyle:"none", padding:0, display:"flex", flexDirection:"column", gap:10 }}>
              {col.links.map((link, j) => (
                <li key={j}>
                  <a href="#"
                    style={{ color:"rgba(255,255,255,0.55)", fontSize:12.5, textDecoration:"none" }}
                    onMouseEnter={e => e.target.style.color="#fff"}
                    onMouseLeave={e => e.target.style.color="rgba(255,255,255,0.55)"}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop:"1px solid rgba(255,255,255,0.1)", padding:"18px 40px", display:"flex", justifyContent:"space-between", flexWrap:"wrap" }}>
        
        {/* Left */}
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontFamily:"'Pacifico', cursive", fontSize:20 }}>SajhaGig</span>
          <span style={{ color:"rgba(255,255,255,0.35)", fontSize:12 }}>© SajhaGig 2026</span>
        </div>

        {/* Right Social Icons */}
        <div style={{ display:"flex", gap:10 }}>
          {socialLinks.map((s, i) => (
            <a key={i}
              href="#"
              style={{
                width:34,
                height:34,
                borderRadius:"50%",
                border:"1px solid rgba(255,255,255,0.2)",
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                color:"rgba(255,255,255,0.55)"
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color="#fff";
                e.currentTarget.style.borderColor="rgba(255,255,255,0.6)";
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color="rgba(255,255,255,0.55)";
                e.currentTarget.style.borderColor="rgba(255,255,255,0.2)";
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d={s.path} />
              </svg>
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}