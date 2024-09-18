import React, { useState } from "react";
import styles from "./Step2.module.css";
import { CircleCheckIcon, Layers } from "lucide-react";
import { Peace } from "react-bootstrap-icons";

interface Step2Props {
  files: File[];
}

interface Progress {
  [key: string]: number;
}

const getIconForFileType = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "tsx":
      return (
        <img src="/reactIcon.svg" alt="React" className={styles.fileIcon} />
      );
    case "css":
      return <Peace />;
    default:
      return <Layers />;
  }
};

function formatFileSize(sizeInBytes: number) {
  if (sizeInBytes >= 1024 * 1024) {
    return (sizeInBytes / (1024 * 1024)).toFixed(2) + " MB";
  } else if (sizeInBytes >= 1024) {
    return (sizeInBytes / 1024).toFixed(2) + " KB";
  } else {
    return sizeInBytes + " bytes";
  }
}

const Step2: React.FC<Step2Props> = ({ files }) => {
  const [progress, setProgress] = useState<Progress>({});
  const [uploadComplete, setUploadComplete] = useState<boolean>(false);

  const simulateUpload = (file: File, callback: () => void) => {
    let progressValue = 0;
    const interval = setInterval(() => {
      progressValue += 10;
      setProgress((prev) => ({
        ...prev,
        [file.name]: Math.min(progressValue, 100),
      }));
      if (progressValue >= 100) {
        clearInterval(interval);
        callback();
      }
    }, 500);
  };

  const uploadAllFiles = () => {
    let filesToUpload = files.length;
    files.forEach((file) => {
      simulateUpload(file, () => {
        filesToUpload -= 1;
        if (filesToUpload === 0) {
          setUploadComplete(true);
        }
      });
    });
  };

  const handleUpload = () => {
    setUploadComplete(false);
    uploadAllFiles();
  };

  return (
    <div className={styles.fileList}>
      {files.length > 0 ? (
        files.map((file, index) => (
          <div key={index} className={styles.fileItem}>
            <div className={styles.fileIcon}>
              {getIconForFileType(file.name)}
            </div>
            <div className={styles.fileName}>
              <p>{file.name}</p>
              {formatFileSize(file.size)}
            </div>
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${progress[file.name] || 0}%` }}
              ></div>
            </div>
            <p>{progress[file.name] || 0}% </p>
          </div>
        ))
      ) : (
        <p>No files uploaded yet.</p>
      )}
      {uploadComplete && (
        <div className={styles.boxSuccesMessage}>
          <p className={styles.successMessageStrong}>¡Subida exitosa! <CircleCheckIcon className={styles.successIcon}/></p>
          <p className={styles.successMessage}>total de archivos requeridos completos</p>
        </div>
      )}
      {files.length > 0 && (
        <button className={styles.uploadButton} onClick={handleUpload}>
          Comenzar
        </button>
      )}
    </div>
  );
};

export default Step2;
