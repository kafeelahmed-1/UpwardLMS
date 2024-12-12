import React from "react";
import DownloadIcon from "../../assets/download.svg";

const FileDocument = ({ fileId, fileName }) => {
  const handleDownload = () => {
    const token = localStorage.getItem("token");
    fetch(`http://localhost:7372/api/FileDocument/File/${fileId}`, {
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
    <div
      style={{
        width: 395,
        height: 40,
        backgroundColor: "#4CA1540D",
        border: "1px solid #4CA1544D",
        borderRadius: 8,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", padding: 15 }}>
        <p
          style={{
            color: "#121826",
            fontWeight: 600,
            fontSize: 14,
            paddingLeft: 10,
            textDecoration: "underline",
          }}
        >
          {fileName}
        </p>
      </div>
      <div style={{ display: "flex" }}>
        <button onClick={handleDownload}>
          <img
            src={DownloadIcon}
            alt="download"
            style={{ width: 17, height: 17, marginRight: 20 }}
          />
        </button>
      </div>
    </div>
  );
};

export default FileDocument;
