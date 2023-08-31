import Q from "@/components/post/Q";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import "react-quill/dist/quill.snow.css";

// eslint-disable-next-line @next/next/no-async-client-component
export default async function Page() {
  const user = await currentUser();

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
      create={{
        id: getUser!.id,
        name: getUser!.name,
        image: getUser!.image,
      }}
    />
  );
}
