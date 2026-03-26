import React from "react";
import Header from "../Header";
import Footer from "../Footer";
import PageBanner from "./PageBanner";
import DashboardSidebar from "./DashboardSidebar";
import { colors } from "../../constants/theme";

export default function DashboardLayout({
  children,
  bannerTitle = "Dashboard",
  breadcrumb = "Home > Dashboard",
  role = "client",
  sidebarLinks,
  activeLabel,
  onLinkClick,
  subLinks,
  activeSubIndex,
  onSubLinkClick,
  expandLabel,
  profileName,
  profileEmail,
  profileImg,
}) {
  return (
    <div style={s.page}>
      <Header />
      <PageBanner title={bannerTitle} breadcrumb={breadcrumb} />

      <div style={s.contentArea}>
        <DashboardSidebar
          role={role}
          links={sidebarLinks}
          activeLabel={activeLabel}
          onLinkClick={onLinkClick}
          subLinks={subLinks}
          activeSubIndex={activeSubIndex}
          onSubLinkClick={onSubLinkClick}
          expandLabel={expandLabel}
          profileName={profileName}
          profileEmail={profileEmail}
          profileImg={profileImg}
        />

        <main style={s.main}>{children}</main>
      </div>

      <Footer />
    </div>
  );
}

const s = {
  page: {
    fontFamily: "'Segoe UI', Arial, sans-serif",
    background: colors.bg.page,
    minHeight: "100vh",
  },
  contentArea: {
    display: "flex",
    maxWidth: 1100,
    margin: "32px auto",
    padding: "0 20px",
    gap: 28,
  },
  main: { flex: 1, minWidth: 0 },
};
