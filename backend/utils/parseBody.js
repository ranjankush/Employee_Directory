/**
 * Parse incoming JSON body safely
 * @param {Object} req
 * @returns {Promise<Object>}
 */
const parseBody = (req) => {
  return new Promise((resolve, reject) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      // ✅ Handle empty body safely
      if (!body) {
        return resolve({});
      }

      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (error) {
        reject(new Error("Invalid JSON body"));
      }
    });

    req.on("error", (err) => reject(err));
  });
};

module.exports = parseBody;
