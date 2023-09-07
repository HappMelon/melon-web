import { Explore } from "@/components/search/explore";
import { SignInButton, UserButton, auth } from "@clerk/nextjs";

export default function Header() {
  const { userId } = auth();

  return (
    <main className="flex w-full h-[4.875rem] bg-white px-[2.6875rem] fixed top-0 z-10 box-border">
      <div className="flex w-full justify-start items-center">
        <div className="flex justify-start items-center">
          <img src="/logo.png" alt="Logo" />
          <div className="font-bold text-2xl whitespace-nowrap">Flare Dapp</div>
        </div>
        <Explore />
      </div>
      <div className="flex gap-[1.25rem] items-center">
        {userId ? (
          <div className="mr-[24px]">
            <UserButton />
          </div>
        ) : (
          <SignInButton>
            <div
              className="rounded-[2.5rem] px-[3.125rem] py-[.85rem] text-white cursor-pointer whitespace-nowrap"
              style={{
                background:
                  "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
              }}
            >
              Log In
            </div>
          </SignInButton>
        )}
      </div>
    </main>
  );
}
