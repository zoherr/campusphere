"use client";

import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const ParentPage = () => {
  const router = useRouter();
  const [isFees, setIsFees] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/fees/student-fee-status");
        console.log(res);

        setIsFees(res?.feeStatus);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        if (router) router.push("/sign-in");
      }
    };

    fetchUser();
  }, [router]); // Added `router` to dependencies

  return (
    <div className="">
      {isFees ? (
        <></>
      ) : (
        <>
          <div className="text-center p-2 text-sm font-semibold bg-red text-white">
            {isFees ? "Fees Not Pending ✅" : "Fees Pending ❌ -  "}
            {!isFees && (
              <button
                className="text-blue-500 underline"
                onClick={() => router.push("/parent/pay")}
              >
                Pay Now
              </button>
            )}
          </div>
        </>
      )}

      <div className="flex-1 p-4 flex gap-4 flex-col xl:flex-row">
        {/* LEFT */}
        <div className="w-full xl:w-2/3">
          <div className="h-full bg-white p-4 rounded-md">
            <h1 className="text-xl font-semibold">Schedule (Taha Munpuri)</h1>
            <BigCalendar />
          </div>
        </div>
        {/* RIGHT */}
        <div className="w-full xl:w-1/3 flex flex-col gap-8">
          <Announcements />
        </div>
      </div>
    </div>
  );
};

export default ParentPage;
