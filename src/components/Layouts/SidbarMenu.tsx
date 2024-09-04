import { BiCategory, BiDownvote } from "react-icons/bi";

type PropsType = {
  onClick: () => void;
  active: boolean;
};

function SidbarMenu({ onClick, active }: PropsType) {
  return (
    <>
      <div
        onClick={onClick}
        id="btn-menu"
        className={`w-14 h-14 lg:hidden z-50 rounded-full ${
          active
            ? "bg-pink-500 hover:bg-pink-600"
            : "bg-purple-500 hover:bg-purple-600 "
        } hover:scale-105 transition-all shadow-md absolute bottom-12 right-8 cursor-pointer`}
      >
        <div className="w-full h-full flex justify-center items-center text-white rounded-full">
          {active ? <BiDownvote /> : <BiCategory />}
        </div>
      </div>

      <div id="sidebarMenu w-[80%] h-[70%] bg-purple-500"></div>
    </>
  );
}

export default SidbarMenu;
