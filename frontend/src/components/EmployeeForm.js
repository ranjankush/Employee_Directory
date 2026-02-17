import React, { useState, useEffect } from "react";

/**
 * EmployeeForm Component
 */
const EmployeeForm = ({ onSubmit, selectedEmployee }) => {
  const [formData, setFormData] = useState({
    name: "",
    role: "",
    department: "",
  });

  useEffect(() => {
    if (selectedEmployee) {
      setFormData(selectedEmployee);
    }
  }, [selectedEmployee]);

  /**
   * Handle input change
   */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /**
   * Handle form submit
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: "", role: "", department: "" });
  };

  // return (
  //   <form onSubmit={handleSubmit} className="space-y-3 mb-6">
  //     <input
  //       name="name"
  //       value={formData.name}
  //       onChange={handleChange}
  //       placeholder="Employee Name"
  //       className="w-full p-2 border rounded"
  //     />
  //     <input
  //       name="role"
  //       value={formData.role}
  //       onChange={handleChange}
  //       placeholder="Role"
  //       className="w-full p-2 border rounded"
  //     />
  //     <input
  //       name="department"
  //       value={formData.department}
  //       onChange={handleChange}
  //       placeholder="Department"
  //       className="w-full p-2 border rounded"
  //     />

  //     <button className="bg-green-500 text-white px-4 py-2 rounded">
  //       {selectedEmployee ? "Update Employee" : "Add Employee"}
  //     </button>
  //   </form>
  // );

  return (
  <form
    onSubmit={handleSubmit}
    className="bg-white p-6 rounded-2xl shadow-md mb-10 border border-gray-100"
  >
    <div className="grid md:grid-cols-3 gap-4 mb-4">
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Employee Name"
        className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />

      <input
        name="role"
        value={formData.role}
        onChange={handleChange}
        placeholder="Role"
        className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />

      <input
        name="department"
        value={formData.department}
        onChange={handleChange}
        placeholder="Department"
        className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
      />
    </div>

    <button
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-medium transition shadow-md"
    >
      {selectedEmployee ? "Update Employee" : "Add Employee"}
    </button>
  </form>
);

};

export default EmployeeForm;
