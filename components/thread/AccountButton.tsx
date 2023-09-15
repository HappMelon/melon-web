import { currentUser } from "@clerk/nextjs";

export default async function AccountButton() {
  const user = await currentUser();
  return (
    <div>
      {user ? (
        <div>{user.imageUrl}</div>
      ) : (
        <div
          className="rounded-[2.5rem] px-[3.125rem] py-[.85rem] text-white cursor-pointer whitespace-nowrap"
          style={{
            background:
              "linear-gradient(100deg, #F9D423 -12.68%, #F83600 147.82%)",
          }}
        >
          Log In
        </div>
      )}
    </div>
  );
}
