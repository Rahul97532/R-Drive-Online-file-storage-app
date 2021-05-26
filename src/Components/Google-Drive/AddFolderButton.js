import React, { useState } from "react";
import Modal from "react-modal";
import { database } from "../../Firebase";
import { useAuth } from "../../Context/AuthContext";
import "./AddFolderButton.css";
import { ROOT_FOLDER } from "../../Hooks/useFolder";

Modal.setAppElement("#root");

function AddFolderButton({ currentFolder }) {
  const [modelIsOpen, setModelIsOpen] = useState(false);
  const [name, setName] = useState("");
  const { currentUser } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();

    if (currentFolder == null) return;

    const path = [...currentFolder.path];
    if (currentFolder !== ROOT_FOLDER) {
      path.push({ name: currentFolder.name, id: currentFolder.id });
    }

    // Create a folder in the database
    database.folders.add({
      name: name,
      parentId: currentFolder.id,
      userId: currentUser.uid,
      path: path,
      createdAt: database.getCurrentTimestamp(),
    });
    setName("");
    setModelIsOpen(false); //Close the modal by setting it to false
  }

  return (
    <div>
      <button
        className="add_folder_button"
        title="Create a folder"
        onClick={() => setModelIsOpen(true)}
      >
        <i className="fas fa-folder-plus"></i>
      </button>
      <Modal
        className="Modal"
        overlayClassName="Overlay"
        // portalClassName="mymodal"
        // bodyOpenClassName="modal_body"
        isOpen={modelIsOpen}
        onRequestClose={() => setModelIsOpen(false)}
      >
        <form onSubmit={handleSubmit}>
          <h2>Folder Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <div>
            <button className="Modal_add_button" type="submit">
              Add Folder
            </button>
            <button
              className="Modal_close_button"
              type="button"
              onClick={() => setModelIsOpen(false)}
            >
              Close
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default AddFolderButton;
