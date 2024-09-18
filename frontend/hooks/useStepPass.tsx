// useStepPass.ts
import { useState, useCallback } from "react";

const useStepPass = () => {
  const [step, setStep] = useState<number>(1);
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState<boolean>(false);

  const handleFilesUploaded = useCallback((uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    setStep(2);
  }, []);

  const handleUploadComplete = useCallback(() => {
    setStep(3); 
  }, []);

  const handlePreviousStep = useCallback(() => {
    if (step === 2 || step === 3) {
      setStep(step - 1);
    }
  }, [step]);

  const startUploading = useCallback(() => {
    setUploading(true);
  }, []);

  return {
    step,
    files,
    uploading,
    handleFilesUploaded,
    handleUploadComplete,
    handlePreviousStep,
    startUploading,
  };
};

export default useStepPass;
