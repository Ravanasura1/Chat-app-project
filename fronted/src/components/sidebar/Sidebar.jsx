import Conversations from "./Conversations";
import LogoutButton from "./LogoutButton";
import SearchInput from "./SearchInput";

function Sidebar() {
  return (
    <div className="flex flex-col border-r border-slate-500 p-4">
      <SearchInput />
      <div className=" divider p-3"></div>
      <Conversations />
      <LogoutButton />
    </div>
  );
}

export default Sidebar;
