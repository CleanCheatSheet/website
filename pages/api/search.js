const sheets = require("../../cache/data").sheets

export default (req, res) => {
  const results = req.query.q
    ? sheets.filter((sheet) => sheet.title.toLowerCase().includes(req.query.q))
    : [];
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ results }));
};
