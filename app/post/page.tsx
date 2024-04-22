import Q from "@/components/post/Q";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect, useSearchParams } from "next/navigation";
import "react-quill/dist/quill.snow.css";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Page({
  searchParams,
}: {
  searchParams: { millId: string; activityId: string };
}) {
  const user = await currentUser();
  console.log(searchParams);
  const mill = searchParams.millId
    ? await prisma.mill.findUnique({
        where: {
          id: searchParams.millId,
        },
      })
    : null;
  const activity = searchParams.activityId
    ? await prisma.popular.findUnique({
        where: {
          id: searchParams.activityId,
        },
      })
    : null;

  const getUser = await prisma.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (!getUser?.onboarded) {
    redirect("/onboarding");
  }

  return (
    <Q
      mill={mill || activity}
      create={{
        id: getUser!.id,
        name: getUser!.name,
        image: getUser!.image,
      }}
    />
  );
}
