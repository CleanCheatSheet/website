import { connectToElasticsearch } from "../../../../utils/es";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(400).send({ message: "Only GET requests allowed" });
    return;
  }
  const { id } = req.query;
  try {
    const client = await connectToElasticsearch();
    return new Promise((resolve, reject) => {
      client
        .get({
          index: "sheets",
          id: id,
        })
        .then((response) => {
          res.status(200).json(response);
          resolve();
        })
        .catch((response) => {
          res.status(404).json(response);
          return resolve();
        });
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({ error: error.message });
  }
}
