// StepFileUploader.tsx
import React, { useState } from "react";
import { Upload, X } from "lucide-react";
import Dropzone from 'react-dropzone';
import style from "./StepFileUploader.module.css";
import { StepHeader } from "../stepHeader/StepHeader";

interface StepFileUploaderProps {
  onFilesUploaded: (files: File[]) => void;
}

export const StepFileUploader: React.FC<StepFileUploaderProps> = ({ onFilesUploaded }) => {
  const [files, setFiles] = useState<File[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    onFilesUploaded(acceptedFiles);
  };

  return (
    <div className={style.container}>
      <Dropzone onDrop={onDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className={style.containerDrop}>
            <div {...getRootProps()} className={style.box}>
              <Upload className={style.icon} />
              <input {...getInputProps()} multiple />
              <p className={style.textStrong}>Arrastra y suelta archivos para subirlos</p>
              <p className={style.text}>Tus componentes serán privados hasta que los publiques</p>
              <button className={style.button}>Seleccionar archivos</button>
            </div>
          </section>
        )}
      </Dropzone>
      
    </div>
  );
};