import { TopicsAndAuthors } from "@/components/thread/comment/TopicsAndAuthors";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center rounded-[.9375rem] h-[calc(100vh-6.75rem)]">
        <SignIn redirectUrl={"/explore"} />
        <TopicsAndAuthors className="pointer-events-none filter blur-[2px]" />
      </div>
    </div>
  );
}
