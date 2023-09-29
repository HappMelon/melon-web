import ComingSoon from "@/components/common/comingSoon";
import { TopicsAndAuthors } from "@/components/thread/comment/TopicsAndAuthors";

export default function Page() {
  return (
    <div className="flex w-full box-border pl-[1.875rem]">
      <ComingSoon />
      <TopicsAndAuthors />
    </div>
  );
}
