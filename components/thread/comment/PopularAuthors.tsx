import prisma from "@/lib/prisma";

export default async function PopularAuthors() {
  const foo = await prisma.user.findMany({
    take: 10,
    orderBy: {
      followedBy: {
        _count: "desc",
      },
    },
    include: {
      followedBy: true,
    },
  });
  console.log("foo", foo);
  return (
    <div className="w-[21.875rem] h-[13.875rem] mt-[1.875rem] bg-white rounded-[.625rem]">
      <div className="flex items-center pt-[1.875rem] pl-[1.75rem]">
        <div className="text-lg font-bold">Popular Authors</div>
        <img src="/🦆 icon _arrow back_.svg" alt="" className="pl-[.375rem]" />
      </div>
      <div className="ml-[20px]">
        {foo.map((user) => (
          <div key={user.id} className="flex items-center mt-1 gap-1">
            <img src={user.image} alt={user.username} className="w-8 h-8" />
            <h3>{user.name}</h3>
            <h3>{user.username}</h3>
            <p>{user.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
