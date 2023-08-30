"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Prisma } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Item from ".";

export default function HomePosts({
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
  const [items, setItems] = useState(posts);
  const [noMore, setNoMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const { ref, inView } = useInView();

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
    <div className="ml-[2.5rem] bg-white rounded-[15px] mt-[37px] w-full">
      <Tabs defaultValue="For You">
        <TabsList className="flex gap-1.5rem justify-start">
          <TabsTrigger value="For You">For You</TabsTrigger>
          <TabsTrigger value="Following">Following</TabsTrigger>
          <TabsTrigger value="Politics">Politics</TabsTrigger>
        </TabsList>
        <TabsContent value="For You">
          <div className="grid grid-cols-3 gap-[2.25rem] px-[25px] py-[36px]">
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
          <div className="grid grid-cols-3 gap-[2.25rem] px-[25px] py-[36px]">
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
        <TabsContent value="Politics" className="p-4">
          Politics
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
            No more threads...
          </div>
        ) : null}
      </div>
    </div>
  );
}
