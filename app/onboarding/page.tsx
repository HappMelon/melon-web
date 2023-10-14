import { auth, currentUser } from "@clerk/nextjs";
import prisma from "@/lib/prisma";

import { Screens } from "@/components/onboarding";
import { redirect } from "next/navigation";

export const revalidate = 0;

export default async function OnboardingLayout() {
  const user = await currentUser();

  if (!user) {
    redirect("/sign-up");
  }

  const getUser = await prisma.user.findUnique({
    where: {
      id: user.id,
    },
  });

  if (getUser?.onboarded) {
    redirect("/");
  }

  let emailPrefix = "";
  try {
    const emailAddr = user.emailAddresses.length
      ? user.emailAddresses[0].emailAddress
      : "";
    emailPrefix = emailAddr.split("@")[0];
  } catch {}

  const userData = {
    id: user.id,
    username: getUser ? getUser.username : user.id.slice(5),
    name: getUser ? getUser.name : user.firstName ?? "",
    bio: getUser ? getUser.bio : "",
    image: getUser ? getUser.image : user.imageUrl,
    emailPrefix,
  };

  const allUsernames = await prisma.user.findMany({
    select: {
      username: true,
    },
  });

  return (
    <div className="pl-[2.5rem]">
      {user ? (
        <Screens allUsernames={allUsernames} userData={userData} />
      ) : null}
    </div>
  );
}
