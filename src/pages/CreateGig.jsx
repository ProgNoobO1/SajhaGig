import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { colors, borderRadius, shadows } from "../constants/theme";
import api from "../api/client";

const FALLBACK_CATEGORIES = [
  "Graphic Design", "Web Development", "Mobile Development", "UI/UX Design",
  "Digital Marketing", "Content Writing", "Video & Animation", "Data Science",
];

const FALLBACK_SUBCATEGORIES = {
  "Graphic Design": ["Logo design", "Brand identity", "Illustration", "Business cards", "Social media design"],
  "Web Development": ["WordPress", "Landing page", "Full website", "E-commerce", "Web app"],
  "Mobile Development": ["iOS app", "Android app", "React Native", "Flutter", "App UI"],
  "UI/UX Design": ["Website design", "App design", "Wireframing", "Prototyping", "User research"],
  "Digital Marketing": ["SEO", "Social media marketing", "PPC", "Email marketing", "Content strategy"],
  "Content Writing": ["Blog posts", "Copywriting", "Technical writing", "Product descriptions", "Articles"],
  "Video & Animation": ["Explainer video", "Animation", "Video editing", "Motion graphics", "Intro/Outro"],
  "Data Science": ["Data analysis", "Machine learning", "Data visualization", "Web scraping", "Python scripts"],
};

export default function CreateGig() {
  const navigate = useNavigate();
  const [gigCategories, setGigCategories] = useState(FALLBACK_CATEGORIES);
  const [subcategories, setSubcategories] = useState(FALLBACK_SUBCATEGORIES);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "", category: "Graphic Design", subcategory: "Logo design", tags: "",
    basicName: "", basicPrice: "", basicDelivery: "", basicRevisions: "",
    standardName: "", standardPrice: "", standardDelivery: "", standardRevisions: "",
    premiumName: "", premiumPrice: "", premiumDelivery: "", premiumRevisions: "",
    description: "", requirements: "",
  });

  useEffect(() => {
    api.get('/categories').then((data) => {
      const cats = data.categories || [];
      setGigCategories(cats.map((c) => c.name));
      const subMap = {};
      cats.forEach((c) => {
        subMap[c.name] = (c.subcategories || []).map((sc) => sc.name);
      });
      setSubcategories((prev) => ({ ...prev, ...subMap }));
      if (cats.length) {
        const first = cats[0].name;
        const firstSub = subMap[first]?.[0] || "";
        setForm((f) => ({ ...f, category: first, subcategory: firstSub }));
      }
    }).catch(() => {});
  }, []);

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }));

  const handleCategoryChange = (e) => {
    const cat = e.target.value;
    setForm((f) => ({ ...f, category: cat, subcategory: subcategories[cat]?.[0] || "" }));
  };

  const handlePublish = async () => {
    setSubmitting(true);
    try {
      await api.post('/gigs', {
        title: form.title,
        category: form.category,
        subcategory: form.subcategory,
        searchTags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
        description: form.description,
        requirements: form.requirements,
        packages: [
          { tier: "basic", name: form.basicName, price: Number(form.basicPrice) || 0, deliveryDays: Number(form.basicDelivery) || 5, revisions: Number(form.basicRevisions) || 1 },
          { tier: "standard", name: form.standardName, price: Number(form.standardPrice) || 0, deliveryDays: Number(form.standardDelivery) || 7, revisions: Number(form.standardRevisions) || 3 },
          { tier: "premium", name: form.premiumName, price: Number(form.premiumPrice) || 0, deliveryDays: Number(form.premiumDelivery) || 10, revisions: Number(form.premiumRevisions) || -1 },
        ],
      });
      navigate("/freelancer/dashboard");
    } catch {
      navigate("/freelancer/dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={s.page}>
      {/* Hero */}
      <div style={s.hero}>
        <h1 style={s.heroTitle}>Create a New Gig</h1>
        <p style={s.heroSub}>List your Service so clients can order directly at a fixed price</p>
      </div>

      <div style={s.container}>
        {/* Gig Overview */}
        <div style={s.card}>
          <h2 style={s.cardTitle}>Gig Overview</h2>

          <div style={s.field}>
            <label style={s.label}>Gig Title</label>
            <input style={s.input} placeholder="Will design a modern logo for your business" value={form.title} onChange={update("title")} />
          </div>

          <div style={s.row}>
            <div style={s.fieldHalf}>
              <label style={s.label}>Category</label>
              <select style={s.select} value={form.category} onChange={handleCategoryChange}>
                {gigCategories.map((c) => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div style={s.fieldHalf}>
              <label style={s.label}>Subcategory</label>
              <select style={s.select} value={form.subcategory} onChange={update("subcategory")}>
                {(subcategories[form.category] || []).map((sc) => <option key={sc}>{sc}</option>)}
              </select>
            </div>
          </div>

          <div style={s.field}>
            <label style={s.label}>Search Tags</label>
            <input style={s.input} placeholder="Logo, brand, design..." value={form.tags} onChange={update("tags")} />
          </div>
        </div>

        {/* Packages & Pricing */}
        <div style={s.card}>
          <h2 style={s.cardTitle}>Packages & Pricing</h2>
          <div style={s.packagesGrid}>
            {/* Column headers */}
            <div />
            <div style={{ ...s.packageHeader, color: colors.danger }}>Basic</div>
            <div style={{ ...s.packageHeader, color: colors.success }}>Standard</div>
            <div style={{ ...s.packageHeader, color: colors.accent }}>Premium</div>

            {/* Package Name */}
            <div style={s.rowLabel}>Package Name</div>
            <input style={s.gridInput} placeholder="Basic Package" value={form.basicName} onChange={update("basicName")} />
            <input style={s.gridInput} placeholder="Standard Package" value={form.standardName} onChange={update("standardName")} />
            <input style={s.gridInput} placeholder="Premium Package" value={form.premiumName} onChange={update("premiumName")} />

            {/* Price */}
            <div style={s.rowLabel}>Price (Rs.)</div>
            <input style={s.gridInput} placeholder="Price (Rs.)" value={form.basicPrice} onChange={update("basicPrice")} />
            <input style={s.gridInput} placeholder="Price (Rs.)" value={form.standardPrice} onChange={update("standardPrice")} />
            <input style={s.gridInput} placeholder="Price (Rs.)" value={form.premiumPrice} onChange={update("premiumPrice")} />

            {/* Delivery */}
            <div style={s.rowLabel}>Delivery (days)</div>
            <input style={s.gridInput} placeholder="Delivery (days)" value={form.basicDelivery} onChange={update("basicDelivery")} />
            <input style={s.gridInput} placeholder="Delivery (days)" value={form.standardDelivery} onChange={update("standardDelivery")} />
            <input style={s.gridInput} placeholder="Delivery (days)" value={form.premiumDelivery} onChange={update("premiumDelivery")} />

            {/* Revisions */}
            <div style={s.rowLabel}>Revisions</div>
            <input style={s.gridInput} placeholder="Revisions" value={form.basicRevisions} onChange={update("basicRevisions")} />
            <input style={s.gridInput} placeholder="Revisions" value={form.standardRevisions} onChange={update("standardRevisions")} />
            <input style={s.gridInput} placeholder="Revisions" value={form.premiumRevisions} onChange={update("premiumRevisions")} />
          </div>
        </div>

        {/* Description & Requirements */}
        <div style={s.card}>
          <h2 style={s.cardTitle}>Description & Requirements</h2>

          <div style={s.field}>
            <label style={s.label}>Gig Description</label>
            <textarea
              style={s.textarea}
              placeholder="Describe your gig in detail - What you will deliver, your process, and why clients should choose you..."
              value={form.description}
              onChange={update("description")}
              rows={5}
            />
          </div>

          <div style={s.field}>
            <label style={s.label}>What you need from buyer</label>
            <textarea
              style={s.textarea}
              placeholder="Eg: Business name, color preferences, target audience etc..."
              value={form.requirements}
              onChange={update("requirements")}
              rows={4}
            />
          </div>
        </div>

        {/* Gallery */}
        <div style={s.card}>
          <h2 style={s.cardTitle}>Gallery</h2>
          <div style={s.uploadArea}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={colors.accent} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="17 8 12 3 7 8" />
              <line x1="12" y1="3" x2="12" y2="15" />
            </svg>
            <p style={s.uploadText}>Click to upload image</p>
          </div>
        </div>

        {/* Buttons */}
        <div style={s.btnRow}>
          <button style={s.cancelBtn} onClick={() => navigate("/freelancer/dashboard")}>
            Cancel
          </button>
          <button style={s.publishBtn} onClick={handlePublish} disabled={submitting}>
            {submitting ? "Publishing..." : "Publish Gig"}
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: { fontFamily: "'Segoe UI', Arial, sans-serif", background: colors.primary, minHeight: "100vh", paddingBottom: 60 },

  // Hero
  hero: { textAlign: "center", padding: "48px 24px 32px", color: colors.white },
  heroTitle: { fontSize: 28, fontWeight: 700, margin: "0 0 8px" },
  heroSub: { fontSize: 14, color: "rgba(255,255,255,0.7)", margin: 0 },

  // Container
  container: { maxWidth: 640, margin: "0 auto", padding: "0 24px", display: "flex", flexDirection: "column", gap: 24 },

  // Card
  card: { background: colors.white, borderRadius: 20, padding: "28px 28px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
  cardTitle: { fontSize: 18, fontWeight: 700, color: colors.text.primary, margin: "0 0 20px" },

  // Fields
  field: { marginBottom: 16 },
  row: { display: "flex", gap: 16, marginBottom: 16 },
  fieldHalf: { flex: 1 },
  label: { display: "block", fontSize: 13, fontWeight: 600, color: colors.text.primary, marginBottom: 6 },
  input: { width: "100%", height: 38, padding: "0 12px", border: `1px solid ${colors.gray[300]}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", color: colors.text.secondary },
  select: { width: "100%", height: 38, padding: "0 12px", border: `1px solid ${colors.gray[300]}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", color: colors.text.secondary, background: colors.white, cursor: "pointer" },
  textarea: { width: "100%", padding: "10px 12px", border: `1px solid ${colors.gray[300]}`, borderRadius: 6, fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", color: colors.text.secondary, resize: "vertical", minHeight: 90 },

  // Packages Grid
  packagesGrid: { display: "grid", gridTemplateColumns: "auto 1fr 1fr 1fr", gap: "12px 12px", alignItems: "center" },
  packageHeader: { fontSize: 14, fontWeight: 700, textAlign: "center" },
  rowLabel: { fontSize: 13, fontWeight: 600, color: colors.text.secondary, whiteSpace: "nowrap" },
  gridInput: { width: "100%", height: 36, padding: "0 10px", border: `1px solid ${colors.gray[300]}`, borderRadius: 6, fontSize: 12, fontFamily: "inherit", outline: "none", boxSizing: "border-box", color: colors.text.secondary, background: colors.gray[50] || "#f9fafb" },

  // Upload
  uploadArea: { border: `2px dashed ${colors.gray[300]}`, borderRadius: 12, padding: "40px 24px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color 0.2s" },
  uploadText: { fontSize: 13, color: colors.gray[500], margin: "12px 0 0" },

  // Buttons
  btnRow: { display: "flex", gap: 12 },
  cancelBtn: { flex: 1, padding: "14px 0", background: "transparent", color: colors.white, border: `2px solid rgba(255,255,255,0.4)`, borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
  publishBtn: { flex: 1, padding: "14px 0", background: colors.white, color: colors.primary, border: "none", borderRadius: 12, fontSize: 16, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
};
