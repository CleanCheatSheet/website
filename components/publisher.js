import { Octokit } from "octokit";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import styles from "../styles/Publisher.module.css";
import { useSession } from "next-auth/react";
import { useState } from "react";

const MyOctokit = Octokit.plugin(createPullRequest);

export function Publisher() {
  const [inputs, setInputs] = useState({});
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

  function pullRequest(title, body, head, files, commit) {
    if (typeof session !== "undefined" && session !== null) {
      const octokit = new MyOctokit({ auth: session.accessToken });
      octokit
        .createPullRequest({
          owner: "CleanCheatSheet",
          repo: "sheets",
          title: title,
          body: body,
          base: "main" /* optional: defaults to default branch */,
          head: head,
          changes: [
            {
              /* optional: if `files` is not passed, an empty commit is created instead */
              files: files,
              // {
              // "git/README.md": input,
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
              // }
              commit: commit,
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
    pullRequest(
      inputs.title,
      inputs.body,
      inputs.head,
      {
        [`${inputs.sheet}/README.md`]: input,
      },
      inputs.commit
    );
    console.log("INPUTSS", inputs);
  };

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.headline}>
          <h2>Publish your sheet on GitHub</h2>
          <p>
            You can publish you sheet on GitHub, this will make the sheet
            available to you but also to the community.
          </p>
        </div>
        <div className={styles.formDiv}>
          {typeof session !== "undefined" && session !== null && (
            <>
              <form onSubmit={formHandleSubmit} className={styles.form}>
                <label className={styles.label}>
                  <div>Title:</div>
                  <input
                    type="text"
                    name="title"
                    value={inputs.title || ""}
                    onChange={formHandleChange}
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  <div>Sheet:</div>
                  <input
                    type="text"
                    name="sheet"
                    value={inputs.sheet || ""}
                    onChange={formHandleChange}
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  <div>Body:</div>
                  <input
                    type="text"
                    name="body"
                    value={inputs.body || ""}
                    onChange={formHandleChange}
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  <div>Head:</div>
                  <input
                    type="text"
                    name="head"
                    value={inputs.head || ""}
                    onChange={formHandleChange}
                    className={styles.input}
                  />
                </label>
                <label className={styles.label}>
                  <div>Commit:</div>
                  <input
                    type="text"
                    name="commit"
                    value={inputs.commit || ""}
                    onChange={formHandleChange}
                    className={styles.input}
                  />
                </label>
                <input type="submit" />
              </form>
            </>
          )}
          {(typeof session === "undefined" || session === null) && (
            <>
              <p>
                <center>You need to login</center>
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );
}
