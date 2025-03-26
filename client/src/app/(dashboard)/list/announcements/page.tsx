"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { access } from "fs";
import Link from "next/link";
import {
  assignmentsData,
  eventsData,
  examsData,
  lessonsData,
  resultsData,
  role,
} from "@/lib/data";
import FormModal from "@/components/FormModal";
import { useEffect, useState } from "react";
import getCurrentUser from "@/utils/currentUser";
import api from "@/utils/api";
interface AnnouncementType {
  title: string;
  desc: string;
  createdAt: string;
}
type Announcement = {
  _id: number;
  title: string;
  desc: string;
  createdAt: string;
};
interface User {
  name?: string;
  role?: string;
  qrCode?: string;
  avatar?: string;
}
const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  //   {
  //     header: "Class",
  //     accessor: "class",
  //   },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const AnnouncementPage = () => {
  const [announcementsData, setAnnouncements] = useState<AnnouncementType[]>(
    []
  );

  const [title, setTitle] = useState("");
  const [desc, setDescription] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/announce/create", { title, desc });
      alert("Announcement created successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };
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
  }, [user]);

  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }); // Converts to DD/MM/YYYY format
  };
  const renderRow = (item: Announcement) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-bluelight1"
    >
      <td className="flex items-center gap-4 p-4">{item.title}</td>
      <td className="flex items-center gap-4 p-4"> {item.desc}</td>
      <td className="hidden md:table-cell">{formatDate(item.createdAt)}</td>
      <td>
        <div className="flex items-center gap-2">
          {user?.role === "admin" && (
            <>
              <FormModal table="announcements" type="update" data={item} />
              <FormModal table="announcements" type="delete" id={item._id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex justify-between items-center">
        <h1 className="md-block text-lg font-semibold">All Announcements</h1>
        <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center bg-redlight text-white rounded-full">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-greenlight text-white rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {user?.role === "admin" && (
              //   <FormModal table="announcements" type="create" />
              <button
                onClick={() => setOpen(!open)}
                className="w-8 h-8 flex items-center justify-center bg-greenlight text-black rounded-full"
              >+</button>
            )}
          </div>
        </div>
      </div>
      {/* List */}
      <div className="">
        <Table
          columns={columns}
          renderRow={renderRow}
          data={announcementsData}
        />
      </div>
      {/* Pagination  */}
      <Pagination />
      {open && user?.role === "admin" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg text-center w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Announcement Form</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                value={desc}
                onChange={(e) => setDescription(e.target.value)}
                required
              ></textarea>

              <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnnouncementPage;
