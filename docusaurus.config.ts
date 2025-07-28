import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: "✨ Welcome to MCP Practitioner Guide 📘",
  tagline:
    "Confidently prepare for the MCP exam with our community-powered study hub.",
  favicon: "img/favicon.png",

  // Set the production url of your site here
  url: "https://mcp.practitioner.help/",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "Slash", // Usually your GitHub org/user name.
  projectName: "mcp-practitioner", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  markdown: {
    mermaid: true,
  },

  themes: ["@docusaurus/theme-mermaid"],

  clientModules: [require.resolve("./src/client/vercel-analytics.ts")],

  presets: [
    [
      "@docusaurus/preset-classic",
      {
        docs: {
          sidebarPath: require.resolve("./sidebars.ts"),
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },
        theme: {
          customCss: require.resolve("./src/css/custom.css"),
        },
        sitemap: {
          lastmod: "date",
          changefreq: "weekly",
          priority: 0.5,
          ignorePatterns: ["/tags/**"],
          filename: "sitemap.xml",
          createSitemapItems: async (params) => {
            const { defaultCreateSitemapItems, ...rest } = params;
            const items = await defaultCreateSitemapItems(rest);
            return items.filter((item) => !item.url.includes("/page/"));
          },
        },
        // gtag: {
        //   trackingID: "G-L2NNHVH4G6",
        //   anonymizeIP: true,
        // },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    metadata: [
      {
        name: "description",
        content:
          "A comprehensive, community-powered study hub to help you master the AWS Certified AI Practitioner exam. Access curated resources, quizzes, and guides to boost your cloud AI knowledge.",
      },
      {
        name: "keywords",
        content:
          "aws, ai, artificial intelligence, practitioner, exam, certification, study guide, cloud, machine learning, quiz, resources, aws certification",
      },
      { name: "author", content: "AWS AI Practitioner Community" },
      // Open Graph
      {
        property: "og:title",
        content:
          "Confidently Prepare for the AWS Certified AI Practitioner Exam",
      },
      {
        property: "og:description",
        content:
          "A comprehensive, community-powered study hub to help you master the AWS Certified AI Practitioner exam.",
      },
      { property: "og:type", content: "website" },
      {
        property: "og:url",
        content: "https://genai.practitioner.help",
      },
      { property: "og:image", content: "/img/og-image.png" },
      // Twitter Card
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "twitter:title",
        content:
          "Confidently Prepare for the AWS Certified AI Practitioner Exam",
      },
      {
        name: "twitter:description",
        content:
          "A comprehensive, community-powered study hub to help you master the AWS Certified AI Practitioner exam.",
      },
      { name: "twitter:image", content: "/img/og-image.png" },
      // { name: 'twitter:site', content: '@your_twitter_handle' }, // Uncomment and set if available
    ],
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "MCP Practitioner",
      logo: {
        alt: "MCP Practitioner Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "tutorialSidebar",
          position: "left",
          label: "Tutorial",
        },
        { to: "/quiz", label: "Quiz", position: "left" },
        {
          label: "About Slash",
          to: "/slash",
          position: "right",
        },
        {
          href: "https://github.com/kevinslashdigital/mcp",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Sponsors",
          items: [
            {
              label: "Slash",
              href: "https://slash.co",
            },
            // {
            //   label: "Stack Overflow",
            //   href: "https://stackoverflow.com/questions/tagged/docusaurus",
            // },
            // {
            //   label: "Discord",
            //   href: "https://discordapp.com/invite/docusaurus",
            // },
            // {
            //   label: "X",
            //   href: "https://x.com/docusaurus",
            // },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "Tutorial",
              to: "/docs/intro",
            },
            {
              label: "About Slash",
              to: "/slash",
            },
            {
              label: "GitHub",
              href: "https://github.com/kevinslashdigital/mcp",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} MCP Practitioner Guide Community. Sponsored by Slash.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
    mermaid: {
      theme: { light: "neutral", dark: "dark" },
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
