import Index from "@/components/layouts/AppLayout";
import { ThemeProvider } from "@/components/ui/themeProvider";
import { Toaster } from "@/components/ui/toaster";
import "@/styles/index.css";
import { ClerkProvider, auth } from "@clerk/nextjs";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

// https://clerk.com/docs/nextjs/get-started-with-nextjs
export const metadata = {
  title: "flare",
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
          {/* https://ui.shadcn.com/docs/dark-mode/next */}
          <ThemeProvider attribute="class" defaultTheme="system">
            {userId ? (
              <>
                <Index>{children}</Index>
                <Toaster />
              </>
            ) : (
              <Index>
                <main className="flex items-center justify-center mt-[4rem]">
                  {children}
                </main>
              </Index>
            )}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
