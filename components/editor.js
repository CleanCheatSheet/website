import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { useEffect, useRef, useState } from "react";

import { CleanCheatSheet } from "../components/sheet";
import CodeMirror from "@uiw/react-codemirror";
import { createSheet } from "../pages/[path]";
import { languages } from "@codemirror/language-data";
import styles from "../styles/Editor.module.css";

export function getSessionStorageOrDefault(key, defaultValue) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}

export function Editor() {
  const [input, setInput] = useState("");
  const [data, setData] = useState({ color: "black", title: "title" });
  const [sheets, setSheets] = useState([""]);
  var isHandlerDragging = false;
  const boxRef = useRef(null);
  const handlerRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    setInput(getSessionStorageOrDefault("input", ""));
    document.addEventListener("mousedown", function (e) {
      // If mousedown event is fired from .handler, toggle flag to true
      console.log("Mousse down::", e.target);
      if (e.target === handlerRef.current) {
        console.log("On Handler");
        isHandlerDragging = true;
      }
    });
    document.addEventListener("mousemove", function (e) {
      // Don't do anything if dragging flag is false
      console.log("Mousse Drag::", isHandlerDragging);
      if (!isHandlerDragging) {
        return false;
      }
      // Get offset
      var containerOffsetLeft = wrapperRef.current.offsetLeft;
      // Get x-coordinate of pointer relative to container
      var pointerRelativeXpos = e.clientX - containerOffsetLeft;
      // Arbitrary minimum width set on box A, otherwise its inner content will collapse to width of 0
      var boxAminWidth = 100;
      // Resize box A
      // * 8px is the left/right spacing between .handler and its inner pseudo-element
      // * Set flex-grow to 0 to prevent it from growing
      boxRef.current.style.width =
        Math.max(boxAminWidth, pointerRelativeXpos - 8) + "px";
      boxRef.current.style.flexGrow = 0;
    });
    document.addEventListener("mouseup", function (e) {
      // Turn off dragging flag when user mouse is up
      // setIsHandlerDragging(false);
      isHandlerDragging = false;
    });
  }, []);

  useEffect(() => {
    sessionStorage.setItem("input", JSON.stringify(input));
    updateSheet(input);
  }, [input]);

  async function updateSheet(input) {
    const sheet = createSheet(
      `${process.env.DOMAIN}/_next/image?w=256&q=100&url=`,
      input
    );
    setData(sheet.data);
    setSheets(sheet.sheets);
  }

  // function handleOnChange(event) {
  //   const input = event.target.value;
  //   setInput(input);
  // }
  function handleOnChange(value, viewUpdate) {
    setInput(value);
  }
  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div ref={boxRef} className={styles.container}>
        {/* <textarea
          className={styles.textarea}
          value={input}
          autoFocus
          onChange={handleOnChange}
        ></textarea> */}

        <CodeMirror
          value={input}
          height="100%"
          placeholder="Enter Markdown here"
          className={styles.codemirror}
          extensions={[
            markdown({ base: markdownLanguage, codeLanguages: languages }),
          ]}
          onChange={handleOnChange}
        />
      </div>
      <div ref={handlerRef} className={styles.handler}></div>
      <div className={styles.container}>
        <div className={styles.sheet}>
          <CleanCheatSheet
            title={data.title}
            color={data.firstColor}
            sheets={sheets}
          />
        </div>
      </div>
    </div>
  );
}
