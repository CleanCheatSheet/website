import { useEffect, useState } from "react";

import { CardMosaic } from "../components/card";
import Head from "next/head";
import { Navbar } from "../components/navbar";
import Router from "next/router";
import styles from "../styles/SearchPage.module.css";
import stylesSearch from "../styles/Search.module.css";

function stringFromSearch(search) {
  return search ? decodeURIComponent(search) : "";
}

export default function SearchPage({ query: { search } }) {
  const [results, setResults] = useState([]);
  const updateQuery = (newQuery) => {
    Router.push({
      pathname: "/",
      query: { search: encodeURI(newQuery) },
    });
  };

  const searchEndpoint = (query) => `/api/search?q=${query}`;
  function updateResults(query) {
    fetch(searchEndpoint(query))
      .then((res) => {
        res.json().then((data) => {
          setResults(data);
        });
      })
      .catch((error) => {
        alert(`Error while calling the search API: ${error}`);
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
    <>
      <Head>
        <title>Clean Cheat Sheet</title>
        <meta name="description" content="Clean Cheat Sheet for everything" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar
        search={
          <div className={stylesSearch.wrapper}>
            <input
              className={stylesSearch.search}
              placeholder="Search sheets"
              type="text"
              value={stringFromSearch(search)}
              onChange={handleOnChange}
            />
          </div>
        }
      />
      <div className={styles.searchDiv}>
        <CardMosaic
          displayText={false}
          cards={results.map(({ title, description, url, index }) => {
            return {
              key: index,
              link: `/${url}`,
              title: title,
              description: description,
              src: "/markdown.png",
            };
          })}
        />
      </div>
    </>
  );
}

SearchPage.getInitialProps = ({ query }) => {
  return { query };
};
