import { FaChevronDown, FaUsers, FaTwitter, FaFacebookF, FaLinkedinIn, FaPinterestP, FaInstagram } from "react-icons/fa";
import { useState } from "react";
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";


export default function Home() {
  const [searchValue, setSearchValue] = useState("");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sellerSlide, setSellerSlide] = useState(0);
  const [reviewSlide, setReviewSlide] = useState(0);

  const categories = [
    { img: "./images/Homepage/socialmedia.jpg", label: "Social Media", sub: "Reach our Customers" },
    { img: "./images/Homepage/seo.jpg", label: "SEO", sub: "Unlock Growth Online" },
    { img: "./images/Homepage/illustration.jpg", label: "Illustration", sub: "Color your Dream" },
    { img: "./images/Homepage/translation.jpg", label: "Translation", sub: "Go Global" },
    { img: "./images/Homepage/dataentry.jpg", label: "Data Entry", sub: "Learn Your Business" },
  ];

  const sellers = [
    { img: "./images/Homepage/seller1.jpg", name: "Steve Harington", role: "UI/UX Designer" },
    { img: "./images/Homepage/seller2.jpg", name: "Lucas Sinclair", role: "Blockchain Dev" },
    { img: "./images/Homepage/seller3.jpg", name: "Will Buyers", role: "Data Scientist" },
  ];

  const reviews = [
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s......",
      name: "George Wells",
      role: "Product Designer",
      img: "./images/Homepage/reviewer1.jpg",
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s......",
      name: "James Okafor",
      role: "UX Researcher",
      img: "./images/Homepage/reviewer2.jpg",
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s......",
      name: "Marcus Reed",
      role: "Frontend Engineer",
      img: "./images/Homepage/reviewer3.jpg",
    },
    {
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s......",
      name: "Ashaf Patel",
      role: "Creative Director",
      img: "./images/Homepage/reviewer4.jpg",
    }
    
   
  ];

  // Safe current review — never undefined
  const currentReview = reviews[reviewSlide] ?? reviews[0];

  const stats = [
    { icon: "👨‍💻", value: "7,468", label: "Freelance Developers" },
    { icon: "📁", value: "9,368", label: "Projects Added" },
    { icon: "✅", value: "7,468", label: "Completed Projects" },
    { icon: "🏢", value: "7,458", label: "Companies Registered" },
  ];

  
  const reviewAvatars = [
    "./images/Homepage/avatar1.jpg",
    "./images/Homepage/avatar2.jpg",
    "./images/Homepage/avatar3.jpg",
    "./images/Homepage/avatar4.jpg",
    "./images/Homepage/avatar5.jpg",
  ];

  const visibleCount = 5;
  const handlePrev = () => setCurrentSlide((prev) => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentSlide((prev) => Math.min(prev + 1, categories.length - visibleCount));

  const handleReviewPrev = () => setReviewSlide((prev) => Math.max(prev - 1, 0));
  const handleReviewNext = () => setReviewSlide((prev) => Math.min(prev + 1, reviews.length - 1));

  const TrendingTag = ({ label }) => (
    <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/30 text-white text-xs font-semibold hover:bg-white/10 transition-all duration-200 backdrop-blur-sm">
      {label}
      <svg className="w-3.5 h-3.5 text-blue-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    </button>
  );

  const FloatingCard = ({ label, className }) => (
    <div className={`absolute bg-white/90 backdrop-blur-sm text-blue-900 text-xs font-bold px-3 py-1.5 rounded-full shadow-lg ${className}`}>
      {label}
    </div>
  );

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden">

      {/* Slide animation */}
      <style>{`
        @keyframes reviewFadeIn {
          from { opacity: 0; transform: translateX(24px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .review-animate {
          animation: reviewFadeIn 0.4s ease;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="bg-white/10 backdrop-blur-md flex items-center justify-between px-10 py-5 text-white border-b border-white/10">
        <h1 className="text-2xl font-bold tracking-wide cursor-pointer italic">SajhaGig</h1>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <div className="flex items-center gap-1 cursor-pointer hover:text-blue-200 transition duration-300">
            <span>Explore</span>
            <FaChevronDown className="text-xs mt-0.5" />
          </div>
          <span className="cursor-pointer hover:text-blue-200 transition duration-300">Hire An Expert</span>
          <span className="cursor-pointer hover:text-blue-200 transition duration-300">Freelance Now</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/signup" className="flex items-center gap-2 border border-white px-6 py-2 rounded-lg hover:bg-white hover:text-blue-800 transition duration-300 text-sm font-semibold">
            <span>Join</span>
            <FaUsers />
          </Link>
        </div>
      </nav>


      {/* HERO */}
      <main className="relative flex flex-col lg:flex-row items-center gap-12 px-8 md:px-16 pt-16 pb-20 min-h-[calc(100vh-80px)]">
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute opacity-40" style={{ top: "45%", left: "48%", width: "180px", height: "180px", backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.4) 1.5px, transparent 1.5px)", backgroundSize: "18px 18px" }} />
          <svg className="absolute opacity-50" style={{ top: "22%", left: "53%" }} width="50" height="50" viewBox="0 0 50 50" fill="none">
            <path d="M25 5L45 40H5L25 5Z" stroke="rgba(255,255,255,0.6)" strokeWidth="2" fill="none" />
          </svg>
          <svg className="absolute opacity-40" style={{ bottom: "10%", right: "6%" }} width="46" height="46" viewBox="0 0 50 50" fill="none">
            <path d="M25 5L45 40H5L25 5Z" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" />
          </svg>
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full border border-white/20" />
          <div className="absolute -bottom-16 -left-16 w-52 h-52 rounded-full bg-white/5 border border-white/10" />
          <svg className="absolute opacity-25" style={{ bottom: "20%", right: "10%" }} width="220" height="110" viewBox="0 0 220 110">
            <path d="M0 90 Q110 0 220 35" stroke="white" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
          </svg>
          <div className="absolute opacity-50" style={{ top: "58%", right: "22%" }}>
            <div className="w-12 h-12 rounded-full border border-white/25 flex items-center justify-center">
              <div className="w-6 h-6 rounded-full border border-white/30 flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-white/30" />
              </div>
            </div>
          </div>
          <svg className="absolute opacity-35" style={{ top: "18%", right: "16%" }} width="58" height="58" viewBox="0 0 58 58" fill="none">
            <rect x="2" y="2" width="54" height="54" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" fill="none" />
          </svg>
        </div>

        <div className="flex-1 max-w-xl z-10">
          <h1 className="text-6xl md:text-7xl font-extrabold text-white leading-tight mb-2">SajhaGig</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3 tracking-wide">FREELANCING MADE EASY !</h2>
          <p className="text-lg font-semibold text-white mb-2">Hire An Expert Or Be An Expert .</p>
          <p className="text-sm text-white/70 leading-relaxed mb-10 max-w-md">
            In The Ever-Evolving Landscape Of Skills And Knowledge, The Choice Between
            Hiring An Expert Or Becoming One Yourself Is A Pivotal Decision.
          </p>
          <div className="flex items-center bg-white/95 rounded-full px-5 py-1.5 shadow-2xl mb-8 max-w-md">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder='Search To "Find Freelancers, Jobs, Or Services"'
              className="flex-1 bg-transparent text-gray-500 text-sm outline-none py-2 placeholder-gray-400"
            />
            <button className="w-10 h-10 rounded-full flex items-center justify-center text-white flex-shrink-0" style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
          <div>
            <p className="text-xs font-bold text-white/60 tracking-widest mb-3 uppercase">Trending Services</p>
            <div className="flex flex-wrap gap-3">
              <TrendingTag label="DESIGNER" />
              <TrendingTag label="DEVELOPER" />
              <TrendingTag label="WORDPRESS" />
            </div>
          </div>
        </div>

        <div className="flex-1 relative w-full max-w-xl min-h-[520px] z-10">
          <div className="absolute top-0 left-1/2 -translate-x-1/3 w-64 h-64 rounded-3xl overflow-hidden border-4 border-white shadow-2xl z-20">
            <img src="./images/Homepage/homepage1.jpg" alt="Business meeting" className="w-full h-full object-cover" />
          </div>
          <div className="absolute top-2 right-4 z-30 w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center border-2 border-blue-100">
            <span className="text-2xl">🏆</span>
          </div>
          <div className="absolute bottom-0 left-4 w-52 h-56 rounded-3xl overflow-hidden border-4 border-white shadow-2xl z-20">
            <img src="./images/Homepage/homepage2.jpg" alt="Fullstack developer" className="w-full h-full object-cover" />
            <FloatingCard label="FULLSTACK DEVELOPER" className="bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap" />
          </div>
          <div className="absolute bottom-0 right-0 w-52 h-56 rounded-3xl overflow-hidden border-4 border-white shadow-2xl z-20">
            <img src="./images/Homepage/homepage3.jpg" alt="3D Artist" className="w-full h-full object-cover" />
            <FloatingCard label="3D ARTIST" className="top-3 right-3" />
          </div>
        </div>
      </main>

      {/* MOST POPULAR SERVICES */}
      <section className="bg-white px-10 py-12">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-gray-900">Most Popular Services</h2>
            <svg className="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          </div>
          <button className="flex items-center gap-2 text-blue-500 font-semibold hover:text-blue-700 transition duration-300">
            View All
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8l4 4-4 4M8 12h8" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          <div className="relative rounded-2xl overflow-hidden h-52 cursor-pointer group">
            <img src="./images/Homepage/web development.jpg" alt="Web Development" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
            <div className="absolute inset-0 bg-purple-700/70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
              </svg>
              <p className="text-lg font-bold text-center leading-tight">WEB<br />DEVELOPMENT</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-52 cursor-pointer group">
            <img src="./images/Homepage/logo design.jpg" alt="Logo Design" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
            <div className="absolute inset-0 bg-blue-500/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 11l6.071-6.071a2 2 0 012.828 0l1.172 1.172a2 2 0 010 2.828L13 15H9v-4z" />
              </svg>
              <p className="text-lg font-bold text-center">LOGO DESIGN</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-52 cursor-pointer group">
            <img src="./images/Homepage/seo.jpg" alt="SEO" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
            <div className="absolute inset-0 bg-green-600/60" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <p className="text-lg font-bold text-center">SEO</p>
            </div>
          </div>
          <div className="relative rounded-2xl overflow-hidden h-52 cursor-pointer group">
            <img src="./images/Homepage/video editing.jpg" alt="Video Editing" className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
            <div className="absolute inset-0 bg-purple-900/70" />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-2">
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z" />
              </svg>
              <p className="text-lg font-bold text-center">VIDEO<br />EDITING</p>
            </div>
          </div>
        </div>
      </section>

      {/* DISCOVER FEATURES */}
      <section className="bg-[#dce8e4] px-10 py-16">
        <div className="flex flex-col lg:flex-row items-start gap-16">
          <div className="flex-1 max-w-md">
            <h2 className="text-2xl font-bold text-blue-600 mb-10">Discover Our Outstanding Features</h2>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l5.59-5.59L18 9.5l-7 7z" />
                </svg>
                <h3 className="text-lg font-bold text-gray-900">Heading 1</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed ml-9">Lorem Ipsum Dolor Sit Amet, Interdum A Suscipit Et, Consequat Nec Nibh.</p>
            </div>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l5.59-5.59L18 9.5l-7 7z" />
                </svg>
                <h3 className="text-lg font-bold text-gray-900">Heading 2</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed ml-9">Lorem Ipsum Dolor Sit Amet, Interdum A Suscipit Et, Consequat Nec Nibh.</p>
            </div>
            <div className="bg-white rounded-2xl p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2a10 10 0 100 20A10 10 0 0012 2zm-1 14.5l-4-4 1.41-1.41L11 13.67l5.59-5.59L18 9.5l-7 7z" />
                </svg>
                <h3 className="text-lg font-bold text-gray-900">Heading 3</h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed ml-9 mb-4">Lorem Ipsum Dolor Sit Amet, Interdum A Suscipit Et, Consequat Nec Nibh.</p>
              <button className="flex items-center gap-2 text-blue-500 text-sm font-semibold ml-9 hover:text-blue-700 transition duration-300">
                See More
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 relative flex items-center justify-center min-h-[420px]">
            <div className="absolute top-4 right-8 opacity-40" style={{ width: "120px", height: "120px", backgroundImage: "radial-gradient(circle, rgba(100,120,140,0.5) 1.5px, transparent 1.5px)", backgroundSize: "14px 14px" }} />
            <svg className="absolute top-8 left-24 opacity-70" width="100" height="80" viewBox="0 0 100 80" fill="none">
              <path d="M10 70 Q50 10 90 30" stroke="#0d9488" strokeWidth="2.5" fill="none" />
              <polygon points="85,22 95,32 80,36" fill="#0d9488" />
            </svg>
            <div className="absolute left-0 bottom-0 w-52 h-64 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white z-10">
              <img src="./images/Homepage/handshake.jpeg" alt="Handshake" className="w-full h-full object-cover" />
            </div>
            <div className="absolute left-24 top-8 w-52 h-72 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white z-20">
              <img src="./images/Homepage/freelancersmiling.jpg" alt="Freelancer smiling" className="w-full h-full object-cover" />
            </div>
            <div className="absolute right-0 top-16 w-52 h-64 rounded-[2rem] overflow-hidden shadow-xl border-4 border-white z-30">
              <img src="./images/Homepage/freelancerwriting.jpg" alt="Freelancer writing" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* BROWSE PROJECTS BY CATEGORY */}
      <section className="bg-white px-10 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Here are Something You'd Need</h2>
        <div className="text-center mb-10">
          <h3 className="text-2xl font-bold text-gray-900 mb-1">Browse Projects By Category</h3>
          <p className="text-sm text-gray-500">Get work done in over 60 different categories</p>
        </div>

        <div className="relative px-6">
          <button
            onClick={handlePrev}
            disabled={currentSlide === 0}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-gray-300 bg-white shadow flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="overflow-hidden">
            <div
              className="flex gap-5 transition-transform duration-300"
              style={{ transform: `translateX(-${currentSlide * (100 / visibleCount)}%)` }}
            >
              {categories.map((cat, i) => (
                <div key={i} className="flex-shrink-0 cursor-pointer group" style={{ width: `calc(${100 / visibleCount}% - 16px)` }}>
                  <div className="w-full h-52 rounded-2xl overflow-hidden shadow-md border-2 border-transparent group-hover:border-blue-400 transition duration-300">
                    <img src={cat.img} alt={cat.label} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <p className="mt-3 text-sm font-bold text-gray-900 text-center">{cat.label}</p>
                  <p className="text-xs text-gray-500 text-center">{cat.sub}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleNext}
            disabled={currentSlide >= categories.length - visibleCount}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-gray-300 bg-white shadow flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        <div className="flex justify-center mt-10">
          <button className="px-6 py-2.5 border-2 border-blue-600 text-blue-600 rounded-md text-sm font-semibold hover:bg-blue-600 hover:text-white transition duration-300">
            View all Categories
          </button>
        </div>
      </section>

      {/* READY TO GET STARTED CTA */}
      <section className="bg-white px-10 pb-16">
        <div className="relative rounded-2xl overflow-hidden bg-[#3d52a0] px-10 py-16 text-center">
          <div className="absolute left-0 top-0 bottom-0 w-40 pointer-events-none overflow-hidden">
            <div className="absolute top-6 -left-10 w-40 h-40 rounded-full bg-white/10" />
            <div className="absolute bottom-6 -left-6 w-28 h-28 rounded-full bg-white/10" />
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-52 pointer-events-none overflow-hidden">
            <div className="absolute top-6 right-4" style={{ width: "120px", height: "120px", backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.25) 1.5px, transparent 1.5px)", backgroundSize: "14px 14px" }} />
            <div className="absolute bottom-6 right-6 flex items-end gap-1.5">
              <div className="w-5 h-10 bg-white/15 rounded-t" />
              <div className="w-5 h-16 bg-white/15 rounded-t" />
              <div className="w-5 h-8 bg-white/15 rounded-t" />
              <div className="w-5 h-20 bg-white/15 rounded-t" />
            </div>
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started ?</h2>
            <p className="text-white/80 text-sm max-w-md mx-auto mb-8 leading-relaxed">
              Sign Up or Login to Explore Various Features that our Sellers &amp;<br />
              Freelancers Experience . It's Just Free
            </p>
            <button className="bg-blue-500 hover:bg-blue-400 text-white font-semibold px-8 py-3 rounded-md transition duration-300 text-sm shadow-lg">
              Get Started it's Free
            </button>
          </div>
        </div>
      </section>

      {/* TRENDING SELLERS */}
      <section className="bg-white px-10 py-12">
        <div className="flex items-center gap-3 mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Trending</h2>
          <span className="text-2xl font-bold text-blue-500">Sellers</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {sellers.map((seller, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition duration-300 cursor-pointer group">
              <div className="w-full h-48 overflow-hidden">
                <img src={seller.img} alt={seller.name} className="w-full h-full object-cover group-hover:scale-105 transition duration-300" />
              </div>
              <div className="flex items-center justify-between px-4 py-3">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{seller.name}</p>
                  <p className="text-xs text-gray-500">{seller.role}</p>
                </div>
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition duration-200">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((dot) => (
            <button
              key={dot}
              onClick={() => setSellerSlide(dot)}
              className={`h-2 rounded-full transition-all duration-300 ${sellerSlide === dot ? "w-6 bg-blue-500" : "w-2 bg-gray-300"}`}
            />
          ))}
        </div>
      </section>

      {/* ACHIEVEMENT WE HAVE EARNED */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 z-0">
          <img src="./images/Homepage/achievement-bg.jpg" alt="Achievement background" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-blue-900/80" />
        </div>
        <div className="relative z-10 text-center px-10">
          <h2 className="text-3xl font-bold text-white mb-2">Achievement We Have Earned</h2>
          <p className="text-white/70 text-sm mb-12">At Freelancer, we believe that talent is borderless and opportunity should be too.</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 max-w-4xl mx-auto">
            {stats.map((stat, i) => (
              <div key={i} className={`flex flex-col items-center py-8 px-6 ${i < 3 ? "border-r border-white/20" : ""}`}>
                <div className="w-14 h-14 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mb-4">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <p className="text-3xl font-extrabold text-white mb-1">{stat.value}</p>
                <p className="text-xs text-white/70 text-center">{stat.label}</p>
                <div className={`mt-4 h-1 w-12 rounded-full ${i === 0 ? "bg-yellow-400" : i === 1 ? "bg-pink-400" : i === 2 ? "bg-blue-400" : "bg-green-400"}`} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TOP REVIEW */}
      <section className="bg-blue-50 px-10 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8">

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Top review</h2>
              <p className="text-sm text-gray-500 mt-1">People love to come again for kafejob</p>
            </div>

            {/* Review card */}
            <div className="relative">
              <div className="absolute -top-2 -left-2 text-6xl text-gray-300 font-serif leading-none select-none">"</div>

              {/* key={reviewSlide} remounts the div on every change → triggers animation */}
              <div
                key={reviewSlide}
                className="review-animate bg-blue-600 rounded-2xl p-6 text-white relative overflow-hidden"
              >
                <div className="flex gap-4 items-start">
                  <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 border-2 border-white/40">
                    <img
                      src={currentReview.img}
                      alt={currentReview.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed text-white/90 mb-4">
                      {currentReview.text}
                    </p>
                    <p className="font-bold text-white text-sm">{currentReview.name}</p>
                    <p className="text-xs text-white/70">{currentReview.role}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation row */}
            <div className="flex items-center justify-between mt-6">

              {/* Arrow buttons */}
              <div className="flex gap-2">
                <button
                  onClick={handleReviewPrev}
                  disabled={reviewSlide === 0}
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleReviewNext}
                  disabled={reviewSlide === reviews.length - 1}
                  className="w-8 h-8 rounded-full border border-gray-300 bg-white flex items-center justify-center text-gray-500 hover:bg-gray-100 disabled:opacity-30 transition"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

             {/* Avatar stack — clickable, highlights active reviewer */}
<div className="flex items-center">
  <div className="flex -space-x-3">
    {reviews.map((review, i) => (
      <button
        key={i}
        onClick={() => setReviewSlide(i)}
        title={review.name}
        className="rounded-full overflow-hidden border-2 transition-all duration-300 focus:outline-none"
        style={{
          width: reviewSlide === i ? "42px" : "36px",
          height: reviewSlide === i ? "42px" : "36px",
          borderColor: reviewSlide === i ? "#2563eb" : "white",
          boxShadow: reviewSlide === i ? "0 0 0 2px #93c5fd" : "none",
          opacity: reviewSlide === i ? 1 : 0.55,
          zIndex: reviewSlide === i ? 10 : "auto",
          position: "relative",
        }}
      >
        <img src={review.img} alt={review.name} className="w-full h-full object-cover" />
      </button>
    ))}
  </div>
</div>
            </div>

            {/* Dot indicators */}
            <div className="flex justify-center gap-2 mt-5">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setReviewSlide(i)}
                  className={`h-2 rounded-full transition-all duration-300 ${reviewSlide === i ? "w-6 bg-blue-500" : "w-2 bg-gray-300"}`}
                />
              ))}
            </div>

          </div>
        </div>
      </section>

       {/*   FOOTER */}
       <Footer />

    </div>
    
  );
}

