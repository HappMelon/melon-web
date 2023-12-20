import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { TribePostCard } from "@/components/mill/mill-detail/comp/tribe-post-card";
import Image from "next/image";
import { Prisma } from "@prisma/client";

export function TribeTabs({
  mill,
}: {
  mill: Prisma.MillGetPayload<{
    include: {
      posts: {
        take: 100;
        include: {
          author: {
            select: {
              id: true;
              username: true;
              image: true;
            };
          };
        };
      };
      _count: {
        select: {
          posts: true;
          subscribers: true;
        };
      };
    };
  }>;
}) {
  return (
    <div className="flex-1 overflow-y-scroll pr-2">
      <Tabs defaultValue="most">
        <div className="flex items-center justify-between">
          <TabsList className="flex justify-start gap-[1.5rem] bg-white">
            <TabsTrigger value="most" className="!bg-[#F8F8F8] rounded-md">
              Most Popular
            </TabsTrigger>
            <TabsTrigger value="most" className="!bg-[#F8F8F8] rounded-md">
              Nearby
            </TabsTrigger>
          </TabsList>
        </div>
        {!mill.posts.length && (
          <div className="flex flex-col w-full items-center pb-10 text-[#9B9B9B] text-sm justify-center">
            <img
              className="w-[16.4375rem] mx-auto h-[16.4375rem]"
              src="/OBJECT.svg"
              alt=""
            />
            <div>{`Looks like there isn't any posts ~`}</div>
          </div>
        )}
        <Link
          href={`/post?millId=${mill.id}`}
          className={`${
            mill.posts.length ? "" : "max-w-[300px]"
          } flex my-4 py-[.5rem] justify-start pl-5 rounded-[2.5rem] cursor-pointer mx-auto`}
          style={{
            background:
              "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
          }}
        >
          <div className="w-[1.1912rem] h-[1.5883rem] relative">
            <Image
              fill
              src="/🦆 icon _dashboard customize_.svg"
              alt=""
              className="w-[1.1912rem] h-[1.5883rem]"
            />
          </div>

          <div className="text-xl font-[550] text-white ml-[1rem]">Post</div>
        </Link>
        <div className="w-full">
          <TabsContent value="most" className="flex flex-col gap-4">
            {mill.posts.map((i) => (
              <div key={i.id}>
                <TribePostCard data={i} />
              </div>
            ))}
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
