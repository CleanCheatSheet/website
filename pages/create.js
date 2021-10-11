import { Action, App, Octokit } from "octokit";
import { useEffect, useRef, useState } from "react";

import { Editor } from "../components/editor";
import Head from "next/head";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import styles from "../styles/Create.module.css";
import { useSession } from "next-auth/react";

export default function Create() {
  const MyOctokit = Octokit.plugin(createPullRequest);

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
      {!displayForm && <Editor />}
    </>
  );
}
