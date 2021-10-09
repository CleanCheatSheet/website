import Head from "next/head";

import styles from "../styles/SearchPage.module.css";
import stylesSearch from "../styles/Search.module.css";
import Router from "next/router";
import { useEffect } from "react";
import { useState } from "react";

import { CardMosaic } from "../components/card";

function stringFromSearch(search) {
  return search ? decodeURIComponent(search) : "";
}

export default function SearchPage({ query: { search } }) {
  const [results, setResults] = useState([]);
  const updateQuery = (newQuery) => {
    Router.push({
      pathname: "/search",
      query: { search: encodeURI(newQuery) },
    });
  };

  const searchEndpoint = (query) => `/api/search?q=${query}`;
  function updateResults(query) {
    fetch(searchEndpoint(query))
      .then((res) => res.json())
      .then((res) => {
        setResults(res.results);
      });
  }

  useEffect(() => {
    updateResults(stringFromSearch(search));
  }, [search]);

  function handleOnChange(event) {
    const query = event.target.value;
    updateQuery(query);
  }

  return (
    <div className={styles.wrapper}>
      <Head>
        <title>Clean Cheat Sheet</title>
        <meta name="description" content="Clean Cheat Sheet for everything" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.searchDiv}>
        <div className={styles.inputDiv}>
          <input
            className={stylesSearch.search}
            placeholder="Search sheets"
            type="text"
            value={stringFromSearch(search)}
            onChange={handleOnChange}
          />
        </div>
        <CardMosaic
          displayText={false}
          cards={results.map(({ title, index }) => {
            return {
              key: index,
              link: `/${title}`,
              title: title,
              description:
                "Blablablabl ablablabla balblab blablablbal blablabl bla.",
              src: "/markdown.png",
            };
          })}
        />
      </div>
      <div className={styles.tagsDiv}></div>
    </div>
  );
}

SearchPage.getInitialProps = ({ query }) => {
  return { query };
};
