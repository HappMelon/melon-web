import { SignInButton, UserButton, auth } from "@clerk/nextjs";

export default function AccountButton() {
  const user = auth();
  return (
    <>
      {user ? (
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
    </>
  );
}
