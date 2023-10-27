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
  const user = await currentUser();
  const getUser = user?.id
    ? await prisma?.user.findUnique({
        where: {
          id: user?.id,
        },
      })
    : null;

  return (
    <>
      <link rel="icon" href="/favicon.png" sizes="any" />
      <ClerkProvider>
        <html lang="en">
          <body>
            {/* https://ui.shadcn.com/docs/dark-mode/next */}
            <Index image={getUser?.image}>{children}</Index>
            <Toaster />
          </body>
        </html>
      </ClerkProvider>
    </>
  );
}
