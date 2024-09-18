/* eslint-disable @next/next/no-img-element */
"use client"
import { Atom, CircleCheck, CircleHelp, CircleHelpIcon, FileImage, ImageUp, Upload } from "lucide-react";
import styles from "./styles.module.css";
import { Button } from "@/ui-atoms";

function Preview() {
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.detail_container}>
          <section className={styles.detail_section}>
            <h2 className={styles.title}>Detalles</h2>
            <div className={styles.input_container}>
              <label className={styles.label}>Titulo<span className={styles.asterisk}>*</span> <CircleHelp size={14} /></label>
              <textarea name="title" id="title" placeholder="Escribe un titulo para tu componente" className={styles.textarea} ></textarea>
            </div>

            <div className={styles.input_container}>
              <label className={styles.label}>Descripción<span className={styles.asterisk}>*</span> <CircleHelp size={14} /></label>
              <textarea name="description" id="description" placeholder="Cuenta al usuario sobre tu componente" className={styles.textarea} ></textarea>
            </div>

            <div className={styles.input_container}>
              <label className={styles.label}>Precio</label>
              <input type="text" name="price" id="price" placeholder="Ponle precio a tu componente" className={styles.textarea} />
            </div>
          </section>

          <section>
            <h2 className={styles.title}>Plan</h2>
            <div className={styles.buttons}>
              <button className={styles.button}>Oro</button>
              <button className={styles.button}>Oro</button>
            </div>
          </section>

          <div>
            <h2 className={styles.title}>Video</h2>
            <div className={styles.fileUpload}>
              <input type="file" id="file-video" name="file-video" className={styles.fileInput} />
              <label className={styles.uploadLabel}>
                <span className={styles.uploadIcon}><ImageUp size={24} /></span>
                <span className={styles.uploadText}>Subir archivo</span>
              </label>
            </div>

          </div>
        </div>

        <div className={styles.detail_container}>
          <section className={styles.section_preview}>
            <div className={styles.image_container}>
              <img src="" alt="" />
              <span className={styles.image_preview}><FileImage size={30} /></span>
            </div>
            <h3 className={styles.title_preview}>Titulo</h3>
            <p className={styles.description_preview}>Description del componente</p>
          </section>

          <section>
            <h2 className={styles.title}>Categorías</h2>
            <div className={styles.buttons}>
              <button className={styles.button}>Input</button>
            </div>
          </section>

          <section>
            <h2 className={styles.title}>Thumbnail</h2>
            <div className={styles.fileUpload}>
              <input type="file" id="file-thumbnail" name="file-thumbnail" className={styles.fileInput} />
              <label className={styles.uploadLabel}>
                <span className={styles.uploadIcon}><ImageUp size={24} /></span>
                <span className={styles.uploadText}>Subir archivo</span>
              </label>
            </div>
          </section>
        </div>
      </div>
      <div className={styles.share_container}>
        <span className={styles.verification}>
          <Upload size={20} />
          <CircleCheck size={20} />
          <Atom size={20} />
          <p>Campos de verificación completos</p>
        </span>
        <div className={styles.button_container}>
          <Button type="button" variant="main" onClick={() => null}>Compartir</Button>
        </div>
      </div>
    </div>
  )
}

export default Preview
