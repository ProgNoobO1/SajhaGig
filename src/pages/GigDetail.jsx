import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { StarRating } from "../components/ui";
import { colors, borderRadius, shadows } from "../constants/theme";
import api from "../api/client";

// ── Sample Data ──
const GIG_DATA = {
  category: "Video & Animation",
  subcategory: "App & Website Previews",
  title: "I will create an amazing website or app promo video",
  seller: {
    name: "artz23",
    avatar: "https://i.pravatar.cc/40?img=12",
    level: "Level 2 Seller",
    rating: 5.0,
    reviews: 1860,
    ordersInQueue: 5,
  },
  mainImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=680&h=383&fit=crop",
  thumbnails: [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=60&fit=crop",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?w=100&h=60&fit=crop",
    "https://images.unsplash.com/photo-1616469829167-0bd76a80c913?w=100&h=60&fit=crop",
    "https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=100&h=60&fit=crop",
    "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=100&h=60&fit=crop",
    "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?w=100&h=60&fit=crop",
    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=100&h=60&fit=crop",
    "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=100&h=60&fit=crop",
  ],
  about: [
    'If you want to create an any kind of Premium Promo ( Website, Apps, Fashion, Youtube, Real Estate ), you are at the right gig.',
    'We create Basic to High-End Promotion Videos , delivering the highest quality work.',
    'We can create all kinds of promotion videos , We create the video according to your requirements, we can discuss everything and can arrange things according to your requirements.',
    'Our main focus is customer satisfaction, We will ensure 100% customer satisfaction. We highly concerned with the Premium Quality while providing the affordable service.',
    'We consider each project as a project for us and deliver the highest quality work.',
  ],
  requirements: [
    "Logo",
    "Text Descriptions",
    "Screen Images",
    "Video ( if any related stock videos if you have only )",
    "Website Address",
  ],
  packages: {
    basic: {
      name: "BASIC PROMO",
      price: "₹868",
      description: "Basic Package Only Laptop screens, Includes Background Music, Logo, and 720HD Video",
      delivery: "4 Days Delivery",
      revisions: "1 Revision",
      features: [
        { label: "4 captions", included: true },
        { label: "1 screenshot(s)", included: true },
        { label: "Mid dpi", included: true },
        { label: "Screen recording", included: true },
        { label: "Source files/transitions", included: true },
        { label: "60 seconds running time", included: true },
      ],
    },
    standard: {
      name: "STANDARD PROMO",
      price: "₹1,736",
      description: "Standard Package with multiple devices, Background Music, Logo, and 1080HD Video",
      delivery: "5 Days Delivery",
      revisions: "3 Revisions",
      features: [
        { label: "8 captions", included: true },
        { label: "3 screenshot(s)", included: true },
        { label: "High dpi", included: true },
        { label: "Screen recording", included: true },
        { label: "Source files/transitions", included: true },
        { label: "90 seconds running time", included: true },
      ],
    },
    premium: {
      name: "PREMIUM PROMO",
      price: "₹3,472",
      description: "Premium Package with all devices, Background Music, Logo, Voiceover, and 4K Video",
      delivery: "7 Days Delivery",
      revisions: "Unlimited Revisions",
      features: [
        { label: "12 captions", included: true },
        { label: "5 screenshot(s)", included: true },
        { label: "Ultra dpi", included: true },
        { label: "Screen recording", included: true },
        { label: "Source files/transitions", included: true },
        { label: "120 seconds running time", included: true },
      ],
    },
  },
  productType: "Website",
  sellerProfile: {
    name: "artz23",
    avatar: "https://i.pravatar.cc/80?img=12",
    level: "Level 2 Seller",
    country: "Nepal",
    flag: "🇳🇵",
    memberSince: "Aug 2020",
    avgResponse: "1 hour",
    lastDelivery: "about 2 hours",
    languages: [{ lang: "English", level: "Fluent" }, { lang: "Nepali", level: "Native" }],
    bio: "Hello! I'm a professional motion graphics artist and video editor with over 6 years of experience. I specialize in creating high-quality promotional videos, app previews, and website animations that help businesses stand out.",
    stats: { rating: 5.0, reviews: 1860, ordersCompleted: 2340, onTimeDelivery: "98%", responseTime: "1 hour" },
  },
  faqs: [
    { q: "What information do you need to get started?", a: "I'll need your logo, brand colors, text descriptions, screenshots or screen recordings of your website/app, and any specific requirements or preferences you have for the video." },
    { q: "Can you add voiceover to the video?", a: "Yes! I offer professional voiceover in English (male/female) as an add-on. You can also provide your own voiceover recording and I'll sync it with the video." },
    { q: "What if I'm not satisfied with the result?", a: "Your satisfaction is my top priority. I offer revisions based on your package. If you're still not happy after revisions, we can discuss further adjustments to meet your expectations." },
    { q: "How long will the video be?", a: "Video length depends on the package: Basic (up to 60s), Standard (up to 90s), Premium (up to 120s). Custom lengths are available upon request." },
    { q: "Do you provide the source files?", a: "Source files are included in the Standard and Premium packages. For the Basic package, source files can be added as an extra." },
  ],
  reviews: [
    { name: "Sarah Johnson", country: "United States", flag: "🇺🇸", avatar: "https://i.pravatar.cc/40?img=21", rating: 5, timeAgo: "2 weeks ago", comment: "Absolutely amazing work! The promo video exceeded my expectations. The quality was top-notch and the seller was very responsive throughout the process. Will definitely order again!", price: "₹1,736", duration: "3 days" },
    { name: "Raj Patel", country: "India", flag: "🇮🇳", avatar: "https://i.pravatar.cc/40?img=33", rating: 5, timeAgo: "1 month ago", comment: "Great communication and fast delivery. The video looked very professional and helped increase our app downloads significantly. Highly recommended!", price: "₹3,472", duration: "5 days" },
    { name: "Emily Chen", country: "Canada", flag: "🇨🇦", avatar: "https://i.pravatar.cc/40?img=25", rating: 4, timeAgo: "1 month ago", comment: "Good quality video, delivered on time. Had one revision which was handled promptly. The final result was clean and professional.", price: "₹868", duration: "4 days" },
    { name: "Ahmed Hassan", country: "UAE", flag: "🇦🇪", avatar: "https://i.pravatar.cc/40?img=53", rating: 5, timeAgo: "2 months ago", comment: "This seller is incredibly talented! Created a stunning promo for our real estate business. The animations were smooth and the overall quality was outstanding.", price: "₹3,472", duration: "6 days" },
    { name: "Lisa Mueller", country: "Germany", flag: "🇩🇪", avatar: "https://i.pravatar.cc/40?img=44", rating: 5, timeAgo: "2 months ago", comment: "Perfect work as always. This is my third order and the quality keeps getting better. Very professional and easy to work with.", price: "₹1,736", duration: "4 days" },
  ],
};

// ── Check Icon ──
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ── Clock Icon ──
const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ── Refresh Icon ──
const RefreshIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="23 4 23 10 17 10" />
    <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
  </svg>
);

// ── Play Button ──
const PlayButton = () => (
  <div style={s.playButton}>
    <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
      <polygon points="5,3 19,12 5,21" />
    </svg>
  </div>
);

// ── Arrow Button ──
const ArrowButton = ({ direction, onClick }) => (
  <button onClick={onClick} style={{ ...s.arrowBtn, ...(direction === "left" ? { left: 12 } : { right: 12 }) }}>
    {direction === "left" ? "‹" : "›"}
  </button>
);

// ── Buy Card Component ──
function BuyCard({ packages, onContinue }) {
  const [activeTab, setActiveTab] = useState("basic");
  const tabs = [
    { key: "basic", label: "Basic" },
    { key: "standard", label: "Standard" },
    { key: "premium", label: "Premium" },
  ];
  const pkg = packages[activeTab];

  return (
    <div style={s.buyCard}>
      {/* Tabs */}
      <div style={s.tabRow}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...s.tab,
              ...(activeTab === tab.key ? s.tabActive : {}),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Package Content */}
      <div style={s.packageContent}>
        {/* Title + Price */}
        <div style={s.packageHeader}>
          <h3 style={s.packageName}>{pkg.name}</h3>
          <span style={s.packagePrice}>{pkg.price}</span>
        </div>

        {/* Description */}
        <p style={s.packageDesc}>{pkg.description}</p>

        {/* Delivery & Revisions */}
        <div style={s.deliveryRow}>
          <span style={s.deliveryItem}>
            <ClockIcon /> {pkg.delivery}
          </span>
          <span style={s.deliveryItem}>
            <RefreshIcon /> {pkg.revisions}
          </span>
        </div>

        {/* Features */}
        <ul style={s.featureList}>
          {pkg.features.map((f, i) => (
            <li key={i} style={s.featureItem}>
              <CheckIcon />
              <span>{f.label}</span>
            </li>
          ))}
        </ul>

        {/* Continue Button */}
        <button style={s.continueBtn} onClick={() => onContinue(pkg)}>
          Continue
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </button>

        {/* Compare Packages */}
        <button style={s.compareLink}>Compare Packages</button>
      </div>

      {/* Contact Seller */}
      <button style={s.contactBtn}>Contact Seller</button>
    </div>
  );
}

// ── Star Icon (filled/empty) ──
const StarIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "#FFB33E" : "none"} stroke="#FFB33E" strokeWidth="1.5">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ── Rating Breakdown Bar ──
function RatingBar({ stars, count, total }) {
  const pct = total > 0 ? (count / total) * 100 : 0;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
      <span style={{ fontSize: 13, color: colors.accent, fontWeight: 500, minWidth: 46, cursor: "pointer" }}>{stars} Stars</span>
      <div style={{ flex: 1, height: 8, background: colors.gray[100], borderRadius: 4, overflow: "hidden" }}>
        <div style={{ width: `${pct}%`, height: "100%", background: "#FFB33E", borderRadius: 4, transition: "width 0.3s" }} />
      </div>
      <span style={{ fontSize: 13, color: colors.gray[500], minWidth: 20, textAlign: "right" }}>({count})</span>
    </div>
  );
}

// ── About Seller Section ──
function AboutSeller({ seller }) {
  return (
    <div style={s.sectionBlock}>
      <h2 style={s.sectionTitle}>About The Seller</h2>
      <div style={s.sellerProfileCard}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
          <img src={seller.avatar} alt={seller.name} style={{ width: 64, height: 64, borderRadius: "50%", objectFit: "cover", border: `2px solid ${colors.gray[200]}` }} />
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: colors.text.primary }}>{seller.name}</div>
            <div style={{ fontSize: 13, color: colors.gray[500], marginTop: 2 }}>{seller.level}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 4 }}>
              <StarRating rating={seller.stats.rating} size={14} />
              <span style={{ fontSize: 13, fontWeight: 600, color: colors.text.primary }}>{seller.stats.rating.toFixed(1)}</span>
              <span style={{ fontSize: 13, color: colors.gray[500] }}>({seller.stats.reviews})</span>
            </div>
          </div>
        </div>
        <button style={s.contactSellerBtn}>Contact Me</button>

        <div style={s.sellerDetails}>
          <div style={s.sellerDetailRow}>
            <span style={s.detailLabel}>From</span>
            <span style={s.detailValue}>{seller.flag} {seller.country}</span>
          </div>
          <div style={s.sellerDetailRow}>
            <span style={s.detailLabel}>Member since</span>
            <span style={s.detailValue}>{seller.memberSince}</span>
          </div>
          <div style={s.sellerDetailRow}>
            <span style={s.detailLabel}>Avg. response time</span>
            <span style={s.detailValue}>{seller.avgResponse}</span>
          </div>
          <div style={s.sellerDetailRow}>
            <span style={s.detailLabel}>Last delivery</span>
            <span style={s.detailValue}>{seller.lastDelivery}</span>
          </div>
          <div style={s.sellerDetailRow}>
            <span style={s.detailLabel}>Languages</span>
            <span style={s.detailValue}>{seller.languages.map(l => `${l.lang} (${l.level})`).join(", ")}</span>
          </div>
        </div>

        <div style={{ borderTop: `1px solid ${colors.gray[200]}`, paddingTop: 16, marginTop: 16 }}>
          <p style={{ fontSize: 14, color: colors.gray[600], lineHeight: 1.7, margin: 0 }}>{seller.bio}</p>
        </div>
      </div>
    </div>
  );
}

// ── FAQ Section ──
function FAQSection({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div style={s.sectionBlock}>
      <h2 style={s.sectionTitle}>FAQ</h2>
      <div>
        {faqs.map((faq, i) => (
          <div key={i} style={s.faqItem}>
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              style={s.faqQuestion}
            >
              <span>{faq.q}</span>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke={colors.gray[500]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                style={{ transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s", flexShrink: 0 }}
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            {openIndex === i && (
              <div style={s.faqAnswer}>{faq.a}</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Reviews Section ──
function ReviewsSection({ reviews, sellerStats }) {
  const totalReviews = sellerStats.reviews;
  const ratingBreakdown = [
    { stars: 5, count: 1720 },
    { stars: 4, count: 98 },
    { stars: 3, count: 28 },
    { stars: 2, count: 10 },
    { stars: 1, count: 4 },
  ];

  return (
    <div style={s.sectionBlock}>
      <h2 style={s.sectionTitle}>Reviews</h2>

      {/* Rating Summary */}
      <div style={s.reviewSummary}>
        <div style={s.reviewOverall}>
          <span style={{ fontSize: 48, fontWeight: 700, color: colors.text.primary, lineHeight: 1 }}>{sellerStats.rating.toFixed(1)}</span>
          <div style={{ display: "flex", gap: 2, marginTop: 8 }}>
            {[1, 2, 3, 4, 5].map(n => <StarIcon key={n} filled={n <= sellerStats.rating} />)}
          </div>
          <span style={{ fontSize: 13, color: colors.gray[500], marginTop: 4 }}>{totalReviews} reviews</span>
        </div>
        <div style={{ flex: 1 }}>
          {ratingBreakdown.map(r => (
            <RatingBar key={r.stars} stars={r.stars} count={r.count} total={totalReviews} />
          ))}
        </div>
      </div>

      {/* Sort */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <span style={{ fontSize: 13, color: colors.gray[500] }}>Sort by: <strong style={{ color: colors.text.primary }}>Most relevant</strong></span>
      </div>

      {/* Individual Reviews */}
      {reviews.map((review, i) => (
        <div key={i} style={s.reviewItem}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <img src={review.avatar} alt={review.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover" }} />
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: colors.text.primary }}>{review.name}</div>
              <div style={{ fontSize: 12, color: colors.gray[500] }}>{review.flag} {review.country}</div>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <div style={{ display: "flex", gap: 1 }}>
              {[1, 2, 3, 4, 5].map(n => <StarIcon key={n} filled={n <= review.rating} />)}
            </div>
            <span style={{ fontSize: 12, color: colors.gray[400] }}>|</span>
            <span style={{ fontSize: 12, color: colors.gray[500] }}>{review.timeAgo}</span>
          </div>
          <p style={{ fontSize: 14, color: colors.gray[600], lineHeight: 1.7, margin: "0 0 10px" }}>{review.comment}</p>
          <div style={{ display: "flex", gap: 16, fontSize: 12, color: colors.gray[400] }}>
            <span>Price: <strong style={{ color: colors.text.secondary }}>{review.price}</strong></span>
            <span>Duration: <strong style={{ color: colors.text.secondary }}>{review.duration}</strong></span>
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 10 }}>
            <button style={s.helpfulBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              Helpful
            </button>
            <button style={s.helpfulBtn}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ transform: "rotate(180deg)" }}>
                <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3H14z" />
                <path d="M7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
              </svg>
              Not Helpful
            </button>
          </div>
        </div>
      ))}

      {/* See More */}
      <button style={s.seeMoreBtn}>See More Reviews</button>
    </div>
  );
}

// ── Checkout Modal ──
function CheckoutModal({ pkg, onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ fullName: "", email: "", phone: "" });
  const [touched, setTouched] = useState({});
  const [triedNext, setTriedNext] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Validation
  const validate = () => {
    const errs = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    else if (form.fullName.trim().length < 2) errs.fullName = "Name must be at least 2 characters";

    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) errs.email = "Enter a valid email address";

    if (!form.phone.trim()) errs.phone = "Phone number is required";
    else if (!/^[+]?[\d\s\-()]{7,15}$/.test(form.phone.trim())) errs.phone = "Enter a valid phone number";

    return errs;
  };

  const errors = validate();
  const showError = (field) => (touched[field] || triedNext) && errors[field];

  const handleChange = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));
  const handleBlur = (field) => () => setTouched((t) => ({ ...t, [field]: true }));

  const priceNum = parseFloat(pkg.price.replace(/[₹,]/g, ""));
  const serviceFee = Math.round(priceNum * 0.0154 * 100) / 100;
  const total = (priceNum + serviceFee).toFixed(2);
  const deliveryDays = pkg.delivery.match(/\d+/)?.[0] || "5";

  const canContinue =
    step === 1 ? Object.keys(errors).length === 0
    : step === 2 ? selectedMethod !== ""
    : true;

  const handleNext = () => {
    if (step === 1 && Object.keys(errors).length > 0) {
      setTriedNext(true);
      return;
    }
    setTriedNext(false);
    if (step < 3) setStep(step + 1);
    else {
      alert("Payment initiated via " + (selectedMethod === "esewa" ? "eSewa" : "Khalti") + "!");
      onClose();
    }
  };

  const methods = [
    { id: "esewa", name: "eSewa", desc: "Pay from your eSewa wallet instantly", color: "#60BB46" },
    { id: "khalti", name: "Khalti", desc: "Pay via your Khalti digital wallet", color: "#5C2D91" },
  ];

  return (
    <div style={m.overlay} onClick={onClose}>
      <div style={m.wrapper} onClick={(e) => e.stopPropagation()}>
        {/* Step Indicator */}
        <div style={m.stepRow}>
          {[{ n: 1, l: "Details" }, { n: 2, l: "Payment" }, { n: 3, l: "Confirm" }].map((s2, i) => (
            <div key={s2.n} style={{ display: "flex", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{
                  ...m.stepCircle,
                  ...(step >= s2.n ? m.stepCircleActive : {}),
                  ...(step > s2.n ? m.stepCircleDone : {}),
                }}>
                  {step > s2.n ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  ) : s2.n}
                </div>
                <span style={{ fontSize: 13, fontWeight: step >= s2.n ? 600 : 400, color: step >= s2.n ? "white" : "rgba(255,255,255,0.45)" }}>{s2.l}</span>
              </div>
              {i < 2 && <div style={m.stepLine} />}
            </div>
          ))}
        </div>

        {/* Back button */}
        {step > 1 && (
          <button onClick={() => setStep(step - 1)} style={m.backBtn}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            Back
          </button>
        )}

        <div style={m.contentRow}>
          {/* LEFT CARD */}
          <div style={m.leftCol}>
            {step === 1 && (
              <div style={m.card}>
                <h2 style={m.cardTitle}>Details for Checkout</h2>
                <div style={m.divider} />
                <div style={m.formGroup}>
                  <label style={m.label}>Full Name</label>
                  <input type="text" placeholder="Enter your full name" value={form.fullName} onChange={handleChange("fullName")} onBlur={handleBlur("fullName")} style={{ ...m.input, ...(showError("fullName") ? m.inputError : {}) }} />
                  {showError("fullName") && <span style={m.errorText}>{errors.fullName}</span>}
                </div>
                <div style={m.formGroup}>
                  <label style={m.label}>Email</label>
                  <input type="email" placeholder="Enter your email address" value={form.email} onChange={handleChange("email")} onBlur={handleBlur("email")} style={{ ...m.input, ...(showError("email") ? m.inputError : {}) }} />
                  {showError("email") && <span style={m.errorText}>{errors.email}</span>}
                </div>
                <div style={{ marginBottom: 0 }}>
                  <label style={m.label}>Phone Number</label>
                  <input type="tel" placeholder="Enter your Phone Number" value={form.phone} onChange={handleChange("phone")} onBlur={handleBlur("phone")} style={{ ...m.input, ...(showError("phone") ? m.inputError : {}) }} />
                  {showError("phone") && <span style={m.errorText}>{errors.phone}</span>}
                </div>
              </div>
            )}

            {step === 2 && (
              <div style={m.card}>
                <h2 style={m.cardTitle}>Payment Method</h2>
                <div style={m.divider} />
                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  {methods.map((mt) => (
                    <button key={mt.id} onClick={() => setSelectedMethod(mt.id)} style={{ ...m.paymentOption, ...(selectedMethod === mt.id ? m.paymentOptionActive : {}) }}>
                      <div style={{ width: 40, height: 40, borderRadius: "50%", background: mt.color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={mt.color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
                      </div>
                      <div style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontSize: 15, fontWeight: 600, color: colors.text.primary }}>{mt.name}</div>
                        <div style={{ fontSize: 12, color: colors.gray[500], marginTop: 2 }}>{mt.desc}</div>
                      </div>
                      <div style={{ width: 20, height: 20, borderRadius: "50%", border: `2px solid ${selectedMethod === mt.id ? colors.primary : colors.gray[300]}`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {selectedMethod === mt.id && <div style={{ width: 10, height: 10, borderRadius: "50%", background: colors.primary }} />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={m.card}>
                <h2 style={m.cardTitle}>Confirm Your Details</h2>
                <div style={m.divider} />
                {[
                  { label: "Full Name", value: form.fullName },
                  { label: "Email", value: form.email },
                  { label: "Phone Number", value: form.phone },
                  { label: "Payment Method", value: selectedMethod === "esewa" ? "eSewa" : "Khalti" },
                ].map((row) => (
                  <div key={row.label} style={m.confirmRow}>
                    <span style={{ fontSize: 13, color: colors.gray[500] }}>{row.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, color: colors.text.primary }}>{row.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT: Order Summary */}
          <div style={m.rightCol}>
            <div style={m.card}>
              <h2 style={{ ...m.cardTitle, textAlign: "center", fontSize: 18 }}>Order Summary</h2>
              <div style={m.divider} />
              <div style={{ padding: "0 4px" }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: colors.text.primary, marginBottom: 16 }}>Price summary</div>
                <div style={m.summaryRow}><span style={m.summaryLabel}>Subtotal</span><span style={m.summaryValue}>Rs.{priceNum.toLocaleString("en-IN")}</span></div>
                <div style={m.summaryRow}><span style={m.summaryLabel}>Service Fee</span><span style={m.summaryValue}>Rs.{serviceFee.toLocaleString("en-IN")}</span></div>
                <div style={m.summaryDivider} />
                <div style={m.summaryRow}><span style={{ ...m.summaryLabel, fontWeight: 700, color: colors.text.primary }}>Total</span><span style={{ ...m.summaryValue, fontWeight: 700, color: colors.text.primary, fontSize: 15 }}>Rs.{total}</span></div>
                <div style={m.summaryRow}><span style={m.summaryLabel}>Delivery Time</span><span style={m.summaryValue}>{deliveryDays} days</span></div>
              </div>
              <button onClick={handleNext} disabled={!canContinue} style={{ ...m.checkoutBtn, ...(canContinue ? {} : m.checkoutBtnDisabled) }}>
                {step < 3 ? "Continue to Checkout" : "Confirm & Pay"}
              </button>
              <p style={m.termsText}>By paying you agree to our <span style={{ color: colors.accent, cursor: "pointer" }}>Terms & Refund Policy</span></p>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button onClick={onClose} style={m.closeBtn}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
        </button>
      </div>
    </div>
  );
}

// ── Modal Styles ──
const m = {
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" },
  wrapper: { position: "relative", background: colors.primary, borderRadius: borderRadius.xl + 4, padding: "36px 32px 40px", width: "min(880px, 94vw)", maxHeight: "90vh", overflowY: "auto" },
  closeBtn: { position: "absolute", top: 14, right: 14, background: "rgba(255,255,255,0.12)", border: "none", borderRadius: "50%", width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" },

  // Steps
  stepRow: { display: "flex", alignItems: "center", justifyContent: "center", gap: 0, marginBottom: 28 },
  stepCircle: { width: 28, height: 28, borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,0.4)", transition: "all 0.3s" },
  stepCircleActive: { borderColor: "white", color: "white", background: "rgba(255,255,255,0.15)" },
  stepCircleDone: { background: colors.success, borderColor: colors.success },
  stepLine: { width: 50, height: 2, background: "rgba(255,255,255,0.2)", margin: "0 14px" },

  // Back
  backBtn: { display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", color: "rgba(255,255,255,0.7)", fontSize: 13, fontWeight: 500, cursor: "pointer", padding: 0, marginBottom: 16, fontFamily: "inherit" },

  // Layout
  contentRow: { display: "flex", gap: 24, alignItems: "flex-start" },
  leftCol: { flex: 1, minWidth: 0 },
  rightCol: { width: 280, flexShrink: 0 },

  // Card
  card: { background: "white", borderRadius: borderRadius.xl, padding: 24, boxShadow: shadows.lg },
  cardTitle: { fontSize: 17, fontWeight: 700, color: colors.text.primary, margin: 0 },
  divider: { height: 1, background: colors.gray[200], margin: "14px 0 18px" },

  // Form
  formGroup: { marginBottom: 16 },
  label: { display: "block", fontSize: 13, fontWeight: 500, color: colors.text.secondary, marginBottom: 6 },
  input: { width: "100%", padding: "10px 14px", border: `1px solid ${colors.gray[300]}`, borderRadius: borderRadius.md, fontSize: 14, color: colors.text.primary, outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "border-color 0.2s" },
  inputError: { borderColor: colors.danger, boxShadow: `0 0 0 1px ${colors.danger}22` },
  errorText: { display: "block", fontSize: 12, color: colors.danger, marginTop: 5, fontWeight: 500 },

  // Payment
  paymentOption: { display: "flex", alignItems: "center", gap: 14, width: "100%", padding: "14px 16px", background: "white", border: `1.5px solid ${colors.gray[200]}`, borderRadius: borderRadius.lg, cursor: "pointer", fontFamily: "inherit", transition: "border-color 0.2s" },
  paymentOptionActive: { borderColor: colors.primary, boxShadow: `0 0 0 1px ${colors.primary}` },

  // Confirm
  confirmRow: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${colors.gray[100]}` },

  // Summary
  summaryRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
  summaryLabel: { fontSize: 13, color: colors.gray[500] },
  summaryValue: { fontSize: 13, color: colors.gray[600], fontWeight: 500 },
  summaryDivider: { height: 1, background: colors.gray[200], margin: "10px 0" },
  checkoutBtn: { width: "100%", padding: "12px 0", background: colors.primary, color: "white", border: "none", borderRadius: borderRadius.md, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", marginTop: 18, transition: "opacity 0.2s" },
  checkoutBtnDisabled: { opacity: 0.5, cursor: "not-allowed" },
  termsText: { fontSize: 11, color: colors.gray[400], textAlign: "center", margin: "10px 0 0", lineHeight: 1.4 },
};

// ── Main GigDetail Page ──
export default function GigDetail() {
  const { id } = useParams();
  const [activeThumb, setActiveThumb] = useState(0);
  const [checkoutPkg, setCheckoutPkg] = useState(null);
  const [gig, setGig] = useState(GIG_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/gigs/${id}`).then((data) => {
      const g = data.gig;
      const seller = g.seller || {};
      const mapped = {
        ...GIG_DATA,
        category: g.category || GIG_DATA.category,
        subcategory: g.subcategory || GIG_DATA.subcategory,
        title: g.title || GIG_DATA.title,
        seller: {
          name: seller.username || GIG_DATA.seller.name,
          avatar: seller.avatar || GIG_DATA.seller.avatar,
          level: seller.badge || GIG_DATA.seller.level,
          rating: Number(g.overallRating) || GIG_DATA.seller.rating,
          reviews: g.reviewCount || GIG_DATA.seller.reviews,
          ordersInQueue: seller.ordersInQueue || GIG_DATA.seller.ordersInQueue,
        },
        mainImage: (g.images && g.images[0]?.imageUrl) || GIG_DATA.mainImage,
        thumbnails: g.images?.length ? g.images.map((img) => img.imageUrl) : GIG_DATA.thumbnails,
        about: g.description ? g.description.split("\n").filter(Boolean) : GIG_DATA.about,
        requirements: g.requirements ? g.requirements.split("\n").filter(Boolean) : GIG_DATA.requirements,
        packages: g.packages?.length ? {
          basic: mapPackage(g.packages.find((p) => p.tier === "basic") || g.packages[0]),
          standard: mapPackage(g.packages.find((p) => p.tier === "standard") || g.packages[1] || g.packages[0]),
          premium: mapPackage(g.packages.find((p) => p.tier === "premium") || g.packages[2] || g.packages[0]),
        } : GIG_DATA.packages,
        sellerProfile: {
          ...GIG_DATA.sellerProfile,
          name: seller.username || GIG_DATA.sellerProfile.name,
          avatar: seller.avatar || GIG_DATA.sellerProfile.avatar,
          level: seller.badge || GIG_DATA.sellerProfile.level,
          country: seller.country || GIG_DATA.sellerProfile.country,
          memberSince: seller.memberSince || GIG_DATA.sellerProfile.memberSince,
          bio: seller.bio || GIG_DATA.sellerProfile.bio,
          languages: seller.languages || GIG_DATA.sellerProfile.languages,
          stats: {
            rating: Number(g.overallRating) || GIG_DATA.sellerProfile.stats.rating,
            reviews: g.reviewCount || GIG_DATA.sellerProfile.stats.reviews,
            ordersCompleted: seller.jobsCompleted || GIG_DATA.sellerProfile.stats.ordersCompleted,
            onTimeDelivery: seller.onTimeDelivery || GIG_DATA.sellerProfile.stats.onTimeDelivery,
            responseTime: seller.avgResponse || GIG_DATA.sellerProfile.stats.responseTime,
          },
        },
        faqs: g.faqs?.length ? g.faqs.map((f) => ({ q: f.question, a: f.answer })) : GIG_DATA.faqs,
        reviews: g.reviews?.length ? g.reviews.map((r) => ({
          name: r.reviewerName || "User",
          country: r.reviewerCountry || "",
          flag: r.reviewerFlag || "",
          avatar: r.reviewerAvatar || `https://i.pravatar.cc/40?img=${r.reviewerId}`,
          rating: r.rating,
          timeAgo: r.timeAgo || "recently",
          comment: r.comment,
          price: r.price || "",
          duration: r.duration || "",
        })) : GIG_DATA.reviews,
      };
      setGig(mapped);
    }).catch(() => {}).finally(() => setLoading(false));
  }, [id]);

  function mapPackage(p) {
    if (!p) return GIG_DATA.packages.basic;
    const features = Array.isArray(p.features) ? p.features.map((f) => ({ label: f, included: true })) : [];
    return {
      name: p.name || p.tier?.toUpperCase() + " PROMO",
      price: `₹${Number(p.price || 0).toLocaleString()}`,
      description: p.description || "",
      delivery: `${p.deliveryDays || 5} Days Delivery`,
      revisions: p.revisions === -1 ? "Unlimited Revisions" : `${p.revisions || 1} Revision${(p.revisions || 1) > 1 ? "s" : ""}`,
      features: features.length ? features : GIG_DATA.packages.basic.features,
    };
  }

  const handleContinue = (pkg) => {
    setCheckoutPkg(pkg);
  };

  return (
    <div style={s.page}>
      <Header />

      <div style={s.container}>
        {/* Breadcrumb */}
        <div style={s.breadcrumb}>
          <a href="#" style={s.breadcrumbLink}>{gig.category}</a>
          <span style={s.breadcrumbSep}>›</span>
          <a href="#" style={s.breadcrumbLink}>{gig.subcategory}</a>
        </div>

        <div style={s.contentRow}>
          {/* ── LEFT: Gig Details ── */}
          <div style={s.leftCol}>
            {/* Title */}
            <h1 style={s.gigTitle}>{gig.title}</h1>

            {/* Seller Info */}
            <div style={s.sellerRow}>
              <img src={gig.seller.avatar} alt={gig.seller.name} style={s.sellerAvatar} />
              <span style={s.sellerName}>{gig.seller.name}</span>
              <span style={s.sellerBadge}>{gig.seller.level}</span>
              <StarRating rating={gig.seller.rating} size={14} />
              <span style={s.sellerMeta}>{gig.seller.reviews}</span>
              <span style={s.queueBadge}>{gig.seller.ordersInQueue} Orders in Queue</span>
            </div>

            {/* Main Image */}
            <div style={s.imageContainer}>
              <img
                src={gig.thumbnails[activeThumb]?.replace("w=100&h=60", "w=680&h=383") || gig.mainImage}
                alt={gig.title}
                style={s.mainImage}
              />
              <PlayButton />
              <ArrowButton direction="left" onClick={() => setActiveThumb((t) => Math.max(0, t - 1))} />
              <ArrowButton direction="right" onClick={() => setActiveThumb((t) => Math.min(gig.thumbnails.length - 1, t + 1))} />
            </div>

            {/* Thumbnails */}
            <div style={s.thumbRow}>
              {gig.thumbnails.map((thumb, i) => (
                <img
                  key={i}
                  src={thumb}
                  alt={`thumb-${i}`}
                  onClick={() => setActiveThumb(i)}
                  style={{
                    ...s.thumbnail,
                    ...(activeThumb === i ? s.thumbnailActive : {}),
                  }}
                />
              ))}
            </div>

            {/* About This Gig */}
            <div style={s.aboutSection}>
              <h2 style={s.sectionTitle}>About This Gig</h2>
              {gig.about.map((p, i) => (
                <p key={i} style={s.aboutText}>{p}</p>
              ))}
              <p style={s.aboutHighlight}>
                So why are you still waiting, contact us and we can start the work.
              </p>

              <p style={s.aboutSubtitle}>What do I need in order to start work?</p>
              <ul style={s.requirementList}>
                {gig.requirements.map((req, i) => (
                  <li key={i} style={s.requirementItem}>{req}</li>
                ))}
              </ul>

              <div style={s.customOrder}>
                <p style={s.customOrderTitle}>FOR CUSTOM ORDERS</p>
                <p style={s.aboutText}>
                  If you want to create totally unique Customized video with Voice over Intro/women voice , Prices Vary , Just Contact US to discuss further.
                </p>
              </div>

              <p style={s.aboutText}>
                <strong>Don't Search any more gigs, you will not find this kind of service anywhere.</strong><br />
                Just contact us and see the difference
              </p>

              {/* Product Type */}
              <div style={s.productType}>
                <span style={s.productLabel}>Product type</span>
                <span style={s.productValue}>{gig.productType}</span>
              </div>
            </div>

            {/* About The Seller */}
            <AboutSeller seller={gig.sellerProfile} />

            {/* FAQ */}
            <FAQSection faqs={gig.faqs} />

            {/* Reviews */}
            <ReviewsSection reviews={gig.reviews} sellerStats={gig.sellerProfile.stats} />
          </div>

          {/* ── RIGHT: Buy Card ── */}
          <div style={s.rightCol}>
            <BuyCard packages={gig.packages} onContinue={handleContinue} />
          </div>
        </div>
      </div>

      <Footer />

      {/* Checkout Modal */}
      {checkoutPkg && (
        <CheckoutModal pkg={checkoutPkg} onClose={() => setCheckoutPkg(null)} />
      )}
    </div>
  );
}

// ── Styles ──
const s = {
  page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: "#fff", minHeight: "100vh" },
  container: { maxWidth: 1100, margin: "0 auto", padding: "0 24px 60px" },

  // Breadcrumb
  breadcrumb: { display: "flex", alignItems: "center", gap: 8, padding: "20px 0 12px" },
  breadcrumbLink: { fontSize: 13, color: colors.accent, textDecoration: "none" },
  breadcrumbSep: { fontSize: 13, color: colors.gray[400] },

  // Content layout
  contentRow: { display: "flex", gap: 32, alignItems: "flex-start" },
  leftCol: { flex: 1, minWidth: 0 },
  rightCol: { width: 340, flexShrink: 0, position: "sticky", top: 20 },

  // Title
  gigTitle: { fontSize: 24, fontWeight: 700, color: colors.text.primary, margin: "0 0 16px", lineHeight: 1.35 },

  // Seller
  sellerRow: { display: "flex", alignItems: "center", gap: 8, marginBottom: 20, flexWrap: "wrap" },
  sellerAvatar: { width: 32, height: 32, borderRadius: "50%", objectFit: "cover" },
  sellerName: { fontSize: 14, fontWeight: 700, color: colors.text.primary },
  sellerBadge: { fontSize: 12, color: colors.gray[500], background: colors.gray[100], padding: "2px 8px", borderRadius: 4 },
  sellerMeta: { fontSize: 13, color: colors.gray[500] },
  queueBadge: { fontSize: 12, color: colors.gray[500] },

  // Image
  imageContainer: { position: "relative", borderRadius: borderRadius.lg, overflow: "hidden", marginBottom: 12, background: "#000" },
  mainImage: { width: "100%", height: "auto", display: "block", aspectRatio: "16/9", objectFit: "cover" },
  playButton: { position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 60, height: 60, borderRadius: "50%", background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s" },
  arrowBtn: { position: "absolute", top: "50%", transform: "translateY(-50%)", width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.85)", border: "none", cursor: "pointer", fontSize: 20, display: "flex", alignItems: "center", justifyContent: "center", color: colors.text.secondary, boxShadow: shadows.sm },

  // Thumbnails
  thumbRow: { display: "flex", gap: 8, marginBottom: 32, overflowX: "auto" },
  thumbnail: { width: 72, height: 48, borderRadius: 6, objectFit: "cover", cursor: "pointer", border: "2px solid transparent", opacity: 0.7, transition: "opacity 0.2s, border-color 0.2s" },
  thumbnailActive: { border: `2px solid ${colors.accent}`, opacity: 1 },

  // About
  aboutSection: { paddingTop: 8 },
  sectionTitle: { fontSize: 20, fontWeight: 700, color: colors.text.primary, margin: "0 0 16px" },
  aboutText: { fontSize: 14, color: colors.gray[600], lineHeight: 1.7, margin: "0 0 12px" },
  aboutHighlight: { fontSize: 14, color: colors.text.primary, fontWeight: 600, margin: "16px 0 20px" },
  aboutSubtitle: { fontSize: 14, fontWeight: 600, color: colors.text.primary, margin: "0 0 8px" },
  requirementList: { paddingLeft: 20, margin: "0 0 20px" },
  requirementItem: { fontSize: 14, color: colors.gray[600], lineHeight: 1.8 },
  customOrder: { margin: "20px 0" },
  customOrderTitle: { fontSize: 13, fontWeight: 700, color: colors.text.primary, margin: "0 0 4px" },
  productType: { marginTop: 24, paddingTop: 16, borderTop: `1px solid ${colors.gray[200]}` },
  productLabel: { fontSize: 12, color: colors.gray[400], display: "block", marginBottom: 4 },
  productValue: { fontSize: 14, fontWeight: 600, color: colors.text.primary },

  // ── Buy Card ──
  buyCard: { border: `1px solid ${colors.gray[200]}`, borderRadius: borderRadius.xl, overflow: "hidden", boxShadow: shadows.md },

  // Tabs
  tabRow: { display: "flex", borderBottom: `1px solid ${colors.gray[200]}` },
  tab: { flex: 1, padding: "14px 0", background: "none", border: "none", borderBottom: "3px solid transparent", fontSize: 14, fontWeight: 500, color: colors.gray[500], cursor: "pointer", textAlign: "center", fontFamily: "inherit", transition: "color 0.2s" },
  tabActive: { color: colors.accent, borderBottomColor: colors.accent, fontWeight: 600 },

  // Package Content
  packageContent: { padding: "20px 24px" },
  packageHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 },
  packageName: { fontSize: 16, fontWeight: 700, color: colors.text.primary, margin: 0, textTransform: "uppercase", letterSpacing: 0.5 },
  packagePrice: { fontSize: 22, fontWeight: 700, color: colors.text.primary },
  packageDesc: { fontSize: 13, color: colors.gray[500], lineHeight: 1.5, margin: "0 0 16px" },

  // Delivery
  deliveryRow: { display: "flex", gap: 16, marginBottom: 16 },
  deliveryItem: { display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: colors.text.secondary },

  // Features
  featureList: { listStyle: "none", padding: 0, margin: "0 0 20px" },
  featureItem: { display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: colors.text.secondary, padding: "4px 0" },

  // Buttons
  continueBtn: { width: "100%", padding: "12px 0", background: colors.success, color: colors.white, border: "none", borderRadius: borderRadius.md, fontSize: 15, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 12, fontFamily: "inherit" },
  compareLink: { width: "100%", background: "none", border: "none", color: colors.accent, fontSize: 13, fontWeight: 500, cursor: "pointer", textAlign: "center", padding: "6px 0", fontFamily: "inherit" },
  contactBtn: { width: "100%", padding: "12px 0", background: colors.white, color: colors.text.secondary, border: `1px solid ${colors.gray[200]}`, borderRadius: `0 0 ${borderRadius.xl}px ${borderRadius.xl}px`, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },

  // ── Shared Section ──
  sectionBlock: { marginTop: 40, paddingTop: 32, borderTop: `1px solid ${colors.gray[200]}` },

  // ── About Seller ──
  sellerProfileCard: { background: colors.gray[50] || "#f9fafb", borderRadius: borderRadius.lg, padding: 24, border: `1px solid ${colors.gray[200]}` },
  contactSellerBtn: { width: "100%", padding: "10px 0", background: "none", border: `1px solid ${colors.text.secondary}`, borderRadius: borderRadius.md, fontSize: 14, fontWeight: 600, color: colors.text.secondary, cursor: "pointer", fontFamily: "inherit", marginBottom: 16, transition: "background 0.2s" },
  sellerDetails: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px 24px" },
  sellerDetailRow: { display: "flex", flexDirection: "column", gap: 2 },
  detailLabel: { fontSize: 12, color: colors.gray[400], fontWeight: 500 },
  detailValue: { fontSize: 14, color: colors.text.primary, fontWeight: 500 },

  // ── FAQ ──
  faqItem: { borderBottom: `1px solid ${colors.gray[200]}` },
  faqQuestion: { width: "100%", background: "none", border: "none", padding: "16px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, cursor: "pointer", fontSize: 14, fontWeight: 600, color: colors.text.primary, textAlign: "left", fontFamily: "inherit" },
  faqAnswer: { fontSize: 14, color: colors.gray[600], lineHeight: 1.7, paddingBottom: 16 },

  // ── Reviews ──
  reviewSummary: { display: "flex", gap: 32, alignItems: "flex-start", marginBottom: 24, padding: 20, background: colors.gray[50] || "#f9fafb", borderRadius: borderRadius.lg, border: `1px solid ${colors.gray[200]}` },
  reviewOverall: { display: "flex", flexDirection: "column", alignItems: "center", minWidth: 100 },
  reviewItem: { paddingBottom: 24, marginBottom: 24, borderBottom: `1px solid ${colors.gray[200]}` },
  helpfulBtn: { display: "flex", alignItems: "center", gap: 6, background: "none", border: "none", fontSize: 12, color: colors.gray[500], cursor: "pointer", padding: 0, fontFamily: "inherit" },
  seeMoreBtn: { width: "100%", padding: "12px 0", background: "none", border: `1px solid ${colors.gray[300]}`, borderRadius: borderRadius.md, fontSize: 14, fontWeight: 600, color: colors.text.primary, cursor: "pointer", fontFamily: "inherit", transition: "background 0.2s" },
};
