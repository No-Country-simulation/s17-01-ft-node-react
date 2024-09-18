/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState, ChangeEvent } from 'react';
import styles from './FileUpload.module.css';

interface Progress {
  [key: string]: number;
}

// Define un mapeo de extensiones a íconos
const fileIcons: { [key: string]: string } = {
  js: '/icons/js-icon.png',
  jsx: '/reactIcon.svg',
  ts: '/icons/ts-icon.png',
  tsx: '/icons/react-icon.png',
  css: '/cssIcon.svg',
  html: '/icons/html-icon.png',
  ppt: '/icons/powerpoint-icon.png',
  pdf: '/icons/pdf-icon.png',
  docx: '/icons/word-icon.png',
  md:'readmeIcon.svg'
  // Agrega más extensiones e íconos aquí según lo necesites
};

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [progress, setProgress] = useState<Progress>({});

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(selectedFiles);
    setProgress({});
  };

  // Función para simular la subida de archivos
  const handleUpload = () => {
    files.forEach((file, index) => {
      setTimeout(() => {
        setProgress((prev) => ({
          ...prev,
          [file.name]: Math.min(((index + 1) * 100) / files.length, 100),
        }));
      }, index * 1000);
    });
  };

  // Función para obtener el icono según el tipo de archivo
  const getFileIcon = (file: File) => {
    const extension = file.name.split('.').pop()?.toLowerCase();
    if (extension && fileIcons[extension]) {
      return fileIcons[extension]; // Devuelve la ruta del ícono correspondiente
    }
    return '/icons/default-icon.png'; // Devuelve un ícono genérico si no coincide con ningún tipo
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Subir archivo</h2>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
        className={styles.input}
      />
      <div className={styles.fileList}>
        {files.map((file) => (
          <div key={file.name} className={styles.fileItem}>
              <img
                src={getFileIcon(file)}
                alt={file.name}
                className={styles.fileIcon}
              />
           
            <div className={styles.progressBar}>
              <div
                className={styles.progress}
                style={{ width: `${progress[file.name] || 0}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
      {files.length > 0 && (
        <button className={styles.uploadButton} onClick={handleUpload}>
         Comenzar
        </button>
      )}
      {Object.values(progress).every((value) => value === 100) && (
        <div className={styles.successMessage}>
          <p>Subida exitosa</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
