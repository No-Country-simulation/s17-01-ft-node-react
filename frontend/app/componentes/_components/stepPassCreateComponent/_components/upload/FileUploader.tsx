import React, { useState, useCallback } from 'react'
import styles from './FileUploader.module.css'

export default function FileUploader() {
  const [isDragging, setIsDragging] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
    }
  }, [])

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
    }
  }, [])

  const handleClose = useCallback(() => {
    // Implementar lógica de cierre aquí
    console.log('Cerrar modal')
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.uploadCard} role="dialog" aria-labelledby="upload-title">
        <div className={styles.header}>
          <h2 id="upload-title" className={styles.title}>Subir archivo</h2>
          <button 
            className={styles.closeButton} 
            onClick={handleClose}
            aria-label="Cerrar"
          >
            ✕
          </button>
        </div>
        <div
          className={`${styles.dropzone} ${isDragging ? styles.dropzoneDragging : ''}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          tabIndex={0}
          role="button"
          aria-label="Área para arrastrar y soltar archivos"
        >
          <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <p className={styles.dropzoneText}>Arrastra y suelta archivos para subirlos</p>
          <p className={styles.dropzoneSubtext}>
            Tus componentes serán privados hasta que los publiques.
          </p>
          <button className={styles.fileButton} onClick={() => document.getElementById('file-input')?.click()}>
            Seleccionar archivo
          </button>
          <input 
            id="file-input"
            type="file" 
            className={styles.visuallyHidden}
            onChange={onFileSelect}
            aria-label="Seleccionar archivo para subir"
          />
        </div>
        {file && (
          <p className={styles.fileName}>
            Archivo seleccionado: {file.name}
          </p>
        )}
        <p className={styles.terms}>
          Si envías tus componentes a CodePieces, aceptas los{' '}
          <a href="#" className={styles.termsLink}>
            Términos y políticas
          </a>{' '}
          de la Comunidad de CodePieces
        </p>
      </div>
    </div>
  )
}