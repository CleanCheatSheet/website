import { Action, App, Octokit } from "octokit";
import { useEffect, useRef, useState } from "react";

import { CleanCheatSheet } from "../components/sheet";
import Head from "next/head";
import { createPullRequest } from "octokit-plugin-create-pull-request";
// import hljs from "highlight.js";
// import marked from "marked";
// import matter from "gray-matter";
import { createSheet } from "./[path]";
import styles from "../styles/Create.module.css";
import { useSession } from "next-auth/react";

// marked.setOptions({
//   langPrefix: "hljs language-",
//   highlight: function (code) {
//     return hljs.highlightAuto(code, ["html", "javascript"]).value;
//   },
// });

// export function createSheet(baseUrl, content) {
//   const sheet = matter(content);
//   marked.setOptions({ baseUrl: baseUrl });
//   sheet.sheets = marked(sheet.content).split("+++");
//   return sheet;
// }

function getSessionStorageOrDefault(key, defaultValue) {
  const stored = sessionStorage.getItem(key);
  if (!stored) {
    return defaultValue;
  }
  return JSON.parse(stored);
}

export default function Create() {
  const MyOctokit = Octokit.plugin(createPullRequest);

  const [input, setInput] = useState("");
  const [data, setData] = useState({ color: "black", title: "title" });
  const [sheets, setSheets] = useState([""]);
  var isHandlerDragging = false;
  const boxRef = useRef(null);
  const handlerRef = useRef(null);
  const wrapperRef = useRef(null);
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [displayForm, setDisplayForm] = useState(false);
  const [inputs, setInputs] = useState({});

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      setImage(i);
      setCreateObjectURL(URL.createObjectURL(i));
    }
  };

  const uploadToServer = async (event) => {
    const body = new FormData();
    body.append("file", image);
    const response = await fetch("/api/file", {
      method: "POST",
      body,
    });
    const path = await response.text();
    console.log("Add path::", path);
    console.log(uploadedFiles);
    console.log([...uploadedFiles, path]);
    setUploadedFiles((prevArr) => [...prevArr, path]);
  };

  const { data: session } = useSession();

  function createRepo(name) {
    console.log("Create REPO function", session);
    setDisplayForm(!displayForm);
    // if (typeof session !== "undefined" && session !== null) {
    //   const octokit = new MyOctokit({ auth: session.accessToken });
    //   console.log("OCTOKIT::", octokit);
    //   octokit.rest.repos
    //     .createForAuthenticatedUser({
    //       name,
    //     })
    //     .then((res) => console.log("CREATION OF THE REPO: ", res))
    //     .catch((error) =>
    //       alert(
    //         `An error occured during the creation of the repository: \n${error}\n\nPlease try again.`
    //       )
    //     );
    // } else {
    //   alert("You need to login using GitHub first.");
    // }
  }

  function pullRequest() {
    console.log("Create REPO function", session);
    if (typeof session !== "undefined" && session !== null) {
      const octokit = new MyOctokit({ auth: session.accessToken });
      console.log("OCTOKIT::", octokit);
      octokit
        .createPullRequest({
          owner: "CleanCheatSheet",
          repo: "sheets",
          title: "update color",
          body: "change the color to lightgray to be able to read the text",
          base: "main" /* optional: defaults to default branch */,
          head: "new-color",
          changes: [
            {
              /* optional: if `files` is not passed, an empty commit is created instead */
              files: {
                "git/README.md": input,
                // "path/to/file2.png": {
                //   content: "_base64_encoded_content_",
                //   encoding: "base64",
                // },
                // // deletes file if it exists,
                // "path/to/file3.txt": null,
                // // updates file based on current content
                // "path/to/file4.txt": ({ exists, encoding, content }) => {
                //   // do not create the file if it does not exist
                //   if (!exists) return null;

                //   return Buffer.from(content, encoding)
                //     .toString("utf-8")
                //     .toUpperCase();
                // },
              },
              commit: "change color",
            },
          ],
        })
        .then((res) => console.log("CREATION OF THE PULL REQUEST: ", res))
        .catch((error) =>
          alert(
            `An error occured during the PULL REQUEST: \n${error}\n\nPlease try again.`
          )
        );
    } else {
      alert("You need to login using GitHub first.");
    }
  }

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

  function handleOnChange(event) {
    const input = event.target.value;
    setInput(input);
  }

  const formHandleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const formHandleSubmit = (event) => {
    event.preventDefault();
    console.log("INPUTSS", inputs);
  };

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
      <div className={styles.nav}>
        <button onClick={() => createRepo("CleanCheatSheets")}>
          create repo
        </button>
        <button onClick={() => pullRequest()}>create pull request</button>
        <input type="file" name="myImage" onChange={uploadToClient} />
        <button type="submit" onClick={uploadToServer}>
          Send to server
        </button>
        {JSON.stringify(uploadedFiles)}
      </div>
      {displayForm && (
        <>
          <div className={styles.form}>
            <form onSubmit={formHandleSubmit}>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={inputs.title || ""}
                  onChange={formHandleChange}
                />
              </label>
              <label>
                Body:
                <input
                  type="text"
                  name="body"
                  value={inputs.body || ""}
                  onChange={formHandleChange}
                />
              </label>
              <label>
                Head:
                <input
                  type="text"
                  name="head"
                  value={inputs.head || ""}
                  onChange={formHandleChange}
                />
              </label>
              <label>
                Commit:
                <input
                  type="text"
                  name="commit"
                  value={inputs.commit || ""}
                  onChange={formHandleChange}
                />
              </label>
              <input type="submit" />
            </form>
          </div>
        </>
      )}
      {!displayForm && (
        <>
          <div ref={wrapperRef} className={styles.wrapper}>
            <div ref={boxRef} className={styles.container}>
              <textarea
                className={styles.textarea}
                value={input}
                autoFocus
                onChange={handleOnChange}
              ></textarea>
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
        </>
      )}
    </>
  );
}
