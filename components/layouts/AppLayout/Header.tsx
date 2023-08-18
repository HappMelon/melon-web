import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "@/components/ui/modeToggle";
import { UserButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <main className="flex flex-row w-full h-[10rem] justify-between items-center">
      <div className="flex gap-[1.5rem] items-center w-full mr-[10rem]">
        <Input placeholder="Search topics, news" />
        <Button>Search</Button>
      </div>
      <div className="flex gap-[1.25rem] items-center">
        <ModeToggle></ModeToggle>
        <UserButton></UserButton>
      </div>
    </main>
  );
}
