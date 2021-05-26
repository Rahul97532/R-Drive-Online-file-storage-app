import React from "react";
import { useParams } from "react-router-dom";
import useFolder from "../../Hooks/useFolder";
import AddFolderButton from "./AddFolderButton";
import Folder from "./Folder";
import NavBar from "./NavBar";
import "./Dashboard.css";
import FolderBreadcrumbs from "./FolderBreadcrumbs";
import AddFileButton from "./AddFileButton";
import File from "./File";

function Dashboard() {
  const { folderId } = useParams();
  const { folder, childFolders, childFiles } = useFolder(folderId);
  console.log(childFolders);
  return (
    <div>
      <NavBar />
      <div className="breadcrumbs">
        <FolderBreadcrumbs
          className="breadcrumbs_path"
          currentFolder={folder}
        />
        <div className="addButtons">
          <AddFileButton className="addfile" currentFolder={folder} />
          <AddFolderButton className="addfolder" currentFolder={folder} />
        </div>
      </div>
      {childFolders.length > 0 && (
        <div className="folder_section">
          {childFolders.map((childFolder) => (
            <div className="folder_div" key={childFolder.id}>
              <Folder className="folder" folder={childFolder} />
            </div>
          ))}
        </div>
      )}
      {childFolders.length > 0 && childFiles.length > 0 && <hr />}
      {childFiles.length > 0 && (
        <div className="file_section">
          {childFiles.map((childFile) => (
            <div className="file_div" key={childFile.id}>
              <File className="files" file={childFile} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
