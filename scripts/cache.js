const fs = require("fs");
var request = require("sync-request");

function sheetsData() {
  res = request(
    "GET",
    "https://api.github.com/repos/cleancheatsheet/sheets/git/trees/main",
    { headers: { "User-Agent": "CleanCheatSheet" } }
  );
  const sheets = JSON.parse(res.getBody("utf-8")).tree;
  const sheetsData = [];
  sheets.forEach((item, index) => {
    if (![".gitignore", "LICENSE"].includes(item.path)) {
      sheetsData.push({
        title: item.path,
      });
    }
  });
  return `export const sheets = ${JSON.stringify(sheetsData)}`;
}

try {
  fs.readdirSync("cache");
} catch (e) {
  fs.mkdirSync("cache");
}

fs.writeFile("cache/data.js", sheetsData(), function (err) {
  if (err) return console.log(err);
  console.log("Sheets cached.");
});
