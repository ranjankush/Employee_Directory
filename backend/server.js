require("dotenv").config();
const http = require("http");
const handleEmployeeRoutes = require("./routes/employeeRoutes");

const server = http.createServer((req, res) => {

  // CORS HEADERS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, OPTIONS"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization"
  );

  // Handle preflight request
  if (req.method === "OPTIONS") {
    res.writeHead(200);
    return res.end();
  }

  handleEmployeeRoutes(req, res);
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
