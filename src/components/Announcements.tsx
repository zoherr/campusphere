"use client";

import api from "@/utils/api";
import { useEffect, useState } from "react";

interface AnnouncementType {
  title: string;
  desc: string;
  createdAt: string;
}

const Announcement = () => {
  const [announcements, setAnnouncements] = useState<AnnouncementType[]>([]);
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }); // Converts to DD/MM/YYYY format
  };
  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await api.get("/announce/getAnnounce");
        setAnnouncements(res.data);
      } catch (error) {
        console.error("Failed to fetch announcements:", error);
      }
    };

    fetchAnnouncements();
  }, []);

  return (
    <div className="bg-white p-4 round-md">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Announcements</h1>
        <span className="text-xs text-gray-700">View All</span>
      </div>

      <div className="flex flex-col gap-4 mt-4">
        {announcements.length > 0 ? (
          announcements.map((announce, index) => (
            <div key={index} className="bg-bluelight1 rounded-md p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-medium">{announce.title}</h2>
                <span className="text-xs text-gray-700 bg-white rounded-md px-1 py-1">
                  {formatDate(announce.createdAt)}
                </span>
              </div>
              <p className="text-sm text-gray-700 mt-1">{announce.desc}</p>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-sm mt-2">
            No announcements available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Announcement;
