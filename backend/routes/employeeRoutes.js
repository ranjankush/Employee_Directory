const {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} = require("../controllers/employeeController");

const parseBody = require("../utils/parseBody");

/**
 * Handle employee routes
 */
const handleEmployeeRoutes = async (req, res) => {

  //  GET (supports search query)
  if (req.url.startsWith("/api/employees") && req.method === "GET") {
    return getEmployees(req, res);
  }

  //  POST
  if (req.url === "/api/employees" && req.method === "POST") {
    return createEmployee(req, res, parseBody);
  }

  //  PUT
  if (req.url.startsWith("/api/employees/") && req.method === "PUT") {
    const id = req.url.split("/")[3];
    return updateEmployee(req, res, parseBody, id);
  }

  //  DELETE
  if (req.url.startsWith("/api/employees/") && req.method === "DELETE") {
    const id = req.url.split("/")[3];
    return deleteEmployee(res, id);
  }

  res.writeHead(404, { "Content-Type": "application/json" });
  res.end(JSON.stringify({ message: "Route Not Found" }));
};

module.exports = handleEmployeeRoutes;
