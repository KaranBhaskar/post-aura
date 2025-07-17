import React, { useEffect } from "react";
import { dummyCreationData } from "../assets/assets";
import { Sparkles, SquareDashedKanban } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem.jsx";

const UserDashboard = () => {
  const [creations, setCreations] = React.useState([]);

  const getDashboardData = async () => {
    setCreations(dummyCreationData);
  };

  useEffect(() => {
    getDashboardData();
  }, []);

  return (
    <div className="h-full overflow-y-scroll p-6">
      <div className="flex justify-start gap-4 flex-wrap">
        {/* total Creation card */}
        <div className=" text-slate   flex justify-between items-center bg-white border border-primary/30 shadow-md w-72 p-4 rounded-xl">
          <div>
            <p>Total Creations</p>
            <h2 className="font-semibold text-2xl">{creations.length}</h2>
          </div>
          <div>
            <Sparkles className="w-10 h-10 text-yellow bg-primary rounded-full p-2" />
          </div>
        </div>
        <div className=" text-slate  flex justify-between items-center bg-white border border-primary/30 shadow-md w-72 p-4 rounded-xl">
          <div>
            <p>Plan Status</p>
            <h2 className="font-semibold text-xl">
              {
                <Protect plan={"angel_investor"} fallback={"recruiter"}>
                  Angel Investor
                </Protect>
              }
            </h2>
          </div>
          <div>
            <SquareDashedKanban className="w-10 h-10 text-primary bg-yellow rounded-full p-2" />
          </div>
        </div>
      </div>
      <div className="space-y-5">
        <p className="text-2xl font-semibold text-slate mt-6 mb-4">
          Recent Creations
        </p>
        {creations.map((creation) => (
          <CreationItem key={creation.id} creation={creation} />
        ))}
      </div>
    </div>
  );
};

export default UserDashboard;
