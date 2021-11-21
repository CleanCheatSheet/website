import { Octokit } from "octokit";
import hljs from "highlight.js";
import marked from "marked";
import matter from "gray-matter";

marked.setOptions({
  langPrefix: "hljs language-",
  highlight: function (code) {
    return hljs.highlightAuto(code, ["html", "javascript"]).value;
  },
});

function get(object, key, default_value) {
  var result = object[key];
  return typeof result !== "undefined" ? result : default_value;
}

function uniformData({ data, lastModified, sheetUrl }) {
  return {
    title: get(data, "title", ""),
    description: get(data, "description", ""),
    tags: get(data, "tags", ""),
    logo: get(data, "logo", ""),
    author: get(data, "author", ""),
    color: get(data, "firstColor", "white"),
    last_update: Date.parse(lastModified),
    url: sheetUrl,
  };
}

export function createSheet({
  baseUrl,
  content,
  sheetUrl = "",
  lastModified = "01/01/1970",
}) {
  const stringContent = String(content);
  const sheet = matter(stringContent, {});
  marked.setOptions({ baseUrl: baseUrl });
  sheet.sheets = marked(sheet.content).split("+++");
  sheet.data = uniformData({
    data: sheet.data,
    lastModified: lastModified,
    sheetUrl: sheetUrl,
  });
  return sheet;
}

async function getSheetRaw({ owner, repo, path }) {
  const octokit = new Octokit();
  const response = await octokit.rest.repos.getContent({
    owner: owner,
    repo: repo,
    path: path,
  });
  const lastModified = response.headers["last-modified"];
  const sheetUrl = `${owner}/${repo}/${path.replace("/README.md", "")}`;
  const baseUrl = response.data.download_url.replace("README.md", "");
  const content = Buffer.from(response.data.content, "base64").toString(
    "utf-8"
  );
  return { baseUrl, sheetUrl, content, lastModified };
}

export async function getSheet({ owner, repo, path }) {
  const { baseUrl, sheetUrl, content, lastModified } = await getSheetRaw({
    owner: owner,
    repo: repo,
    path: path,
  });
  return createSheet({
    baseUrl: baseUrl,
    content: content,
    sheetUrl: sheetUrl,
    lastModified: lastModified,
  });
}

export async function getSheetData({ owner, repo, path }) {
  const { _, sheetUrl, content, lastModified } = await getSheetRaw({
    owner,
    repo,
    path,
  });
  const sheet = matter(content);
  return uniformData({
    data: sheet.data,
    lastModified: lastModified,
    sheetUrl: sheetUrl,
  });
}
