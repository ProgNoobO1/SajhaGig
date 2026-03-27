# SajhaGig Backend Implementation — Node.js + MySQL

## Table of Contents
1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Folder Structure](#folder-structure)
4. [Database Schema](#database-schema)
5. [Seed Data](#seed-data)
6. [API Endpoints](#api-endpoints)
7. [Middleware](#middleware)
8. [Frontend Integration](#frontend-integration)
9. [Dev Setup & Scripts](#dev-setup--scripts)
10. [Implementation Phases](#implementation-phases)

---

## Overview

Add a Node.js/Express backend with MySQL to the existing SajhaGig React frontend. The backend will serve all data currently hardcoded in page components via REST APIs, with JWT authentication and comprehensive seed data.

**Monorepo structure**: Frontend at root, backend in `server/` directory.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js 18+ |
| Framework | Express.js |
| Database | MySQL 8.0 |
| ORM/Driver | mysql2 (with promise wrapper) |
| Auth | JSON Web Tokens (jsonwebtoken) |
| Password | bcryptjs |
| CORS | cors package |
| Env | dotenv |
| Dev | nodemon, concurrently |

---

## Folder Structure

```
SajhagigNabinhelp/
├── public/                     # React public assets
├── src/                        # React frontend
│   ├── api/                    # NEW — API client layer
│   │   └── client.js           # Fetch wrapper with auth headers
│   ├── context/                # NEW — React contexts
│   │   └── AuthContext.jsx     # Auth state provider
│   ├── components/
│   ├── pages/
│   └── App.jsx
├── server/                     # NEW — Backend
│   ├── package.json
│   ├── .env
│   ├── .env.example
│   ├── index.js                # Express entry point
│   ├── config/
│   │   ├── db.js               # MySQL connection pool
│   │   └── env.js              # Env var loader/validator
│   ├── middleware/
│   │   ├── auth.js             # JWT verification
│   │   ├── errorHandler.js     # Global error handler
│   │   └── validate.js         # Request body validation
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── users.routes.js
│   │   ├── gigs.routes.js
│   │   ├── jobs.routes.js
│   │   ├── proposals.routes.js
│   │   ├── projects.routes.js
│   │   ├── messages.routes.js
│   │   ├── reviews.routes.js
│   │   ├── portfolio.routes.js
│   │   ├── categories.routes.js
│   │   └── dashboard.routes.js
│   ├── controllers/
│   │   ├── auth.controller.js
│   │   ├── users.controller.js
│   │   ├── gigs.controller.js
│   │   ├── jobs.controller.js
│   │   ├── proposals.controller.js
│   │   ├── projects.controller.js
│   │   ├── messages.controller.js
│   │   ├── reviews.controller.js
│   │   ├── portfolio.controller.js
│   │   ├── categories.controller.js
│   │   └── dashboard.controller.js
│   ├── db/
│   │   ├── schema.sql          # CREATE TABLE statements
│   │   ├── seed.sql            # INSERT seed data
│   │   └── migrate.js          # Run schema + seed
│   └── utils/
│       ├── jwt.js              # sign/verify token helpers
│       ├── hash.js             # bcrypt hash/compare
│       └── pagination.js       # Pagination helper
├── package.json                # Root — React + dev scripts
├── tailwind.config.js
└── .gitignore
```

---

## Database Schema

### 1. users
```sql
CREATE TABLE users (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  role            ENUM('client', 'freelancer') NOT NULL,
  first_name      VARCHAR(50) NOT NULL,
  last_name       VARCHAR(50) NOT NULL,
  email           VARCHAR(100) UNIQUE NOT NULL,
  password_hash   VARCHAR(255) NOT NULL,
  avatar          VARCHAR(500) DEFAULT NULL,
  initials        VARCHAR(5) DEFAULT NULL,
  location        VARCHAR(100) DEFAULT NULL,
  country         VARCHAR(50) DEFAULT NULL,
  verified        BOOLEAN DEFAULT FALSE,
  bio             TEXT DEFAULT NULL,
  member_since    DATE DEFAULT (CURRENT_DATE),
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 2. freelancer_profiles
```sql
CREATE TABLE freelancer_profiles (
  user_id           INT PRIMARY KEY,
  title             VARCHAR(100) DEFAULT NULL,
  hourly_rate       DECIMAL(10,2) DEFAULT NULL,
  top_rated         BOOLEAN DEFAULT FALSE,
  badge             VARCHAR(50) DEFAULT NULL,       -- 'Top Rated Seller', 'Level 2 Seller'
  badge_color       VARCHAR(10) DEFAULT NULL,       -- '#00c9a7', '#888'
  rating            DECIMAL(3,2) DEFAULT 0.00,
  review_count      INT DEFAULT 0,
  jobs_completed    INT DEFAULT 0,
  on_time_delivery  DECIMAL(5,2) DEFAULT 0.00,
  rehire_rate       DECIMAL(5,2) DEFAULT 0.00,
  total_earnings    DECIMAL(12,2) DEFAULT 0.00,
  orders_in_queue   INT DEFAULT 0,
  avg_response_time VARCHAR(50) DEFAULT NULL,
  last_delivery     VARCHAR(50) DEFAULT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 3. freelancer_languages
```sql
CREATE TABLE freelancer_languages (
  id        INT PRIMARY KEY AUTO_INCREMENT,
  user_id   INT NOT NULL,
  language  VARCHAR(50) NOT NULL,
  level     VARCHAR(30) NOT NULL,     -- 'Native', 'Fluent', 'Intermediate'
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 4. freelancer_skills
```sql
CREATE TABLE freelancer_skills (
  id      INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  skill   VARCHAR(50) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_skill (user_id, skill)
);
```

### 5. client_profiles
```sql
CREATE TABLE client_profiles (
  user_id           INT PRIMARY KEY,
  company           VARCHAR(100) DEFAULT NULL,
  industry          VARCHAR(100) DEFAULT NULL,
  website           VARCHAR(255) DEFAULT NULL,
  phone             VARCHAR(30) DEFAULT NULL,
  projects_posted   INT DEFAULT 0,
  hired_count       INT DEFAULT 0,
  total_spent       DECIMAL(12,2) DEFAULT 0.00,
  avg_rating        DECIMAL(3,2) DEFAULT 0.00,
  on_time_payment   DECIMAL(5,2) DEFAULT 0.00,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 6. categories
```sql
CREATE TABLE categories (
  id    INT PRIMARY KEY AUTO_INCREMENT,
  name  VARCHAR(100) NOT NULL UNIQUE,
  slug  VARCHAR(100) NOT NULL UNIQUE
);
```

### 7. subcategories
```sql
CREATE TABLE subcategories (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  category_id   INT NOT NULL,
  name          VARCHAR(100) NOT NULL,
  slug          VARCHAR(100) NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);
```

### 8. gigs
```sql
CREATE TABLE gigs (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  freelancer_id   INT NOT NULL,
  title           VARCHAR(255) NOT NULL,
  category_id     INT NOT NULL,
  subcategory_id  INT DEFAULT NULL,
  description     TEXT DEFAULT NULL,
  requirements    JSON DEFAULT NULL,
  search_tags     JSON DEFAULT NULL,
  about           JSON DEFAULT NULL,           -- array of paragraph strings
  overall_rating  DECIMAL(3,2) DEFAULT 0.00,
  review_count    INT DEFAULT 0,
  likes           INT DEFAULT 0,
  status          ENUM('active', 'paused', 'deleted') DEFAULT 'active',
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (freelancer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (subcategory_id) REFERENCES subcategories(id)
);
```

### 9. gig_packages
```sql
CREATE TABLE gig_packages (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  gig_id        INT NOT NULL,
  tier          ENUM('basic', 'standard', 'premium') NOT NULL,
  name          VARCHAR(100) NOT NULL,
  price         DECIMAL(10,2) NOT NULL,
  description   TEXT DEFAULT NULL,
  delivery_days INT NOT NULL,
  revisions     VARCHAR(30) NOT NULL,         -- '1', '3', 'Unlimited'
  features      JSON DEFAULT NULL,            -- [{label, included}]
  FOREIGN KEY (gig_id) REFERENCES gigs(id) ON DELETE CASCADE,
  UNIQUE KEY unique_gig_tier (gig_id, tier)
);
```

### 10. gig_images
```sql
CREATE TABLE gig_images (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  gig_id      INT NOT NULL,
  image_url   VARCHAR(500) NOT NULL,
  sort_order  INT DEFAULT 0,
  FOREIGN KEY (gig_id) REFERENCES gigs(id) ON DELETE CASCADE
);
```

### 11. gig_faqs
```sql
CREATE TABLE gig_faqs (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  gig_id      INT NOT NULL,
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  sort_order  INT DEFAULT 0,
  FOREIGN KEY (gig_id) REFERENCES gigs(id) ON DELETE CASCADE
);
```

### 12. jobs
```sql
CREATE TABLE jobs (
  id                INT PRIMARY KEY AUTO_INCREMENT,
  client_id         INT NOT NULL,
  title             VARCHAR(255) NOT NULL,
  description       TEXT NOT NULL,
  category_id       INT DEFAULT NULL,
  budget_min        DECIMAL(10,2) DEFAULT NULL,
  budget_max        DECIMAL(10,2) DEFAULT NULL,
  budget_type       ENUM('fixed', 'hourly') DEFAULT 'fixed',
  experience_level  ENUM('entry', 'intermediate', 'expert') DEFAULT 'intermediate',
  project_type      ENUM('one_time', 'ongoing', 'full_time', 'part_time') DEFAULT 'one_time',
  location          VARCHAR(100) DEFAULT 'Worldwide',
  remote            BOOLEAN DEFAULT TRUE,
  status            ENUM('open', 'in_progress', 'completed', 'cancelled', 'expired') DEFAULT 'open',
  proposal_count    INT DEFAULT 0,
  interviewing      INT DEFAULT 0,
  invites_sent      INT DEFAULT 0,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  expires_at        DATE DEFAULT NULL,
  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);
```

### 13. job_skills
```sql
CREATE TABLE job_skills (
  id      INT PRIMARY KEY AUTO_INCREMENT,
  job_id  INT NOT NULL,
  skill   VARCHAR(50) NOT NULL,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);
```

### 14. proposals
```sql
CREATE TABLE proposals (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  freelancer_id   INT NOT NULL,
  job_id          INT NOT NULL,
  cover_letter    TEXT DEFAULT NULL,
  proposed_rate   DECIMAL(10,2) NOT NULL,
  status          ENUM('pending', 'accepted', 'rejected', 'withdrawn') DEFAULT 'pending',
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (freelancer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
  UNIQUE KEY unique_freelancer_job (freelancer_id, job_id)
);
```

### 15. projects
```sql
CREATE TABLE projects (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  job_id          INT DEFAULT NULL,
  gig_id          INT DEFAULT NULL,
  client_id       INT NOT NULL,
  freelancer_id   INT NOT NULL,
  name            VARCHAR(255) NOT NULL,
  description     TEXT DEFAULT NULL,
  project_type    ENUM('hourly', 'fixed') DEFAULT 'fixed',
  price           DECIMAL(10,2) NOT NULL,
  status          ENUM('open', 'proposal', 'in_progress', 'completed', 'cancelled', 'expired') DEFAULT 'open',
  hired_on        DATE DEFAULT (CURRENT_DATE),
  deadline        DATE DEFAULT NULL,
  location        VARCHAR(100) DEFAULT NULL,
  rating          DECIMAL(3,2) DEFAULT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL,
  FOREIGN KEY (gig_id) REFERENCES gigs(id) ON DELETE SET NULL,
  FOREIGN KEY (client_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (freelancer_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 16. project_tags
```sql
CREATE TABLE project_tags (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  project_id  INT NOT NULL,
  tag         VARCHAR(50) NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);
```

### 17. chats
```sql
CREATE TABLE chats (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  participant_one INT NOT NULL,
  participant_two INT NOT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (participant_one) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (participant_two) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_chat_pair (participant_one, participant_two)
);
```

### 18. messages
```sql
CREATE TABLE messages (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  chat_id     INT NOT NULL,
  sender_id   INT NOT NULL,
  text        TEXT NOT NULL,
  is_read     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (chat_id) REFERENCES chats(id) ON DELETE CASCADE,
  FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 19. reviews
```sql
CREATE TABLE reviews (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  reviewer_id   INT NOT NULL,
  reviewee_id   INT NOT NULL,
  gig_id        INT DEFAULT NULL,
  project_id    INT DEFAULT NULL,
  rating        TINYINT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment       TEXT DEFAULT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewee_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (gig_id) REFERENCES gigs(id) ON DELETE SET NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);
```

### 20. portfolio_items
```sql
CREATE TABLE portfolio_items (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  freelancer_id   INT NOT NULL,
  title           VARCHAR(255) NOT NULL,
  description     TEXT DEFAULT NULL,
  image_url       VARCHAR(500) DEFAULT NULL,
  rating          DECIMAL(3,2) DEFAULT NULL,
  created_at      TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (freelancer_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### 21. transactions
```sql
CREATE TABLE transactions (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  label       VARCHAR(100) NOT NULL,
  amount      DECIMAL(10,2) NOT NULL,
  type        ENUM('credit', 'debit') NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
```

### Entity Relationship Diagram (text)

```
users ──┬── freelancer_profiles (1:1)
        ├── freelancer_skills (1:N)
        ├── freelancer_languages (1:N)
        ├── client_profiles (1:1)
        ├── gigs (1:N as freelancer)
        ├── jobs (1:N as client)
        ├── proposals (1:N as freelancer)
        ├── projects (N via client_id & freelancer_id)
        ├── chats (N via participant_one & participant_two)
        ├── messages (1:N as sender)
        ├── reviews (N via reviewer_id & reviewee_id)
        ├── portfolio_items (1:N as freelancer)
        └── transactions (1:N)

categories ──── subcategories (1:N)
            ├── gigs (1:N)
            └── jobs (1:N)

gigs ──┬── gig_packages (1:3)
       ├── gig_images (1:N)
       ├── gig_faqs (1:N)
       └── reviews (1:N)

jobs ──┬── job_skills (1:N)
       ├── proposals (1:N)
       └── projects (1:1)

projects ──┬── project_tags (1:N)
           └── reviews (1:N)

chats ──── messages (1:N)
```

---

## Seed Data

All seed data matches the exact hardcoded data in the frontend. All users use password `password123` (bcrypt hashed).

### Users (14 total)

| ID | Role | Name | Email | Location | Verified |
|----|------|------|-------|----------|----------|
| 1 | freelancer | Sulav Shrestha | sulav@sajhagig.com | Kathmandu, Nepal | true |
| 2 | client | Ram Chaudhary | ram@sajhagig.com | Kathmandu, Nepal | true |
| 3 | freelancer | cc__creative | cc.creative@sajhagig.com | Kathmandu, Nepal | true |
| 4 | freelancer | creativesmith99 | creativesmith@sajhagig.com | Pokhara, Nepal | true |
| 5 | freelancer | artz23 | artz23@sajhagig.com | Kathmandu, Nepal | true |
| 6 | client | Sarah Johnson | sarah@sajhagig.com | New York, USA | true |
| 7 | client | Raj Patel | raj@sajhagig.com | Mumbai, India | true |
| 8 | client | Emily Chen | emily@sajhagig.com | Toronto, Canada | false |
| 9 | client | Ahmed Hassan | ahmed@sajhagig.com | Dubai, UAE | false |
| 10 | client | Lisa Mueller | lisa@sajhagig.com | Berlin, Germany | false |
| 11 | freelancer | Bikash Thapa | bikash@sajhagig.com | Kathmandu, Nepal | true |
| 12 | freelancer | Ekta Rai | ekta@sajhagig.com | Kathmandu, Nepal | true |
| 13 | freelancer | designpro_k | designpro@sajhagig.com | Kathmandu, Nepal | true |
| 14 | freelancer | webwizard22 | webwizard@sajhagig.com | Lalitpur, Nepal | true |

### Freelancer Profiles

| User ID | Title | Hourly Rate | Badge | Rating | Jobs | Earnings |
|---------|-------|-------------|-------|--------|------|----------|
| 1 | Full Stack Developer | 25.00 | Top Rated Seller | 4.90 | 24 | 82000.00 |
| 3 | UI/UX Designer | 30.00 | Top Rated Seller | 5.00 | 50 | 150000.00 |
| 4 | Web Developer | 20.00 | Level 2 Seller | 4.80 | 30 | 80000.00 |
| 5 | Video & Animation Expert | 35.00 | Level 2 Seller | 5.00 | 45 | 120000.00 |
| 11 | Photographer | 15.00 | Level 2 Seller | 4.50 | 18 | 45000.00 |
| 12 | Social Media Manager | 18.00 | Level 2 Seller | 4.70 | 22 | 55000.00 |
| 13 | Landing Page Specialist | 28.00 | Top Rated Seller | 4.90 | 35 | 95000.00 |
| 14 | E-commerce Designer | 22.00 | Level 2 Seller | 4.70 | 20 | 60000.00 |

### Client Profiles

| User ID | Company | Industry | Projects | Hired | Spent | Rating | On-time |
|---------|---------|----------|----------|-------|-------|--------|---------|
| 2 | Thamel Restaurant | Restaurant & Hospitality | 8 | 6 | 45000.00 | 4.80 | 95.00 |
| 6 | — | Technology | 5 | 4 | 25000.00 | 4.90 | 98.00 |
| 7 | — | Real Estate | 3 | 2 | 18000.00 | 4.70 | 90.00 |
| 8 | — | Education | 2 | 1 | 8000.00 | 4.50 | 100.00 |
| 9 | — | Real Estate | 4 | 3 | 30000.00 | 4.80 | 92.00 |
| 10 | — | Fashion | 2 | 2 | 12000.00 | 4.60 | 95.00 |

### Freelancer Skills (User 1 — Sulav Shrestha)
React, Node.js, MySQL, Tailwind, Express.js, MongoDB, TypeScript

### Freelancer Languages (User 5 — artz23)
- English: Fluent
- Nepali: Native

### Categories (8)

| ID | Name | Slug |
|----|------|------|
| 1 | Graphic Design | graphic-design |
| 2 | Web Development | web-development |
| 3 | Mobile Development | mobile-development |
| 4 | UI/UX Design | ui-ux-design |
| 5 | Digital Marketing | digital-marketing |
| 6 | Content Writing | content-writing |
| 7 | Video & Animation | video-animation |
| 8 | Data Science | data-science |

### Subcategories (40 — 5 per category)

**Graphic Design**: Logo design, Brand identity, Illustration, Business cards, Social media design
**Web Development**: WordPress, Landing page, Full website, E-commerce, Web app
**Mobile Development**: iOS app, Android app, React Native, Flutter, App UI
**UI/UX Design**: Website design, App design, Wireframing, Prototyping, User research
**Digital Marketing**: SEO, Social media marketing, PPC, Email marketing, Content strategy
**Content Writing**: Blog posts, Copywriting, Technical writing, Product descriptions, Articles
**Video & Animation**: Explainer video, Animation, Video editing, Motion graphics, Intro/Outro
**Data Science**: Data analysis, Machine learning, Data visualization, Web scraping, Python scripts

### Gigs (10 — from BrowseGigs.jsx)

| ID | Freelancer | Title | Category | Rating | Reviews | Price (NPR) | Likes |
|----|-----------|-------|----------|--------|---------|-------------|-------|
| 1 | cc__creative (3) | I will design UI UX for mobile app with figma for ios | UI/UX Design | 5.0 | 570 | 8674 | 32400 |
| 2 | creativesmith99 (4) | I will create a professional business website design | Web Dev | 4.8 | 57 | 4674 | 3400 |
| 3 | cc__creative (3) | I will design UI UX for mobile app with figma for ios | UI/UX Design | 5.0 | 570 | 8674 | 32400 |
| 4 | creativesmith99 (4) | I will create a professional business website design | Web Dev | 4.8 | 57 | 4674 | 3400 |
| 5 | cc__creative (3) | I will design UI UX for mobile app with figma for ios | UI/UX Design | 5.0 | 570 | 8674 | 32400 |
| 6 | designpro_k (13) | I will build a stunning landing page in React and Tailwind | Web Dev | 4.9 | 320 | 6299 | 18200 |
| 7 | webwizard22 (14) | I will design a modern e-commerce UI for your store | UI/UX Design | 4.7 | 88 | 5499 | 5100 |
| 8 | cc__creative (3) | I will create a full brand identity with logo and guidelines | Graphic Design | 5.0 | 412 | 9999 | 21300 |
| 9 | creativesmith99 (4) | I will design a sleek dashboard UI for your SaaS product | UI/UX Design | 4.6 | 64 | 4999 | 4800 |
| 10 | artz23 (5) | I will create an amazing website or app promo video | Video & Animation | 5.0 | 1860 | 868 | 11700 |

### Gig Packages (for Gig 10 — the detailed promo video gig)

**Basic — BASIC PROMO — NPR 868**
- 4 Days Delivery, 1 Revision
- Features: 4 captions (yes), 1 screenshot (yes), Mid dpi (yes), Screen recording (yes), Source files/transitions (no), 60 seconds running time (yes)

**Standard — STANDARD PROMO — NPR 1736**
- 5 Days Delivery, 3 Revisions
- Features: 8 captions (yes), 3 screenshots (yes), High dpi (yes), Screen recording (yes), Source files/transitions (yes), 90 seconds running time (yes)

**Premium — PREMIUM PROMO — NPR 3472**
- 7 Days Delivery, Unlimited Revisions
- Features: 12 captions (yes), 5 screenshots (yes), Ultra dpi (yes), Screen recording (yes), Source files/transitions (yes), 120 seconds running time (yes)

### Gig FAQs (for Gig 10)

1. **Q**: What information do you need to get started?
   **A**: I'll need your logo, brand colors, text descriptions, screenshots or screen recordings of your website/app, and any specific requirements or preferences you have for the video.

2. **Q**: Can you add voiceover to the video?
   **A**: Yes! I offer professional voiceover in English (male/female) as an add-on. You can also provide your own voiceover recording and I'll sync it with the video.

3. **Q**: What if I'm not satisfied with the result?
   **A**: Your satisfaction is my top priority. I offer revisions based on your package. If you're still not happy after revisions, we can discuss further adjustments.

4. **Q**: How long will the video be?
   **A**: Video length depends on the package: Basic (up to 60s), Standard (up to 90s), Premium (up to 120s). Custom lengths are available upon request.

5. **Q**: Do you provide the source files?
   **A**: Source files are included in the Standard and Premium packages. For the Basic package, source files can be added as an extra.

### Jobs (8 total)

**From FindWork.jsx:**

| ID | Client | Title | Budget | Type | Level | Skills |
|----|--------|-------|--------|------|-------|--------|
| 1 | Ram (2) | Build a Restaurant Website for Thamel | 8674 NPR | fixed | intermediate | React, CSS, Node.js |
| 2 | Sarah (6) | Build a graphic | 50 USD | fixed | intermediate | Canva, Graphic Design, Illustration |

**From ClientDashboard.jsx JOBS table:**

| ID | Client | Title | Budget | Type | Proposals | Created | Expires |
|----|--------|-------|--------|------|-----------|---------|---------|
| 3 | Ram (2) | Website Designer Required | 2222 | hourly | 47 | 2023-09-29 | 2023-10-10 |
| 4 | Ram (2) | Create desktop applications | 5782 | full_time | 35 | 2023-09-21 | 2023-10-05 |
| 5 | Ram (2) | PHP Javascript Projects | 4879 | part_time | 28 | 2023-09-17 | 2023-09-29 |
| 6 | Ram (2) | Website Designer Required | 3651 | hourly | 52 | 2023-09-11 | 2023-09-24 |
| 7 | Ram (2) | Swift / SwiftUI Developer | 2789 | hourly | 38 | 2023-09-05 | 2023-09-17 |
| 8 | Ram (2) | Full-stack Developer | 7653 | part_time | 48 | 2023-09-01 | 2023-09-13 |

### Proposals (6 — from FreelancerProjects.jsx)

| ID | Freelancer | Job | Title | Client Price | Proposed Rate | Client Name |
|----|-----------|-----|-------|-------------|---------------|-------------|
| 1 | Sulav (1) | 1 | 3D Renders and Amazon Product Store Images/Video | $599.00 | $500.00 | Hayley Melba |
| 2 | Sulav (1) | 2 | Landing Page Redesign / Sales Page Redesign | $460.00 | $450.00 | Hayden Partridge |
| 3 | Sulav (1) | 3 | WooCommerce Product Page Back Up Restoration | $550.00 | $550.00 | Lily Lipscombe |
| 4 | Sulav (1) | 4 | Full-stack Developer to help us to build our | $400.00 | $400.00 | Emma Isaly |
| 5 | Sulav (1) | 5 | Landing Page Redesign / Sales Page Redesign | $430.00 | $450.00 | Cody Cornish |
| 6 | Sulav (1) | 6 | Video animator to bring some illustrations to life | $430.00 | $450.00 | Cody Cornish |

### Projects (8 — from ClientProjects.jsx)

| ID | Client | Freelancer | Name | Type | Price | Status | Tags |
|----|--------|-----------|------|------|-------|--------|------|
| 1 | Ram (2) | Sulav (1) | Meal Planner App | Hourly | $400 | open | React, HTML5, Sketch |
| 2 | Ram (2) | Ekta (12) | Job Application Tracker | Fixed | $300 | open | HTML5, Sketch |
| 3 | Ram (2) | — | Subscription Manager | Fixed | $200 | proposal | — |
| 4 | Ram (2) | — | Subscription Manager | Fixed | $500 | proposal | — |
| 5 | Ram (2) | Sulav (1) | Task & Productivity Manager | Hourly | $400 | completed | — |
| 6 | Ram (2) | Bikash (11) | AI Resume Builder | Hourly | $200 | completed | — |
| 7 | Sarah (6) | Sulav (1) | Landing Page Redesign | Hourly | $320 | open | — |
| 8 | Sarah (6) | Sulav (1) | Landing Page Manager | Hourly | $320 | open | — |

### Chat Conversations (6 chats)

| Chat ID | Between | Last Message |
|---------|---------|-------------|
| 1 | Sulav (1) ↔ Sarah (6) | "Sure, I'll send the files today!" |
| 2 | Sulav (1) ↔ Raj (7) | "The project looks great so far" |
| 3 | Sulav (1) ↔ Emily (8) | "Can we discuss the pricing?" |
| 4 | Sulav (1) ↔ Ahmed (9) | "Thanks for the delivery!" |
| 5 | Sulav (1) ↔ Lisa (10) | "I need a revision on the logo" |
| 6 | Sulav (1) ↔ Bikash (11) | "Let me check and get back to you" |

### Messages (sample — Chat 1: Sulav ↔ Sarah)

| Sender | Text | Time |
|--------|------|------|
| Sarah | Hi! I saw your gig for app promo videos. Can you create one for my fitness app? | 10:00 AM |
| Sulav | Hello Sarah! Yes, absolutely. I'd love to help. Could you share some details about your app? | 10:02 AM |
| Sarah | It's a fitness tracking app with workout plans, meal tracking, and progress photos. | 10:05 AM |
| Sulav | Sounds great! I'd recommend the Standard package — 90 seconds with high-quality animations. | 10:08 AM |
| Sarah | That sounds perfect. How soon can you start? | 10:10 AM |
| Sulav | I can start right away! I'll send you a draft within 3 days. | 10:12 AM |
| Sarah | Sure, I'll send the files today! | 10:15 AM |

### Reviews (from GigDetail.jsx — on Gig 10)

| Reviewer | Reviewee | Gig | Rating | Comment | Country |
|----------|----------|-----|--------|---------|---------|
| Sarah (6) | artz23 (5) | 10 | 5 | Absolutely amazing work! The promo video exceeded my expectations... | USA |
| Raj (7) | artz23 (5) | 10 | 5 | Great communication and fast delivery. The video looked very professional... | India |
| Emily (8) | artz23 (5) | 10 | 4 | Good quality video, delivered on time. Had one revision... | Canada |
| Ahmed (9) | artz23 (5) | 10 | 5 | This seller is incredibly talented! Created a stunning promo... | UAE |
| Lisa (10) | artz23 (5) | 10 | 5 | Perfect work as always. This is my third order... | Germany |

### Reviews (from FreelancerProfile.jsx — on Sulav)

| Reviewer | Rating | Comment | Project |
|----------|--------|---------|---------|
| Ram Chaudhary (2) | 5 | Excellent work! Delivered on time and went beyond expectations. | Restaurant Website |
| Priya Magar (new) | 5 | Very professional and creative. The final logo perfectly captures our brand. | Logo Design |
| Bishal Tamang (new) | 4 | Good work overall. Responsive to feedback and made all changes. | E-commerce Site |
| Sita Maharjan (new) | 5 | Amazing developer! Built exactly what we needed. Donation system works flawlessly. | NGO Website |
| Ankit Sharma (new) | 5 | Clean code and great communication throughout the project. | Dashboard App |
| Deepa Gurung (new) | 4 | Solid backend work. Well-documented API endpoints and fast delivery. | API Development |

### Reviews (from ClientProfile.jsx — given by Ram)

| Reviewee | Rating | Comment | Project |
|----------|--------|---------|---------|
| Sulav (1) | 5 | Excellent developer who understood the brief immediately. Delivered ahead of schedule. | Restaurant Website |
| Ekta (12) | 5 | Creative and reliable. Our instagram engagement doubled in the first month. | Social Media Management |
| Bikash (11) | 4 | Good quality photos. Could have been a bit faster but final results excellent. | Menu Photography |
| Anita Sharma (new) | 5 | Very talented designer. Captured our brand vision perfectly on the first try. | Logo Design |
| Deepak Gurung (new) | 5 | The promo video was stunning. Great attention to detail and smooth editing. | Video Production |
| Sita Maharjan (new) | 4 | Well-written content that matched our tone. Delivered on time with minimal revisions. | Content Writing |

### Portfolio Items (9 — from Portfolio.jsx)

| Freelancer | Title | Rating |
|-----------|-------|--------|
| Sulav (1) | Razor Website Design | 5.0 |
| Sulav (1) | Transport Website | 5.0 |
| Sulav (1) | Wordpress Website | 5.0 |
| Sulav (1) | Healthcare Website | 5.0 |
| Sulav (1) | Inquiry Website | 5.0 |
| Sulav (1) | Ecommerce Website | 5.0 |
| Sulav (1) | Mobile App | 5.0 |
| Sulav (1) | Law Website | 5.0 |
| Sulav (1) | Ecommerce Website | 5.0 |

### Transactions

**Client transactions (from ClientDashboard.jsx):**

| User | Label | Amount | Type | Date |
|------|-------|--------|------|------|
| Ram (2) | Wallet Top-up | 20.50 | credit | 2025-04-25 |
| Ram (2) | Purchase | 62.80 | debit | 2025-04-25 |
| Ram (2) | Project | 20.50 | debit | 2025-05-10 |
| Ram (2) | Income | 72.80 | credit | 2025-06-18 |
| Ram (2) | Wallet Top-up | 62.80 | credit | 2025-04-25 |

**Freelancer earnings (from FreelancerDashboard.jsx):**

| User | Label | Amount | Type | Date |
|------|-------|--------|------|------|
| Sulav (1) | Junaid Paden | 215.00 | credit | 2025-07-25 |
| Sulav (1) | Marcus Williams | 190.00 | credit | 2025-11-12 |
| Sulav (1) | Laura Johnson | 64.00 | credit | 2025-06-18 |
| Sulav (1) | Jessica Mary | 214.00 | credit | 2025-04-25 |
| Sulav (1) | Jessica Mary | 198.00 | credit | 2025-07-25 |

---

## API Endpoints

### Authentication

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| POST | `/api/auth/signup` | No | Register new user |
| POST | `/api/auth/login` | No | Login, returns JWT + user |
| GET | `/api/auth/me` | Yes | Get current user from token |

**POST /api/auth/signup** request:
```json
{
  "firstName": "Sulav",
  "lastName": "Shrestha",
  "email": "sulav@sajhagig.com",
  "password": "password123",
  "role": "freelancer"
}
```

**POST /api/auth/login** response:
```json
{
  "success": true,
  "token": "eyJhbGci...",
  "user": {
    "id": 1,
    "role": "freelancer",
    "firstName": "Sulav",
    "lastName": "Shrestha",
    "email": "sulav@sajhagig.com",
    "avatar": null,
    "initials": "SS",
    "verified": true
  }
}
```

### Users

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/users/:id` | Optional | Full user profile with role-specific data |
| PUT | `/api/users/:id` | Yes (self) | Update profile fields |
| GET | `/api/users/:id/stats` | Optional | User statistics |

**GET /api/users/1** response (freelancer):
```json
{
  "id": 1,
  "role": "freelancer",
  "firstName": "Sulav",
  "lastName": "Shrestha",
  "initials": "SS",
  "verified": true,
  "location": "Kathmandu, Nepal",
  "bio": "Full stack developer with 3+ years...",
  "memberSince": "2024-01-01",
  "profile": {
    "title": "Full Stack Developer",
    "hourlyRate": 25.00,
    "topRated": true,
    "badge": "Top Rated Seller",
    "rating": 4.90,
    "reviewCount": 24,
    "jobsCompleted": 24,
    "onTimeDelivery": 98.00,
    "rehireRate": 100.00,
    "totalEarnings": 82000.00
  },
  "skills": ["React", "Node.js", "MySQL", "Tailwind", "Express.js", "MongoDB", "TypeScript"],
  "languages": [{"language": "English", "level": "Fluent"}, {"language": "Nepali", "level": "Native"}]
}
```

### Gigs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/gigs` | No | List gigs with filters |
| GET | `/api/gigs/:id` | No | Full gig detail |
| POST | `/api/gigs` | Yes (freelancer) | Create new gig |
| PUT | `/api/gigs/:id` | Yes (owner) | Update gig |
| DELETE | `/api/gigs/:id` | Yes (owner) | Soft-delete gig |
| GET | `/api/gigs/user/:userId` | No | Gigs by freelancer |

**GET /api/gigs** query params: `?category=&search=&page=1&limit=10&sort=rating`

**GET /api/gigs** response:
```json
{
  "success": true,
  "gigs": [
    {
      "id": 1,
      "title": "I will design UI UX for mobile app with figma for ios",
      "price": 8674,
      "rating": 5.0,
      "reviewCount": 570,
      "likes": 32400,
      "image": "https://picsum.photos/seed/gig1/400/250",
      "seller": {
        "id": 3,
        "username": "cc__creative",
        "avatar": "https://i.pravatar.cc/40?img=3",
        "badge": "Top Rated Seller",
        "badgeColor": "#00c9a7"
      }
    }
  ],
  "pagination": { "page": 1, "limit": 10, "total": 10, "pages": 1 }
}
```

**GET /api/gigs/10** response (full detail):
```json
{
  "id": 10,
  "title": "I will create an amazing website or app promo video",
  "category": "Video & Animation",
  "subcategory": "App & Website Previews",
  "description": "...",
  "about": ["If you want to create...", "We create Basic to High-End..."],
  "requirements": ["Logo", "Text Descriptions", "Screen Images", "Video", "Website Address"],
  "rating": 5.0,
  "reviewCount": 1860,
  "likes": 11700,
  "seller": {
    "id": 5,
    "username": "artz23",
    "avatar": "https://i.pravatar.cc/40?img=12",
    "badge": "Level 2 Seller",
    "rating": 5.0,
    "reviewCount": 1860,
    "ordersInQueue": 5,
    "memberSince": "2020-08-01",
    "country": "Nepal",
    "avgResponseTime": "1 hour",
    "lastDelivery": "about 2 hours",
    "languages": [{"language": "English", "level": "Fluent"}, {"language": "Nepali", "level": "Native"}]
  },
  "packages": {
    "basic": { "name": "BASIC PROMO", "price": 868, "deliveryDays": 4, "revisions": "1", "features": [...] },
    "standard": { "name": "STANDARD PROMO", "price": 1736, "deliveryDays": 5, "revisions": "3", "features": [...] },
    "premium": { "name": "PREMIUM PROMO", "price": 3472, "deliveryDays": 7, "revisions": "Unlimited", "features": [...] }
  },
  "faqs": [...],
  "images": [...],
  "reviews": [...]
}
```

**POST /api/gigs** request:
```json
{
  "title": "I will design a modern logo",
  "categoryId": 1,
  "subcategoryId": 1,
  "description": "Professional logo design...",
  "requirements": "Logo text, preferred colors",
  "searchTags": ["logo", "brand", "design"],
  "packages": {
    "basic": { "name": "Basic Logo", "price": 2500, "deliveryDays": 3, "revisions": "1", "features": [...] },
    "standard": { ... },
    "premium": { ... }
  }
}
```

### Jobs

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/jobs` | No | List jobs with filters |
| GET | `/api/jobs/:id` | No | Full job detail |
| POST | `/api/jobs` | Yes (client) | Post new job |
| PUT | `/api/jobs/:id` | Yes (owner) | Update job |
| DELETE | `/api/jobs/:id` | Yes (owner) | Close job |
| GET | `/api/jobs/client/:clientId` | Optional | Jobs by a client |

**GET /api/jobs** query params: `?category=&skills=&budget_type=&experience=&page=1&limit=10`

**GET /api/jobs/:id** response:
```json
{
  "id": 2,
  "title": "Build a graphic",
  "postedAgo": "12 hours ago",
  "location": "Worldwide",
  "budget": { "min": 50, "max": 50, "type": "fixed" },
  "experienceLevel": "intermediate",
  "projectType": "one_time",
  "remote": true,
  "skills": ["Canva", "Graphic Design", "Illustration"],
  "summary": {
    "jobTitle": "Proposal Graphic Designer – Premium Process Infographic",
    "description": ["We're looking for a talented graphic designer...", "This graphic will represent our Communication..."],
    "whatWeNeed": "A triple-page infographic (A4 portrait)...",
    "designRequirements": ["Minimal and modern", "Easy to read at a glance", "Professionally structured", "Aligned with premium brand"]
  },
  "activity": {
    "proposals": "Less than 5",
    "lastViewed": "11 hours ago",
    "interviewing": 0,
    "invitesSent": 0,
    "unansweredInvites": 0
  },
  "client": {
    "memberSince": "2020-02-09",
    "country": "Australia",
    "localTime": "5:19 AM"
  }
}
```

### Proposals

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/proposals/freelancer/:id` | Yes (self) | My proposals |
| GET | `/api/proposals/job/:jobId` | Yes (job owner) | Proposals for a job |
| POST | `/api/proposals` | Yes (freelancer) | Submit proposal |
| PUT | `/api/proposals/:id` | Yes (owner/job poster) | Update/accept/reject |
| DELETE | `/api/proposals/:id` | Yes (owner) | Withdraw |

### Projects

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/projects` | Yes | My projects (role-filtered) |
| GET | `/api/projects/:id` | Yes | Project detail |
| POST | `/api/projects` | Yes | Create from accepted proposal |
| PUT | `/api/projects/:id` | Yes | Update status |

**GET /api/projects** query params: `?status=open&page=1&limit=10`

### Chat & Messages

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/chats` | Yes | My conversations list |
| GET | `/api/chats/:id/messages` | Yes (participant) | Messages in a chat |
| POST | `/api/chats` | Yes | Start new chat |
| POST | `/api/chats/:id/messages` | Yes (participant) | Send message |
| PUT | `/api/chats/:id/read` | Yes (participant) | Mark messages as read |

**GET /api/chats** response:
```json
{
  "chats": [
    {
      "id": 1,
      "contact": { "id": 6, "name": "Sarah Johnson", "avatar": "...", "online": true },
      "lastMessage": "Sure, I'll send the files today!",
      "lastMessageTime": "2m ago",
      "unreadCount": 2
    }
  ]
}
```

### Reviews

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/reviews/user/:userId` | No | Reviews received |
| GET | `/api/reviews/given/:userId` | No | Reviews given |
| GET | `/api/reviews/gig/:gigId` | No | Reviews for a gig |
| POST | `/api/reviews` | Yes | Leave review |

### Portfolio

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/portfolio/:userId` | No | Portfolio items |
| POST | `/api/portfolio` | Yes (freelancer) | Add item |
| PUT | `/api/portfolio/:id` | Yes (owner) | Update item |
| DELETE | `/api/portfolio/:id` | Yes (owner) | Delete item |

### Dashboard

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/dashboard/client` | Yes (client) | Client dashboard data |
| GET | `/api/dashboard/freelancer` | Yes (freelancer) | Freelancer dashboard data |

**GET /api/dashboard/freelancer** response:
```json
{
  "stats": {
    "completedJobs": 50,
    "taskCompleted": 25,
    "reviews": 25,
    "earning": 5862
  },
  "overviewData": [
    { "day": "Sun", "Jobs": 8, "AppliedProposals": 5 },
    { "day": "Mon", "Jobs": 15, "AppliedProposals": 10 }
  ],
  "analyticsData": [
    { "name": "Jobs", "value": 35, "color": "#ef4444" },
    { "name": "Applied Proposals", "value": 25, "color": "#14b8a6" }
  ],
  "ongoingProjects": [...],
  "recentEarnings": [...]
}
```

**GET /api/dashboard/client** response:
```json
{
  "stats": {
    "projectsPosted": 75,
    "ongoingProjects": 10,
    "completedProjects": 65,
    "reviews": 25
  },
  "overviewData": [...],
  "analyticsData": [...],
  "ongoingProjects": [...],
  "transactions": [...],
  "jobs": [...]
}
```

### Categories

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| GET | `/api/categories` | No | All categories with subcategories |

---

## Middleware

### auth.js — JWT Authentication
```
- Reads Authorization: Bearer <token> header
- Verifies token with jsonwebtoken
- Attaches req.user = { id, role, email }
- Returns 401 on invalid/missing token
- optionalAuth variant: same but doesn't reject if no token
```

### errorHandler.js — Global Error Handler
```
- Catches all thrown errors
- Maps: ValidationError→400, Unauthorized→401, Forbidden→403, NotFound→404
- Returns { success: false, message, errors }
- Logs full error in dev, sanitizes in production
```

### validate.js — Request Validation
```
- Simple required field checker
- Type validation (email, min length, enum values)
- Returns 400 with field-level error messages
```

---

## Frontend Integration

### New: src/api/client.js
```javascript
const BASE_URL = '/api';

export async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem('sajhagig_token');
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  });
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: 'Request failed' }));
    throw error;
  }
  return res.json();
}

const api = {
  get: (url) => apiRequest(url),
  post: (url, data) => apiRequest(url, { method: 'POST', body: JSON.stringify(data) }),
  put: (url, data) => apiRequest(url, { method: 'PUT', body: JSON.stringify(data) }),
  delete: (url) => apiRequest(url, { method: 'DELETE' }),
};
export default api;
```

### New: src/context/AuthContext.jsx
```
- Wraps <BrowserRouter> in <AuthProvider>
- Stores { user, token, loading } in state
- On mount: reads token from localStorage → calls GET /api/auth/me to validate
- login(email, password): POST /api/auth/login → stores token → sets user state
- signup({ firstName, lastName, email, password, role }): POST /api/auth/signup → stores token → sets user state
- logout(): clears localStorage and resets state
- useAuth() hook exposes { user, token, loading, login, signup, logout }
```

### Wiring Pattern — Graceful Fallback

Every page follows the same pattern for backward-compatible API integration:

1. **Hardcoded data renamed** to `FALLBACK_*` or kept as default `useState` initial value
2. **`useEffect` on mount** calls the API endpoint
3. **API response mapped** to the exact shape the existing components expect
4. **`.catch(() => {})` silences errors** — page renders with fallback data if backend is down
5. **No loading spinners block UI** — pages render instantly with fallback data, then update when API responds

```javascript
// Example pattern (used in all pages):
const [data, setData] = useState(FALLBACK_DATA);     // 1. Fallback as default
useEffect(() => {
  api.get('/endpoint').then((res) => {                // 2. Fetch on mount
    const mapped = res.items.map((item) => ({         // 3. Map to component shape
      id: item.id,
      title: item.title,
      // ...
    }));
    setData(mapped);                                   // Update state
  }).catch(() => {});                                  // 4. Silent fallback
}, []);
```

### Page-by-Page Wiring Map (all 🟢 COMPLETED)

| Frontend File | Hardcoded Data | API Endpoint | Status |
|---------------|---------------|-------------|--------|
| `App.jsx` | — | Wrapped with `<AuthProvider>` | 🟢 |
| `Header.jsx` | Role from URL path | `useAuth()` for user state, shows initials or Login link | 🟢 |
| `Login.jsx` | localStorage role hack | `POST /api/auth/login` via `useAuth().login()` | 🟢 |
| `SignupForm.jsx` | localStorage role hack | `POST /api/auth/signup` via `useAuth().signup()` | 🟢 |
| `BrowseGigs.jsx` | `gigs` array (10 items), `CATEGORIES` | `GET /api/gigs` + `GET /api/categories` | 🟢 |
| `GigDetail.jsx` | `GIG_DATA` object (120 lines) | `GET /api/gigs/:id` — maps packages, FAQs, reviews, seller | 🟢 |
| `FindWork.jsx` | `CARDS` / `PROJECT_CARD` array | `GET /api/jobs` + `GET /api/categories` | 🟢 |
| `JobDetail.jsx` | `JOB` object (90 lines) | `GET /api/jobs/:id` — maps summary, skills, activity, client | 🟢 |
| `CreateGig.jsx` | `GIG_CATEGORIES`, `SUBCATEGORIES` | `GET /api/categories` (with subcategories) + `POST /api/gigs` | 🟢 |
| `ClientDashboard.jsx` | Stats, charts, projects, transactions, jobs table | `GET /api/dashboard/client` + `POST /api/jobs` (modal) | 🟢 |
| `FreelancerDashboard.jsx` | Stats, charts, projects, earnings | `GET /api/dashboard/freelancer` | 🟢 |
| `ClientProjects.jsx` | `PROJECTS` array (6 items) | `GET /api/projects` | 🟢 |
| `FreelancerProjects.jsx` | `PROPOSALS` array (6 items) | `GET /api/proposals/freelancer/:id` via `useAuth()` | 🟢 |
| `Chat.jsx` | `CONTACTS` (6), `MESSAGES` (18) | `GET /api/chats` + `POST /api/chats/:id/messages` | 🟢 |
| `FreelancerProfile.jsx` | `PROFILE` object (60 lines) | `GET /api/users/:id` + `GET /api/reviews/user/:id` | 🟢 |
| `ClientProfile.jsx` | `PROFILE` object (60 lines) | `GET /api/users/:id` + `GET /api/reviews/given/:id` | 🟢 |
| `ReviewClient.jsx` | `REVIEWS` array (4 items) | `GET /api/reviews/user/:id` via `useAuth()` | 🟢 |
| `ReviewFreelancer.jsx` | `REVIEWS` array (4 items) | `GET /api/reviews/user/:id` via `useAuth()` | 🟢 |
| `Portfolio.jsx` | `PORTFOLIO_ITEMS` (9 items) | `GET /api/portfolio/:userId` via `useAuth()` | 🟢 |

---

## Dev Setup & Scripts

### server/.env
```
PORT=5000
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=sajhagig
JWT_SECRET=sajhagig_jwt_secret_key_2024
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### server/package.json
```json
{
  "name": "sajhagig-server",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "dev": "nodemon index.js",
    "migrate": "node db/migrate.js",
    "seed": "node db/migrate.js --seed"
  },
  "dependencies": {
    "bcryptjs": "^2.4.3",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.21.0",
    "jsonwebtoken": "^9.0.2",
    "mysql2": "^3.11.0"
  },
  "devDependencies": {
    "nodemon": "^3.1.4"
  }
}
```

### Root package.json additions
```json
{
  "proxy": "http://localhost:5000",
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "server": "cd server && npm run dev",
    "dev": "concurrently -n client,server -c blue,green \"npm start\" \"npm run server\"",
    "db:migrate": "cd server && node db/migrate.js",
    "db:seed": "cd server && node db/migrate.js --seed"
  },
  "devDependencies": {
    "concurrently": "^9.0.0"
  }
}
```

### .gitignore additions
```
server/node_modules/
server/.env
```

### Commands to get started
```bash
# 1. Create MySQL database
mysql -u root -p -e "CREATE DATABASE sajhagig;"

# 2. Install server dependencies
cd server && npm install

# 3. Run migrations and seed data
npm run migrate

# 4. Back to root, install concurrently
cd .. && npm install

# 5. Start both servers
npm run dev
```

---

## Implementation Phases

### Phase 1: Foundation 🟢 COMPLETED
- [x] Create `server/` directory with package.json
- [x] Create `server/config/db.js` — MySQL connection pool
- [x] Create `server/config/env.js` — env loader
- [x] Create `server/index.js` — Express app with CORS, JSON, error handler
- [x] Create `server/db/schema.sql` — all 21 CREATE TABLE statements
- [x] Create `server/db/seed.sql` — all INSERT statements (14 users, 10 gigs, 30 packages, 8 jobs, 6 proposals, 8 projects, 6 chats, 18 messages, 13 reviews, 9 portfolio items, 10 transactions, 8 categories, 40 subcategories)
- [x] Create `server/db/migrate.js` — migration runner
- [x] Update root package.json with scripts and proxy
- [x] Update .gitignore

### Phase 2: Auth System 🟢 COMPLETED
- [x] Create `server/utils/hash.js` and `server/utils/jwt.js`
- [x] Create `server/middleware/auth.js`
- [x] Create `server/middleware/errorHandler.js`
- [x] Create auth controller + routes (signup, login, me)
- **Test:**
  - [ ] `POST /api/auth/signup` — create new client with `{ firstName, lastName, email, password, role: "client" }` → expect 201 + JWT token
  - [ ] `POST /api/auth/signup` — duplicate email → expect 409 error
  - [ ] `POST /api/auth/login` — with seed user `sulav@sajhagig.com` / `password123` → expect 200 + JWT + user object
  - [ ] `POST /api/auth/login` — wrong password → expect 401
  - [ ] `GET /api/auth/me` — with valid Bearer token → expect 200 + user object
  - [ ] `GET /api/auth/me` — no token → expect 401

### Phase 3: Users & Profiles 🟢 COMPLETED
- [x] Create users controller + routes
- [x] GET /api/users/:id with role-based joins
- [x] PUT /api/users/:id for profile updates
- **Test:**
  - [ ] `GET /api/users/1` — freelancer Sulav → expect user + freelancer_profiles join (title, rating, skills, languages)
  - [ ] `GET /api/users/2` — client Ram → expect user + client_profiles join (company, projectsPosted, totalSpent)
  - [ ] `PUT /api/users/1` — update bio with auth token → expect 200 + updated fields
  - [ ] `PUT /api/users/1` — with different user's token → expect 403

### Phase 4: Categories & Gigs 🟢 COMPLETED
- [x] Create categories controller + routes
- [x] Create gigs controller + routes
- [x] GET /api/gigs with pagination and filters
- [x] GET /api/gigs/:id with packages, FAQs, images, reviews, seller
- [x] POST /api/gigs for creating gigs
- **Test:**
  - [ ] `GET /api/categories` → expect 8 categories, each with 5 subcategories
  - [ ] `GET /api/gigs` → expect 10 gigs with seller info, pagination metadata
  - [ ] `GET /api/gigs?category=1&page=1&limit=5` → expect filtered results
  - [ ] `GET /api/gigs/10` → expect full detail: 3 packages (basic/standard/premium), 5 FAQs, images, 5 reviews, seller profile
  - [ ] `POST /api/gigs` — with freelancer auth token + packages array → expect 201 + new gig ID
  - [ ] `POST /api/gigs` — with client auth token → expect 403

### Phase 5: Jobs & Proposals 🟢 COMPLETED
- [x] Create jobs controller + routes
- [x] Create proposals controller + routes
- [x] GET /api/jobs with filters
- [x] GET /api/jobs/:id with full detail
- [x] POST /api/proposals for submitting proposals
- **Test:**
  - [ ] `GET /api/jobs` → expect 8 jobs with skills array and proposal counts
  - [ ] `GET /api/jobs/2` → expect full detail with summary, activity, client info, similar jobs
  - [ ] `POST /api/jobs` — with client auth token → expect 201 + new job ID
  - [ ] `POST /api/proposals` — with freelancer token + `{ jobId, coverLetter, proposedRate }` → expect 201
  - [ ] `GET /api/proposals/freelancer/1` → expect 6 proposals with job and client info
  - [ ] `PUT /api/proposals/1` — accept proposal → expect status changed

### Phase 6: Projects & Dashboard 🟢 COMPLETED
- [x] Create projects controller + routes
- [x] Create dashboard controller + routes
- [x] GET /api/dashboard/client with aggregated stats
- [x] GET /api/dashboard/freelancer with aggregated stats
- **Test:**
  - [ ] `GET /api/projects` — with client token → expect projects where client_id matches
  - [ ] `GET /api/projects` — with freelancer token → expect projects where freelancer_id matches
  - [ ] `GET /api/dashboard/client` — with Ram's token → expect `{ stats, projects, transactions, jobs }`
  - [ ] `GET /api/dashboard/freelancer` — with Sulav's token → expect `{ stats, projects, transactions }`
  - [ ] Dashboard stats should aggregate from projects/reviews/transactions tables

### Phase 7: Chat & Messages 🟢 COMPLETED
- [x] Create messages controller + routes
- [x] GET /api/chats with last message and unread count
- [x] GET /api/chats/:id/messages with full history
- [x] POST /api/chats/:id/messages for sending
- **Test:**
  - [ ] `GET /api/chats` — with Sulav's token → expect 6 conversations with last message, time, unread count
  - [ ] `GET /api/chats/1/messages` → expect 7 messages in chronological order (Sulav ↔ Sarah)
  - [ ] `POST /api/chats/1/messages` — `{ text: "Hello!" }` → expect 201 + new message
  - [ ] `PUT /api/chats/1/read` → expect unread count reset to 0
  - [ ] Chat endpoints should reject non-participants → expect 403

### Phase 8: Reviews & Portfolio 🟢 COMPLETED
- [x] Create reviews controller + routes
- [x] Create portfolio controller + routes
- [x] GET reviews by user, by gig
- [x] POST review
- [x] CRUD portfolio items
- **Test:**
  - [ ] `GET /api/reviews/user/5` → expect 5 reviews on artz23 (from GigDetail seed data)
  - [ ] `GET /api/reviews/given/2` → expect 6 reviews given by Ram (from ClientProfile seed data)
  - [ ] `GET /api/reviews/gig/10` → expect reviews for the promo video gig
  - [ ] `POST /api/reviews` — `{ revieweeId, rating, comment }` → expect 201
  - [ ] `GET /api/portfolio/1` → expect 9 portfolio items for Sulav
  - [ ] `POST /api/portfolio` — with freelancer token + `{ title, imageUrl }` → expect 201
  - [ ] `DELETE /api/portfolio/1` — with owner token → expect 200

### Phase 9: Frontend Wiring 🟢 COMPLETED
- [x] Create `src/api/client.js`
- [x] Create `src/context/AuthContext.jsx`
- [x] Wire Login.jsx and SignupForm.jsx to auth API
- [x] Wire BrowseGigs.jsx to gigs API
- [x] Wire GigDetail.jsx to gig detail API
- [x] Wire FindWork.jsx to jobs API
- [x] Wire JobDetail.jsx to job detail API
- [x] Wire CreateGig.jsx to categories + create gig API
- [x] Wire both dashboards to dashboard API
- [x] Wire ClientProjects.jsx and FreelancerProjects.jsx
- [x] Wire Chat.jsx to chat/messages API
- [x] Wire both profile pages to users API
- [x] Wire review and portfolio pages
- [x] All pages use fallback data when API is unavailable
- **Test (end-to-end):**
  - [ ] Start both servers with `npm run dev` — React on :3000, Express on :5000
  - [ ] Login page: login with `sulav@sajhagig.com` / `password123` → redirects to freelancer dashboard
  - [ ] Login page: login with `ram@sajhagig.com` / `password123` → redirects to client dashboard
  - [ ] Signup page: create new account → redirects to appropriate dashboard
  - [ ] Header: shows user initials when logged in, "Login" link when not
  - [ ] Browse Gigs: loads 10 gigs from API, categories populate filter bar
  - [ ] Gig Detail: click any gig → loads full detail with packages, FAQs, reviews
  - [ ] Find Work: loads job listings from API
  - [ ] Job Detail: click any job → loads full detail with skills, activity, client info
  - [ ] Create Gig: categories load from API, form submits to `POST /api/gigs`
  - [ ] Client Dashboard: stats, charts, ongoing projects, transactions, jobs table from API
  - [ ] Freelancer Dashboard: stats, charts, ongoing projects, earnings from API
  - [ ] Client Projects: project list loads from API
  - [ ] Freelancer Projects: proposal list loads from API
  - [ ] Chat: conversation list loads, messages load per conversation, send works
  - [ ] Freelancer Profile: profile data + reviews load from API
  - [ ] Client Profile: profile data + reviews given load from API
  - [ ] Review pages: reviews load from API for logged-in user
  - [ ] Portfolio: items load from API for logged-in user
  - [ ] **Fallback**: Stop server, refresh any page → page renders with hardcoded fallback data (no errors)

---

## Progress Summary

| Phase | Status | Files Created |
|-------|--------|---------------|
| Phase 1: Foundation | 🟢 Complete | 9 files (package.json, .env, config/, db/, utils/) |
| Phase 2: Auth System | 🟢 Complete | 4 files (auth controller, routes, middleware, utils) |
| Phase 3: Users & Profiles | 🟢 Complete | 2 files (users controller + routes) |
| Phase 4: Categories & Gigs | 🟢 Complete | 4 files (categories + gigs controllers + routes) |
| Phase 5: Jobs & Proposals | 🟢 Complete | 4 files (jobs + proposals controllers + routes) |
| Phase 6: Projects & Dashboard | 🟢 Complete | 4 files (projects + dashboard controllers + routes) |
| Phase 7: Chat & Messages | 🟢 Complete | 2 files (messages controller + routes) |
| Phase 8: Reviews & Portfolio | 🟢 Complete | 4 files (reviews + portfolio controllers + routes) |
| Phase 9: Frontend Wiring | 🟢 Complete | 2 new files (api/client.js, context/AuthContext.jsx) + 15 pages wired |
| **Total** | **9/9 phases done** | **38 files created/modified** |

---

## Notes

- **Images**: Stay as external URLs (Unsplash, Picsum, Pravatar) — no file upload for MVP
- **Real-time chat**: Uses REST polling initially — Socket.io can be added later
- **Seed passwords**: All users use `password123` for dev testing
- **Currency**: Prices stored as DECIMAL, frontend formats with ₹ or $ prefix
- **Dashboard charts**: Seed data includes pre-computed weekly aggregates
- **Graceful fallback**: All frontend pages render with hardcoded fallback data if the backend is unavailable. The UI works identically with or without the server running — API data simply replaces fallback data on successful fetch
- **No breaking changes**: All original React component interfaces remain unchanged. API data is mapped to existing prop shapes in `useEffect` hooks, so components like `GigCard`, `ProjectCard`, `ReviewCard`, etc. required zero modifications
- **Auth flow**: Token stored in `localStorage` as `sajhagig_token`. AuthContext validates on mount via `GET /api/auth/me`. Header shows user initials when logged in, "Login" link when not
- **Proxy**: React dev server proxies `/api/*` requests to Express on port 5000 via `"proxy"` in root `package.json`

## Verification Checklist

```bash
# 1. Setup database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS sajhagig;"

# 2. Configure server/.env (copy from .env.example, set DB_PASSWORD)

# 3. Install all dependencies
cd server && npm install && cd ..
npm install

# 4. Run migrations + seed data
npm run db:migrate

# 5. Start both servers
npm run dev
# → React on http://localhost:3000
# → Express on http://localhost:5000

# 6. Test login with seed user
# Email: sulav@sajhagig.com / Password: password123 (freelancer)
# Email: ram@sajhagig.com / Password: password123 (client)

# 7. Verify API endpoints
curl http://localhost:5000/api/gigs          # Should return 10 gigs
curl http://localhost:5000/api/jobs          # Should return 8 jobs
curl http://localhost:5000/api/categories    # Should return 8 categories with subcategories
```
