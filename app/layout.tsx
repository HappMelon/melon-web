import Index from "@/components/layouts/AppLayout";
import { ClerkProvider } from "@clerk/nextjs";

import "@/styles/index.css";

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
        <body>
          {/* https://ui.shadcn.com/docs/dark-mode/next */}
          <Index>{children}</Index>
        </body>
      </html>
    </ClerkProvider>
  );
}
