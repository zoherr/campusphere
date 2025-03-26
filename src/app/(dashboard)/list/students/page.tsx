"use client";
import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { access } from "fs";
import Link from "next/link";
import { role } from "@/lib/data";
import FormModal from "@/components/FormModal";
import { useEffect, useState } from "react";
import api from "@/utils/api";
import getCurrentUser from "@/utils/currentUser";

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
          {role === "admin" && (
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
            {role === "admin" && (
              //     <button className="w-8 h-8 flex items-center justify-center bg-bluelight text-white rounded-full">
              //   <Image src="/plus.png" alt="" width={14} height={14}/>
              // </button>
              <FormModal table="student" type="create" />
            )}
          </div>
        </div>
      </div>
      {/* List */}
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={studentsData} />
      </div>
      {/* Pagination  */}
      <Pagination />
    </div>
  );
};

export default StudentListPage;
