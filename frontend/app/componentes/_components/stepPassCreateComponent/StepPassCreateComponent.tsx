// StepsComponent.tsx
"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import { StepFileUploader } from "./_components/stepFileUploader/StepFileUploader";
import Step2 from "./_components/step2/Step2";
import { StepHeader } from "./_components/stepHeader/StepHeader";
import FileUpload from "./_components/fileUpload/FileUpload";

const StepsComponent: React.FC = () => {
  const [step, setStep] = useState<number>(1);
  const [files, setFiles] = useState<File[]>([]);

  const handleFilesUploaded = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    setStep(2);
  };

  const handleNextStep = () => {
    if (step === 1) {
      if (files.length > 0) { // Puedes ajustar esta lógica según el número de archivos necesarios
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
      <StepHeader title="Cargar Archivos" handleClick={() => {}} />
      {step === 1 && (
        <div>
          
        <StepFileUploader onFilesUploaded={handleFilesUploaded} />
        </div>
      )}
      {/* Aquí puedes agregar los componentes para los otros pasos */}
      {step === 2 && (
        <div>
          <Step2 files={files} />
         
        </div>
      )}
      {step === 3 && (
        <div>
          <p>Step 3</p>
        </div>
      )}
       <button onClick={handlePreviousStep} disabled={step === 1} className={`${step === 1 ? styles.buttonPrev__disabled : styles.buttonPrev}`}>Anterior</button>
      <p className={styles.terms}>
        Si envías tus componentes a CodePieces, aceptas los{" "}
        <a href="#">Términos y Condiciones</a> de la Comunidad de CodePieces
      </p>
    </div>
  );
};

export default StepsComponent;
