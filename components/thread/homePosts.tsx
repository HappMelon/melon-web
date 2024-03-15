"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Prisma } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import Item from ".";
import { useRouter } from "next/navigation";

export default function HomePosts({
  posts,
  follows,
  column = 3,
  searchQuery = "",
}: {
  column?: number;
  searchQuery?: string;
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
  const [noMore, setNoMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const router = useRouter();

  useEffect(() => {
    setNoMore(false);
    setItems(posts);
  }, [posts]);

  // loading more
  useEffect(() => {
    const loadMore = async () => {
      const morePosts = await fetch(
        `/api/loadMore?cursor=${items[items.length - 1].id}&q=${searchQuery}`,
        {
          method: "GET",
        },
      ).then((res) => res.json());
      setNoMore(!morePosts.hasMore);
      setItems([...items, ...morePosts.data]);
      setLoading(false);
    };

    if (inView && !noMore && !loading) {
      setLoading(true);
      loadMore();
      console.log("LOADING MORE");
    }
  }, [inView, items, loading, noMore, searchQuery]);

  useEffect(() => {
    setItems(posts);
  }, [posts]);

  // loadMore

  const toPk = () => {
    router.push("/pk");
  };
  return (
    <div className="rounded-[15px] w-full">
      <div
        className={`grid grid-cols-${column} gap-[2.25rem] rounded-[15px] pt-10 px-[25px] bg-white`}
      >
        <div
          onClick={toPk}
          className="bg-[#2AC984] px-[1rem] py-[1.25rem] rounded-xl min-w-[13rem] cursor-pointer"
        >
          {/* <div className="bg-[#F4F4F4] px-[1rem] py-[1.25rem] rounded-xl min-w-[13rem] h-full"></div> */}
        </div>
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
    </div>
  );
}
