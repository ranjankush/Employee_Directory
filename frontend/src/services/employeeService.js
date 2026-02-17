import axios from "axios";

const API_URL = "http://localhost:5000/api/employees";

/**
 * Fetch all employees (with search)
 */
export const fetchEmployees = async (search = "") => {
  const response = await axios.get(API_URL, {
    params: { search },   // ✅ auto URL-encoding
  });
  return response.data;
};

/**
 * Add employee
 */
export const addEmployee = async (employeeData) => {
  const response = await axios.post(API_URL, employeeData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

/**
 * Update employee
 */
export const updateEmployee = async (id, employeeData) => {
  const response = await axios.put(`${API_URL}/${id}`, employeeData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

/**
 * Delete employee
 */
export const deleteEmployee = async (id) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};
