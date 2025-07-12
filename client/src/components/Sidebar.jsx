import React from "react";
import { Protect, useClerk, useUser } from "@clerk/clerk-react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  House,
  NotebookPen,
  Hash,
  Eraser,
  Image,
  Scissors,
  FileText,
  CircleUserRound,
  LogOut,
  Users,
} from "lucide-react";

const navItems = [
  { name: "Dashboard", path: "/ai", icon: <House /> },
  {
    name: "Article Generator",
    path: "/ai/article-generator",
    icon: <NotebookPen />,
  },
  { name: "Title Generator", path: "/ai/title-generator", icon: <Hash /> },
  { name: "Image Generator", path: "/ai/image-generator", icon: <Image /> },
  {
    name: "Remove Background",
    path: "/ai/remove-background",
    icon: <Eraser />,
  },
  { name: "Remove Object", path: "/ai/remove-object", icon: <Scissors /> },
  { name: "Resume Helper", path: "/ai/resume-helper", icon: <FileText /> },
  { name: "Community", path: "/ai/community", icon: <Users /> },
];

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user } = useUser();
  const { signOut, openUserProfile } = useClerk();
  const navigate = useNavigate();
  const location = useLocation().pathname;
  return (
    <div
      className={`absolute top-18 left-0 w-64 h-[calc(100vh-72px)] bg-white shadow-lg
        text-center border-r border-r-primary/30 shadow-md 
      shadow-primary/20
        ${
          sidebar ? "translate-x-0" : "max-sm:-translate-x-full"
        } transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full">
        <img
          src={user?.imageUrl}
          alt={user?.fullName}
          className="w-13 rounded-full mx-auto"
        />
        <h1 className="mt-1 text-center text-black">{user?.fullName}</h1>

        <div className="mt-5">
          {navItems.map((item, index) => (
            <div
              key={item.path}
              className={`text-center flex gap-2 px-6 py-3 hover:bg-yellow hover:text-white cursor-pointer text-black ${
                location === item.path ? "bg-primary text-white" : ""
              }`}
              onClick={() => {
                navigate(item.path);
                setSidebar(false);
              }}
            >
              {item.icon} {item.name}
            </div>
          ))}
        </div>
        <div
          className="flex justify-around items-center mt-auto absolute bottom-0 w-full px-3 border-t
        border-t-primary/30 py-4 bg-white"
        >
          <CircleUserRound
            onClick={openUserProfile}
            className="w-10 h-10 bg-primary text-white rounded-full cursor-pointer
            hover:bg-yellow"
          />
          <p className="text-xs font-light">
            {user.fullName}
            <br />{" "}
            <Protect plan="angel_investor" fallback="Recruiter">
              Angel Investor
            </Protect>
          </p>
          <LogOut
            className="w-8 h-8 text-black cursor-pointer hover:text-red-600"
            onClick={signOut}
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
