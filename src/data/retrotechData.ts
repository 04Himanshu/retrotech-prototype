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

export interface ProjectItem {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  description: string;
  deliverables: string[];
  metrics: string;
  image: string;
  aspect: string;
}

export interface IndustryItem {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconName: string;
  image: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export const COMPANY_INFO = {
  name: "RetroTech Digital",
  legalName: "B2B Export LLC / RetroTech Digital",
  tagline: "Smart IT, AI & Marketing Solutions for Visionary Enterprises",
  shortDesc: "A 360° IT and Digital Solutions Company dedicated to empowering businesses with bespoke web development, mobile ecosystems, enterprise cloud, and performance marketing.",
  logo: "/assets/retrotech-logo.png",
  phone: "+91-9910836538",
  phoneClean: "+919910836538",
  email: "info@retrotechdigital.com",
  location: "O-126, O-145, O-146 The Shopping Mall, Arjun Marg, DLF Phase 1, Gurugram, Haryana, India — 122002",
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

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "web-development",
    category: "Tech Development",
    title: "Bespoke Web Development",
    subtitle: "High-Performance Digital Flagships",
    description: "We architect ultra-fast, responsive web applications and corporate flagships that articulate brand authority, elevate search rankings, and convert high-intent traffic.",
    tags: ["React & Next.js", "Full-Stack Architecture", "Headless CMS", "Enterprise Security"],
    features: [
      "Custom responsive design engineered with micro-interactions",
      "Sub-second Core Web Vitals optimization and SEO structuring",
      "Robust API integration with legacy enterprise backends",
      "Scalable cloud deployment with automated CI/CD pipelines"
    ],
    image: "/assets/web-development-retrotech.jpg"
  },
  {
    id: "mobile-app-development",
    category: "Tech Development",
    title: "Mobile App Development",
    subtitle: "Native & Cross-Platform Experiences",
    description: "Engineered for intuitive touch engagement, seamless performance, and offline-first dependability across iOS and Android ecosystems.",
    tags: ["iOS & Android", "React Native", "Flutter", "Real-Time Sync"],
    features: [
      "Native-grade fluid animations and gesture-driven UI",
      "End-to-end telemetry, push notifications, and analytics",
      "Secure payment gateway integrations and biometric authentication",
      "App Store & Google Play compliance, deployment, and lifecycle maintenance"
    ],
    image: "/assets/app-development-retrotech.jpg"
  },
  {
    id: "custom-software-saas",
    category: "Tech Development",
    title: "Custom Software & SaaS",
    subtitle: "Cloud Architectures Built to Scale",
    description: "Purpose-built multi-tenant software, microservices, and internal tooling that streamline mission-critical operations and eliminate workflow bottlenecks.",
    tags: ["SaaS Architecture", "Microservices", "REST & GraphQL APIs", "DevOps"],
    features: [
      "Scalable multi-tenant architectures designed for 99.99% uptime",
      "Role-based access control (RBAC) and enterprise data governance",
      "Automated automated database scaling and distributed caching",
      "Comprehensive API documentation and developer sandbox"
    ],
    image: "/assets/software-development-retrotech.jpg"
  },
  {
    id: "crm-enterprise",
    category: "Tech Development",
    title: "CRM Development & ERPNext",
    subtitle: "Unified Sales & Operations Systems",
    description: "Consolidate sales pipelines, customer interactions, lead routing, and ERP workflows into an intuitive, automated single pane of glass.",
    tags: ["CRM Systems", "ERPNext Integration", "Salesforce", "Workflow Automation"],
    features: [
      "Custom pipeline visualizers and automated lead distribution",
      "Deep WhatsApp Business API and multi-channel messaging sync",
      "Executive KPI dashboards with predictive revenue forecasting",
      "Automated invoicing, accounting, and supply chain bridges"
    ],
    image: "/assets/enterprise.webp"
  },
  {
    id: "digital-marketing-seo",
    category: "Marketing Platform",
    title: "Performance Marketing & SEO",
    subtitle: "Data-Driven Revenue Acceleration",
    description: "Hyper-targeted paid media acquisition across Google, Meta, and programmatic networks combined with authoritative organic search positioning.",
    tags: ["Search Engine Optimization", "PPC Campaigns", "Meta Ads", "Conversion Rate Optimization"],
    features: [
      "Technical SEO audits, schema injection, and keyword authority strategy",
      "Data-backed performance ad copy, A/B creative testing, and ROAS scaling",
      "Attribution modeling and multi-touch customer journey analytics",
      "WhatsApp automated retargeting and conversational marketing flows"
    ],
    image: "/assets/digital-marketing-retrotech.jpg"
  },
  {
    id: "brand-creative-orm",
    category: "Marketing Platform",
    title: "Brand Strategy, Content & ORM",
    subtitle: "Reputation & Visual Storytelling",
    description: "Cultivate distinctive brand prestige and safeguard enterprise digital reputation through proactive media monitoring and high-impact content.",
    tags: ["Online Reputation Management", "Creative Direction", "Video Marketing", "Social Media"],
    features: [
      "Active brand sentiment tracking and crisis response management",
      "Editorial storytelling, corporate video, and visual identity systems",
      "Review generation strategies across Google, Trustpilot, and Glassdoor",
      "Multi-channel social engagement with high-conversion content cadence"
    ],
    image: "/assets/marketing-nav.png"
  },
  {
    id: "enterprise-cloud-devops",
    category: "Enterprise & Cloud",
    title: "Enterprise Cloud & DevOps",
    subtitle: "High-Concurrency Infrastructure & Security",
    description: "Mission-critical AWS & GCP cloud architectures with automated CI/CD pipelines, container orchestration, zero-downtime clustering, and proactive 24/7 telemetry.",
    tags: ["AWS & Google Cloud", "Kubernetes & Docker", "CI/CD Pipelines", "SOC2 Compliance"],
    features: [
      "Zero-downtime blue/green deployment topologies",
      "Automated auto-scaling pods handling high concurrency surges",
      "Real-time telemetry, DDoS shielding, and automated database failovers",
      "24/7 SLA-backed site reliability engineering and vulnerability audits"
    ],
    image: "/assets/it-services-nav.png"
  }
];

export const PORTFOLIO_DATA: ProjectItem[] = [
  {
    id: "omni-ecommerce",
    title: "Aura Multivendor Hub",
    client: "Global Retail Collective",
    category: "Ecommerce & Multivendor Platform",
    year: "2024",
    description: "A high-velocity headless commerce ecosystem connecting over 400 premium merchants with synchronized inventory, ultra-fast checkout, and AI recommendations.",
    deliverables: ["Headless Next.js Frontend", "Custom Vendor Dashboard", "Payment Orchestration", "99.98% Core Uptime"],
    metrics: "+148% Checkout Velocity",
    image: "/assets/ecommerce-retrotech.webp",
    aspect: "landscape"
  },
  {
    id: "metropolis-realestate",
    title: "Metropolis Luxury Estates",
    client: "Metropolis Realty Group",
    category: "Real Estate & Construction Tech",
    year: "2024",
    description: "An architectural digital showcase featuring interactive masterplans, 3D property walkthroughs, instant virtual booking, and integrated broker CRM.",
    deliverables: ["Interactive Property Explorer", "Automated Lead Routing", "Custom Broker Portal", "Virtual Tour Integration"],
    metrics: "3.4x Lead Engagement",
    image: "/assets/realestate-retrotech.webp",
    aspect: "portrait"
  },
  {
    id: "sovereign-manufacturing",
    title: "Nexus Industrial IoT Suite",
    client: "Precision Dynamics Corporation",
    category: "Manufacturing & Supply Chain",
    year: "2023",
    description: "Enterprise operations suite monitoring shop-floor telemetry, predictive machinery maintenance, and automated supply procurement across 6 manufacturing hubs.",
    deliverables: ["Real-Time Sensor Telemetry", "Predictive Alert Engine", "ERPNext Customization", "Mobile Floor Inspector"],
    metrics: "42% Reduction in Downtime",
    image: "/assets/manufacturing-retrotech.webp",
    aspect: "landscape"
  },
  {
    id: "curis-healthcare",
    title: "Curis Telehealth Network",
    client: "Curis Health Systems",
    category: "Medical & Healthcare Ecosystem",
    year: "2023",
    description: "A secure, HIPAA-compliant patient consultation portal integrating encrypted video calls, digitized EHR access, prescription delivery, and smart scheduling.",
    deliverables: ["HIPAA-Compliant Architecture", "WebRTC Video Engine", "Patient EHR Mobile App", "Doctor Availability Sync"],
    metrics: "250k+ Consultations Handled",
    image: "/assets/beauty-personal-care-retrotech.webp",
    aspect: "portrait"
  },
  {
    id: "hypergrowth-media",
    title: "PulseWave Media Network",
    client: "PulseWave Entertainment",
    category: "Media & Streaming Infrastructure",
    year: "2024",
    description: "Scalable content management, video distribution network, and creator subscription monetisation platform designed for high-concurrency live audiences.",
    deliverables: ["Low-Latency Video Player", "Subscriber Paywall", "Creator Analytics Portal", "Brand Sponsorship Engine"],
    metrics: "1.8M Monthly Active Viewers",
    image: "/assets/entertainment-retrotech.webp",
    aspect: "landscape"
  },
  {
    id: "apex-fintech-cloud",
    title: "Apex Capital Wealth Vault",
    client: "Apex Global Asset Management",
    category: "Fintech & Enterprise Security",
    year: "2024",
    description: "Bank-grade client portfolio management platform with biometric authentication, instant institutional settlement rails, and automated compliance auditing.",
    deliverables: ["Institutional Portfolio Dashboard", "Real-Time NAV Settlement", "Zero-Knowledge Data Vault", "SOC2 Type II Certified"],
    metrics: "$1.4B+ Assets Managed",
    image: "/assets/software-development-retrotech.jpg",
    aspect: "portrait"
  }
];

export const INDUSTRIES_DATA: IndustryItem[] = [
  {
    id: "ecommerce",
    name: "Ecommerce & Multivendor",
    tagline: "High-Conversion Commerce Architectures",
    description: "Turn casual browsing into high-ticket transactions through custom marketplaces, instant checkout paths, and smart loyalty engines.",
    iconName: "ShoppingCart",
    image: "/assets/ecommerce-retrotech.webp"
  },
  {
    id: "realestate",
    name: "Real Estate & Construction",
    tagline: "Immersive Architectural Portals",
    description: "Bespoke digital showcases, interactive inventory floorplans, automated lead scoring, and dedicated CRM for premier developers.",
    iconName: "Building2",
    image: "/assets/realestate-retrotech.webp"
  },
  {
    id: "manufacturing",
    name: "Manufacturing & Industry",
    tagline: "Digitized Supply & Operations",
    description: "Transform plant-floor operations with live IoT telemetry dashboards, automated vendor portals, and integrated ERP systems.",
    iconName: "Factory",
    image: "/assets/manufacturing-retrotech.webp"
  },
  {
    id: "healthcare",
    name: "Medical & Healthcare",
    tagline: "Compliant Patient Care Ecosystems",
    description: "Secure patient engagement portals, automated appointment engines, telemedicine infrastructure, and strict privacy protocols.",
    iconName: "Stethoscope",
    image: "/assets/beauty-personal-care-retrotech.webp"
  },
  {
    id: "media",
    name: "Media & Entertainment",
    tagline: "High-Concurrency Content Hubs",
    description: "Dynamic video streaming engines, interactive audience portals, multi-tier subscription models, and content management workflows.",
    iconName: "Film",
    image: "/assets/entertainment-retrotech.webp"
  },
  {
    id: "fintech",
    name: "Finance & Professional Services",
    tagline: "Enterprise Security & Precision",
    description: "Bank-grade client onboarding, wealth reporting dashboards, secure document vaults, and stringent regulatory compliance.",
    iconName: "ShieldCheck",
    image: "/assets/software-development-retrotech.jpg"
  }
];

export const PILLARS_DATA = [
  {
    number: "01",
    title: "Experienced IT Professionals",
    desc: "Our senior engineers, UI architects, and growth strategists deliver production-grade code adhering strictly to modern security standards."
  },
  {
    number: "02",
    title: "Always Honest & Transparent",
    desc: "No hidden clauses or inflated claims. You receive direct communication, weekly sprint demos, and unvarnished analytics from day one."
  },
  {
    number: "03",
    title: "Business-First Architecture",
    desc: "We begin by diagnosing your business model, customer touchpoints, and revenue drivers before writing a single line of code."
  },
  {
    number: "04",
    title: "Agile & Rapid Deployment",
    desc: "Iterative two-week sprints ensure swift time-to-market without sacrificing architectural stability or comprehensive test coverage."
  },
  {
    number: "05",
    title: "End-to-End 360° Capability",
    desc: "From initial UI/UX blueprints to full-stack code, cloud infrastructure, SEO dominance, and paid marketing, all under one roof."
  },
  {
    number: "06",
    title: "Dedicated Post-Launch Support",
    desc: "We provide SLA-backed maintenance, proactive server monitoring, security patching, and ongoing performance tuning."
  }
];

export const FAQS_DATA: FAQItem[] = [
  {
    question: "What IT and digital services does RetroTech Digital provide?",
    answer: "RetroTech Digital delivers complete end-to-end IT and marketing solutions including bespoke web development, native and hybrid mobile applications, custom SaaS platforms, CRM and ERPNext integrations, UI/UX design, technical SEO, performance advertising, and round-the-clock managed cloud support."
  },
  {
    question: "Do you build custom solutions or use off-the-shelf templates?",
    answer: "Every digital flagship and application we craft is 100% custom-built to match your unique brand identity, technical requirements, and operational workflows. We avoid generic templates to guarantee optimal performance, security, and scalability."
  },
  {
    question: "How long does it typically take to complete an enterprise project?",
    answer: "Timelines depend on scope and complexity. A bespoke corporate web application typically spans 4 to 8 weeks, while comprehensive mobile apps or enterprise SaaS platforms require 10 to 16 weeks, delivered through structured two-week agile milestones."
  },
  {
    question: "Do you provide dedicated maintenance and support after launch?",
    answer: "Yes, we offer comprehensive SLA-backed post-launch support programs covering automated backups, continuous security updates, infrastructure monitoring, and feature iteration so your software scales effortlessly as your business grows."
  },
  {
    question: "How do we kick off a collaboration with RetroTech Digital?",
    answer: "Simply submit your brief through our consultation form or reach out via WhatsApp (+91-9910836538). Our lead technical consultants will schedule an introductory discovery session within 24 hours to review your requirements and outline a structured project roadmap."
  }
];

export const STATS_DATA = [
  { value: "10+", label: "Years Combined Leadership" },
  { value: "250+", label: "Digital Solutions Delivered" },
  { value: "99.4%", label: "Client Retention Rate" },
  { value: "360°", label: "Full-Cycle Digital Expertise" }
];
