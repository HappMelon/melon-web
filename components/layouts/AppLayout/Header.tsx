import { Explore } from "@/components/search/explore";
import { ModeToggle } from "@/components/ui/modeToggle";
import { SignUpButton, UserButton, auth } from "@clerk/nextjs";

export default function Header() {
  const { userId } = auth();
  return (
    <main className="flex flex-row w-full h-[10rem] justify-between items-center mt-[4rem] box-border">
      <div className="flex gap-[1.5rem] items-center w-full mr-[10rem]">
        <Explore />
      </div>
      <div className="flex gap-[1.25rem] items-center">
        <ModeToggle></ModeToggle>
        {userId ? <UserButton /> : <SignUpButton />}
      </div>
    </main>
  );
}
