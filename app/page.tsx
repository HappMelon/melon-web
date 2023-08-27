import Explore from "@/app/explore/page";

export const revalidate = 0;

export default async function Page() {
  return (
    <>
      <Explore searchParams={{}} />
    </>
  );
}
