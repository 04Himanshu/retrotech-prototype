export interface ServiceItem {
  id: string;
  category: 'Tech Development' | 'Marketing Platform' | 'Enterprise & Cloud';
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  features: string[];
  image: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
  badge?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  company: string;
  country: string;
  flag: string;
  service: string;
  rating: number;
  content: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface BlogItem {
  id: string;
  title: string;
  category: string;
  date: string;
  comments: string;
  summary: string;
  image: string;
}

export const COMPANY_INFO = {
  name: "RetroTech Digital",
  legalName: "B2B Export LLC / RetroTech Digital",
  tagline: "Smart IT, AI and Marketing Solutions for Every Business",
  heroHeadline: "Business Made Easy with Retrotech",
  heroServices: [
    "SaaS Development",
    "Digital Marketing",
    "SEO Services",
    "Paid Marketing",
    "Social Media Marketing",
    "Website Development",
    "Software Development"
  ],
  heroSubtitle: "Grow your business and boost revenue by engaging customers, automating messages, and selling smarter through modern IT and digital marketing systems.",
  shortDesc: "A 360° IT and Digital Solutions Company dedicated to empowering businesses in the digital era. We provide innovative services that help organizations streamline operations, enhance performance, and drive measurable results.",
  logo: "/assets/retrotech-logo.png",
  phone: "+91-9910836538",
  phoneClean: "+919910836538",
  email: "info@retrotechdigital.com",
  location: "O-126, O-145, O-146 The Shopping Mall, Arjun Marg, DLF Phase 1, Gurugram, Haryana, India, 122002",
  mapUrl: "https://maps.google.com/?q=DLF+Phase+1+Gurugram",
  socials: {
    linkedin: "https://www.linkedin.com/company/retrotech-digital",
    instagram: "https://www.instagram.com/retrotech_digital/",
    whatsapp: "https://wa.me/919910836538"
  },
  accreditations: [
    { name: "Google Ads Premier Partner", logo: "/assets/google-ads-partner.png" },
    { name: "Meta Business Partner", logo: "/assets/meta-partner-retrotech.webp" },
    { name: "Microsoft Advertising Partner", logo: "/assets/msadvert.webp" },
    { name: "Verified 4.9★ Google Rating", logo: "/assets/google-rating-retrotech.webp" }
  ]
};

// Services directly matching https://www.retrotechdigital.com/
export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-development",
    category: "Tech Development",
    title: "Web Development",
    subtitle: "High-Performance Modern Websites",
    description: "Build fast, responsive websites that strengthen your brand, elevate customer engagement, and drive sustainable business growth.",
    tags: ["React & Next.js", "WordPress & Headless CMS", "Custom Architecture", "Responsive Design"],
    features: [
      "Custom responsive design engineered with modern micro-interactions",
      "Sub-second Core Web Vitals optimization and SEO structuring",
      "Robust API integration with legacy enterprise backends",
      "Scalable cloud deployment with automated CI/CD pipelines"
    ],
    image: "/assets/service-web-real.jpg"
  },
  {
    id: "mobile-app-development",
    category: "Tech Development",
    title: "App Development",
    subtitle: "Native & Cross-Platform Experiences",
    description: "Develop powerful mobile apps that engage customers, streamline user journeys, and accelerate your business across iOS and Android.",
    tags: ["iOS & Android", "React Native & Flutter", "Real-Time Sync", "Intuitive UI/UX"],
    features: [
      "Native-grade fluid animations and gesture-driven UI",
      "End-to-end telemetry, push notifications, and analytics",
      "Secure payment gateway integrations and biometric authentication",
      "App Store & Google Play compliance, deployment, and lifecycle maintenance"
    ],
    image: "/assets/service-app-real.jpg"
  },
  {
    id: "digital-marketing",
    category: "Marketing Platform",
    title: "Digital Marketing",
    subtitle: "Data-Driven Revenue Growth",
    description: "Increase your online visibility, generate quality leads, and scale your revenue through multi-channel SEO, PPC, and paid advertising.",
    tags: ["Search Engine Optimization", "PPC Campaigns", "Meta Ads", "Conversion Rate Optimization"],
    features: [
      "Technical SEO audits, schema injection, and keyword authority strategy",
      "Data-backed performance ad copy, A/B creative testing, and ROAS scaling",
      "Attribution modeling and multi-touch customer journey analytics",
      "WhatsApp automated retargeting and conversational marketing flows"
    ],
    image: "/assets/service-marketing-real.jpg"
  },
  {
    id: "software-development",
    category: "Tech Development",
    title: "Software Development",
    subtitle: "Custom Business Efficiency Systems",
    description: "Custom software solutions designed to improve operational efficiency, automate workflows, and scale your business securely.",
    tags: ["Custom Software", "Enterprise Portals", "API Development", "Workflow Automation"],
    features: [
      "Scalable multi-tenant architectures designed for 99.99% uptime",
      "Role-based access control (RBAC) and enterprise data governance",
      "Automated database scaling and distributed caching",
      "Comprehensive API documentation and developer sandboxes"
    ],
    image: "/assets/service-software-real.jpg"
  },
  {
    id: "saas-development",
    category: "Tech Development",
    title: "SaaS Development",
    subtitle: "Cloud Products Built for Scale",
    description: "Create secure, scalable SaaS products that support long-term business success, multi-tier subscriptions, and high-concurrency users.",
    tags: ["Multi-Tenant Cloud", "Microservices", "Billing & Subscriptions", "High Availability"],
    features: [
      "Zero-downtime blue/green deployment topologies",
      "Automated auto-scaling pods handling concurrency surges",
      "Real-time telemetry, DDoS shielding, and automated database failovers",
      "Subscription management, Stripe billing orchestration, and tiered quotas"
    ],
    image: "/assets/service-saas-real.jpg"
  }
];

// 11 Industries directly matching https://www.retrotechdigital.com/
export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: "realestate",
    name: "Real Estate & Construction",
    tagline: "Modern Portals & CRM Systems",
    description: "Modern websites, CRM systems, interactive property floorplans, and digital marketing solutions for real estate businesses.",
    iconName: "Building2",
    image: "/assets/industry-realestate-hd.jpg",
    badge: "Property Tech"
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    tagline: "Automation & Operations",
    description: "Streamline plant-floor operations with custom software, workflow automation, IoT telemetry dashboards, and enterprise solutions.",
    iconName: "Factory",
    image: "/assets/industry-manufacturing-hd.jpg",
    badge: "Industrial IoT"
  },
  {
    id: "ecommerce",
    name: "Ecommerce & Multivendor",
    tagline: "High-Converting Online Stores",
    description: "Build high-converting online stores and multivendor marketplaces with seamless shopping experiences, fast checkout, and secure payments.",
    iconName: "ShoppingCart",
    image: "/assets/industry-ecommerce-hd.jpg",
    badge: "Commerce Core"
  },
  {
    id: "personal-beauty-care",
    name: "Personal Beauty Care",
    tagline: "Booking Systems & Growth",
    description: "Grow your beauty and wellness brand with seamless appointment booking systems, branded mobile-first websites, and digital marketing.",
    iconName: "Sparkles",
    image: "/assets/industry-beauty-hd.jpg",
    badge: "Lifestyle & Retail"
  },
  {
    id: "entertainment",
    name: "Media & Entertainment",
    tagline: "Creative Digital Platforms",
    description: "Engage audiences through creative digital platforms, high-concurrency streaming apps, and high-impact promotional campaigns.",
    iconName: "Film",
    image: "/assets/industry-entertainment-hd.jpg",
    badge: "Streaming Media"
  },
  {
    id: "healthcare",
    name: "Medical & Healthcare",
    tagline: "Secure Patient Care Portals",
    description: "Secure healthcare software, HIPAA-compliant patient portals, automated appointment engines, and digital solutions for better patient care.",
    iconName: "Stethoscope",
    image: "/assets/industry-healthcare-hd.jpg",
    badge: "Healthcare SLA"
  },
  {
    id: "insurance",
    name: "Finance & Insurance",
    tagline: "Policy Management & Security",
    description: "Simplify policy management, claims processing, and customer engagement with bank-grade security and smart digital solutions.",
    iconName: "ShieldCheck",
    image: "/assets/industry-insurance-hd.jpg",
    badge: "Fintech Security"
  },
  {
    id: "travel",
    name: "Travel & Hospitality",
    tagline: "Dynamic Booking Platforms",
    description: "Enhance travel experiences with intuitive booking platforms, destination websites, and feature-rich mobile guest applications.",
    iconName: "Compass",
    image: "/assets/industry-travel-hd.jpg",
    badge: "Travel Tech"
  },
  {
    id: "elearning",
    name: "EdTech & E-Learning",
    tagline: "Virtual Classrooms & Courses",
    description: "Develop interactive e-learning platforms with virtual classrooms, digital course management, and progress assessment dashboards.",
    iconName: "Layers",
    image: "/assets/industry-elearning-hd.jpg",
    badge: "Education Tech"
  },
  {
    id: "logistics",
    name: "Transportation & Logistics",
    tagline: "Fleet & Supply Tracking",
    description: "Optimize supply chain operations with modern logistics software, automated dispatching, and real-time fleet tracking systems.",
    iconName: "Zap",
    image: "/assets/industry-logistics-hd.jpg",
    badge: "Supply Chain"
  },
  {
    id: "oil-gas",
    name: "Oil and Gas",
    tagline: "Enterprise Modernization",
    description: "Digital transformation solutions that improve operational efficiency, asset telemetry, compliance auditing, and business performance.",
    iconName: "Cpu",
    image: "/assets/industry-oilgas-hd.jpg",
    badge: "Energy Tech"
  }
];

// Top Six Reasons to Trust Our IT Expertise directly matching https://www.retrotechdigital.com/
export const PILLARS_DATA = [
  {
    number: "01",
    title: "Experienced IT Professionals",
    desc: "Our skilled developers, designers, and technology experts deliver reliable solutions using proven industry practices and modern standards."
  },
  {
    number: "02",
    title: "Customised Business Solutions",
    desc: "We create tailored websites, applications, software, and digital solutions that match your unique business processes and objectives."
  },
  {
    number: "03",
    title: "On-Time Project Delivery",
    desc: "We use the latest tools, frameworks, and technologies to build secure, high-performing, and future-ready digital products on schedule."
  },
  {
    number: "04",
    title: "Transparent Communication",
    desc: "We maintain clear communication, transparent sprint processes, and regular milestone demos throughout every stage of your project."
  },
  {
    number: "05",
    title: "Scalable & Secure Technologies",
    desc: "Every solution is carefully designed, developed, tested, and optimized to provide an excellent user experience and enterprise stability."
  },
  {
    number: "06",
    title: "Dedicated Post-Launch Support",
    desc: "We provide cost-effective IT services and SLA-backed maintenance that can easily scale and adapt as your business continues to grow."
  }
];

// 10 Real Client Reviews directly matching https://www.retrotechdigital.com/
export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "review-1",
    name: "Priya Sharma",
    role: "Marketing Head",
    company: "UrbanNest Interiors",
    country: "India",
    flag: "🇮🇳",
    service: "Digital Marketing",
    rating: 5,
    content: "Retrotech helped us grow our online presence with a perfectly executed social media strategy. Our brand visibility and inquiries have increased dramatically within months!",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "review-2",
    name: "Michael Thompson",
    role: "CEO",
    company: "TechNova Solutions",
    country: "USA",
    flag: "🇺🇸",
    service: "Web Development",
    rating: 5,
    content: "The team built a robust and responsive web application for our company. Their communication, technical expertise, and timely delivery were top-notch throughout.",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "review-3",
    name: "Arjun Patel",
    role: "Founder",
    company: "FitAura Gym Chain",
    country: "India",
    flag: "🇮🇳",
    service: "SEO Services",
    rating: 5,
    content: "Our local SEO rankings improved tremendously! Thanks to Retrotech, we now receive 3x more customer inquiries from Google every single week.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "review-4",
    name: "Sophie Martin",
    role: "Product Manager",
    company: "HealthBridge App",
    country: "UK",
    flag: "🇬🇧",
    service: "App Development",
    rating: 5,
    content: "They developed a clean, user-friendly mobile app for our healthcare startup. The experience was seamless from UI/UX design to final App Store deployment.",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "review-5",
    name: "Rohit Mehta",
    role: "Director",
    company: "Mehta Enterprises",
    country: "India",
    flag: "🇮🇳",
    service: "Branding & PPC",
    rating: 5,
    content: "From branding to Google Ads — Retrotech handled everything with creativity and professionalism. Our online sales jumped by 45% in the first quarter.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "review-6",
    name: "Emily Johnson",
    role: "Sales Head",
    company: "Global Freight Co.",
    country: "Canada",
    flag: "🇨🇦",
    service: "CRM Development",
    rating: 5,
    content: "They built a custom CRM for our logistics operations. It’s intuitive, fast, and integrates perfectly with our existing communication and ERP systems.",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "review-7",
    name: "Neha Gupta",
    role: "Owner",
    company: "StyleAura Boutique",
    country: "India",
    flag: "🇮🇳",
    service: "Web + Marketing",
    rating: 5,
    content: "They redesigned our website and ran digital marketing campaigns — the results were fantastic. My online orders doubled in just 2 months!",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "review-8",
    name: "David Miller",
    role: "Managing Director",
    company: "EcoTrend Store",
    country: "Australia",
    flag: "🇦🇺",
    service: "Ecommerce Development",
    rating: 5,
    content: "Excellent eCommerce development support. Smooth functionality, fast page speed, and an amazing user interface that converted our visitors into loyal customers.",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "review-9",
    name: "Karan Verma",
    role: "Founder",
    company: "Cafe Aroma",
    country: "India",
    flag: "🇮🇳",
    service: "Social Media",
    rating: 5,
    content: "Their social media team is brilliant — engaging content, great visuals, and consistent growth in followers and customer footfall at our cafes.",
    avatar: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=150&auto=format&fit=crop&q=80"
  },
  {
    id: "review-10",
    name: "Laura Rodriguez",
    role: "Marketing Director",
    company: "NovaVida Wellness",
    country: "Spain",
    flag: "🇪🇸",
    service: "SEO + Web",
    rating: 5,
    content: "Their SEO optimization and responsive web design helped us attract international clients effortlessly. Highly recommended team for serious business growth.",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80"
  }
];

// FAQs directly matching https://www.retrotechdigital.com/
export const FAQS_DATA: FAQItem[] = [
  {
    question: "What IT services does your company provide?",
    answer: "We provide website development, mobile app development, custom software solutions, UI/UX design, cloud services, digital marketing, SEO, and ongoing IT support."
  },
  {
    question: "Do you provide customized solutions for businesses?",
    answer: "Yes, we develop customized IT solutions based on your business requirements, target audience, workflow, budget, and long-term goals."
  },
  {
    question: "How long does it take to complete an IT project?",
    answer: "The project timeline depends on its scope, features, and complexity. After reviewing your requirements, our team provides a clear development plan and estimated delivery timeline."
  },
  {
    question: "Do you provide support after the project is completed?",
    answer: "Yes, we provide post-launch maintenance, technical support, security updates, performance monitoring, bug fixes, and future enhancements to keep your solution running smoothly."
  }
];

// Articles directly matching https://www.retrotechdigital.com/
export const BLOGS_DATA: BlogItem[] = [
  {
    id: "ppc-guide",
    title: "PPC Advertising Guide: How to Improve Return on Ad Spend",
    category: "Strategy & Performance",
    date: "31 JAN 2026",
    comments: "1 Comment",
    summary: "Discover data-backed tactics to optimize paid search campaigns, reduce cost per acquisition, and maximize ROAS across Google and Meta advertising networks.",
    image: "/assets/blog-ppc-guide.jpg"
  },
  {
    id: "cloud-computing",
    title: "Cloud Computing and Managed IT Services for Scalable Businesses",
    category: "Cloud Infrastructure",
    date: "31 JAN 2026",
    comments: "1 Comment",
    summary: "How modern businesses leverage hybrid cloud architectures, container orchestration, and proactive SRE monitoring to achieve 99.99% uptime.",
    image: "/assets/blog-cloud-it.jpg"
  }
];

export const STATS_DATA = [
  { value: "10+", label: "Years Combined Leadership" },
  { value: "250+", label: "Digital Solutions Delivered" },
  { value: "99.4%", label: "Client Retention Rate" },
  { value: "360°", label: "Full-Cycle Digital Expertise" }
];
