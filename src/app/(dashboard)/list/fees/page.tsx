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
  amountPaid: number;
  paymentDate: string;
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
    header: "Amount",
    accessor: "amountPaid",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "paymentDate",
    className: "hidden md:table-cell",
  },
];

interface classType {
  title: string;
  desc: string;
  createdAt: string;
}

const FeesPage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

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
        let res;
        if (user?.role === "parent") {
          res = await api.get("/fees/student-fee-history");
        } else {
          res = await api.get("/fees/fee-status");
        }

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
      <td className="hidden md:table-cell">{item.amountPaid}</td>

      <td className="hidden md:table-cell">{formatDate(item.paymentDate)}</td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP  */}
      <div className="flex justify-between items-center">
        <h1 className="md-block text-lg font-semibold">Fees History</h1>
        <div className="flex flex-col md:flex-row items-center gap-4  w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center bg-redlight text-white rounded-full">
              <Image src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center bg-greenlight text-white rounded-full">
              <Image src="/sort.png" alt="" width={14} height={14} />
            </button>
          </div>
        </div>
      </div>
      {/* List */}
      <div className="">
        <Table columns={columns} renderRow={renderRow} data={classData} />
      </div>
      {/* Pagination  */}
      <Pagination />
    </div>
  );
};

export default FeesPage;
