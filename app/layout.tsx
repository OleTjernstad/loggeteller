import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Loggeteller",
  description: "Geocaching log counter and point calculator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex">
          <div className="flex-1 items-center">
            <nav className="p-5 print:hidden">
              <div className="flex w-full">
                <a
                  href="/caches"
                  className="flex-1 bg-blue-500 text-white p-2 text-center hover:bg-blue-600"
                >
                  Legg til cacher
                </a>
                <a
                  href="/logs"
                  className="flex-1 bg-blue-500 text-white p-2 text-center hover:bg-blue-600"
                >
                  Legg til logger
                </a>
                <a
                  href="/results"
                  className="flex-1 bg-blue-500 text-white p-2 text-center hover:bg-blue-600"
                >
                  Se resultater
                </a>
              </div>
            </nav>
            <main className="mt-5">{children}</main>
          </div>
        </div>
      </body>
    </html>
  );
}
