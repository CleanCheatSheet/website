import { connectToElasticsearch } from "../../../../utils/es";
import { getSheetData } from "../../../../utils/sheet";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }
  const { id } = req.query;
  console.log("id", id);
  try {
    const client = await connectToElasticsearch();
    const [owner, repo, path] = Buffer.from(id, "base64")
      .toString("ascii")
      .split("/");
    const body = await getSheetData({
      owner: owner,
      repo: repo,
      path: `${path}/README.md`,
    });
    return new Promise((resolve, reject) => {
      client
        .index({
          id: id,
          index: "sheets",
          body: body,
        })
        .then((response) => {
          res.status(200).json(response);
          resolve();
        })
        .catch((error) => {
          res.status(405).json(error);
          return resolve();
        });
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}
