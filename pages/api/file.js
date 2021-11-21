import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false,
  },
};

const saveFile = async (file) => {
  const data = fs.readFileSync(file.path);
  fs.writeFileSync(`./public/tmp/${file.name.replace(/\s/g, "_")}`, data);
  await fs.unlinkSync(file.path);
  return `/tmp/${file.name.replace(/\s/g, "_")}`;
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(400).send({ message: "Only POST requests allowed" });
    return;
  }
  const form = new formidable.IncomingForm();
  form.parse(req, async function (err, fields, files) {
    const path = await saveFile(files.file);
    return res.status(201).send(path);
  });
}
