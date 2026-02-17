import React, { useEffect, useState, useCallback } from "react";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeService";
import SearchBar from "../components/SearchBar";
import EmployeeForm from "../components/EmployeeForm";
import EmployeeList from "../components/EmployeeList";

/**
 * Home Page
 */
const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [loading, setLoading] = useState(false);

  /**
   * Load employees from API (memoized)
   */
  const loadEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchEmployees(searchTerm);
      setEmployees(data);
    } catch (error) {
      console.error("Error loading employees:", error);
      alert("Failed to load employees");
    } finally {
      setLoading(false);
    }
  }, [searchTerm]);

  /**
   * Fetch employees when search term changes
   */
  useEffect(() => {
    loadEmployees();
  }, [loadEmployees]);

  /**
   * Add or update employee
   */
  const handleSubmit = async (formData) => {
    try {
      if (formData.id) {
        await updateEmployee(formData.id, formData);
      } else {
        await addEmployee(formData);
      }

      setSelectedEmployee(null);
      await loadEmployees();
    } catch (error) {
      console.error("Save error:", error);
      alert("Failed to save employee");
    }
  };

  /**
   * Delete employee
   */
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;

    try {
      await deleteEmployee(id);

      if (selectedEmployee?.id === id) {
        setSelectedEmployee(null);
      }

      await loadEmployees();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete employee");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 relative overflow-hidden">

      {/* Decorative Background */}
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-400/30 rounded-full blur-[120px]" />
      <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-purple-400/30 rounded-full blur-[120px]" />

      <div className="relative max-w-6xl mx-auto px-6 py-14">

        {/* Header */}
        <div className="mb-14 flex items-center gap-5">
          <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 shadow-xl">
            <span className="text-white text-2xl font-bold">ED</span>
          </div>

          <div>
            <h1 className="text-5xl font-extrabold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Employee Directory
            </h1>
            <p className="text-gray-600 mt-2 text-lg">
              Manage and search employees efficiently
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        {/* Employee Form */}
        <div className="bg-white/70 backdrop-blur-xl border border-white/40 rounded-3xl shadow-xl p-8 mb-12">
          <EmployeeForm
            onSubmit={handleSubmit}
            selectedEmployee={selectedEmployee}
          />
        </div>

        {/* Employee List */}
        <EmployeeList
          employees={employees}
          loading={loading}
          onEdit={setSelectedEmployee}
          onDelete={handleDelete}
        />

      </div>
    </div>
  );
};

export default Home;
