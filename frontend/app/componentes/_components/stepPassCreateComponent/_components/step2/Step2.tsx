import React, { useState, useEffect } from "react";
import styles from "./Step2.module.css";
import { CircleCheckIcon, HelpCircle } from "lucide-react";

interface Step2Props {
  files: File[];
  onUploadComplete: () => void;
}

interface Progress {
  [key: string]: number;
}

const getIconForFileType = (fileName: string) => {
  const ext = fileName.split(".").pop()?.toLowerCase();

  switch (ext) {
    case "tsx":
      return <img src="/reactIcon.svg" alt="React" className={styles.fileIcon} />;
    case "css":
      return <img src="/cssIcon.svg" alt="css" className={styles.fileIcon} />;
    case "md":
      return <img src="/readmeIcon.svg" alt="markdown" className={styles.fileIcon} />;
    default:
      return <HelpCircle className={styles.fileIcon} />;
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

const Step2: React.FC<Step2Props> = ({ files, onUploadComplete }) => {
  const [progress, setProgress] = useState<Progress>({});
  const [showSuccess, setShowSuccess] = useState<boolean>(false);
  const [uploading, setUploading] = useState<boolean>(false);

  useEffect(() => {
    if (uploading) {
      uploadAllFiles();
    }
  }, [uploading]);

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        onUploadComplete();
      }, 2000); 

      return () => clearTimeout(timer);
    }
  }, [showSuccess, onUploadComplete]);

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
          setShowSuccess(true); 
          setUploading(false); 
        }
      });
    });
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
      {showSuccess && (
        <div className={styles.boxSuccesMessage}>
          <p className={styles.successMessageStrong}>
            ¡Subida exitosa! <CircleCheckIcon className={styles.successIcon} />
          </p>
          <p className={styles.successMessage}>
            total de archivos requeridos completos
          </p>
        </div>
      )}
      <button
        className={styles.uploadButton}
        onClick={() => {
          if (!uploading && !showSuccess) {
            setUploading(true);
          }
        }}
        disabled={uploading} 
      >
        Comenzar
      </button>
    </div>
  );
};

export default Step2;
