import { useEffect, useState } from "react";

import { Octokit } from "octokit";
import { createPullRequest } from "octokit-plugin-create-pull-request";
import { getSessionStorageOrDefault } from "./editor";
import styles from "../styles/Publisher.module.css";
import { useSession } from "next-auth/react";

const MyOctokit = Octokit.plugin(createPullRequest);

function getAllSheets({
  octokitSession,
  owner,
  repo,
  setUserRepoExists,
  setAllSheets,
  setUsername,
}) {
  if (!owner) {
    octokitSession.rest.users.getAuthenticated().then((res) => {
      setUsername(res.data.login);
      octokitSession
        .request(`GET /users/${res.data.login}/repos`)
        .then((res) => {
          const repos = res.data.map((r) => r.name);
          if (repos.includes(repo)) {
            setUserRepoExists(true);
            if (res.data[repos.indexOf(repo)].size !== 0) {
              octokitSession.rest.repos
                .getContent({
                  owner: res.data[repos.indexOf(repo)].owner.login,
                  repo: repo,
                  path: "",
                })
                .then((res) => {
                  setAllSheets(res.data.map((d) => d.name));
                })
                .catch((error) => {
                  alert(
                    `An error during the call to the GitHub API to obtain content of the CleanCheatSheet repo: \n${error}\n\n Please try again.`
                  );
                });
            } else {
              setAllSheets([]);
            }
          } else {
            setUserRepoExists(false);
            setAllSheets([]);
          }
        })
        .catch((error) => {
          alert(
            `An error during the call to the GitHub API to obtain user information: \n${error}\n\n Please try again.`
          );
        });
    });
  } else {
    octokitSession.rest.repos
      .getContent({
        owner: owner,
        repo: repo,
        path: "",
      })
      .then((res) => {
        setUserRepoExists(true);
        setAllSheets(res.data.map((d) => d.name));
      })
      .catch((error) => {
        setUserRepoExists(false);
        setAllSheets([]);
      });
  }
}

function base64FromPath(imgUrl) {
  return new Promise(function (resolve, reject) {
    var img = new Image();
    img.src = imgUrl;
    img.setAttribute("crossOrigin", "anonymous");

    img.onload = function () {
      var canvas = document.createElement("canvas");
      canvas.width = img.width;
      canvas.height = img.height;
      var ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      var dataURL = canvas.toDataURL("image/png");
      resolve(dataURL.replace(/^data:image\/(png|jpg);base64,/, ""));
    };
    img.onerror = function () {
      reject("The image could not be loaded.");
    };
  });
}

async function extractImages(input) {
  const imgPathRegex =
    /!\[[^\]]*\]\((?<filename>.*?)(?=\"|\))(?<optionalpart>\".*\")?\)/g;
  const imgPaths = [...input.matchAll(imgPathRegex)]
    .map((item) => item[1])
    .filter((path) => /^\/tmp\/.+$/.test(path));
  const imgBase64 = await Promise.all(
    imgPaths.map(async (path) => base64FromPath(path))
  );
  return Object.assign(
    ...imgPaths
      .map((path) => path.replace("/tmp/", ""))
      .map((path, index) => ({ [path]: imgBase64[index] }))
  );
}

async function createRepo({ octokitSession, repo }) {
  try {
    await octokitSession.rest.repos.createForAuthenticatedUser({
      name: repo,
      auto_init: true,
    });
  } catch (error) {
    alert(
      `An error occured during the creation of the repository: \n${error}\n\nPlease try again.`
    );
  }
}

async function publishSheet({
  octokitSession,
  input,
  images,
  owner,
  repo,
  sheet,
  title = null,
  setPullRequestResult,
}) {
  const files = Object.fromEntries(
    Object.entries(images).map(([path, value]) => [
      `${sheet}/assets/${path}`,
      {
        content: value,
        encoding: "base64",
      },
    ])
  );
  files[`${sheet}/README.md`] = input.replaceAll("/tmp/", "assets/");
  try {
    const res = await octokitSession.createPullRequest({
      owner: owner,
      repo: repo,
      title: title ? title : `Creation of the sheet ${sheet}`,
      body: "",
      base: "main" /* optional: defaults to default branch */,
      head: title
        ? `update-of-the-sheet-${sheet}-${Date.now()}`
        : `creation-of-the-sheet-${sheet}-${Date.now()}`,
      changes: [
        {
          /* optional: if `files` is not passed, an empty commit is created instead */
          files: files,
          commit: title ? "update of the sheet" : "creation of the sheet",
        },
      ],
    });
    setPullRequestResult(res.data.html_url);
  } catch (error) {
    alert(
      `An error occured during the PULL REQUEST: \n${error}\n\nPlease try again.`
    );
  }
}

export function Publisher() {
  const [input, setInput] = useState("");
  const [inputs, setInputs] = useState({});
  const [sheetType, setSheetType] = useState(null);
  const [octokitSession, setOctokitSession] = useState(null);
  const [username, setUsername] = useState(null);
  const [userRepoExists, setUserRepoExists] = useState(null);
  const [allSheets, setAllSheets] = useState([]);
  const [sheetExists, setSheetExists] = useState(null);
  const [pullRequestResult, setPullRequestResult] = useState(null);
  const { data: session } = useSession();

  if (
    typeof session !== "undefined" &&
    session !== null &&
    octokitSession === null
  ) {
    setOctokitSession(new MyOctokit({ auth: session.accessToken }));
  }

  useEffect(() => {
    setInput(getSessionStorageOrDefault("input", ""));
  }, []);

  useEffect(() => {
    if ("sheet" in inputs) {
      setSheetExists(allSheets.includes(inputs.sheet.replaceAll(" ", "_")));
    }
  }, [inputs, allSheets]);

  const formHandleSubmit = async (event) => {
    event.preventDefault();
    const images = await extractImages(input);
    if (!userRepoExists) {
      await createRepo({
        octokitSession: octokitSession,
        repo: "CleanCheatSheet",
      });
    }
    publishSheet({
      octokitSession: octokitSession,
      input: input,
      images: images,
      owner: sheetType === "community" ? "CleanCheatSheet" : username,
      repo: sheetType === "community" ? "sheets" : "CleanCheatSheet",
      sheet: inputs.sheet.replaceAll(" ", "_"),
      title:
        "modification" in inputs && sheetExists ? inputs.modification : null,
      setPullRequestResult: setPullRequestResult,
    });
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
        {typeof session !== "undefined" && session !== null && (
          <>
            <div className={styles.form}>
              <div className={styles.form1}>
                <p>Select the type of your sheet:</p>
                <div>
                  <input
                    type="radio"
                    id="community"
                    name="sheetType"
                    value="Community sheet"
                    onChange={(value) => {
                      setSheetType("community");
                      getAllSheets({
                        octokitSession: octokitSession,
                        owner: "CleanCheatSheet",
                        repo: "sheets",
                        setUserRepoExists: setUserRepoExists,
                        setAllSheets: setAllSheets,
                        setUsername: setUsername,
                      });
                    }}
                  />
                  <label htmlFor="community">Community sheet</label>
                </div>
                <div>
                  <input
                    type="radio"
                    id="personal"
                    name="sheetType"
                    value="Personal sheet"
                    onChange={() => {
                      setSheetType("personal");
                      getAllSheets({
                        octokitSession: octokitSession,
                        owner: "",
                        repo: "CleanCheatSheet",
                        setUserRepoExists: setUserRepoExists,
                        setAllSheets: setAllSheets,
                        setUsername: setUsername,
                      });
                    }}
                  />
                  <label htmlFor="personal">Personal sheet</label>
                </div>
                {sheetType === "community" && (
                  <p>Community Sheet explaination</p>
                )}
                {sheetType === "personal" && userRepoExists !== null && (
                  <p>Personal Sheet explaination {userRepoExists.toString()}</p>
                )}
              </div>
              {sheetType !== null && (
                <div className={styles.form2}>
                  <form onSubmit={formHandleSubmit}>
                    <div>
                      <label htmlFor="sheet">Name of the sheet:</label>
                      <br></br>
                      <input
                        type="text"
                        name="sheet"
                        value={inputs.sheet || ""}
                        onChange={(event) => {
                          setInputs((values) => ({
                            ...values,
                            [event.target.name]: event.target.value,
                          }));
                        }}
                      />
                    </div>
                    {sheetExists && (
                      <div>
                        <label htmlFor="modification">
                          Explain the modification you made to the sheet:
                        </label>
                        <br></br>
                        <input
                          type="text"
                          name="modification"
                          value={inputs.modification || ""}
                          onChange={(event) => {
                            setInputs((values) => ({
                              ...values,
                              [event.target.name]: event.target.value,
                            }));
                          }}
                        />
                      </div>
                    )}
                    <div>
                      <input type="submit" name="publish" value="Publish" />
                    </div>
                  </form>
                  {pullRequestResult && (
                    <div>
                      <p>
                        Pull request successufuly created, you can have a look
                        on <a href={pullRequestResult}>GitHub</a>.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
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
    </>
  );
}
