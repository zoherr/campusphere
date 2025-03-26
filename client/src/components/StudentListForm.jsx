"use client";
import { useState } from "react";
import api from "@/utils/api";

const StudentListModal = ({ classData, setStudentOpen }) => {
  const [newStudent, setNewStudent] = useState("");
  const [students, setStudents] = useState(classData.students || []);

  const handleAddStudent = async (e) => {
    e.preventDefault();
    if (!newStudent.trim()) return;

    try {
      const res = await api.post("/class/addStudent", {
        classId: classData._id,
        student: newStudent,
      });
      
      setNewStudent("");
    } catch (error) {
      console.error("Error adding student:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={() => setStudentOpen(false)}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg text-center w-96"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Student List</h2>
          <button
            onClick={() => setStudentOpen(false)}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <ul className="text-left max-h-40 overflow-y-auto mb-4">
          {students.length > 0 ? (
            students.map((student) => (
              <li key={student._id} className="p-2 border-b border-gray-300">
                {student.name} ({student.email})
              </li>
            ))
          ) : (
            <p>No students enrolled yet.</p>
          )}
        </ul>

        <form onSubmit={handleAddStudent} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Student Email"
            className="w-full p-2 border border-gray-300 rounded-md"
            value={newStudent}
            onChange={(e) => setNewStudent(e.target.value)}
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Add Student
          </button>
        </form>
      </div>
    </div>
  );
};

export default StudentListModal;
