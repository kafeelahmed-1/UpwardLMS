import React, { useState } from "react";
import DownloadIcon from "../../assets/download.svg";
import CrossIcon from "../../assets/Cross.svg";

const UpdateFile = ({ fileId, fileName, onDelete }) => {
  console.log("file id", fileId);
  console.log("fileName", fileName);
  console.log(onDelete);

  const [showInsertFields, setShowInsertFields] = useState(false);

  const handleDownload = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    fetch(`${process.env.REACT_APP_BASE_URL}/api/FileDocument/File/${fileId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/pdf",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const a = document.createElement("a");
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      })
      .catch((error) => {
        console.error("Error downloading file:", error);
      });
  };

  return (
    <div className="update-file-container">
      {fileId ? ( // Check if fileId exists
        <>
          <div className="file-info">
            <p className="file-name">{fileName}</p>
          </div>
          <div className="file-actions">
            <button onClick={handleDownload} className="icon-button">
              <img src={DownloadIcon} alt="download" className="icon" />
            </button>
            <button onClick={onDelete} className="icon-button">
              <img src={CrossIcon} alt="delete" className="icon" />
            </button>
          </div>
        </>
      ) : (
        <div className="no-file">
          <p>No file uploaded. Please upload a file.</p>
        </div>
      )}
    </div>
  );
};

export default UpdateFile;
