import React from "react";
import { Link } from "react-router-dom";
import "./Folder.css";
function Folder(props) {
  return (
    <Link className="link" to={`/folder/${props.folder.id}`}>
      <div className="folder" title={props.folder.name}>
        <i class="fas fa-folder"></i>
        <span>{props.folder.name}</span>
      </div>
    </Link>
  );
}

export default Folder;
