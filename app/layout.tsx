import Index from "@/components/layouts/AppLayout";
import { Toaster } from "@/components/ui/toaster";
import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "@/styles/index.css";

const inter = Inter({ subsets: ["latin"] });

// https://clerk.com/docs/nextjs/get-started-with-nextjs
export const metadata = {
  title: "Flare Dapp",
  description:
    "User curated social platform, Your voice, your power | Predict to Earn.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          {/* https://ui.shadcn.com/docs/dark-mode/next */}
          <Index>{children}</Index>
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
