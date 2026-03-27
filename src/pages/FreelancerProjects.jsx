import { useState, useEffect } from "react";
import { DashboardLayout } from "../components/layout";
import { Pagination } from "../components/ui";
import { colors, borderRadius, shadows } from "../constants/theme";
import api from "../api/client";
import { useAuth } from "../context/AuthContext";

const PROJECT_SUB_LINKS = [
  "My Proposal", "Ongoing Projects", "Completed Projects", "Cancelled Projects",
];

const CLIENT_AVATARS = {
  hayley: "https://randomuser.me/api/portraits/women/44.jpg",
  hayden: "https://randomuser.me/api/portraits/men/46.jpg",
  lily: "https://randomuser.me/api/portraits/women/65.jpg",
  emma: "https://randomuser.me/api/portraits/women/12.jpg",
  cody: "https://randomuser.me/api/portraits/men/77.jpg",
};

const PROJECT_ICONS = {
  render: "https://cdn-icons-png.flaticon.com/512/2721/2721620.png",
  landing: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  woo: "https://cdn-icons-png.flaticon.com/512/2991/2991108.png",
  fullstack: "https://cdn-icons-png.flaticon.com/512/906/906175.png",
  video: "https://cdn-icons-png.flaticon.com/512/2920/2920072.png",
};

const PROPOSALS = [
  { id: 1, icon: PROJECT_ICONS.render, title: "3D Renders and Amazon Product Store Images/Video", description: "Build an app that helps users manage their expenses and savings.", clientPrice: "$599.00 (Fixed)", jobType: "Hourly", price: "$500.00", clientName: "Hayley Melba", clientAvatar: CLIENT_AVATARS.hayley },
  { id: 2, icon: PROJECT_ICONS.landing, title: "Landing Page Redesign / Sales Page Redesign (Not Entire Web)", description: "Build an app that helps users manage their expenses and savings.", clientPrice: "$460.00 (Fixed)", jobType: "Hourly", price: "$450.00", clientName: "Hayden Partridge", clientAvatar: CLIENT_AVATARS.hayden },
  { id: 3, icon: PROJECT_ICONS.woo, title: "WooCommerce Product Page Back Up Restoration", description: "Build an app that helps users manage their expenses and savings.", clientPrice: "$550.00 (Fixed)", jobType: "Hourly", price: "$550.00", clientName: "Lily Lipscombe", clientAvatar: CLIENT_AVATARS.lily },
  { id: 4, icon: PROJECT_ICONS.fullstack, title: "Full-stack Developer to help us to build our", description: "Build an app that helps users manage their expenses and savings.", clientPrice: "$400.00 (Fixed)", jobType: "Hourly", price: "$400.00", clientName: "Emma Isaly", clientAvatar: CLIENT_AVATARS.emma },
  { id: 5, icon: PROJECT_ICONS.landing, title: "Landing Page Redesign / Sales Page Redesign (Not Entire Web)", description: "Build an app that helps users manage their expenses and savings.", clientPrice: "$430.00 (Fixed)", jobType: "Hourly", price: "$450.00", clientName: "Cody Cornish", clientAvatar: CLIENT_AVATARS.cody },
  { id: 6, icon: PROJECT_ICONS.video, title: "Video animator to bring some illustrations to life", description: "Build an app that helps users manage their expenses and savings.", clientPrice: "$430.00 (Fixed)", jobType: "Hourly", price: "$450.00", clientName: "Cody Cornish", clientAvatar: CLIENT_AVATARS.cody },
];

function MetaCol({ label, value }) {
  return (
    <div style={{ minWidth: 80 }}>
      <p style={s.metaLabel}>{label}</p>
      <p style={s.metaValue}>{value}</p>
    </div>
  );
}

function ProposalCard({ proposal }) {
  return (
    <div style={s.card}>
      <div style={s.cardTop}>
        <img src={proposal.icon} alt={proposal.title} style={s.cardIcon} />
        <div style={{ flex: 1 }}>
          <p style={s.cardTitle}>{proposal.title}</p>
          <p style={s.cardDesc}>{proposal.description}</p>
        </div>
        <button style={s.viewBtn}>✦ View Project</button>
      </div>

      <div style={s.divider} />

      <div style={s.cardMeta}>
        <MetaCol label="Client Price" value={proposal.clientPrice} />
        <MetaCol label="Job Type" value={proposal.jobType} />
        <MetaCol label="Price" value={proposal.price} />
        <div style={{ minWidth: 80 }}>
          <p style={s.metaLabel}>Client</p>
          <div style={s.clientRow}>
            <img src={proposal.clientAvatar} alt={proposal.clientName} style={s.clientAvatar} />
            <p style={{ ...s.metaValue, margin: 0 }}>{proposal.clientName}</p>
          </div>
        </div>
        <div style={s.cardActions}>
          <button style={s.editBtn}>✏ Edit Proposal</button>
          <button style={s.deleteBtn}>🗑 Delete Proposal</button>
        </div>
      </div>
    </div>
  );
}

export default function FreelancerProjects() {
  const [activeLabel, setActiveLabel] = useState("Projects");
  const [activeSub, setActiveSub] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [proposalList, setProposalList] = useState(PROPOSALS);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;
    api.get(`/proposals/freelancer/${user.id}`).then((data) => {
      if (data.proposals?.length) {
        setProposalList(data.proposals.map((p, i) => ({
          id: p.id,
          icon: Object.values(PROJECT_ICONS)[i % 5],
          title: p.jobTitle || "Project",
          description: p.coverLetter?.slice(0, 80) || "Proposal description",
          clientPrice: `$${p.jobBudget || 0} (Fixed)`,
          jobType: "Hourly",
          price: `$${p.proposedRate || 0}`,
          clientName: p.clientName || "Client",
          clientAvatar: p.clientAvatar || CLIENT_AVATARS.hayley,
        })));
      }
    }).catch(() => {});
  }, [user]);

  return (
    <DashboardLayout
      role="freelancer"
      activeLabel={activeLabel}
      onLinkClick={setActiveLabel}
      subLinks={PROJECT_SUB_LINKS}
      activeSubIndex={activeSub}
      onSubLinkClick={setActiveSub}
      expandLabel="Projects"
      profileName={user?.firstName ? `${user.firstName} ${user.lastName}` : "John Smith"}
      profileEmail={user?.email || "john@sample.com"}
    >
      <h3 style={s.sectionTitle}>My Proposals</h3>
      {proposalList.map((proposal) => (
        <ProposalCard key={proposal.id} proposal={proposal} />
      ))}
      <Pagination current={currentPage} total={10} onPageChange={setCurrentPage} />
    </DashboardLayout>
  );
}

const s = {
  sectionTitle: { fontSize: 17, fontWeight: 700, color: colors.text.primary, marginBottom: 16, marginTop: 0 },
  card: { background: colors.white, borderRadius: borderRadius.lg, padding: "16px 20px", marginBottom: 14, boxShadow: shadows.sm },
  cardTop: { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 },
  cardIcon: { width: 44, height: 44, borderRadius: borderRadius.md, objectFit: "contain", background: colors.bg.page, padding: 6, flexShrink: 0 },
  cardTitle: { fontSize: 14, fontWeight: 700, color: colors.primary, margin: "0 0 3px" },
  cardDesc: { fontSize: 12, color: colors.text.muted, margin: 0 },
  viewBtn: { background: colors.primary, color: colors.white, border: "none", borderRadius: 7, padding: "8px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", flexShrink: 0 },
  divider: { borderTop: `1px solid ${colors.gray[100]}`, marginBottom: 12 },
  cardMeta: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: 24 },
  metaLabel: { fontSize: 11, color: colors.gray[400], margin: "0 0 2px", fontWeight: 500 },
  metaValue: { fontSize: 13, fontWeight: 600, color: colors.text.primary, margin: 0 },
  clientRow: { display: "flex", alignItems: "center", gap: 6, marginTop: 2 },
  clientAvatar: { width: 24, height: 24, borderRadius: "50%", objectFit: "cover", border: `1px solid ${colors.gray[200]}` },
  cardActions: { display: "flex", gap: 14, marginLeft: "auto", alignItems: "center" },
  editBtn: { background: "none", border: "none", fontSize: 12, color: colors.text.muted, cursor: "pointer" },
  deleteBtn: { background: "none", border: "none", fontSize: 12, color: colors.danger, cursor: "pointer" },
};
