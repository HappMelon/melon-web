import { TopicsAndAuthors } from "@/components/thread/comment/TopicsAndAuthors";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center rounded-[.9375rem] h-[calc(100vh-6.75rem)]">
        <TopicsAndAuthors className="pointer-events-none filter blur-[2px] fixed top-[6.75rem] right-[2.6875rem] z-0" />
        <SignUp redirectUrl={"/sign-in"} />
      </div>
    </div>
  );
}
