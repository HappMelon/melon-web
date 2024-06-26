import Index from "@/components/layouts/AppLayout";
import { ClerkProvider, currentUser } from "@clerk/nextjs";

import { Toaster } from "@/components/ui/toaster";
import "@/styles/index.css";

// https://clerk.com/docs/nextjs/get-started-with-nextjs
export const metadata = {
  title: "Melon",
  description:
    "user curated social platform, your voice, your power | predict to earn.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link rel="icon" href="/favicon.png" sizes="any" />
      <ClerkProvider>
        <html lang="en">
          <body>
            <Index>{children}</Index>
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
