import Head from "next/head";
import { Navbar } from "../components/navbar";
import { Search } from "../components/search";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>Clean Cheat Sheet</title>
        <meta name="description" content="Clean Cheat Sheet for everything" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.container}>
        <Navbar logoSize="128" displaySignIn={false} />
        <div className={styles.space}></div>
        <Search />
      </div>
    </>
  );
}
