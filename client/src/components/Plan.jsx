import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
    <div className="max-w-2xl mx-auto z-20 my-30">
      <div className="text-center">
        <h2
          className="text-white text-4xl font-bold tracking-widest font-semibold
        underline decoration-bl decoration-5 underline-offset-8 py-3 rounded-3xl"
        >
          Support the Build
        </h2>
        <p
          className="text-white text-xl px-10 font-extralight
            underline leading-6 decoration-sb decoration-2 underline-offset-5 mt-5 mb-15"
        >
          Are you looking for your next engineer or just browsing? Choose the
          path that fits your intent.
        </p>
      </div>
      <div>
        <PricingTable className="mt-14 max-sm:mx-8" />
      </div>
    </div>
  );
};

export default Plan;
