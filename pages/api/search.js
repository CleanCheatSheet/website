import { connectToElasticsearch } from "../../utils/es";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.status(400).send({ message: "Only GET requests allowed" });
    return;
  }
  const client = await connectToElasticsearch();
  return new Promise((resolve, reject) => {
    client
      .search({
        index: "sheets",
        body: {
          query: req.query.q
            ? {
                // bool: {
                //   must: [
                //     { match: { title: req.query.q } },
                //     // { match: { "content": "Elasticsearch" }}
                //   ],
                // },
                // // match: { title: req.query.q },
                simple_query_string: {
                  fields: ["title"],
                  query: `${req.query.q}*`,
                },
              }
            : { match_all: {} },
        },
      })
      .then((response) => {
        res
          .status(200)
          .json(response.body.hits.hits.map((item) => item._source));
        resolve();
      })
      .catch((response) => {
        res.status(404).json(response);
        return resolve();
      });
  });
}
