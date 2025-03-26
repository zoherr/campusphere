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

type Class = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: string;
};
interface User {
  name?: string;
  role?: string;
  qrCode?: string;
  avatar?: string;
}
const columns = [
  {
    header: "Class Name",
    accessor: "name",
  },
  {
    header: "Capacity",
    accessor: "capacity",
    className: "hidden md:table-cell",
  },

  {
    header: "Supervisor",
    accessor: "supervisor",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

interface classType {
  title: string;
  desc: string;
  createdAt: string;
}

const ClassListPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [studentOpen, setStudentOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);
  const [newStudentEmail, setNewStudentEmail] = useState("");

  const [name, setName] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [capacity, setCapacity] = useState(0);
  const [feesAmount, setfeesAmount] = useState(0);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await api.post("/class/create", {
        name,
        supervisor,
        capacity,
        feesAmount,
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
        const res = await api.get("/class/getClass");
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
      <td className="hidden md:table-cell">{item.capacity}</td>

      {/* <td className="hidden md:table-cell">{item.supervisor?.name}</td> */}
      <td>
        <div className="flex items-center gap-2">
          {user?.role === "admin" && (
            <button
              onClick={() => {
                setSelectedClass(item);
                setStudentOpen(true);
              }}
              className="w-8 h-8 flex items-center justify-center bg-greenlight text-black rounded-full"
            >
              +
            </button>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex justify-between items-center">
        <h1 className="md-block text-lg font-semibold">All Classes</h1>
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
        <Table columns={columns} renderRow={renderRow} data={classData} />
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
              <h2 className="text-lg font-semibold">Class Form</h2>
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
                placeholder="Supervisor Enrollment No"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                required
              />
              <p className="text-start">Capacity</p>
              <input
                type="number"
                placeholder="capacity"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={capacity}
                onChange={(e) => setCapacity(parseInt(e.target.value))}
                required
              />{" "}
              <p className="text-start">feesAmount</p>
              <input
                type="number"
                placeholder="feesAmount"
                className="w-full p-2 border border-gray-300 rounded-md"
                value={feesAmount}
                onChange={(e) => setfeesAmount(parseInt(e.target.value))}
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
      {studentOpen && selectedClass && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setStudentOpen(false)}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg text-center w-96"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">
                {selectedClass.name} - Students
              </h2>
              <button
                onClick={() => setStudentOpen(false)}
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

            {/* Student List */}
            <ul className="text-left mb-4">
              {selectedClass.students.length > 0 ? (
                selectedClass.students.map((student: any) => (
                  <li key={student._id} className="p-2 border-b">
                    {student.name} 
                  </li>
                ))
              ) : (
                <li className="p-2">No students enrolled yet.</li>
              )}
            </ul>
            <p className="text-start">Add Student </p>
            {/* Add Student Form */}
            <input
              type="text"
              placeholder="Enter student Enrollment no"
              className="w-full p-2 border border-gray-300 rounded-md mb-2"
              value={newStudentEmail}
              onChange={(e) => setNewStudentEmail(e.target.value)}
            />
            <button
              onClick={async () => {
                try {
                  await api.post(`/class/${selectedClass._id}/add-student`, {
                    classId: selectedClass._id,
                    studentId: newStudentEmail,
                  });
                  alert("Student added successfully!");
                  setStudentOpen(false);
                } catch (error) {
                  console.error("Error adding student:", error);
                }
              }}
              className="px-4 py-2 bg-blue-500 text-black rounded-lg hover:bg-blue-600"
            >
              Add Student
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassListPage;
