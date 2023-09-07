import TrendNote from "@/components/thread/trendNote";
import { Prisma } from "@prisma/client";

export default function NoLoginTrade({
  posts,
}: {
  posts: Prisma.PostGetPayload<{
    include: {
      author: true;
      children: {
        include: {
          author: true;
        };
      };
      parent: true;
      likes: true;
    };
  }>[];
}) {
  return <TrendNote posts={posts}></TrendNote>;
}
