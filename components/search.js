import { useEffect, useRef, useState } from "react";

import Link from "next/link";
import Router from "next/router";
import styles from "../styles/Search.module.css";

const NumberMaxOfResults = 5;

function getCorrectResultIndex(index, length) {
  if (index === -1) {
    return length;
  }
  return index;
}

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeResultIndex, setActiveResultIndex] = useState(0);
  const [isEnterDown, setIsEnterDown] = useState(false);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);
  const wrapperRef = useRef(null);

  const searchEndpoint = (query) => `/api/search?q=${query}`;
  function updateResults(query) {
    fetch(searchEndpoint(query))
      .then((res) => res.json())
      .then((res) => {
        setResults(res.results.slice(0, NumberMaxOfResults));
      });
  }

  const hasResults = results && results.length > 0;

  useEffect(() => {
    if (hasResults) {
      const resultsItems = Array.from(resultsRef.current.children);
      if (activeResultIndex == 0) {
        resultsItems.map((item) =>
          item.lastChild.classList.remove(styles.hover)
        );
      } else {
        resultsItems.map((item, index) => {
          if (index === activeResultIndex - 1) {
            item.lastChild.classList.add(styles.hover);
          } else {
            item.lastChild.classList.remove(styles.hover);
          }
        });
      }
    }
  }, [activeResultIndex]);

  useEffect(() => {
    if (isEnterDown) {
      if (activeResultIndex === 0) {
        Router.push({
          pathname: "/search",
          query: { search: encodeURI(query) },
        });
      } else {
        const resultsItems = Array.from(resultsRef.current.children);
        resultsItems[activeResultIndex - 1].lastChild.click();
      }
      setQuery("");
      setResults([]);
      setIsEnterDown(false);
      document.activeElement.blur();
    }
    return () => {
      setIsEnterDown(false);
    };
  }, [isEnterDown]);

  useEffect(() => {
    if (hasResults) {
      document.body.addEventListener("keydown", onKeyDown);
    } else {
      document.body.removeEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    };
  }, [hasResults]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResults([]);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  function onKeyDown(event) {
    const isUp = event.key === "ArrowUp";
    const isDown = event.key === "ArrowDown";
    const isEnter = event.key === "Enter";

    const resultsItems = Array.from(resultsRef.current.children);

    if (isUp) {
      setActiveResultIndex((prevActiveResultIndex) =>
        getCorrectResultIndex(
          (prevActiveResultIndex - 1) % (resultsItems.length + 1),
          resultsItems.length
        )
      );
    }

    if (isDown) {
      setActiveResultIndex((prevActiveResultIndex) =>
        getCorrectResultIndex(
          (prevActiveResultIndex + 1) % (resultsItems.length + 1),
          resultsItems.length
        )
      );
    }

    if (isEnter) {
      setIsEnterDown(true);
    }
  }

  function handleOnChange(event) {
    const query = event.target.value;
    setQuery(query);
    updateResults(query);
  }

  function handleOnFocus() {
    updateResults(query);
  }
  return (
    <div className={styles.module}>
      <div ref={wrapperRef}>
        <input
          className={styles.search}
          placeholder="Search sheets"
          type="text"
          value={query}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          ref={inputRef}
        />
        {hasResults && (
          <ul ref={resultsRef} className={styles.results}>
            {results.map(({ title }) => {
              return (
                <li key={title} className={styles.result}>
                  <Link href={`/${title}`} as={`/${title}`}>
                    <a
                      onClick={() => {
                        setQuery("");
                        setResults([]);
                        document.activeElement.blur();
                      }}
                      className={styles.link}
                    >
                      <p>{title}</p>
                    </a>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
