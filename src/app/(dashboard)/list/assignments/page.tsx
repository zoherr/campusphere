import TableSearch from "@/components/TableSearch";
import Image from "next/image";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import { access } from "fs";
import Link from "next/link";
import { assignmentsData, examsData, lessonsData, role } from "@/lib/data";
import FormModal from "@/components/FormModal";

type Assignment = {
    id: number;
    subject: string;
    class: string;
    teacher: string;
    dueDate: string;
}

const columns = [
    {
        header: "Subject Name", accessor: "name"
    },
    {
        header: "Class",
        accessor: "class",
    },
    {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell"
    },
    {
        header: "Due Date",
        accessor: "dueDate",
        className: "hidden md:table-cell"
    },
    {
        header: "Actions",
        accessor: "actions",
    }
]


const AssignmentListPage = () => {


    const renderRow = (item: Assignment) => (
        <tr key={item.id} className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-bluelight1">
            <td className="flex items-center gap-4 p-4">
                {item.subject}</td>
            <td>{item.class}</td>
            <td className="hidden md:table-cell">{item.teacher}</td>
            <td className="hidden md:table-cell">{item.dueDate}</td>
            <td>
                <div className="flex items-center gap-2">
                    {role === "admin" && (
                        <>
                            <FormModal table="assignments" type="update" data={item} />
                            <FormModal table="assignments" type="delete" id={item.id} />
                        </>
                    )}
                </div>
            </td>
        </tr>
    )

    return (
        <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
            {/* TOP  */}
            <div className="flex justify-between items-center">
                <h1 className="md-block text-lg font-semibold">All Assignments</h1>
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
                           <FormModal table="assignments" type="create"/>
                        )}

                    </div>
                </div>
            </div>
            {/* List */}
            <div className="">
                <Table columns={columns} renderRow={renderRow} data={assignmentsData} />
            </div>
            {/* Pagination  */}
            <Pagination />
        </div>
    )
}

export default AssignmentListPage;
