-- SajhaGig Database Schema

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS transactions;
DROP TABLE IF EXISTS portfolio_items;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS messages;
DROP TABLE IF EXISTS chats;
DROP TABLE IF EXISTS project_tags;
DROP TABLE IF EXISTS projects;
DROP TABLE IF EXISTS proposals;
DROP TABLE IF EXISTS job_skills;
DROP TABLE IF EXISTS jobs;
DROP TABLE IF EXISTS gig_faqs;
DROP TABLE IF EXISTS gig_images;
DROP TABLE IF EXISTS gig_packages;
DROP TABLE IF EXISTS gigs;
DROP TABLE IF EXISTS subcategories;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS freelancer_skills;
DROP TABLE IF EXISTS freelancer_languages;
DROP TABLE IF EXISTS client_profiles;
DROP TABLE IF EXISTS freelancer_profiles;
DROP TABLE IF EXISTS users;

SET FOREIGN_KEY_CHECKS = 1;

-- 1. Users
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

-- 2. Freelancer Profiles
CREATE TABLE freelancer_profiles (
  user_id           INT PRIMARY KEY,
  title             VARCHAR(100) DEFAULT NULL,
  hourly_rate       DECIMAL(10,2) DEFAULT NULL,
  top_rated         BOOLEAN DEFAULT FALSE,
  badge             VARCHAR(50) DEFAULT NULL,
  badge_color       VARCHAR(10) DEFAULT NULL,
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

-- 3. Freelancer Languages
CREATE TABLE freelancer_languages (
  id        INT PRIMARY KEY AUTO_INCREMENT,
  user_id   INT NOT NULL,
  language  VARCHAR(50) NOT NULL,
  level     VARCHAR(30) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 4. Freelancer Skills
CREATE TABLE freelancer_skills (
  id      INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  skill   VARCHAR(50) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_user_skill (user_id, skill)
);

-- 5. Client Profiles
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

-- 6. Categories
CREATE TABLE categories (
  id    INT PRIMARY KEY AUTO_INCREMENT,
  name  VARCHAR(100) NOT NULL UNIQUE,
  slug  VARCHAR(100) NOT NULL UNIQUE
);

-- 7. Subcategories
CREATE TABLE subcategories (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  category_id   INT NOT NULL,
  name          VARCHAR(100) NOT NULL,
  slug          VARCHAR(100) NOT NULL,
  FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE CASCADE
);

-- 8. Gigs
CREATE TABLE gigs (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  freelancer_id   INT NOT NULL,
  title           VARCHAR(255) NOT NULL,
  category_id     INT NOT NULL,
  subcategory_id  INT DEFAULT NULL,
  description     TEXT DEFAULT NULL,
  requirements    JSON DEFAULT NULL,
  search_tags     JSON DEFAULT NULL,
  about           JSON DEFAULT NULL,
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

-- 9. Gig Packages
CREATE TABLE gig_packages (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  gig_id        INT NOT NULL,
  tier          ENUM('basic', 'standard', 'premium') NOT NULL,
  name          VARCHAR(100) NOT NULL,
  price         DECIMAL(10,2) NOT NULL,
  description   TEXT DEFAULT NULL,
  delivery_days INT NOT NULL,
  revisions     VARCHAR(30) NOT NULL,
  features      JSON DEFAULT NULL,
  FOREIGN KEY (gig_id) REFERENCES gigs(id) ON DELETE CASCADE,
  UNIQUE KEY unique_gig_tier (gig_id, tier)
);

-- 10. Gig Images
CREATE TABLE gig_images (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  gig_id      INT NOT NULL,
  image_url   VARCHAR(500) NOT NULL,
  sort_order  INT DEFAULT 0,
  FOREIGN KEY (gig_id) REFERENCES gigs(id) ON DELETE CASCADE
);

-- 11. Gig FAQs
CREATE TABLE gig_faqs (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  gig_id      INT NOT NULL,
  question    TEXT NOT NULL,
  answer      TEXT NOT NULL,
  sort_order  INT DEFAULT 0,
  FOREIGN KEY (gig_id) REFERENCES gigs(id) ON DELETE CASCADE
);

-- 12. Jobs
CREATE TABLE jobs (
  id                INT PRIMARY KEY AUTO_INCREMENT,
  client_id         INT NOT NULL,
  title             VARCHAR(255) NOT NULL,
  description       TEXT NOT NULL,
  summary_title     VARCHAR(255) DEFAULT NULL,
  summary_what_we_need TEXT DEFAULT NULL,
  design_requirements JSON DEFAULT NULL,
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

-- 13. Job Skills
CREATE TABLE job_skills (
  id      INT PRIMARY KEY AUTO_INCREMENT,
  job_id  INT NOT NULL,
  skill   VARCHAR(50) NOT NULL,
  FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
);

-- 14. Proposals
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

-- 15. Projects
CREATE TABLE projects (
  id              INT PRIMARY KEY AUTO_INCREMENT,
  job_id          INT DEFAULT NULL,
  gig_id          INT DEFAULT NULL,
  client_id       INT NOT NULL,
  freelancer_id   INT DEFAULT NULL,
  name            VARCHAR(255) NOT NULL,
  description     TEXT DEFAULT NULL,
  project_type    ENUM('hourly', 'fixed') DEFAULT 'fixed',
  price           DECIMAL(10,2) NOT NULL,
  status          ENUM('open', 'proposal', 'in_progress', 'completed', 'cancelled', 'expired') DEFAULT 'open',
  hired_on        DATE DEFAULT NULL,
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

-- 16. Project Tags
CREATE TABLE project_tags (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  project_id  INT NOT NULL,
  tag         VARCHAR(50) NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- 17. Chats
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

-- 18. Messages
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

-- 19. Reviews
CREATE TABLE reviews (
  id            INT PRIMARY KEY AUTO_INCREMENT,
  reviewer_id   INT NOT NULL,
  reviewee_id   INT NOT NULL,
  gig_id        INT DEFAULT NULL,
  project_id    INT DEFAULT NULL,
  rating        TINYINT NOT NULL,
  comment       TEXT DEFAULT NULL,
  created_at    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reviewer_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (reviewee_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (gig_id) REFERENCES gigs(id) ON DELETE SET NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE SET NULL
);

-- 20. Portfolio Items
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

-- 21. Transactions
CREATE TABLE transactions (
  id          INT PRIMARY KEY AUTO_INCREMENT,
  user_id     INT NOT NULL,
  label       VARCHAR(100) NOT NULL,
  amount      DECIMAL(10,2) NOT NULL,
  type        ENUM('credit', 'debit') NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
