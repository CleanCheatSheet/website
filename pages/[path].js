import { useRouter } from "next/router";
import Head from "next/head";

import { CleanCheatSheet } from "../components/sheet";

import marked from "marked";
import hljs from "highlight.js";
import matter from "gray-matter";

marked.setOptions({
  langPrefix: "hljs language-",
  highlight: function (code) {
    return hljs.highlightAuto(code, ["html", "javascript"]).value;
  },
});

export function createSheet(baseUrl, content) {
  const sheet = matter(content);
  marked.setOptions({ baseUrl: baseUrl });
  sheet.sheets = marked(sheet.content).split("+++");
  return sheet;
}

export default function Sheet({ sheets, data }) {
  const router = useRouter();
  const { path } = router.query;

  return (
    <div>
      <Head>
        <title>CleanCheatSheet {path}</title>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js"></script>
      </Head>
      <CleanCheatSheet
        title={data.title}
        color={data.firstColor}
        sheets={sheets}
      />
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const baseUrl = `https://raw.githubusercontent.com/CleanCheatSheet/sheets/main/${params.path}/`;
  const readmeReq = await fetch(baseUrl + "README.md");
  const readme = await readmeReq.text();
  const sheet = createSheet(baseUrl, readme);
  return { props: { sheets: sheet.sheets, data: sheet.data } };
}
