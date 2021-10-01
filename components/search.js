import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/Search.module.css";

export function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [activeResultIndex, setActiveResultIndex] = useState(0);
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  const searchEndpoint = (query) => `/api/search?q=${query}`;
  function updateResults(query) {
    if (query !== "") {
      fetch(searchEndpoint(query))
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          setResults(res.results);
        });
    } else {
      setResults([]);
    }
  }

  const hasResults = results && results.length > 0;

  useEffect(() => {
    console.log("activeResultIndex::", activeResultIndex);
    if (hasResults) {
      if (activeResultIndex == 0) {
      } else {
        const resultsItems = Array.from(resultsRef.current.children);
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
    console.log("Strange effect!!");

    if (hasResults) {
      console.log("Strange effect and I am in");
      document.body.addEventListener("keydown", onKeyDown);
    } else {
      document.body.removeEventListener("keydown", onKeyDown);
    }
    return () => {
      document.body.removeEventListener("keydown", onKeyDown);
    };
  }, [hasResults]);

  function onKeyDown(event) {
    const isUp = event.key === "ArrowUp";
    const isDown = event.key === "ArrowDown";
    const isEnter = event.key === "Enter";

    const resultsItems = Array.from(resultsRef.current.children);

    if (isUp) {
      setActiveResultIndex((prevActiveResultIndex) =>
        Math.abs((prevActiveResultIndex - 1) % (resultsItems.length + 1))
      );
    }

    if (isDown) {
      setActiveResultIndex((prevActiveResultIndex) =>
        Math.abs((prevActiveResultIndex + 1) % (resultsItems.length + 1))
      );
    }

    if (isEnter) {
      if (activeResultIndex === 0) {
        console.log("Should redirect to seach page");
      } else {
        console.log(
          "activeResultIndex:: ",
          resultsItems[activeResultIndex - 1].lastChild
        );
        resultsItems[activeResultIndex - 1].lastChild.click();
      }
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

  function handleOnBlur() {
    setResults([]);
  }

  return (
    <div className={styles.module}>
      <div className={styles.container}>
        <input
          className={styles.search}
          placeholder="Search sheets"
          type="text"
          value={query}
          onChange={handleOnChange}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          ref={inputRef}
        />
        <p>{activeResultIndex}</p>
        {hasResults && (
          <ul ref={resultsRef} className={styles.results}>
            {results.map(({ title }) => {
              return (
                <li key={title} className={styles.result}>
                  <Link href="/[title]" as={`/${title}`}>
                    <a className={styles.link}>{title}</a>
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
