import Index from "@/components/layouts/AppLayout";
import { ClerkProvider } from "@clerk/nextjs";

import "@/styles/index.css";

// https://clerk.com/docs/nextjs/get-started-with-nextjs
export const metadata = {
  title: "Flare Dapp",
  description:
    "user curated social platform, your voice, your power | predict to earn.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          {/* https://ui.shadcn.com/docs/dark-mode/next */}
          <Index>{children}</Index>
        </body>
      </html>
    </ClerkProvider>
  );
}
