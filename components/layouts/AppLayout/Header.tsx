import { Explore } from "@/components/search/explore";
import { SignInButton, UserButton, auth } from "@clerk/nextjs";

export default function Header() {
  const { userId } = auth();

  if (!userId) return null;

  return (
    <main className="flex flex-row w-full justify-between items-center mt-[2.5rem] box-borde pt-[13px] pb-[17px] pl-[41px] bg-white rounded-[15px] border-#eaeaea ml-[2.5rem]">
      <div className="flex gap-[1.5rem] items-center w-full mr-[10rem]">
        <Explore />
      </div>
      <div className="flex gap-[1.25rem] items-center">
        {userId ? (
          <div className="mr-[24px]">
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <div className="cursor-pointer bg-gradient-to-r from-#F9D423-500 to-#F83600-500">
              Sign In
            </div>
          </SignInButton>
        )}
      </div>
    </main>
  );
}
