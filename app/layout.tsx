import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./_css/globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Todo App",
  description: "Basic Todo app created using Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/todos">Todos</Link>
          </nav>
          {children}
        </main>
      </body>
    </html>
  );
}
