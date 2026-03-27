-- SajhaGig Seed Data
-- All passwords are 'password123' hashed with bcrypt

-- =============================================
-- USERS (14 users)
-- Password hash for 'password123': $2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem
-- =============================================

INSERT INTO users (id, role, first_name, last_name, email, password_hash, avatar, initials, location, country, verified, bio, member_since) VALUES
(1, 'freelancer', 'Sulav', 'Shrestha', 'sulav@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/150?img=11', 'SS', 'Kathmandu, Nepal', 'Nepal', TRUE, 'Full stack developer with 3+ years building web applications for Nepali businesses and NGOs. I specialize in React and Node.js with strong focus on clean code, performance, and great UX. Previously worked with startups in Thamel and NGOs across Kathmandu.\n\nCurrently pursuing B.Sc. IT at Itahari International College. Available for freelance projects part-time.', '2024-01-01'),
(2, 'client', 'Ram', 'Chaudhary', 'ram@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/150?img=15', 'RC', 'Kathmandu, Nepal', 'Nepal', TRUE, 'Business owner operating two restaurants in the Thamel area of Kathmandu. Regularly hires freelancers for web design, digital marketing, and content creation to grow the business''s online presence.\n\nPrefers freelancers who communicate clearly, provide daily updates, and deliver work on time. Fast to respond and process payments.', '2024-01-01'),
(3, 'freelancer', 'Creative', 'Studio', 'cc.creative@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/40?img=3', 'CC', 'Kathmandu, Nepal', 'Nepal', TRUE, 'Professional UI/UX designer with expertise in Figma, Adobe XD, and brand identity.', '2022-05-15'),
(4, 'freelancer', 'Smith', 'Creative', 'creativesmith@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/40?img=5', 'SC', 'Pokhara, Nepal', 'Nepal', TRUE, 'Web developer specializing in modern business websites and e-commerce solutions.', '2023-03-10'),
(5, 'freelancer', 'Arit', 'Zuwal', 'artz23@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/40?img=12', 'AZ', 'Kathmandu, Nepal', 'Nepal', TRUE, 'If you want to create any kind of Premium Promo (Website, Apps, Fashion, Youtube, Real Estate), you are at the right gig.\n\nWe create Basic to High-End Promotion Videos, delivering the highest quality work.\n\nWe can create all kinds of promotion videos. We create the video according to your requirements, we can discuss everything and can arrange things according to your requirements.\n\nOur main focus is customer satisfaction. We will ensure 100% customer satisfaction. We highly concerned with the Premium Quality while providing the affordable service.\n\nWe consider each project as a project for us and deliver the highest quality work.', '2020-08-01'),
(6, 'client', 'Sarah', 'Johnson', 'sarah@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/40?img=20', 'SJ', 'New York, USA', 'United States', TRUE, 'Tech entrepreneur looking for talented freelancers for app development projects.', '2023-06-01'),
(7, 'client', 'Raj', 'Patel', 'raj@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/40?img=33', 'RP', 'Mumbai, India', 'India', TRUE, 'Real estate business owner seeking professional marketing and video content.', '2022-11-01'),
(8, 'client', 'Emily', 'Chen', 'emily@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/40?img=25', 'EC', 'Toronto, Canada', 'Canada', FALSE, 'Education startup founder looking for web development talent.', '2024-02-01'),
(9, 'client', 'Ahmed', 'Hassan', 'ahmed@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/40?img=30', 'AH', 'Dubai, UAE', 'UAE', FALSE, 'Real estate developer seeking stunning promotional content.', '2023-01-15'),
(10, 'client', 'Lisa', 'Mueller', 'lisa@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/40?img=28', 'LM', 'Berlin, Germany', 'Germany', FALSE, 'Fashion brand owner looking for creative design and branding work.', '2023-09-01'),
(11, 'freelancer', 'Bikash', 'Thapa', 'bikash@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/40?img=14', 'BT', 'Kathmandu, Nepal', 'Nepal', TRUE, 'Professional photographer specializing in food and product photography.', '2023-04-01'),
(12, 'freelancer', 'Ekta', 'Rai', 'ekta@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/40?img=23', 'ER', 'Kathmandu, Nepal', 'Nepal', TRUE, 'Social media manager and content creator with expertise in Instagram and TikTok.', '2023-07-01'),
(13, 'freelancer', 'Design', 'Pro', 'designpro@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/40?img=8', 'DP', 'Kathmandu, Nepal', 'Nepal', TRUE, 'Landing page specialist with expertise in React and Tailwind CSS.', '2022-09-01'),
(14, 'freelancer', 'Web', 'Wizard', 'webwizard@sajhagig.com', '$2a$10$8KzQWZ5F5sQ7xLGhHjXYOeJFGYml8MHM7zT8HPn5EHGjS5zKx7Pem', 'https://i.pravatar.cc/40?img=9', 'WW', 'Lalitpur, Nepal', 'Nepal', TRUE, 'E-commerce UI designer specializing in modern shopping experiences.', '2023-01-01');

-- =============================================
-- FREELANCER PROFILES
-- =============================================

INSERT INTO freelancer_profiles (user_id, title, hourly_rate, top_rated, badge, badge_color, rating, review_count, jobs_completed, on_time_delivery, rehire_rate, total_earnings, orders_in_queue, avg_response_time, last_delivery) VALUES
(1, 'Full Stack Developer', 25.00, TRUE, 'Top Rated Seller', '#00c9a7', 4.90, 24, 24, 98.00, 100.00, 82000.00, 2, '1 hour', 'about 3 hours'),
(3, 'UI/UX Designer', 30.00, TRUE, 'Top Rated Seller', '#00c9a7', 5.00, 570, 50, 99.00, 98.00, 150000.00, 3, '30 minutes', 'about 1 hour'),
(4, 'Web Developer', 20.00, FALSE, 'Level 2 Seller', '#888', 4.80, 57, 30, 95.00, 90.00, 80000.00, 1, '2 hours', 'about 5 hours'),
(5, 'Video & Animation Expert', 35.00, FALSE, 'Level 2 Seller', '#888', 5.00, 1860, 45, 97.00, 95.00, 120000.00, 5, '1 hour', 'about 2 hours'),
(11, 'Photographer', 15.00, FALSE, 'Level 2 Seller', '#888', 4.50, 18, 18, 90.00, 85.00, 45000.00, 0, '3 hours', 'about 1 day'),
(12, 'Social Media Manager', 18.00, FALSE, 'Level 2 Seller', '#888', 4.70, 22, 22, 93.00, 88.00, 55000.00, 1, '2 hours', 'about 4 hours'),
(13, 'Landing Page Specialist', 28.00, TRUE, 'Top Rated Seller', '#00c9a7', 4.90, 320, 35, 98.00, 95.00, 95000.00, 2, '1 hour', 'about 2 hours'),
(14, 'E-commerce Designer', 22.00, FALSE, 'Level 2 Seller', '#888', 4.70, 88, 20, 92.00, 87.00, 60000.00, 1, '2 hours', 'about 6 hours');

-- =============================================
-- FREELANCER LANGUAGES
-- =============================================

INSERT INTO freelancer_languages (user_id, language, level) VALUES
(1, 'English', 'Fluent'),
(1, 'Nepali', 'Native'),
(3, 'English', 'Fluent'),
(3, 'Nepali', 'Native'),
(4, 'English', 'Fluent'),
(4, 'Nepali', 'Native'),
(5, 'English', 'Fluent'),
(5, 'Nepali', 'Native'),
(11, 'English', 'Intermediate'),
(11, 'Nepali', 'Native'),
(12, 'English', 'Fluent'),
(12, 'Nepali', 'Native'),
(13, 'English', 'Fluent'),
(13, 'Nepali', 'Native'),
(14, 'English', 'Fluent'),
(14, 'Nepali', 'Native');

-- =============================================
-- FREELANCER SKILLS
-- =============================================

INSERT INTO freelancer_skills (user_id, skill) VALUES
(1, 'React'), (1, 'Node.js'), (1, 'MySQL'), (1, 'Tailwind'), (1, 'Express.js'), (1, 'MongoDB'), (1, 'TypeScript'),
(3, 'Figma'), (3, 'Adobe XD'), (3, 'UI Design'), (3, 'UX Design'), (3, 'Brand Identity'),
(4, 'WordPress'), (4, 'HTML5'), (4, 'CSS3'), (4, 'JavaScript'), (4, 'PHP'),
(5, 'After Effects'), (5, 'Premiere Pro'), (5, 'Motion Graphics'), (5, 'Video Editing'), (5, 'Animation'),
(11, 'Photography'), (11, 'Lightroom'), (11, 'Photoshop'), (11, 'Food Photography'),
(12, 'Instagram'), (12, 'TikTok'), (12, 'Copywriting'), (12, 'Canva'), (12, 'Content Strategy'),
(13, 'React'), (13, 'Tailwind'), (13, 'Landing Pages'), (13, 'Figma'), (13, 'Next.js'),
(14, 'Shopify'), (14, 'WooCommerce'), (14, 'UI Design'), (14, 'Figma'), (14, 'CSS3');

-- =============================================
-- CLIENT PROFILES
-- =============================================

INSERT INTO client_profiles (user_id, company, industry, website, phone, projects_posted, hired_count, total_spent, avg_rating, on_time_payment) VALUES
(2, 'Thamel Restaurant', 'Restaurant & Hospitality', NULL, NULL, 8, 6, 45000.00, 4.80, 95.00),
(6, NULL, 'Technology', NULL, NULL, 5, 4, 25000.00, 4.90, 98.00),
(7, NULL, 'Real Estate', NULL, NULL, 3, 2, 18000.00, 4.70, 90.00),
(8, NULL, 'Education', NULL, NULL, 2, 1, 8000.00, 4.50, 100.00),
(9, NULL, 'Real Estate', NULL, NULL, 4, 3, 30000.00, 4.80, 92.00),
(10, NULL, 'Fashion', NULL, NULL, 2, 2, 12000.00, 4.60, 95.00);

-- =============================================
-- CATEGORIES (8)
-- =============================================

INSERT INTO categories (id, name, slug) VALUES
(1, 'Graphic Design', 'graphic-design'),
(2, 'Web Development', 'web-development'),
(3, 'Mobile Development', 'mobile-development'),
(4, 'UI/UX Design', 'ui-ux-design'),
(5, 'Digital Marketing', 'digital-marketing'),
(6, 'Content Writing', 'content-writing'),
(7, 'Video & Animation', 'video-animation'),
(8, 'Data Science', 'data-science');

-- =============================================
-- SUBCATEGORIES (40)
-- =============================================

INSERT INTO subcategories (category_id, name, slug) VALUES
-- Graphic Design
(1, 'Logo design', 'logo-design'),
(1, 'Brand identity', 'brand-identity'),
(1, 'Illustration', 'illustration'),
(1, 'Business cards', 'business-cards'),
(1, 'Social media design', 'social-media-design'),
-- Web Development
(2, 'WordPress', 'wordpress'),
(2, 'Landing page', 'landing-page'),
(2, 'Full website', 'full-website'),
(2, 'E-commerce', 'e-commerce'),
(2, 'Web app', 'web-app'),
-- Mobile Development
(3, 'iOS app', 'ios-app'),
(3, 'Android app', 'android-app'),
(3, 'React Native', 'react-native'),
(3, 'Flutter', 'flutter'),
(3, 'App UI', 'app-ui'),
-- UI/UX Design
(4, 'Website design', 'website-design'),
(4, 'App design', 'app-design'),
(4, 'Wireframing', 'wireframing'),
(4, 'Prototyping', 'prototyping'),
(4, 'User research', 'user-research'),
-- Digital Marketing
(5, 'SEO', 'seo'),
(5, 'Social media marketing', 'social-media-marketing'),
(5, 'PPC', 'ppc'),
(5, 'Email marketing', 'email-marketing'),
(5, 'Content strategy', 'content-strategy'),
-- Content Writing
(6, 'Blog posts', 'blog-posts'),
(6, 'Copywriting', 'copywriting'),
(6, 'Technical writing', 'technical-writing'),
(6, 'Product descriptions', 'product-descriptions'),
(6, 'Articles', 'articles'),
-- Video & Animation
(7, 'Explainer video', 'explainer-video'),
(7, 'Animation', 'animation'),
(7, 'Video editing', 'video-editing'),
(7, 'Motion graphics', 'motion-graphics'),
(7, 'Intro/Outro', 'intro-outro'),
-- Data Science
(8, 'Data analysis', 'data-analysis'),
(8, 'Machine learning', 'machine-learning'),
(8, 'Data visualization', 'data-visualization'),
(8, 'Web scraping', 'web-scraping'),
(8, 'Python scripts', 'python-scripts');

-- =============================================
-- GIGS (10)
-- =============================================

INSERT INTO gigs (id, freelancer_id, title, category_id, subcategory_id, description, requirements, search_tags, about, overall_rating, review_count, likes, status) VALUES
(1, 3, 'I will design UI UX for mobile app with figma for ios', 4, 17, 'Professional UI/UX design for mobile applications using Figma. Pixel-perfect designs for iOS and Android.', '["App concept or wireframe", "Brand colors and logo", "Target audience info", "Reference designs"]', '["ui", "ux", "figma", "mobile", "ios", "app design"]', '["Expert UI/UX designer with over 5 years of experience creating beautiful mobile app interfaces.", "I specialize in iOS and Android app design using Figma with a focus on user experience and modern design trends."]', 5.00, 570, 32400, 'active'),
(2, 4, 'I will create a professional business website design', 2, 8, 'Modern and responsive business website design. Clean layouts with great user experience.', '["Business description", "Logo and brand assets", "Content for pages", "Reference websites"]', '["website", "business", "responsive", "modern", "web design"]', '["Professional web designer creating stunning business websites that convert visitors into customers."]', 4.80, 57, 3400, 'active'),
(3, 3, 'I will design UI UX for mobile app with figma for ios', 4, 17, 'Professional UI/UX design for mobile applications using Figma. Pixel-perfect designs for iOS and Android.', '["App concept or wireframe", "Brand colors and logo", "Target audience info"]', '["ui", "ux", "figma", "mobile", "ios"]', NULL, 5.00, 570, 32400, 'active'),
(4, 4, 'I will create a professional business website design', 2, 8, 'Modern and responsive business website design.', '["Business description", "Logo and brand assets"]', '["website", "business", "responsive"]', NULL, 4.80, 57, 3400, 'active'),
(5, 3, 'I will design UI UX for mobile app with figma for ios', 4, 17, 'Professional UI/UX design for mobile applications.', '["App concept", "Brand colors"]', '["ui", "ux", "figma", "mobile"]', NULL, 5.00, 570, 32400, 'active'),
(6, 13, 'I will build a stunning landing page in React and Tailwind', 2, 7, 'High-converting landing pages built with React and Tailwind CSS. Fast, responsive, and SEO-friendly.', '["Design mockup or reference", "Content and copy", "Brand assets"]', '["landing page", "react", "tailwind", "responsive", "conversion"]', '["Specialized landing page developer with a track record of building high-converting pages for startups and businesses."]', 4.90, 320, 18200, 'active'),
(7, 14, 'I will design a modern e-commerce UI for your store', 4, 16, 'Modern e-commerce UI design with focus on conversion and user experience.', '["Product info", "Brand guidelines", "Competitor references"]', '["ecommerce", "ui", "store", "shopping", "design"]', '["E-commerce design specialist helping online stores look amazing and convert better."]', 4.70, 88, 5100, 'active'),
(8, 3, 'I will create a full brand identity with logo and guidelines', 1, 2, 'Complete brand identity package including logo, color palette, typography, and brand guidelines.', '["Business name", "Industry", "Target audience", "Preferred style"]', '["brand", "logo", "identity", "guidelines", "branding"]', '["Full-service brand identity designer creating cohesive visual identities for businesses worldwide."]', 5.00, 412, 21300, 'active'),
(9, 4, 'I will design a sleek dashboard UI for your SaaS product', 4, 16, 'Clean and functional dashboard UI design for SaaS products and web applications.', '["Product description", "Key features", "User roles"]', '["dashboard", "saas", "ui", "admin", "analytics"]', '["SaaS UI specialist designing intuitive dashboards that users love."]', 4.60, 64, 4800, 'active'),
(10, 5, 'I will create an amazing website or app promo video', 7, 31, 'Premium promotional videos for websites, apps, and businesses. High-quality animations and professional editing.', '["Logo", "Text Descriptions", "Screen Images", "Video (if any related stock videos)", "Website Address"]', '["promo", "video", "website", "app", "animation", "promotional"]', '["If you want to create any kind of Premium Promo (Website, Apps, Fashion, Youtube, Real Estate), you are at the right gig.", "We create Basic to High-End Promotion Videos, delivering the highest quality work.", "We can create all kinds of promotion videos. We create the video according to your requirements, we can discuss everything and can arrange things according to your requirements.", "Our main focus is customer satisfaction. We will ensure 100% customer satisfaction. We highly concerned with the Premium Quality while providing the affordable service.", "We consider each project as a project for us and deliver the highest quality work."]', 5.00, 1860, 11700, 'active');

-- =============================================
-- GIG PACKAGES (all 10 gigs get 3 tiers, detailed for gig 10)
-- =============================================

-- Gig 1 packages
INSERT INTO gig_packages (gig_id, tier, name, price, description, delivery_days, revisions, features) VALUES
(1, 'basic', 'Basic Design', 8674.00, 'Basic mobile app UI design', 5, '1', '[{"label":"3 screens","included":true},{"label":"Source file","included":true},{"label":"Responsive design","included":false}]'),
(1, 'standard', 'Standard Design', 15000.00, 'Standard mobile app UI design', 7, '3', '[{"label":"6 screens","included":true},{"label":"Source file","included":true},{"label":"Responsive design","included":true}]'),
(1, 'premium', 'Premium Design', 25000.00, 'Premium mobile app UI design', 10, 'Unlimited', '[{"label":"12 screens","included":true},{"label":"Source file","included":true},{"label":"Responsive design","included":true},{"label":"Prototype","included":true}]'),
-- Gig 2 packages
(2, 'basic', 'Basic Website', 4674.00, 'Basic business website', 7, '1', '[{"label":"3 pages","included":true},{"label":"Responsive","included":true},{"label":"Source files","included":false}]'),
(2, 'standard', 'Standard Website', 8000.00, 'Standard business website', 10, '3', '[{"label":"5 pages","included":true},{"label":"Responsive","included":true},{"label":"Source files","included":true}]'),
(2, 'premium', 'Premium Website', 15000.00, 'Premium business website', 14, 'Unlimited', '[{"label":"10 pages","included":true},{"label":"Responsive","included":true},{"label":"Source files","included":true},{"label":"SEO","included":true}]'),
-- Gig 3 packages
(3, 'basic', 'Basic Design', 8674.00, 'Basic app design', 5, '1', '[{"label":"3 screens","included":true},{"label":"Source file","included":true}]'),
(3, 'standard', 'Standard Design', 15000.00, 'Standard app design', 7, '3', '[{"label":"6 screens","included":true},{"label":"Source file","included":true}]'),
(3, 'premium', 'Premium Design', 25000.00, 'Premium app design', 10, 'Unlimited', '[{"label":"12 screens","included":true},{"label":"Source file","included":true}]'),
-- Gig 4 packages
(4, 'basic', 'Basic Website', 4674.00, 'Basic website', 7, '1', '[{"label":"3 pages","included":true}]'),
(4, 'standard', 'Standard Website', 8000.00, 'Standard website', 10, '3', '[{"label":"5 pages","included":true}]'),
(4, 'premium', 'Premium Website', 15000.00, 'Premium website', 14, 'Unlimited', '[{"label":"10 pages","included":true}]'),
-- Gig 5 packages
(5, 'basic', 'Basic Design', 8674.00, 'Basic UI design', 5, '1', '[{"label":"3 screens","included":true}]'),
(5, 'standard', 'Standard Design', 15000.00, 'Standard UI design', 7, '3', '[{"label":"6 screens","included":true}]'),
(5, 'premium', 'Premium Design', 25000.00, 'Premium UI design', 10, 'Unlimited', '[{"label":"12 screens","included":true}]'),
-- Gig 6 packages
(6, 'basic', 'Basic Landing', 6299.00, 'Basic landing page', 4, '1', '[{"label":"1 page","included":true},{"label":"Responsive","included":true},{"label":"Source code","included":false}]'),
(6, 'standard', 'Standard Landing', 12000.00, 'Standard landing page', 6, '3', '[{"label":"1 page","included":true},{"label":"Responsive","included":true},{"label":"Source code","included":true}]'),
(6, 'premium', 'Premium Landing', 20000.00, 'Premium landing page with animations', 8, 'Unlimited', '[{"label":"1 page","included":true},{"label":"Responsive","included":true},{"label":"Source code","included":true},{"label":"Animations","included":true}]'),
-- Gig 7 packages
(7, 'basic', 'Basic E-commerce', 5499.00, 'Basic store UI', 5, '1', '[{"label":"3 pages","included":true},{"label":"Responsive","included":true}]'),
(7, 'standard', 'Standard E-commerce', 10000.00, 'Standard store UI', 8, '3', '[{"label":"6 pages","included":true},{"label":"Responsive","included":true}]'),
(7, 'premium', 'Premium E-commerce', 18000.00, 'Premium store UI', 12, 'Unlimited', '[{"label":"12 pages","included":true},{"label":"Responsive","included":true},{"label":"Prototype","included":true}]'),
-- Gig 8 packages
(8, 'basic', 'Basic Brand', 9999.00, 'Logo + basic guidelines', 5, '2', '[{"label":"Logo","included":true},{"label":"Color palette","included":true},{"label":"Brand guidelines","included":false}]'),
(8, 'standard', 'Standard Brand', 18000.00, 'Logo + full brand kit', 8, '3', '[{"label":"Logo","included":true},{"label":"Color palette","included":true},{"label":"Brand guidelines","included":true}]'),
(8, 'premium', 'Premium Brand', 30000.00, 'Complete brand identity', 12, 'Unlimited', '[{"label":"Logo","included":true},{"label":"Color palette","included":true},{"label":"Brand guidelines","included":true},{"label":"Stationery","included":true}]'),
-- Gig 9 packages
(9, 'basic', 'Basic Dashboard', 4999.00, 'Basic dashboard UI', 5, '1', '[{"label":"3 screens","included":true},{"label":"Source file","included":false}]'),
(9, 'standard', 'Standard Dashboard', 9000.00, 'Standard dashboard UI', 8, '3', '[{"label":"6 screens","included":true},{"label":"Source file","included":true}]'),
(9, 'premium', 'Premium Dashboard', 16000.00, 'Premium dashboard UI', 12, 'Unlimited', '[{"label":"12 screens","included":true},{"label":"Source file","included":true},{"label":"Prototype","included":true}]'),
-- Gig 10 packages (detailed promo video)
(10, 'basic', 'BASIC PROMO', 868.00, 'Basic promotional video', 4, '1', '[{"label":"4 captions","included":true},{"label":"1 screenshot","included":true},{"label":"Mid dpi","included":true},{"label":"Screen recording","included":true},{"label":"Source files/transitions","included":false},{"label":"60 seconds running time","included":true}]'),
(10, 'standard', 'STANDARD PROMO', 1736.00, 'Standard promotional video', 5, '3', '[{"label":"8 captions","included":true},{"label":"3 screenshots","included":true},{"label":"High dpi","included":true},{"label":"Screen recording","included":true},{"label":"Source files/transitions","included":true},{"label":"90 seconds running time","included":true}]'),
(10, 'premium', 'PREMIUM PROMO', 3472.00, 'Premium promotional video', 7, 'Unlimited', '[{"label":"12 captions","included":true},{"label":"5 screenshots","included":true},{"label":"Ultra dpi","included":true},{"label":"Screen recording","included":true},{"label":"Source files/transitions","included":true},{"label":"120 seconds running time","included":true}]');

-- =============================================
-- GIG IMAGES
-- =============================================

INSERT INTO gig_images (gig_id, image_url, sort_order) VALUES
(1, 'https://picsum.photos/seed/gig1a/600/400', 0),
(1, 'https://picsum.photos/seed/gig1b/600/400', 1),
(2, 'https://picsum.photos/seed/gig2a/600/400', 0),
(2, 'https://picsum.photos/seed/gig2b/600/400', 1),
(6, 'https://picsum.photos/seed/gig6a/600/400', 0),
(7, 'https://picsum.photos/seed/gig7a/600/400', 0),
(8, 'https://picsum.photos/seed/gig8a/600/400', 0),
(9, 'https://picsum.photos/seed/gig9a/600/400', 0),
(10, 'https://picsum.photos/seed/gig10a/600/400', 0),
(10, 'https://picsum.photos/seed/gig10b/600/400', 1),
(10, 'https://picsum.photos/seed/gig10c/600/400', 2),
(10, 'https://picsum.photos/seed/gig10d/600/400', 3);

-- =============================================
-- GIG FAQS (for gig 10)
-- =============================================

INSERT INTO gig_faqs (gig_id, question, answer, sort_order) VALUES
(10, 'What information do you need to get started?', 'I''ll need your logo, brand colors, text descriptions, screenshots or screen recordings of your website/app, and any specific requirements or preferences you have for the video.', 0),
(10, 'Can you add voiceover to the video?', 'Yes! I offer professional voiceover in English (male/female) as an add-on. You can also provide your own voiceover recording and I''ll sync it with the video.', 1),
(10, 'What if I''m not satisfied with the result?', 'Your satisfaction is my top priority. I offer revisions based on your package. If you''re still not happy after revisions, we can discuss further adjustments to meet your expectations.', 2),
(10, 'How long will the video be?', 'Video length depends on the package: Basic (up to 60s), Standard (up to 90s), Premium (up to 120s). Custom lengths are available upon request.', 3),
(10, 'Do you provide the source files?', 'Source files are included in the Standard and Premium packages. For the Basic package, source files can be added as an extra.', 4);

-- =============================================
-- JOBS (8)
-- =============================================

INSERT INTO jobs (id, client_id, title, description, summary_title, summary_what_we_need, design_requirements, category_id, budget_min, budget_max, budget_type, experience_level, project_type, location, remote, status, proposal_count, interviewing, invites_sent, created_at, expires_at) VALUES
(1, 2, 'Build a Restaurant Website for Thamel', 'Need a responsive site with menu, booking and contact form for a busy restaurant in Thamel, Kathmandu.', 'Restaurant Website Developer', 'A responsive restaurant website with online menu, table booking system, and contact form.', '["Modern and clean design", "Mobile-first approach", "Fast loading times"]', 2, 8674.00, 8674.00, 'fixed', 'intermediate', 'one_time', 'Worldwide', TRUE, 'open', 5, 0, 0, '2025-03-25 10:00:00', '2025-04-25'),
(2, 6, 'Build a graphic', 'We''re looking for a talented graphic designer to create a high-end, visually engaging infographic for our proposal documents.\n\nThis graphic will represent our Communication & Delivery Process for major painting projects (strata and commercial), and needs to feel clean, premium, and easy to follow — something that builds trust and impresses clients at proposal stage.', 'Proposal Graphic Designer – Premium Process Infographic (Painting Industry)', 'A triple-page infographic (A4 portrait) that visually maps out our process in a portrait timeline or flow format.', '["Minimal and modern", "Easy to read at a glance", "Professionally structured (corporate, not playful)", "Aligned with a premium service brand"]', 1, 50.00, 50.00, 'fixed', 'intermediate', 'one_time', 'Worldwide', TRUE, 'open', 3, 0, 0, '2025-03-26 08:00:00', '2025-04-26'),
(3, 2, 'Website Designer Required', 'Looking for an experienced website designer for directory theme customization and development.', NULL, NULL, NULL, 2, 2222.00, 2222.00, 'hourly', 'intermediate', 'one_time', 'Worldwide', TRUE, 'open', 47, 0, 0, '2023-09-29 10:00:00', '2023-10-10'),
(4, 2, 'Create desktop applications', 'Need a developer to create desktop applications for internal business use.', NULL, NULL, NULL, 2, 5782.00, 5782.00, 'fixed', 'expert', 'ongoing', 'Worldwide', TRUE, 'open', 35, 0, 0, '2023-09-21 10:00:00', '2023-10-05'),
(5, 2, 'PHP Javascript Projects', 'Multiple PHP and JavaScript projects requiring part-time developer.', NULL, NULL, NULL, 2, 4879.00, 4879.00, 'fixed', 'intermediate', 'part_time', 'Worldwide', TRUE, 'open', 28, 0, 0, '2023-09-17 10:00:00', '2023-09-29'),
(6, 2, 'Website Designer Required', 'Seeking a website designer for ongoing design and development projects.', NULL, NULL, NULL, 2, 3651.00, 3651.00, 'hourly', 'intermediate', 'one_time', 'Worldwide', TRUE, 'open', 52, 0, 0, '2023-09-11 10:00:00', '2023-09-24'),
(7, 2, 'Swift / SwiftUI Developer', 'Looking for experienced Swift/SwiftUI developer for iOS application development.', NULL, NULL, NULL, 3, 2789.00, 2789.00, 'hourly', 'expert', 'one_time', 'Worldwide', TRUE, 'open', 38, 0, 0, '2023-09-05 10:00:00', '2023-09-17'),
(8, 2, 'Full-stack Developer', 'Need a full-stack developer for building and maintaining web applications.', NULL, NULL, NULL, 2, 7653.00, 7653.00, 'fixed', 'expert', 'part_time', 'Worldwide', TRUE, 'open', 48, 0, 0, '2023-09-01 10:00:00', '2023-09-13');

-- =============================================
-- JOB SKILLS
-- =============================================

INSERT INTO job_skills (job_id, skill) VALUES
(1, 'React'), (1, 'CSS'), (1, 'Node.js'),
(2, 'Canva'), (2, 'Graphic Design'), (2, 'Illustration'),
(3, 'WordPress'), (3, 'CSS'), (3, 'PHP'),
(4, 'Electron'), (4, 'JavaScript'), (4, 'Node.js'),
(5, 'PHP'), (5, 'JavaScript'), (5, 'MySQL'),
(6, 'HTML5'), (6, 'CSS3'), (6, 'JavaScript'),
(7, 'Swift'), (7, 'SwiftUI'), (7, 'iOS'),
(8, 'React'), (8, 'Node.js'), (8, 'PostgreSQL');

-- =============================================
-- PROPOSALS (6)
-- =============================================

INSERT INTO proposals (id, freelancer_id, job_id, cover_letter, proposed_rate, status) VALUES
(1, 1, 1, 'I have extensive experience building restaurant websites with React and Node.js. I can deliver a responsive site with menu, booking, and contact form within the timeline.', 500.00, 'pending'),
(2, 1, 2, 'I specialize in landing page redesign and can create a modern, conversion-focused design for your business.', 450.00, 'pending'),
(3, 1, 3, 'Experienced with WooCommerce and WordPress. I can help restore your product pages efficiently.', 550.00, 'pending'),
(4, 1, 4, 'Full-stack developer with expertise in building scalable applications. Ready to help with your project.', 400.00, 'pending'),
(5, 1, 5, 'I can redesign your landing page with modern UI/UX principles for better conversion rates.', 450.00, 'pending'),
(6, 1, 6, 'Experienced video animator. I can bring your illustrations to life with smooth, engaging animations.', 450.00, 'pending');

-- =============================================
-- PROJECTS (8)
-- =============================================

INSERT INTO projects (id, job_id, gig_id, client_id, freelancer_id, name, description, project_type, price, status, hired_on, deadline, location, rating) VALUES
(1, NULL, NULL, 2, 1, 'Meal Planner App', 'Build an app that helps users manage their expenses and savings.', 'hourly', 400.00, 'open', '2025-01-01', '2025-01-15', 'UK', NULL),
(2, NULL, NULL, 2, 12, 'Job Application Tracker', 'Helps job seekers manage applications, interviews, and follow-ups.', 'fixed', 300.00, 'open', '2025-01-12', '2025-01-26', 'UK', NULL),
(3, NULL, NULL, 2, NULL, 'Subscription Manager', 'An app for task management, deadlines, Pomodoro timers, and goal tracking.', 'fixed', 200.00, 'proposal', NULL, NULL, 'UK', NULL),
(4, NULL, NULL, 2, NULL, 'Subscription Manager', 'Tracks active subscriptions and alerts users about payments.', 'fixed', 500.00, 'proposal', NULL, NULL, 'UK', NULL),
(5, NULL, NULL, 2, 1, 'Task & Productivity Manager', 'An app for task management, deadlines, Pomodoro timers, and goal tracking.', 'hourly', 400.00, 'completed', '2024-11-01', '2024-12-01', 'UK', 5.00),
(6, NULL, NULL, 2, 11, 'AI Resume Builder', 'Generates optimized resumes using AI based on user input.', 'hourly', 200.00, 'completed', '2024-10-01', '2024-11-01', 'UK', 4.00),
(7, NULL, NULL, 6, 1, 'Landing Page Redesign', 'Landing Page Redesign / Sales Page Redesign.', 'hourly', 320.00, 'open', '2025-03-01', '2025-03-20', 'UK', NULL),
(8, NULL, NULL, 6, 1, 'Landing Page Manager', 'Landing Page Manager / Sales Page Redesign.', 'hourly', 320.00, 'open', '2025-03-01', '2025-03-20', 'UK', NULL);

-- =============================================
-- PROJECT TAGS
-- =============================================

INSERT INTO project_tags (project_id, tag) VALUES
(1, 'React'), (1, 'HTML5'), (1, 'Sketch'),
(2, 'HTML5'), (2, 'Sketch');

-- =============================================
-- CHATS (6)
-- =============================================

INSERT INTO chats (id, participant_one, participant_two) VALUES
(1, 1, 6),
(2, 1, 7),
(3, 1, 8),
(4, 1, 9),
(5, 1, 10),
(6, 1, 11);

-- =============================================
-- MESSAGES
-- =============================================

-- Chat 1: Sulav <-> Sarah
INSERT INTO messages (chat_id, sender_id, text, is_read, created_at) VALUES
(1, 6, 'Hi! I saw your gig for app promo videos. Can you create one for my fitness app?', TRUE, '2025-03-25 10:00:00'),
(1, 1, 'Hello Sarah! Yes, absolutely. I''d love to help. Could you share some details about your app?', TRUE, '2025-03-25 10:02:00'),
(1, 6, 'It''s a fitness tracking app with workout plans, meal tracking, and progress photos.', TRUE, '2025-03-25 10:05:00'),
(1, 1, 'Sounds great! I''d recommend the Standard package — 90 seconds with high-quality animations.', TRUE, '2025-03-25 10:08:00'),
(1, 6, 'That sounds perfect. How soon can you start?', TRUE, '2025-03-25 10:10:00'),
(1, 1, 'I can start right away! I''ll send you a draft within 3 days.', TRUE, '2025-03-25 10:12:00'),
(1, 6, 'Sure, I''ll send the files today!', FALSE, '2025-03-25 10:15:00'),

-- Chat 2: Sulav <-> Raj
(2, 7, 'Hey, I need a promo video for my new property listing website.', TRUE, '2025-03-24 14:00:00'),
(2, 1, 'Hi Raj! I''d be happy to create that for you. Can you share the website URL?', TRUE, '2025-03-24 14:05:00'),
(2, 7, 'The project looks great so far', TRUE, '2025-03-25 09:45:00'),

-- Chat 3: Sulav <-> Emily
(3, 8, 'Hello! I''m interested in your web development services for our education platform.', TRUE, '2025-03-23 11:00:00'),
(3, 1, 'Hi Emily! I''d love to help. What kind of platform are you building?', TRUE, '2025-03-23 11:10:00'),
(3, 8, 'Can we discuss the pricing?', FALSE, '2025-03-25 09:00:00'),

-- Chat 4: Sulav <-> Ahmed
(4, 9, 'Great video! The real estate promo turned out amazing.', TRUE, '2025-03-22 16:00:00'),
(4, 1, 'Thanks for the delivery!', TRUE, '2025-03-22 16:30:00'),

-- Chat 5: Sulav <-> Lisa
(5, 10, 'I need a revision on the logo', TRUE, '2025-03-25 05:00:00'),

-- Chat 6: Sulav <-> Bikash
(6, 11, 'Hey Sulav, can you review my portfolio draft?', TRUE, '2025-03-24 08:00:00'),
(6, 1, 'Let me check and get back to you', TRUE, '2025-03-24 08:30:00');

-- =============================================
-- REVIEWS
-- =============================================

-- Reviews on Gig 10 (artz23's promo video gig)
INSERT INTO reviews (reviewer_id, reviewee_id, gig_id, project_id, rating, comment, created_at) VALUES
(6, 5, 10, NULL, 5, 'Absolutely amazing work! The promo video exceeded my expectations. The quality was top-notch and the seller was very responsive throughout the process. Will definitely order again!', '2025-03-11 10:00:00'),
(7, 5, 10, NULL, 5, 'Great communication and fast delivery. The video looked very professional and helped increase our app downloads significantly. Highly recommended!', '2025-02-25 10:00:00'),
(8, 5, 10, NULL, 4, 'Good quality video, delivered on time. Had one revision which was handled promptly. The final result was clean and professional.', '2025-02-20 10:00:00'),
(9, 5, 10, NULL, 5, 'This seller is incredibly talented! Created a stunning promo for our real estate business. The animations were smooth and the overall quality was outstanding.', '2025-01-25 10:00:00'),
(10, 5, 10, NULL, 5, 'Perfect work as always. This is my third order and the quality keeps getting better. Very professional and easy to work with.', '2025-01-20 10:00:00'),

-- Reviews on Sulav (from FreelancerProfile.jsx)
(2, 1, NULL, 5, 5, 'Excellent work! Delivered on time and went beyond expectations. Will definitely hire again.', '2025-03-24 10:00:00'),
(7, 1, NULL, NULL, 5, 'Very professional and creative. The final logo perfectly captures our brand identity.', '2025-03-18 10:00:00'),
(9, 1, NULL, NULL, 4, 'Good work overall. Responsive to feedback and made all requested changes.', '2025-03-11 10:00:00'),
(6, 1, NULL, NULL, 5, 'Amazing developer! Built exactly what we needed. The donation system works flawlessly.', '2025-03-04 10:00:00'),
(8, 1, NULL, NULL, 5, 'Clean code and great communication throughout the project. Highly recommended!', '2025-02-25 10:00:00'),
(10, 1, NULL, NULL, 4, 'Solid backend work. Well-documented API endpoints and fast delivery.', '2025-02-20 10:00:00'),

-- Reviews given by Ram (from ClientProfile.jsx)
(2, 12, NULL, NULL, 5, 'Creative and reliable. Our instagram engagement doubled in the first month. Very professional to work with and very creative with content ideas.', '2025-03-18 10:00:00'),
(2, 11, NULL, 6, 4, 'Good quality photos. Could have been a bit faster but the final results were excellent.', '2025-02-25 10:00:00');

-- =============================================
-- PORTFOLIO ITEMS (9 for Sulav)
-- =============================================

INSERT INTO portfolio_items (freelancer_id, title, description, image_url, rating) VALUES
(1, 'Razor Website Design', 'Modern website design for a razor brand with sleek UI and animations.', 'https://picsum.photos/seed/port1/400/300', 5.00),
(1, 'Transport Website', 'Transportation company website with route tracking and booking features.', 'https://picsum.photos/seed/port2/400/300', 5.00),
(1, 'Wordpress Website', 'Custom WordPress theme development for a business blog.', 'https://picsum.photos/seed/port3/400/300', 5.00),
(1, 'Healthcare Website', 'Healthcare portal with appointment booking and patient management.', 'https://picsum.photos/seed/port4/400/300', 5.00),
(1, 'Inquiry Website', 'Business inquiry and lead generation website with CRM integration.', 'https://picsum.photos/seed/port5/400/300', 5.00),
(1, 'Ecommerce Website', 'Full-featured e-commerce platform with payment integration.', 'https://picsum.photos/seed/port6/400/300', 5.00),
(1, 'Mobile App', 'Cross-platform mobile application for fitness tracking.', 'https://picsum.photos/seed/port7/400/300', 5.00),
(1, 'Law Website', 'Professional law firm website with case management features.', 'https://picsum.photos/seed/port8/400/300', 5.00),
(1, 'Ecommerce Website', 'Another e-commerce project with modern UI and admin dashboard.', 'https://picsum.photos/seed/port9/400/300', 5.00);

-- =============================================
-- TRANSACTIONS
-- =============================================

-- Client transactions (Ram)
INSERT INTO transactions (user_id, label, amount, type, created_at) VALUES
(2, 'Wallet Top-up', 20.50, 'credit', '2025-04-25 10:00:00'),
(2, 'Purchase', 62.80, 'debit', '2025-04-25 14:00:00'),
(2, 'Project', 20.50, 'debit', '2025-05-10 10:00:00'),
(2, 'Income', 72.80, 'credit', '2025-06-18 10:00:00'),
(2, 'Wallet Top-up', 62.80, 'credit', '2025-04-25 16:00:00'),

-- Freelancer earnings (Sulav)
(1, 'Junaid Paden', 215.00, 'credit', '2025-07-25 10:00:00'),
(1, 'Marcus Williams', 190.00, 'credit', '2025-11-12 10:00:00'),
(1, 'Laura Johnson', 64.00, 'credit', '2025-06-18 10:00:00'),
(1, 'Jessica Mary', 214.00, 'credit', '2025-04-25 10:00:00'),
(1, 'Jessica Mary', 198.00, 'credit', '2025-07-25 14:00:00');
