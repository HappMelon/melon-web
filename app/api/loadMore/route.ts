import prisma from "@/lib/prisma";

const TAKE_NUMBER = 20;

export async function GET(req: Request) {
  try {
    // get cursor from query
    const url = new URL(req.url);
    const cursor = url.searchParams.get("cursor");
    const q = url.searchParams.get("q");

    if (!cursor) {
      return new Response(JSON.stringify({ error: "No cursor provided" }), {
        status: 403,
      });
    }
    const posts = await prisma.post.findMany({
      take: TAKE_NUMBER + 1,
      skip: 1,
      cursor: {
        id: cursor,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        author: true,
        children: {
          include: {
            author: true,
          },
        },
        parent: true,
        likes: true,
      },
      where: q
        ? {
            parent: null,
            OR: [
              {
                title: {
                  contains: q,
                  mode: "insensitive",
                },
              },
              {
                text: {
                  contains: q,
                  mode: "insensitive",
                },
              },
            ],
          }
        : {
            parent: null,
          },
    });

    if (posts.length == 0) {
      return new Response(
        JSON.stringify({
          data: [],
        }),
        { status: 200 },
      );
    }

    const data = {
      data: posts.slice(0, TAKE_NUMBER),
      hasMore: posts.length === TAKE_NUMBER + 1,
    };

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify(JSON.stringify({ error: error.message })),
      { status: 403 },
    );
  }
}
