import React from "react";
import EmployeeCard from "./EmployeeCard";

/**
 * EmployeeList Component
 */
const EmployeeList = ({ employees = [], onEdit, onDelete, loading }) => {

  if (loading) {
    return (
      <div className="text-center py-12 text-gray-500">
        Loading employees...
      </div>
    );
  }

  if (!employees.length) {
    return (
      <div className="text-center py-12 text-gray-500">
        No employees found.
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {employees.map((emp) => (
        <EmployeeCard
          key={emp.id}
          employee={emp}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default EmployeeList;
