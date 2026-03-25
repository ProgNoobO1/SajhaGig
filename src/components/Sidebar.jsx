import { Link } from "react-router-dom";
export default function Sidebar({ activeMain, setActiveMain }) {
    const SIDEBAR_LINKS = [
        { icon: "🏠", label: "Dashboard",  active: true  },
        { icon: "📁", label: "Projects",   active: false },
        { icon: "⭐", label: "Reviews",    active: false },
        { icon: "💬", label: "Chat",       active: false },
        { icon: "🚪", label: "Logout",     active: false },
      ];
    return (
      <aside style={s.sidebar}>
        {/* Profile card */}
        <div style={s.profileCard}>
          <img src={PROFILE_IMG} alt="John Smith" style={s.profileAvatar} />
          <p style={s.profileName}>John Smith</p>
          <p style={s.profileEmail}>walter@sample.com</p>
        </div>
  
        {/* Nav */}
        <div style={s.sideNav}>
          {SIDEBAR_LINKS.map((link, i) => (
            <button
              key={link.label}
              onClick={() => setActiveMain(i)}
              style={{ ...s.sideLink, ...(activeMain === i ? s.sideLinkActive : {}) }}
            >
              <img
                src={link.icon}
                alt={link.label}
                style={{
                  ...s.sideIcon,
                  filter: activeMain === i ? "brightness(0) invert(1)" : "opacity(0.5)",
                }}
              />
              <span style={{ flex: 1 }}>{link.label}</span>
              {link.label === "Projects" && (
                <span style={s.dropArrow}>▼</span>
              )}
            </button>
          ))}
        </div>
      </aside>
    );
  }