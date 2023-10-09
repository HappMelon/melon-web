"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Item from "@/components/thread";
import { Prisma } from "@prisma/client";

export function Content({
  posts,
  likePosts,
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
  likePosts: Prisma.PostGetPayload<{
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
  return (
    <div className="grow">
      <Tabs defaultValue="Posts">
        <TabsList className="flex justify-start gap-[1.5rem] mb-[1.875rem] mt-[1.0625rem] ml-[1.9375rem] bg-white">
          <TabsTrigger value="Posts" className="!bg-[#F8F8F8]">
            Posts
          </TabsTrigger>
          <TabsTrigger value="Likes" className="!bg-[#F8F8F8]">
            Likes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Posts">
          <div className="grid grid-cols-3 gap-[2.25rem] px-[25px]">
            {posts.length === 0 ? (
              <div className="text-neutral-600 mt-4 text-center leading-loose">
                No threads posted yet.
              </div>
            ) : (
              posts.map((post) => <Item data={post} key={post.id} />)
            )}
          </div>
        </TabsContent>
        <TabsContent value="Likes">
          <div className="grid grid-cols-3 gap-[2.25rem] px-[25px]">
            {likePosts.length === 0 ? (
              <div className="text-neutral-600 mt-4 text-center leading-loose">
                No likes yet.
              </div>
            ) : (
              likePosts.map((post) => <Item data={post} key={post.id} />)
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
