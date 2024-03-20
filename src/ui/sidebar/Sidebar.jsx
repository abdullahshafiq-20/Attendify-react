import {
  ChevronFirst,
  ChevronLast,
  Construction,
  MoreVertical,
} from "lucide-react";
import { createContext, useContext, useState, useEffect } from "react";
import { FiLogOut } from "react-icons/fi";
import { Link as RouterLink, useParams } from "react-router-dom";

const SidebarContext = createContext();

export default function Sidebar({ children, user }) {
  const [expanded, setExpanded] = useState(true);

  const removeLocalStorage = () => {
    window.localStorage.removeItem("uid");
    window.localStorage.removeItem("user");
  };

  return (
    <>
      <aside className="h-screen">
        <nav className="h-full flex flex-col bg-bgcolor border-r border-borderColr shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src=""
              className={`overflow-hidden transition-all ${
                expanded ? "w-32" : "w-0"
              }`}
            />
            <button
              onClick={() => setExpanded((curr) => !curr)}
              className="p-1.5 rounded-lg  hover:bg-colorScheme"
            >
              {expanded ? <ChevronFirst /> : <ChevronLast />}
            </button>
          </div>

          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">{children}</ul>
          </SidebarContext.Provider>

          <div className="border-t border-borderColr flex p-3">
            <img src={user.imageURL} className="w-10 h-10 rounded-md" />
            <div
              className={`flex justify-between items-center overflow-hidden transition-all ${
                expanded ? "w-52 ml-3" : "w-0"
              } `}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{user.displayName}</h4>
                <span className="text-xs text-textColor font-bold">
                  {user.email}
                </span>
              </div>
              <RouterLink to="/">
                <div className="mr-[5px] p-1.5 rounded-lg hover:bg-colorScheme flex justify-center items-center">
                  <FiLogOut
                    size={22}
                    style={{ transform: "rotate(180deg)" }}
                    onClick={removeLocalStorage}
                  />
                </div>
              </RouterLink>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SidebarItem({ icon, text, active, alert }) {
  const { expanded } = useContext(SidebarContext);
  let text2;

  function Slash(text) {
    text2 = "/" + text;
  }
  Slash(text);
  return (
    <RouterLink to={text2}>
      <li
        className={`relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors group ${
          active
            ? "bg-hoverColor from-indigo-200 to-indigo-100 text-indigo-800"
            : "hover:bg-colorScheme text-gray-600"
        }`}
      >
        {icon}
        <span
          className={`overflow-hidden transition-all ${
            expanded ? "w-52 ml-3" : "w-0"
          }`}
        >
          {text}
        </span>
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded ${
              expanded ? "" : "top-2"
            }`}
          ></div>
        )}

        {!expanded && (
          <div
            className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-indigo-100 text-indigo-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}
          >
            {text}
          </div>
        )}
      </li>
    </RouterLink>
  );
}
