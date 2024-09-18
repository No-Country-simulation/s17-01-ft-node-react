"use client";
import React from "react";
import styles from "./styles.module.css";
import { StepFileUploader } from "./_components/stepFileUploader/StepFileUploader";
import Step2 from "./_components/step2/Step2";
import { StepHeader } from "./_components/stepHeader/StepHeader";
import useStepPass from "@/hooks/useStepPass";


const StepsComponent = ({ oncloseModal }: { oncloseModal: () => void }) => {
  const {
    step,
    files,
    handleFilesUploaded,
    handleUploadComplete,
    handlePreviousStep,
  } = useStepPass();

  return (
    <div className={styles.stepsContainer}>
      <StepHeader title="Cargar Archivos" handleClick={oncloseModal} />
      {step === 1 && (
        <div>
          <StepFileUploader onFilesUploaded={handleFilesUploaded} />
        </div>
      )}
      {step === 2 && (
        <div>
          <Step2
            files={files}
            onUploadComplete={handleUploadComplete}
          />
        </div>
      )}
      {step === 3 && (
        <div>
          <p>Step 3</p>
        </div>
      )}
      <button
        onClick={handlePreviousStep}
        disabled={step === 1}
        className={`${step === 1 ? styles.buttonPrev__disabled : styles.buttonPrev}`}
      >
        Anterior
      </button>
      <p className={styles.terms}>
        Si envías tus componentes a CodePieces, aceptas los{" "}
        <a href="#">Términos y Condiciones</a> de la Comunidad de CodePieces
      </p>
    </div>
  );
};

export default StepsComponent;
