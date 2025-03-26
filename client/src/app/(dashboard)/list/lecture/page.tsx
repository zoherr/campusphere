"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { access } from "fs";
import Link from "next/link";
import { classesData, role, subjectsData } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import getCurrentUser from "@/utils/currentUser";
import { IoQrCodeOutline } from "react-icons/io5";

type Class = {
  id: number;
  name: string;
  subject: number;
  teacher: string;
  time: string;
  qrCode?: string;
};
interface User {
  name?: string;
  role?: string;

  avatar?: string;
}
const columns = [
  {
    header: "Lecture Name",
    accessor: "name",
  },
  {
    header: "Subject",
    accessor: "subject",
    className: "hidden md:table-cell",
  },

  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Time",
    accessor: "time",
  },
  {
    header: "QRCode",
    accessor: "qrcode",
  },
];

interface classType {
  title: string;
  desc: string;
  createdAt: string;
  qrCode: string;
}

const ClassListPage = () => {
  const [showQR, setShowQR] = useState<boolean>(false);
  const [qrcode, setQrCode] = useState<any>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [studentOpen, setStudentOpen] = useState(false);
  const [classId, setClassId] = useState<any>(null);
  const [newStudentEmail, setNewStudentEmail] = useState("");

  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [feesAmount, setfeesAmount] = useState(0);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/lecture/create", {
        name,
        subject,
        classId,
      });
      alert("Class created successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

  const [classData, setClassData] = useState<classType[]>([]);
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }); // Converts to DD/MM/YYYY format
  };
  useEffect(() => {
    const fetchClass = async () => {
      try {
        const res = await api.get("/lecture/getLec");
        setClassData(res.data);
      } catch (error) {
        console.error("Failed to fetch Class:", error);
      }
    };

    fetchClass();
  }, [user]);
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
  const renderRow = (item: Class) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-bluelight1"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.subject}</td>

      <td className="hidden md:table-cell">{item.teacher?.name}</td>
      <td className="hidden md:table-cell">{formatDate(item.time)}</td>
      <td className="hidden md:table-cell">
        {user?.role === "teacher" && (
          <button
            onClick={() => {
              setShowQR(true);
              setQrCode(item.qrCode);
            }}
            className="mx-3 text-xs bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <IoQrCodeOutline className="m-1 text-lg" />
          </button>
        )}
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex justify-between items-center">
        <h1 className="md-block text-lg font-semibold">All Lecture</h1>
        <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center bg-redlight text-white rounded-full">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-greenlight text-white rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
            {user?.role === "teacher" && (
              //   <FormModal table="announcements" type="create" />
              <button
                onClick={() => setOpen(!open)}
                className="w-8 h-8 flex items-center justify-center bg-greenlight text-black rounded-full"
              >
                +
              </button>
            )}{" "}
          </div>
        </div>
      </div>
      {/* List */}
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={classData} />
      </div>
      {/* Pagination  */}
      <Pagination />

      {open && user?.role === "teacher" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg text-center w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Lecture Form</h2>
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
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Subjecţ"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Class Id"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                required
              />
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
      {showQR  && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setShowQR(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Your QR Code</h2>
              <button
                onClick={() => setShowQR(false)}
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
            <div className="p-4 bg-gray-50 rounded">
              <Image
                src={qrcode}
                alt="QR Code"
                width={200}
                height={200}
                className="mx-auto"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={() => setShowQR(false)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassListPage;
