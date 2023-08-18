import Header from "./Header";
import { Sidebar } from "./Nav";

export default function Index() {
  return (
    <div className="flex">
      <Sidebar className="h-full w-auto" />
      <Header />
    </div>
  );
}
