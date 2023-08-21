import Image from "next/image";
import Link from "next/link";

import Explore from "@/app/explore/page";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";

import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function Page() {
  const user = await currentUser();

  if (!user)
    return (
      <div className="w-screen h-screen flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center w-[400px] h-auto mt-0 mr-auto mb-0 ml-auto border border-#000 p-4 rounded-[4px]">
          <div className="h-16 w-16 bg-cover">
            <Image
              src={logo}
              alt="Threads logo"
              className="min-h-full min-w-full object-cover"
            />
          </div>
          <div className="gradient mt-4 mb-12 text-4xl font-bold">
            flare-dapp.io
          </div>

          <Link href="/sign-up" className="w-full px-6">
            <Button className="w-full" variant="outline">
              Create Your Account
            </Button>
          </Link>
          <Link href="/sign-in" className="w-full px-6 mt-2">
            <Button className="w-full" variant="ghost">
              Sign In
            </Button>
          </Link>
        </div>
      </div>
    );

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

  const posts = await prisma.post.findMany({
    take: 20,
    orderBy: {
      createdAt: "desc",
    },
    include: {
      author: true,
      children: {
        include: {
          author: true,
        },
      },
      parent: true,
      likes: true,
    },
    where: {
      parent: null,
    },
  });

  return (
    <>
      <Explore searchParams={{}} />
    </>
  );
}
