export interface NavSubLink {
  label: string;
  href: string;
  description?: string;
  iconName: string;
}

export interface MegaMenuSection {
  title: string;
  href: string;
  description: string;
  links: NavSubLink[];
}

export interface PlatformOverviewItem {
  title: string;
  href: string;
  description: string;
}

export interface FeaturedServiceCard {
  title: string;
  description: string;
  image: string;
  href: string;
}

export interface IndustryNavItem {
  name: string;
  tagline: string;
  href: string;
  iconName: string;
}

export interface InsightNavItem {
  title: string;
  href: string;
  internalId?: string;
  description: string;
  iconName: string;
}

export const NAVIGATION_DATA = {
  services: {
    marketingPlatform: {
      title: "Marketing Platform",
      href: "https://www.retrotechdigital.com/services/digital-marketing",
      description: "Increase conversions with email, SMS, WhatsApp and marketing automation",
      links: [
        {
          label: "Search Engine Optimization",
          href: "https://www.retrotechdigital.com/services/seo-services",
          iconName: "Search",
          description: "Technical SEO, audits and keyword ranking dominance"
        },
        {
          label: "Social Media Marketing",
          href: "https://www.retrotechdigital.com/services/social-media-marketing",
          iconName: "Share2",
          description: "Audience growth and brand resonance across Meta & LinkedIn"
        },
        {
          label: "Paid Marketing",
          href: "https://www.retrotechdigital.com/services/paid-marketing",
          iconName: "DollarSign",
          description: "High-ROAS Google Ads, Meta campaigns and performance PPC"
        },
        {
          label: "Email Marketing",
          href: "https://www.retrotechdigital.com/services/email-marketing",
          iconName: "Mail",
          description: "Automated drip funnels and retention lifecycle messaging"
        },
        {
          label: "Video Marketing",
          href: "https://www.retrotechdigital.com/services/video-marketing",
          iconName: "Video",
          description: "High-impact brand storytelling and video advertising assets"
        },
        {
          label: "Content Marketing",
          href: "https://www.retrotechdigital.com/services/content-marketing",
          iconName: "FileText",
          description: "Thought-leadership editorial and organic conversion assets"
        },
        {
          label: "ORM Services",
          href: "https://www.retrotechdigital.com/services/orm-services",
          iconName: "ThumbsUp",
          description: "Online reputation management and enterprise sentiment control"
        }
      ]
    },
    techDevelopment: {
      title: "Tech Development",
      href: "https://www.retrotechdigital.com/services",
      description: "Easily manage your pipeline and accelerate revenue growth across the entire sales cycle",
      links: [
        {
          label: "Web Development",
          href: "https://www.retrotechdigital.com/services/web-development",
          iconName: "Code2",
          description: "Custom high-speed digital flagships & web applications"
        },
        {
          label: "Mobile App Development",
          href: "https://www.retrotechdigital.com/services/mobile-app-development",
          iconName: "Smartphone",
          description: "Native & cross-platform iOS & Android engineering"
        },
        {
          label: "Custom Application",
          href: "https://www.retrotechdigital.com/services/custom-application",
          iconName: "Cpu",
          description: "Bespoke business automation software & workflows"
        },
        {
          label: "Salesforce & ERPNext Services",
          href: "https://www.retrotechdigital.com/services/crm-development",
          iconName: "Layers",
          description: "Enterprise CRM customization and operational pipeline sync"
        },
        {
          label: "SaaS Application",
          href: "https://www.retrotechdigital.com/services/saas-application",
          iconName: "Cloud",
          description: "Scalable multi-tenant cloud architectures & SaaS portals"
        },
        {
          label: "API Development",
          href: "https://www.retrotechdigital.com/services/api-development",
          iconName: "Workflow",
          description: "Secure RESTful & GraphQL enterprise integrations"
        },
        {
          label: "Software Development",
          href: "https://www.retrotechdigital.com/services/software-development",
          iconName: "MonitorCheck",
          description: "End-to-end full-stack software lifecycle engineering"
        },
        {
          label: "WhatsApp Integration",
          href: "https://www.retrotechdigital.com/services/software-development",
          iconName: "MessageSquare",
          description: "Official WhatsApp Business API bots and messaging automations"
        }
      ]
    },
    platformSolutions: [
      {
        title: "Our Platform",
        href: "https://www.retrotechdigital.com",
        description: "Create a loyalty program tailored to your business with our intuitive, all-in-one platform"
      },
      {
        title: "Tech Exploration",
        href: "https://www.retrotechdigital.com/services/seo-services",
        description: "Manage your customer relationships efficiently with smart automation tools"
      },
      {
        title: "Tech Solutions",
        href: "https://www.retrotechdigital.com/who-we-serve",
        description: "Streamline campaigns and engage customers effectively with automated tools"
      }
    ] as PlatformOverviewItem[],
    featuredCards: [
      {
        title: "IT Support",
        description: "Reliable technical support to resolve hardware, software, network, and system issues, ensuring your business operates without interruption.",
        image: "/assets/industry-custom-hd.jpg",
        href: "#services"
      },
      {
        title: "IT Services",
        description: "End-to-end IT solutions including infrastructure management, cloud services, cybersecurity, system integration, and ongoing maintenance.",
        image: "/assets/it-services-nav.png",
        href: "#services"
      },
      {
        title: "Digital Marketing Services",
        description: "Grow your online presence with SEO, social media marketing, PPC advertising, content creation, and data-driven digital marketing strategies.",
        image: "/assets/marketing-nav.png",
        href: "#services"
      }
    ] as FeaturedServiceCard[]
  },

  industries: {
    column1: [
      {
        name: "Ecommerce & Multivendor",
        tagline: "Send bulk email campaigns",
        href: "https://www.retrotechdigital.com/who-we-serve/ecommerce-multivendor",
        iconName: "ShoppingCart"
      },
      {
        name: "Real Estate & Construction",
        tagline: "Instant customer messaging",
        href: "https://www.retrotechdigital.com/who-we-serve/real-estate-and-construction",
        iconName: "Building2"
      },
      {
        name: "Manufacturing",
        tagline: "Manage digital payments",
        href: "https://www.retrotechdigital.com/who-we-serve/manufacturing",
        iconName: "Factory"
      },
      {
        name: "Media & Entertainment",
        tagline: "Engage your audience",
        href: "https://www.retrotechdigital.com/who-we-serve/media-and-entertainment",
        iconName: "Film"
      },
      {
        name: "Medical & Healthcare",
        tagline: "Send bulk email campaigns",
        href: "https://www.retrotechdigital.com/who-we-serve/medical-and-healthcare",
        iconName: "Activity"
      },
      {
        name: "Personal Beauty Care",
        tagline: "Instant customer messaging",
        href: "https://www.retrotechdigital.com/who-we-serve/personal-beauty-care",
        iconName: "Sparkles"
      }
    ] as IndustryNavItem[],
    column2: [
      {
        name: "EdTech & E-Learning",
        tagline: "Send bulk email campaigns",
        href: "https://www.retrotechdigital.com/who-we-serve/edtech-and-e-learning",
        iconName: "GraduationCap"
      },
      {
        name: "Travel & Hospitality",
        tagline: "Instant customer messaging",
        href: "https://www.retrotechdigital.com/who-we-serve/travel-and-hospitality",
        iconName: "Plane"
      },
      {
        name: "Transportation & Logistics",
        tagline: "Manage digital payments",
        href: "https://www.retrotechdigital.com/who-we-serve/transportation-and-logistics",
        iconName: "Truck"
      },
      {
        name: "Oil and Gas",
        tagline: "Manage digital payments",
        href: "https://www.retrotechdigital.com/who-we-serve/oil-and-gas",
        iconName: "Flame"
      },
      {
        name: "Finance & Insurance",
        tagline: "Manage digital payments",
        href: "https://www.retrotechdigital.com/who-we-serve/finance-and-insurance",
        iconName: "ShieldCheck"
      },
      {
        name: "Other Industries",
        tagline: "Manage digital payments",
        href: "https://www.retrotechdigital.com/who-we-serve/other-industries",
        iconName: "Layers"
      }
    ] as IndustryNavItem[],
    platformSolutions: [
      {
        title: "Our Platform",
        href: "https://www.retrotechdigital.com",
        description: "Create a loyalty program tailored to your business with our intuitive, all-in-one platform"
      },
      {
        title: "Tech Exploration",
        href: "https://www.retrotechdigital.com/services/seo-services",
        description: "Manage your customer relationships efficiently with smart automation tools"
      },
      {
        title: "Tech Solutions",
        href: "https://www.retrotechdigital.com/who-we-serve",
        description: "Streamline campaigns and engage customers effectively with automated tools"
      }
    ] as PlatformOverviewItem[]
  },

  insight: [
    {
      title: "About Us",
      href: "https://www.retrotechdigital.com/about-us",
      internalId: "about",
      description: "Leadership team, core mission, and engineering philosophy",
      iconName: "Users"
    },
    {
      title: "Blogs",
      href: "https://www.retrotechdigital.com/blog",
      description: "Insights, industry trends, and tech deep dives",
      iconName: "BookOpen"
    },
    {
      title: "Careers",
      href: "https://www.retrotechdigital.com/careers",
      description: "Explore open engineering, design, and growth roles",
      iconName: "Briefcase"
    },
    {
      title: "FAQs",
      href: "https://www.retrotechdigital.com/faqs",
      internalId: "faq",
      description: "Common questions regarding project scopes, stacks, and pricing",
      iconName: "HelpCircle"
    }
  ] as InsightNavItem[]
};
