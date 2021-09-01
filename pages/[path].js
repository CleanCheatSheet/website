import { useRouter } from "next/router";
import Head from "next/head";

export default function Sheet({ readme, sheet }) {
  const router = useRouter();
  const { path } = router.query;

  return (
    <div>
      <Head>
        <title>CleanCheatSheet {path}</title>
      </Head>

      <main>
        <section className="basic-grid" dangerouslySetInnerHTML={{__html: sheet.content}}></section>
      </main>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  const readmeReq = await fetch(
    `https://raw.githubusercontent.com/CleanCheatSheet/sheets/main/${params.path}/README.md`
  );
  const readme = await readmeReq.text();
  const sheetReq = await fetch("http://localhost:8080", {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ content: readme }),
  });
  const sheet = await sheetReq.json();
  return {
    props: { readme: readme, sheet: sheet },
  };
}
