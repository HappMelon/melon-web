"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Prisma } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Item from ".";

export default function HomePosts({
  posts,
  follows,
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
  follows: Prisma.PostGetPayload<{
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
  const [items, setItems] = useState(posts);
  const [follow, setFollow] = useState(follows);
  const [noMore, setNoMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();

  // loading more
  useEffect(() => {
    if (inView && !noMore) {
      setLoading(true);
      loadMore();
      console.log("LOADING MORE");
    }
  }, [inView, noMore]);

  useEffect(() => {
    setItems(posts);
  }, [posts]);

  // loadMore
  const loadMore = async () => {
    const morePosts = await fetch(
      `/api/loadMore?cursor=${items[items.length - 1].id}`,
      {
        method: "GET",
      },
    ).then((res) => res.json());

    if (morePosts.data.length === 0) {
      setNoMore(true);
    }

    setItems([...items, ...morePosts.data]);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-[15px] w-full h-full pb-10 overflow-auto">
      <Tabs defaultValue="For You">
        <TabsContent value="For You">
          <div className="grid grid-cols-3 gap-[2.25rem] px-[25px]">
            {items.map((item, i) => {
              if (i === items.length - 1)
                return (
                  <div key={item.id} ref={ref}>
                    <Item posts={items} data={item} />
                  </div>
                );
              return (
                <div key={item.id}>
                  <Item posts={items} data={item} />
                </div>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="Following">
          <div className="grid grid-cols-3 gap-[2.25rem] px-[25px]">
            {follow.map((item, i) => {
              if (i === items.length - 1)
                return (
                  <div key={item.id} ref={ref}>
                    <Item posts={items} data={item} />
                  </div>
                );
              return (
                <div key={item.id}>
                  <Item posts={items} data={item} />
                </div>
              );
            })}
          </div>
        </TabsContent>
        <TabsContent value="Politics" className="text-center">
          Politics coming soon.
        </TabsContent>
      </Tabs>

      <div className="w-full py-4 flex justify-center">
        {items.length === 0 ? (
          <div className="text-neutral-600 mt-4 text-center leading-loose">
            Looks like there isn’t any posts <br />
            from your following users ~
          </div>
        ) : null}
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin text-neutral-600" />
        ) : null}
        {noMore ? (
          <div className="text-neutral-600 mt-4 text-center leading-loose">
            {/* Politics coming soon. */}
          </div>
        ) : null}
      </div>
    </div>
  );
}
