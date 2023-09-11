import { TopicsAndAuthors } from "@/components/thread/comment/TopicsAndAuthors";
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div>
      <div className="flex flex-col justify-center items-center rounded-[.9375rem] h-[calc(100vh-6.75rem)]">
        <SignUp redirectUrl={"/sign-in"} />
        <TopicsAndAuthors className="pointer-events-none filter blur-[2px]" />
      </div>
    </div>
  );
}
