import React from "react";
import { Link } from "react-router-dom";
import { ROOT_FOLDER } from "../../Hooks/useFolder";
import "./FolderBreadcrumbs.css";

function FolderBreadcrumbs({ currentFolder }) {
  let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
  if (currentFolder) path = [...path, ...currentFolder.path];

  return (
    <>
      <span className="whole_breadcrumb">
        {path.map((folder, index) => (
          <span className="breadcrumb" key={folder.id}>
            <Link
              className="breadcrumb_link"
              to={folder.id ? `/folder/${folder.id}` : "/"}
            >
              <span>{folder.name}</span>
            </Link>
            <span>/</span>
          </span>
        ))}
        <span className="current_folder_name">
          {currentFolder && currentFolder.name}
        </span>
      </span>
      {/* <span className="current_folder_name">
        {currentFolder && currentFolder.name}
      </span> */}
    </>
  );
}

export default FolderBreadcrumbs;
