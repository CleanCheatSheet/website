import { CleanCheatSheet } from "../../components/sheet";
import Head from "next/head";
import { getSheet } from "../../utils/sheet";
import { useEffect } from "react";
import { useRouter } from "next/router";

function esCreate(path) {
  fetch(
    `/api/es/create/${Buffer.from(
      `${path.owner}/${path.repo}/${path.path}`
    ).toString("base64")}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => {})
    .catch((error) => {});
}

export default function Sheet({ path, sheets, data }) {
  useEffect(() => {
    fetch(
      `/api/es/get/${Buffer.from(
        `${path.owner}/${path.repo}/${path.path}`
      ).toString("base64")}`
    )
      .then((response) => {
        if (!response.ok) {
          esCreate(path);
        } else {
          response.json().then((data) => {
            if (data.body._source.last_update < data.last_update) {
              esCreate(path);
            }
          });
        }
      })
      .catch((error) => {});
  }, []);
  return (
    <div>
      <Head>
        <title>CleanCheatSheet {data.title}</title>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js"></script>
      </Head>
      <CleanCheatSheet title={data.title} color={data.color} sheets={sheets} />
    </div>
  );
}

export async function getStaticProps({ params }) {
  const owner = "CleanCheatSheet";
  const repo = "sheets";
  const sheet = await getSheet({
    owner: owner,
    repo: repo,
    path: `${params.owner}/README.md`,
  });
  return {
    props: {
      path: { owner: owner, repo: repo, path: params.owner },
      sheets: sheet.sheets,
      data: sheet.data,
    },
    revalidate: 300,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      { params: { owner: "markdown" } },
      { params: { owner: "git" } },
      { params: { owner: "autonlp" } },
    ],
    fallback: true,
  };
}
