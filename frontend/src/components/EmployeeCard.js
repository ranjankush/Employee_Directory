// import React from "react";

// /**
//  * EmployeeCard Component
//  */
// const EmployeeCard = ({ employee, onEdit, onDelete }) => {
//   return (
//     <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl transition">
//       <h2 className="text-xl font-semibold text-gray-800">
//         {employee.name}
//       </h2>

//       <p className="text-gray-600 mt-2">{employee.role}</p>

//       <span className="inline-block mt-2 px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-full">
//         {employee.department}
//       </span>

//       <div className="mt-5 flex gap-3">
//         <button
//           onClick={() => onEdit(employee)}
//           className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
//         >
//           Edit
//         </button>

//         <button
//           onClick={() => onDelete(employee.id)}
//           className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// };


// export default EmployeeCard;


import React from "react";

/**
 * EmployeeCard Component
 */
const EmployeeCard = ({ employee, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">

      {/* Employee ID */}
      <p className="text-xs font-semibold text-indigo-500 tracking-wide">
        {employee.employeeId}
      </p>

      {/* Name */}
      <h2 className="text-xl font-semibold text-gray-800 mt-1">
        {employee.name}
      </h2>

      {/* Role */}
      <p className="text-gray-600 mt-2">{employee.role}</p>

      {/* Department Badge */}
      <span className="inline-block mt-3 px-3 py-1 text-sm bg-indigo-100 text-indigo-600 rounded-full">
        {employee.department}
      </span>

      {/* Action Buttons */}
      <div className="mt-5 flex gap-3">
        <button
          onClick={() => onEdit(employee)}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition"
        >
          Edit
        </button>

        <button
          onClick={() => onDelete(employee.id)}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default EmployeeCard;
