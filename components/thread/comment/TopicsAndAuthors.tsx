import HotTopics from "@/components/thread/comment/HotTopics";
import PopularAuthors from "@/components/thread/comment/PopularAuthors";
import { cn } from "@/lib/utils";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export async function TopicsAndAuthors({ className }: SidebarProps) {
  let cl = `w-[21.875rem] ml-[1.875rem]`;
  return (
    <div className={cn(className, cl)}>
      <HotTopics></HotTopics>
      <PopularAuthors></PopularAuthors>
    </div>
  );
}
