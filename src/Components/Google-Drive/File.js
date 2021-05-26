import React from "react";
import "./File.css";
function File({ file }) {
  return (
    <a className="link" href={file.url} target="_blank" title={file.name}>
      <div className="user_file">
        <i class="fas fa-file"></i> <span>{file.name}</span>
      </div>
    </a>
  );
}

export default File;
