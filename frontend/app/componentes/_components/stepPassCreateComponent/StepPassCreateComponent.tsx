"use client";
import React, { useState } from "react";
import styles from "./styles.module.css"; // Asegúrate de tener estilos para el componente

const StepsComponent: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [structureFile, setStructureFile] = useState<File | null>(null);
  const [styleFile, setStyleFile] = useState<File | null>(null);
  const [readmeFile, setReadmeFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (structureFile && styleFile && readmeFile) {
        setStep(2);
      } else {
        alert("Por favor, cargue todos los archivos.");
      }
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handlePreviousStep = () => {
    if (step === 2 || step === 3) {
      setStep(step - 1);
    }
  };

  const handleShare = () => {
    // Implementa la lógica para compartir los archivos aquí
    alert("Archivos compartidos!");
  };

  return (
    <div className={styles.stepsContainer}>
      {step === 1 && (
        <div className={styles.stepContent}>
          <h2>Seleccionar Archivos</h2>
          <div>
            <label className={styles.label} htmlFor="structureFile">Archivo de Estructura</label>
            <input
              id="structureFile"
              type="file"
              className={styles.inputFile}
              onChange={(e) => handleFileChange(e, setStructureFile)}
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="styleFile">Archivo de Estilo</label>
            <input
              id="styleFile"
              type="file"
              className={styles.inputFile}
              onChange={(e) => handleFileChange(e, setStyleFile)}
            />
          </div>
          <div>
            <label className={styles.label} htmlFor="readmeFile">Archivo README</label>
            <input
              id="readmeFile"
              type="file"
              className={styles.inputFile}
              onChange={(e) => handleFileChange(e, setReadmeFile)}
            />
          </div>
          <button onClick={handleNextStep} className={styles.nextButton}>
            Comenzar
          </button>
        </div>
      )}

      {step === 2 && (
        <div className={styles.stepContent}>
          <h2>Previsualización de Archivos</h2>
          <ul>
            {structureFile && <li>Estructura: {structureFile.name}</li>}
            {styleFile && <li>Estilo: {styleFile.name}</li>}
            {readmeFile && <li>README: {readmeFile.name}</li>}
          </ul>
          <button onClick={handlePreviousStep} className={styles.prevButton}>
            Anterior
          </button>
          <button onClick={handleNextStep} className={styles.nextButton}>
            Compartir
          </button>
        </div>
      )}

      {step === 3 && (
        <div className={styles.stepContent}>
          <h2>Compartir Archivos</h2>
          <button onClick={handleShare} className={styles.shareButton}>
            Compartir
          </button>
          <button onClick={handlePreviousStep} className={styles.prevButton}>
            Anterior
          </button>
        </div>
      )}
    </div>
  );
};

export default StepsComponent;
