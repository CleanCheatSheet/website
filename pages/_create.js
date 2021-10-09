import Head from "next/head";
import { Headline } from "../components/headline";
import styles from "../styles/Create.module.css";
import { useState, useEffect, useCallback, useRef } from "react";
import Router from "next/router";

function stringFromSearch(search) {
  return search ? decodeURIComponent(search) : "";
}

export default function Create({
  search,
  css,
  content,
  positionCursor,
  positionScroll,
}) {
  const inputRef = useRef(null);

  const updateQuery = (newQuery) => {
    Router.push({
      pathname: "/create",
      query: {
        search: encodeURI(newQuery),
        positionCursor: encodeURI(inputRef.current.selectionStart),
        positionScroll: encodeURI(window.scrollY),
      },
    });
  };

  function handleOnChange(event) {
    const query = event.target.value;
    updateQuery(query);
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
            ref={inputRef}
            value={search}
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

Create.getInitialProps = ({ query }) => {
  return fetch("http://localhost:8080", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      baseUrl: "",
      content: stringFromSearch(query.search),
    }),
  })
    .then((res) => res.json())
    .then((res) => {
      return {
        search: stringFromSearch(query.search),
        css: res.css,
        content: res.content,
        positionCursor: stringFromSearch(query.positionCursor),
        positionScroll: stringFromSearch(query.positionScroll),
      };
    });
};
