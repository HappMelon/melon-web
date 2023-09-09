import { usePathname } from "next/navigation";

import { useState } from "react";

import HotTopics from "@/components/thread/comment/HotTopics";
import PopularAuthors from "@/components/thread/comment/PopularAuthors";

export async function TopicsAndAuthors() {
  // const pathname = usePathname();
  // const blur = pathname === '/sign-in' || pathname === '/sign-up';
  // const [popularAuthors, setPopularAuthors] = useState([]);

  return (
    <div className={`w-[21.875rem] fixed top-[6.75rem] right-[2.6875rem]`}>
      <HotTopics></HotTopics>
      <PopularAuthors></PopularAuthors>
    </div>
  );
}
