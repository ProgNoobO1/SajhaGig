import { useState } from "react";
import { DashboardLayout } from "../components/layout";
import { ReviewCard, Pagination } from "../components/ui";

const REVIEWS = [
  { id: 1, name: "marvinachi", country: "United States", flag: "🇺🇸", rating: 4, timeAgo: "2 months ago", comment: "Great work! I wanted a video to showcase my fitness app and the designer delivered an excellent job and on time. Highly satisfied, thank you!" },
  { id: 2, name: "marvinachi", country: "United States", flag: "🇺🇸", rating: 5, timeAgo: "2 months ago", comment: "Great work! I wanted a video to showcase my fitness app and the designer delivered an excellent job and on time. Highly satisfied, thank you!" },
  { id: 3, name: "marvinachi", country: "United States", flag: "🇺🇸", rating: 4, timeAgo: "2 months ago", comment: "Great work! I wanted a video to showcase my fitness app and the designer delivered an excellent job and on time. Highly satisfied, thank you!" },
  { id: 4, name: "marvinachi", country: "United States", flag: "🇺🇸", rating: 4, timeAgo: "2 months ago", comment: "Great work! I wanted a video to showcase my fitness app and the designer delivered an excellent job and on time. Highly satisfied, thank you!" },
];

export default function ReviewClient() {
  const [activeLabel, setActiveLabel] = useState("Reviews");
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <DashboardLayout
      role="client"
      activeLabel={activeLabel}
      onLinkClick={setActiveLabel}
    >
      <div style={s.reviewsPanel}>
        <h2 style={s.title}>Reviews</h2>
        {REVIEWS.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
        <Pagination current={currentPage} total={10} onPageChange={setCurrentPage} />
      </div>
    </DashboardLayout>
  );
}

const s = {
  reviewsPanel: {
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
  },
  title: { margin: "0 0 4px", fontSize: 18, color: "#222" },
};
