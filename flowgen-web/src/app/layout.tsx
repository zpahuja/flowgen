import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Usher",
  description:
    "Usher is a general AI agent to build bespoke AI agents that bridge reasoning and actions: it doesn't just think, it delivers results — getting everything done while you rest.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body className="bg-body flex min-h-screen min-w-screen">{children}</body>
    </html>
  );
}
