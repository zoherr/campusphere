"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import Link from "next/link";
import FormModal from "@/components/FormModal";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import getCurrentUser from "@/utils/currentUser";
import toast from "react-hot-toast";

type Student = {
  _id: number;
  rollNumber: string;
  name: string;
  email?: string;
  photo: string;
  phone?: string;
  sex: number;
  class: object;
  address: string;
};
interface User {
  name?: string;
  role?: string;
  qrCode?: string;
  avatar?: string;
}
const columns = [
  {
    header: "Info",
    accessor: "info",
  },
  {
    header: "Student ID",
    accessor: "studentId",
    className: "hidden md:table-cell",
  },
  {
    header: "Gender",
    accessor: "gender",
    className: "hidden md:table-cell",
  },
  {
    header: "Phone",
    accessor: "phone",
    className: "hidden lg:table-cell ",
  },
  {
    header: "Address",
    accessor: "address",
    className: "hidden lg:table-cell ",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const StudentListPage = () => {
  const [studentsData, setStudentData] = useState<Student[]>([]);

  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [studentInfo, setStudentInfo] = useState({
    name: "",
    email: "",
    password: "",
    rollNumber: "",
    phone: "",
    address: "",
    bloodType: "",
    sex: "",
    birthday: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/auth/register", {
        ...studentInfo,
        role: "student",
      });
      toast.success("Class created successfully!");
      setOpen(false);
    } catch (error) {
      console.error("Error creating announcement:", error);
    }
  };

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
        const res = await api.get("/student/");
        setStudentData(res.data);
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
  const renderRow = (item: Student) => (
    <tr
      key={item._id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-bluelight1"
    >
      <td className="flex items-center gap-4 p-4">
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-sm text-gray-500">{item.class?.name}</p>
        </div>
      </td>
      <td className="hidden md:table-cell">{item.rollNumber}</td>
      <td className="hidden md:table-cell">{item.sex}</td>
      <td className="hidden md:table-cell">{item.phone}</td>
      <td className="hidden md:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/students/${item._id}`}>
            <button className="w-7 h-7 flex items-center justify-center bg-Sky rounded-full">
              <Image src="/view.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {user?.role === "admin" && (
            <>
              <FormModal table="student" type="update" data={item} />
              <FormModal table="student" type="delete" id={item._id} />
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
        <h1 className="md-block text-lg font-semibold">All Students</h1>
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
              >
                +
              </button>
            )}{" "}
          </div>
        </div>
      </div>
      {/* List */}
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={studentsData} />
      </div>
      {/* Pagination  */}
      <Pagination />

      {open && user?.role === "admin" && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white p-8 rounded-xl shadow-2xl w-[500px] max-w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Student Registration
              </h2>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
            <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Enter student name"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={studentInfo.name}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="Enter student email"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={studentInfo.email}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, email: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="Create password"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={studentInfo.password}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, password: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Roll Number
                </label>
                <input
                  type="text"
                  placeholder="Enter roll number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={studentInfo.rollNumber}
                  onChange={(e) =>
                    setStudentInfo({
                      ...studentInfo,
                      rollNumber: e.target.value,
                    })
                  }
                  required
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter contact number"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={studentInfo.phone}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, phone: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={studentInfo.sex}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, sex: e.target.value })
                  }
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <input
                  type="text"
                  placeholder="Enter full address"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={studentInfo.address}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, address: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-span-2 md:col-span-1">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
                  value={studentInfo.birthday}
                  onChange={(e) =>
                    setStudentInfo({ ...studentInfo, birthday: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-span-2 mt-5">
                <button
                  type="submit"
                  className="w-full p-3 bg-blue-600 text-white bg-black rounded-md hover:bg-blue-700 transition-colors"
                >
                  Register Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentListPage;
