import React, { useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { dummyPublishedCreationData } from "../assets/assets";
import { Heart, Users } from "lucide-react";

const Community = () => {
  const { user } = useUser();
  const [creations, setCreations] = React.useState([]);
  const [hidden, setHidden] = React.useState("none");
  const fetchCreations = async () => {
    setCreations([
      ...dummyPublishedCreationData,
    ]);
  };
  useEffect(() => {
    fetchCreations();
  }, [user]);
  return (
    <div className="min-h-[calc(100vh-8rem)] max-h-fit overflow-y-scroll m-6 bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-center items-center mb-6 text-primary gap-2">
        <Users className="w-8 h-8" />
        <h1 className="text-2xl font-semibold tracking-wide">Community</h1>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-[minmax(4fr, auto)]  gap-6">
        {creations.map((creation, index) => (
          <div
            key={index}
            onPointerEnter={() => setHidden(index)}
            onPointerDown={() => setHidden(index)}
            onPointerUp={() => setHidden("none")}
            onPointerLeave={() => setHidden("none")}
            className="border relative cursor-pointer w-full border-primary/30 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <img
              src={creation.content}
              alt=""
              className="w-full h-full object-cover"
            />
            <div
              className={`absolute p-2 pr-8 flex bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent rounded-b-lg text-white  overflow-y-auto ${
                hidden === index ? "opacity-100" : "opacity-0"
              } transition-opacity duration-300`}
            >
              <h2 className="text-xs font-light text-slate mb-2 bg-black/50 px-1 rounded">
                {creation.prompt}
              </h2>
            </div>
            <div
              onClick={() => {
                let newcreations = creations.map((item, idx) => {
                  if (idx === index) {
                    return {
                      ...item,
                      likes: item.likes.includes(user.id)
                        ? item.likes.filter((like) => like !== user.id)
                        : [...item.likes, user.id],
                    };
                  }
                  return item;
                });
                setCreations(newcreations);
              }}
              className="absolute bottom-2 right-2 flex items-center bg-white/70 rounded-full px-2 py-1"
            >
              <p className="text-sm text-slate-700">{creation.likes.length}</p>
              <Heart
                className={`w-4 h-4 mx-1 cursor-pointer ${
                  creation.likes.includes(user.id)
                    ? "text-red-500"
                    : "text-slate-700"
                }`}
                fill={
                  creation.likes.includes(user.id) ? "currentColor" : "none"
                }
                stroke="currentColor"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Community;
