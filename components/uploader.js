import { useEffect, useState } from "react";

import Image from "next/image";
import { getSessionStorageOrDefault } from "../utils/storage";
import styles from "../styles/Uploader.module.css";

export function Uploader() {
  const [image, setImage] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    setUploadedFiles(getSessionStorageOrDefault("uploadedFiles", []));
  }, []);

  useEffect(() => {
    sessionStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
  }, [uploadedFiles]);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImage(i);
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
    setUploadedFiles((prevArr) => [...prevArr, path]);
  };
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles.headline}>
            <h2>Add images to the sheet</h2>
            <p>
              You can upload images to our server the time to create the sheet.
              Once published, sheets' assets are stored on GitHub directly.
              Uploaded images will be stored 24 hours in the server.
            </p>
          </div>
          <div className={styles.uploader}>
            <input
              type="file"
              accept="image/png, image/jpeg"
              name="myImage"
              onChange={uploadToClient}
              className={styles.input}
            />
            <button type="submit" onClick={uploadToServer}>
              Send to server
            </button>
          </div>
        </div>
        <div className={styles.images}>
          {uploadedFiles.map((path) => {
            return (
              <div className={styles.image}>
                <Image
                  alt={path}
                  src={path}
                  width={256}
                  height={256}
                  objectFit="contain"
                />
                <p className={styles.path}>{path}</p>
                <button
                  onClick={() => {
                    setUploadedFiles(
                      uploadedFiles.filter((item) => item !== path)
                    );
                  }}
                >
                  delete
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
