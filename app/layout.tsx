import { Inter } from "next/font/google";
import "./globals.css";

import { ClerkProvider, auth } from "@clerk/nextjs";

import { ThemeProvider } from "@/components/ui/themeProvider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Flare-dapp.io",
  description:
    "User curated social platform, Your voice, your power | Predict to Earn.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="dark">
            {userId ? (
              <>
                <main className="w-screen flex">
                  <div className="min-h-screen text-base w-full max-w-[500px] relative pb-14">
                    {children}
                  </div>
                </main>
                <Toaster />
              </>
            ) : (
              <main className="w-screen flex">
                <div className="min-h-screen flex flex-col items-center text-base w-full max-w-[500px] relative">
                  {children}
                </div>
              </main>
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
