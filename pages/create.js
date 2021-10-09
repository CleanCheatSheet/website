import Head from "next/head";
import { Headline } from "../components/headline";
import styles from "../styles/Create.module.css";
import { useState, useEffect, useCallback } from "react";

function getSessionStorageOrDefault(key, defaultValue) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}

export default function Create() {
  const [input, setInput] = useState("");
  const [css, setCss] = useState("");
  const [content, setContent] = useState("");
  // const inputRef = useCallback((node) => {
  //   if (node !== null) {
  //     if (node.value !== null) {
  //       setInput(node.value);
  //       updateSheet(node.value);
  //     }
  //   }
  // }, []);

  useEffect(() => {
    console.log("First useEffect::", input);
    setInput(getSessionStorageOrDefault("input", ""));
    console.log("After first useEffect::", input);
  }, []);

  useEffect(() => {
    console.log("Second useEffect::", input);
    sessionStorage.setItem("input", JSON.stringify(input));
    updateSheet(input);
  }, [input]);

  async function updateSheet(input) {
    console.log("Fetch in progress with input::", input);
    fetch("http://localhost:8080", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ baseUrl: "", content: input }),
    })
      .then((res) => res.json())
      .then((res) => {
        setCss(res.css);
        setContent(res.content);
      });
  }

  function handleOnChange(event) {
    const input = event.target.value;
    setInput(input);
  }

  return (
    <>
      <Head>
        <title>Clean Cheat Sheet</title>
        <meta name="description" content="Clean Cheat Sheet for everything" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Headline title="Create your sheet" subtitle="" />
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.nav}>Markdown</div>
          <textarea
            className={styles.textarea}
            // ref={inputRef}
            value={input}
            autoFocus
            onChange={handleOnChange}
          ></textarea>
        </div>
        <style jsx>{css}</style>
        <div className={styles.container}>
          <div className={styles.nav}>Sheet</div>
          <main>
            <section
              className="basic-grid"
              dangerouslySetInnerHTML={{ __html: content }}
            ></section>
          </main>
        </div>
      </div>
    </>
  );
}
