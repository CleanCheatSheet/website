import { useRouter } from "next/router";
import Head from "next/head";

export default function Sheet({ readme, sheet }) {
  const router = useRouter();
  const { path } = router.query;

  const css = sheet.css;
  return (
    <div>
      <Head>
        <title>CleanCheatSheet {path}</title>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js"></script>
        <script>document.documentElement.style.setProperty('--bg', '{sheet.data.thirdColor}');</script>
        <script>document.documentElement.style.setProperty('--nav-bg', '{sheet.data.firstColor}');</script>
        <script>document.documentElement.style.setProperty('--nav-bg-accent', '{sheet.data.secondColor}');</script>
      </Head>
      <style jsx>{css}</style>
      <main>
        <section
          className="basic-grid"
          dangerouslySetInnerHTML={{ __html: sheet.content }}
        ></section>
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const baseUrl = `https://raw.githubusercontent.com/CleanCheatSheet/sheets/main/${params.path}/`;
  const readmeReq = await fetch(baseUrl + "README.md");
  const readme = await readmeReq.text();
  const sheetReq = await fetch("http://localhost:8080", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ baseUrl: baseUrl, content: readme }),
  });
  const sheet = await sheetReq.json();
  return {
    props: { readme: readme, sheet: sheet },
  };
}
