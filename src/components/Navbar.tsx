"use client";
import { IoQrCodeOutline } from "react-icons/io5";

import Image from "next/image";
import getCurrentUser from "../utils/currentUser";
import { useEffect, useState } from "react";

// Define a type for the user object
interface User {
  name?: string;
  role?: string;
  qrCode?: string;
  avatar?: string;
}

const Navbar = () => {
  const [user, setUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = getCurrentUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      console.log(`Searching for: ${searchQuery}`);
      // Add implementation for search functionality
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-white border-b">
      {/* LOGO */}
      <div className="flex items-center">
        <div className="flex items-center mr-8"></div>

        {/* SEARCHBAR */}
        <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 hover:ring-gray-400 transition-all">
          <Image src="/search.png" alt="Search" width={14} height={14} />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={handleSearch}
            className="w-[200px] p-2 bg-transparent outline-none text-sm"
          />
        </div>
      </div>

      {/* ICONS & USER */}
      <div className="flex items-center gap-6">
        <button className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-100">
          <Image src="/message.png" alt="Messages" width={20} height={20} />
        </button>

        <button className="bg-white rounded-full w-7 h-7 flex items-center justify-center cursor-pointer hover:bg-gray-100 relative">
          <Image
            src="/announcement.png"
            alt="Announcements"
            width={20}
            height={20}
          />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-red-500 text-white rounded-full text-xs">
            1
          </div>
        </button>

        {/* USER INFO */}
        {user ? (
          <div className="flex items-center gap-3">
          
            <div className="flex flex-col items-end">
              <span className="text-sm leading-tight font-medium">
                {user.name}
              </span>
              <span className="text-[10px] text-gray-700 text-right">
                {user.role || "N/A"}
              </span>

              {/* Show QR Code Button if the user is a student */}
            </div>

            <Image
              src={user.avatar || "/avatar.png"}
              alt="User Avatar"
              width={36}
              height={36}
              className="rounded-full"
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
          </div>
        )}
      </div>

      {/* QR CODE POPUP MODAL */}
     
    </div>
  );
};

export default Navbar;
