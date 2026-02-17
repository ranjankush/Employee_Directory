const db = require("../config/db");

/**
 * Get all employees (with search)
 */
const getEmployees = async (req, res) => {
  try {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const search = url.searchParams.get("search");

    let query = "SELECT * FROM employees";
    let values = [];

    if (search && search.trim() !== "") {
      query += `
        WHERE LOWER(name) LIKE ?
        OR LOWER(department) LIKE ?
        OR CAST(id AS CHAR) LIKE ?
      `;
      const cleanSearch = search.replace("EMP", "").toLowerCase();
      const searchValue = `%${cleanSearch}%`;
      values = [searchValue, searchValue, searchValue];
    }

    const [rows] = await db.query(query, values);

    const updatedRows = rows.map(emp => ({
      ...emp,
      employeeId: `EMP${String(emp.id).padStart(3, "0")}`
    }));

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(updatedRows));

  } catch (error) {
    console.error("GET ERROR:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
};

/**
 * Create employee
 */
const createEmployee = async (req, res, parseBody) => {
  try {
    const data = await parseBody(req);

    if (!data || typeof data !== "object") {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid request body" }));
    }

    const { name, role, department } = data;

    if (!name || !role || !department) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "All fields are required" }));
    }

    await db.query(
      "INSERT INTO employees (name, role, department) VALUES (?, ?, ?)",
      [name.trim(), role.trim(), department.trim()]
    );

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Employee created successfully" }));

  } catch (error) {
    console.error("CREATE ERROR:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
};

/**
 * Update employee
 */
const updateEmployee = async (req, res, parseBody, id) => {
  try {
    if (!id || isNaN(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid ID" }));
    }

    const data = await parseBody(req);

    if (!data || typeof data !== "object") {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid request body" }));
    }

    const { name, role, department } = data;

    if (!name || !role || !department) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "All fields are required" }));
    }

    const [result] = await db.query(
      "UPDATE employees SET name=?, role=?, department=? WHERE id=?",
      [name.trim(), role.trim(), department.trim(), Number(id)]
    );

    if (result.affectedRows === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Employee not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Employee updated successfully" }));

  } catch (error) {
    console.error("UPDATE ERROR:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
};

/**
 * Delete employee
 */
const deleteEmployee = async (res, id) => {
  try {
    if (!id || isNaN(id)) {
      res.writeHead(400, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Invalid ID" }));
    }

    const [result] = await db.query(
      "DELETE FROM employees WHERE id=?",
      [Number(id)]
    );

    if (result.affectedRows === 0) {
      res.writeHead(404, { "Content-Type": "application/json" });
      return res.end(JSON.stringify({ message: "Employee not found" }));
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Employee deleted successfully" }));

  } catch (error) {
    console.error("DELETE ERROR:", error);
    res.writeHead(500, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Server error" }));
  }
};

module.exports = {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
