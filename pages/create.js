import { Editor } from "../components/editor";
import Head from "next/head";
import { Publisher } from "../components/publisher";
import { Uploader } from "../components/uploader";
import styles from "../styles/Create.module.css";
import { useState } from "react";

export default function Create() {
  const [displayForm, setDisplayForm] = useState(false);
  const [displayUploader, setDisplayUploader] = useState(false);

  return (
    <>
      <Head>
        <title>Clean Cheat Sheet</title>
        <link
          rel="stylesheet"
          href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/default.min.css"
        />
        <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/highlight.min.js"></script>
        <meta name="description" content="Clean Cheat Sheet for everything" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style global jsx>{`
        html,
        body,
        #__next {
          height: 100vh;
        }
      `}</style>
      <div className={styles.nav}>
        {!displayForm && (
          <button
            onClick={() => {
              setDisplayForm(false);
              setDisplayUploader(!displayUploader);
            }}
          >
            {!displayUploader ? "Display Uploader" : "Edit the sheet"}
          </button>
        )}
        {!displayUploader && (
          <button
            onClick={() => {
              setDisplayForm(!displayForm);
              setDisplayUploader(false);
            }}
          >
            {!displayForm ? "Publish the sheet" : "Edit the sheet"}
          </button>
        )}
      </div>
      {displayForm && !displayUploader && <Publisher />}
      {!displayForm && !displayUploader && <Editor />}
      {!displayForm && displayUploader && <Uploader />}
    </>
  );
}
