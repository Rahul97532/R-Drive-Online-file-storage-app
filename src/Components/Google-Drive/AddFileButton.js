import React, { useState } from "react";
import ReactDOM from "react-dom";
import { database, storage } from "../../Firebase";
import { useAuth } from "../../Context/AuthContext";
import { ROOT_FOLDER } from "../../Hooks/useFolder";
import { v4 as uuidV4 } from "uuid";
import "./AddFileButton.css";

function AddFileButton({ currentFolder }) {
  const [uplaodingFiles, setUplaodingFiles] = useState([]);
  const { currentUser } = useAuth();
  function handleUpload(e) {
    const file = e.target.files[0];
    if (currentFolder == null || file == null) return;

    const id = uuidV4();
    setUplaodingFiles((prevUploadingFiles) => [
      ...prevUploadingFiles,
      { id: id, name: file.name, progress: 0, error: false },
    ]);
    const filePath =
      currentFolder === ROOT_FOLDER
        ? `${currentFolder.path.join("/")}/${file.name}`
        : `${currentFolder.path.join("/")}/${currentFolder.name}/${file.name}`;
    const uploadTask = storage
      .ref(`/files/${currentUser.uid}/${filePath}`)
      .put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //This part handles while in progress
        const progress = snapshot.bytesTransferred / snapshot.totalBytes;
        setUplaodingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) {
              return { ...uploadFile, progress: progress };
            }
            return uploadFile;
          });
        });
      },
      //This part handles errors
      () => {
        setUplaodingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.map((uploadFile) => {
            if (uploadFile.id === id) return { ...uploadFile, error: true };
            return uploadFile;
          });
        });
      },
      //This part handles after upload is completed
      () => {
        // setUplaodingFiles((prevUploadingFiles) => {
        //   return prevUploadingFiles.map((uploadFile) => {
        //     if (uploadFile.id === id) return { ...uploadFile, error: true };
        //     return uploadFile;
        //   });
        // });

        setUplaodingFiles((prevUploadingFiles) => {
          return prevUploadingFiles.filter(
            (uploadFile) => uploadFile.id !== id
          );
        });
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
          database.files
            .where("name", "==", file.name)
            .where("userId", "==", currentUser.uid)
            .where("folderId", "==", currentFolder.id)
            .get()
            .then((existingFiles) => {
              const existingFile = existingFiles.docs[0];
              if (existingFile) {
                existingFile.ref.update({ url: url });
              } else {
                database.files.add({
                  url: url,
                  name: file.name,
                  createdAt: database.getCurrentTimestamp(),
                  folderId: currentFolder.id,
                  userId: currentUser.uid,
                });
              }
            });
        });
      }
    );
  }

  return (
    <>
      <div className="file_button" title="Add File">
        <i className="fas fa-file-upload">
          <input type="file" onChange={handleUpload} />
        </i>
      </div>
      {uplaodingFiles.length > 0 &&
        ReactDOM.createPortal(
          <div className="progress_container">
            {uplaodingFiles.map((file) => (
              <div key={file.id}>
                <div className="head">
                  <header>{file.name}</header>

                  {file.error ? (
                    <button
                      onClick={() => {
                        setUplaodingFiles((prevUploadingFiles) => {
                          return prevUploadingFiles.filter((uploadFile) => {
                            return uploadFile.id !== file.id;
                          });
                        });
                      }}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                  ) : null}
                </div>
                {/* <div>{file.progress * 100}</div> */}

                {file.error ? (
                  <>
                    <div className="progress_error">Error Occured</div>
                    <progress className="error_progress" max="100" value="0">
                      Error Occured
                    </progress>
                  </>
                ) : (
                  <>
                    <div className="progress_successful">
                      {Math.floor(file.progress * 100)}%
                    </div>
                    <progress
                      max="100"
                      value={`${Math.floor(file.progress * 100)}`}
                    >{`${Math.floor(file.progress * 100)}`}</progress>
                  </>
                )}

                {/* <progress
                  max="100"
                  value={`${Math.floor(file.progress * 100)}`}
                >
                  {file.error ? "error" : `${Math.floor(file.progress * 100)}%`}
                </progress> */}
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}

export default AddFileButton;
