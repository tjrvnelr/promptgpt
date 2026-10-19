import type { Metadata } from "next";
import "./globals.css";

const themeScript = `try {
  const saved = localStorage.getItem("prompt-library-theme");
  const dark = saved === "dark" || (!saved && window.matchMedia("(prefers-color-scheme: dark)").matches);
  document.documentElement.dataset.theme = dark ? "dark" : "light";
} catch {}
`;

export const metadata: Metadata = {
  title: "Prompt Library — thoughtful prompts, ready to use",
  description:
    "Browse a practical library of copy-ready AI prompts for school, work, research, writing, and everyday tasks.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-theme="light" lang="en" suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {children}
      </body>
    </html>
  );
}
