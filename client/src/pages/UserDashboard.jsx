import React, { useEffect } from "react";
import { Sparkles, SquareDashedKanban } from "lucide-react";
import { Protect } from "@clerk/clerk-react";
import CreationItem from "../components/CreationItem.jsx";
import { useAuth } from "@clerk/clerk-react";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const UserDashboard = () => {
  const [creations, setCreations] = React.useState([]);
  const [plan, setPlan] = React.useState("free");
  const { getToken } = useAuth();

  const getDashboardData = async () => {
    // setCreations(dummyCreationData);
    const axiosPromise = axios.get("/ai", {
      headers: {
        Authorization: `Bearer ${await getToken()}`,
      },
    });

    toast.promise(
      axiosPromise,
      {
        loading: "Fetching dashboard data...",
        success: "Dashboard data fetched! 🎉",
        error: "Failed to fetch dashboard data",
      },
      {
        style: {
          minWidth: "250px",
        },
      }
    );

    try {
      const { data } = await axiosPromise;
      setCreations(data.creations);
      setPlan(data.plan);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
    }
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
                  {plan}
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
