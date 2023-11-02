import { TopicsAndAuthors } from "@/components/thread/comment/TopicsAndAuthors";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="absolute left-0 top-0 w-screen h-screen pt-20">
      <div className="flex flex-col justify-center items-center rounded-[.9375rem] h-[calc(100vh-6.75rem)]">
        <TopicsAndAuthors className="!w-[22rem] pointer-events-none filter blur-[2px] fixed top-[6.75rem] right-[2.6875rem] z-0" />
        <SignIn redirectUrl={"/explore"} />
      </div>
    </div>
  );
}
