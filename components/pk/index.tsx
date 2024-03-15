import { CenterContent } from "./centerContent";
import { UserList } from "./userList";

export const PkPage = () => {
  return (
    <div
      className="bg-cover bg-no-repeat rounded-[1.5rem] min-h-[106.25rem]"
      style={{
        backgroundImage: "url('/pk.jpg')",
        backgroundPosition: "top right",
      }}
    >
      <div className="h-[35rem]" />
      <CenterContent />
      <UserList />
    </div>
  );
};
