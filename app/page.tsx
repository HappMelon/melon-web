import Explore from "@/app/explore/page";

// https://nextjs.org/docs/pages/building-your-application/rendering/incremental-static-regeneration
export const revalidate = 1;

export default async function Page() {
  return <Explore searchParams={{}}></Explore>;
}
