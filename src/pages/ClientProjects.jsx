import { useState } from "react";
import { DashboardLayout } from "../components/layout";
import { Pagination, StarRating, AvatarGroup, Badge } from "../components/ui";
import { colors, borderRadius, shadows } from "../constants/theme";

const AVATARS = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/46.jpg",
  "https://randomuser.me/api/portraits/women/65.jpg",
  "https://randomuser.me/api/portraits/men/22.jpg",
  "https://randomuser.me/api/portraits/women/12.jpg",
  "https://randomuser.me/api/portraits/men/77.jpg",
];

const PROJECT_ICONS = {
  meal: "https://cdn-icons-png.flaticon.com/512/2515/2515263.png",
  job: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
  sub: "https://cdn-icons-png.flaticon.com/512/2991/2991108.png",
  task: "https://cdn-icons-png.flaticon.com/512/906/906175.png",
  resume: "https://cdn-icons-png.flaticon.com/512/2920/2920072.png",
};

const PROJECT_SUB_LINKS = [
  "All Projects", "Ongoing Projects", "Completed Projects",
  "Pending Projects", "Cancelled Projects", "Expired Projects",
];

const PROJECTS = [
  { icon: PROJECT_ICONS.meal, name: "Meal Planner App", description: "Build an app that helps users manage their expenses and savings.", type: "Hourly", price: "$400", hiredOn: "01 Jan 2025", location: "UK", expiry: "4 Days Left", tags: ["React", "HTML5", "Sketch"], status: "open", avatars: [AVATARS[0], AVATARS[1], AVATARS[2], AVATARS[3]] },
  { icon: PROJECT_ICONS.job, name: "Job Application Tracker", description: "Helps job seekers manage applications, interviews, and follow-ups.", type: "Fixed", price: "$300", hiredOn: "12 Jan 2025", location: "UK", expiry: "2 Days Left", tags: ["HTML5", "Sketch"], status: "open", avatars: [AVATARS[4], AVATARS[5]] },
  { icon: PROJECT_ICONS.sub, name: "Subscription Manager", description: "An app for task management, deadlines, Pomodoro timers, and goal tracking.", type: "Fixed", price: "$200", location: "UK", expiry: "4 Days Left", proposals: "22 Proposal", status: "proposal" },
  { icon: PROJECT_ICONS.sub, name: "Subscription Manager", description: "Tracks active subscriptions and alerts users about payments.", type: "Fixed", price: "$500", location: "UK", expiry: "4 Days Left", proposals: "09 Proposal", status: "proposal" },
  { icon: PROJECT_ICONS.task, name: "Task & Productivity Manager", description: "An app for task management, deadlines, Pomodoro timers, and goal tracking.", type: "Hourly", price: "$400", location: "UK", expiry: "4 Days Left", rating: 5.0, status: "completed", avatars: [AVATARS[1]] },
  { icon: PROJECT_ICONS.resume, name: "AI Resume Builder", description: "Generates optimized resumes using AI based on user input.", type: "Hourly", price: "$200", location: "UK", expiry: "4 Days Left", rating: 4.0, status: "completed", avatars: [AVATARS[0]] },
];

function ProjectCard({ project }) {
  const isCompleted = project.status === "completed";
  const isProposal = project.status === "proposal";

  return (
    <div style={s.projectCard}>
      <div style={s.pcTop}>
        <img src={project.icon} alt={project.name} style={s.pcIcon} />
        <div style={{ flex: 1 }}>
          <p style={s.pcName}>{project.name}</p>
          <p style={s.pcDesc}>{project.description}</p>
        </div>
        {project.avatars && <AvatarGroup avatars={project.avatars} />}
        {isProposal && <Badge variant="orange">{project.proposals}</Badge>}
      </div>

      <div style={s.pcMeta}>
        <MetaCol label="Project Type" value={project.type} />
        <MetaCol label="Price" value={project.price} />
        {project.hiredOn && <MetaCol label="Hired on" value={project.hiredOn} />}
        <MetaCol label="Location" value={project.location} />
        <MetaCol label="Expiry" value={project.expiry} />

        {project.tags && (
          <div style={s.tagGroup}>
            {project.tags.map((t) => (
              <Badge key={t} variant="gray" style={{ border: `1px solid ${colors.gray[200]}` }}>
                {t}
              </Badge>
            ))}
            <span style={s.moreTag}>+</span>
          </div>
        )}

        {isProposal && (
          <div style={s.actionBtns}>
            <button style={s.viewProposalBtn}>View Proposal</button>
            <button style={s.editProfileBtn}>Edit Profile</button>
          </div>
        )}

        {isCompleted && (
          <div style={s.completedGroup}>
            <Badge variant="success">✓ Completed</Badge>
            <StarRating rating={project.rating} showValue />
          </div>
        )}
      </div>
    </div>
  );
}

function MetaCol({ label, value }) {
  return (
    <div style={{ minWidth: 70 }}>
      <p style={s.metaLabel}>{label}</p>
      <p style={s.metaValue}>{value}</p>
    </div>
  );
}

export default function ClientProjects() {
  const [activeLabel, setActiveLabel] = useState("Projects");
  const [activeSub, setActiveSub] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <DashboardLayout
      role="client"
      activeLabel={activeLabel}
      onLinkClick={setActiveLabel}
      subLinks={PROJECT_SUB_LINKS}
      activeSubIndex={activeSub}
      onSubLinkClick={setActiveSub}
      expandLabel="Projects"
    >
      <h3 style={s.allProjectsTitle}>All Projects</h3>
      {PROJECTS.map((project, i) => (
        <ProjectCard key={i} project={project} />
      ))}
      <Pagination current={currentPage} total={10} onPageChange={setCurrentPage} />
    </DashboardLayout>
  );
}

const s = {
  allProjectsTitle: { fontSize: 17, fontWeight: 700, color: colors.text.primary, marginBottom: 16, marginTop: 0 },
  projectCard: { background: colors.white, borderRadius: borderRadius.lg, padding: "16px 18px", marginBottom: 14, boxShadow: shadows.sm },
  pcTop: { display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 },
  pcIcon: { width: 44, height: 44, borderRadius: borderRadius.lg, objectFit: "contain", background: colors.bg.page, padding: 6, flexShrink: 0 },
  pcName: { fontSize: 14, fontWeight: 700, color: colors.text.primary, margin: 0 },
  pcDesc: { fontSize: 12, color: colors.text.muted, margin: "3px 0 0" },
  pcMeta: { display: "flex", alignItems: "center", flexWrap: "wrap", gap: 20, paddingTop: 10, borderTop: `1px solid ${colors.gray[100]}` },
  metaLabel: { fontSize: 11, color: colors.gray[400], margin: 0, fontWeight: 500 },
  metaValue: { fontSize: 13, fontWeight: 600, color: colors.text.primary, margin: "2px 0 0" },
  tagGroup: { display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap" },
  moreTag: { width: 22, height: 22, background: colors.primary, color: colors.white, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, cursor: "pointer" },
  actionBtns: { display: "flex", gap: 8, marginLeft: "auto" },
  viewProposalBtn: { background: colors.primary, color: colors.white, border: "none", borderRadius: 7, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  editProfileBtn: { background: colors.white, color: colors.primary, border: `1px solid ${colors.primary}`, borderRadius: 7, padding: "7px 14px", fontSize: 12, fontWeight: 600, cursor: "pointer" },
  completedGroup: { display: "flex", alignItems: "center", gap: 10, marginLeft: "auto" },
};
