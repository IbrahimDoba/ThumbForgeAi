import { SidebarNavItem, SiteConfig } from "types";
import { env } from "@/env.mjs";

const site_url = env.NEXT_PUBLIC_APP_URL;

export const siteConfig: SiteConfig = {
  name: "ThumbForgeAi",
  description:
    "Elevate your content with AI-generated thumbnails. ThumbForgeAi offers customizable, high-quality thumbnails tailored to your unique brand needs.",
  url: site_url,
  ogImage: `${site_url}/_static/og.jpg`,
  links: {
    twitter: "https://x.com/DobaIbrahim",
    github: "https://github.com/IbrahimDoba/ThumbForgeAi", 
  },
  mailSupport: "support@thumbforgeai.com",
};

export const footerLinks: SidebarNavItem[] = [
  {
    title: "Company",
    items: [
      // { title: "About", href: "/about" },
      { title: "Terms", href: "/terms" },
      { title: "Privacy", href: "/privacy" },
    ],
  },
  {
    title: "Product",
    items: [
      { title: "Features", href: "/features" },
      { title: "Customization", href: "/customization" },
      // { title: "Customers", href: "/customers" },
      { title: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Resources",
    items: [
      { title: "Community", href: "/community" },
      { title: "Blog", href: "/blog" },
      { title: "Contact Support", href: "/support" },
    ],
  },
];
