import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutoLinkHeadings from "rehype-autolink-headings";
import TestLayout from "../Layouts/TestLayout";
import i18next from "i18next";
import remarkGfm from "remark-gfm";
import { useTranslation } from "react-i18next";


const Explore = () => {
  const [markdownContent, setMarkdownContent] = useState("");
  const [headings, setHeadings] = useState([]);

  const { t } = useTranslation("explore");


  useEffect(() => {
    const language = i18next.language;
    const markdownFile = language === "fa" ? "/docs/explore_fa.md" : "/docs/explore_en.md";

    fetch(markdownFile)
      .then((response) => response.text())
      .then((text) => {
        setMarkdownContent(text);

        // Extract headings from the markdown content
        const headingMatches = text.match(/^(#{1,2})\s+(.*)$/gm);
        if (headingMatches) {
          const extractedHeadings = headingMatches.map((heading) => {
            const level = heading.startsWith("##") ? 2 : 1; // Determine if it's h1 or h2
            const text = heading.replace(/^#{1,2}\s+/, "").trim(); // Remove markdown syntax (## or #)
            const slug = text.toLowerCase().replace(/\s+/g, "-"); // Convert text to slug for anchors
            return { text, level, slug };
          });
          setHeadings(extractedHeadings);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <TestLayout>
      <div
        className={`explore-page flex bg-white shadow-lg p-5 rounded-lg ${
          i18next.dir() === "rtl" ? "text-right" : "text-left"
        }`}
        style={{ direction: i18next.dir() }}
      >
        {/* Sidebar for Table of Contents */}
        <aside
          className={`w-1/4 p-3 border-r ${
            i18next.dir() === "rtl" ? "order-last text-right" : "text-left"
          }`}
        >
          <h3 className="font-semibold mb-2">{t("tableOfContent")}</h3>
          <ul className="list-none">
            {headings.map((heading, index) => (
              <li key={index} className={`mb-2 ml-${heading.level === 2 ? 4 : 0}`}>
                <a
                  href={`#${heading.slug}`}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main Content Area */}
        <main className="markdown-content text-gray-900 w-3/4 pl-5">
          <ReactMarkdown
            children={markdownContent}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug, rehypeAutoLinkHeadings]} // Automatically adds IDs to headings
            components={{
              h1: ({ node, ...props }) => <h1 className="text-3xl font-bold mb-4" {...props} />,
              h2: ({ node, ...props }) => <h2 className="text-2xl font-semibold mb-3 mt-4" {...props} />,
              p: ({ node, ...props }) => <p className="text-lg leading-relaxed mb-2" {...props} />,
              ul: ({ node, ...props }) => <ul className="list-disc list-inside mb-4" {...props} />,
              ol: ({ node, ...props }) => <ol className="list-decimal list-inside mb-4" {...props} />,
              blockquote: ({ node, ...props }) => (
                <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-600 mb-4" {...props} />
              ),
              code: ({ node, inline, className, children, ...props }) => (
                <code className={`bg-gray-100 text-red-500 rounded-md p-1 ${className}`} {...props}>
                  {children}
                </code>
              ),
            }}
          />
        </main>
      </div>
    </TestLayout>
  );
};

export default Explore;
