/* eslint-disable @next/next/no-img-element */
"use client";
import {
  Atom,
  CircleCheck,
  CircleHelp,
  FileImage,
  ImageUp,
  Upload,
} from "lucide-react";
import styles from "./styles.module.css";
import { Button } from "@/ui-atoms";
import { useEffect, useState } from "react";
import { getCategories } from "@/lib/axios/api/categories";
import { getPlans } from "@/lib/axios/api/plans";
import { useUserStore } from "@/store/userStore";
import api from "@/lib/axios/axios";
import { Categories } from "@/lib/types/api/categories.type";
import { Plans } from "@/lib/types/api/plans";
import { useRouter } from "next/navigation";

export interface CreateComponent {
  name: string;
  description: string;
  categories: number[];
  price: number;
  uploader: number;
  video: string;
  image: string;
  plan: number;
  styles: string;
  structure: string;
  readme: string;
}

function Preview() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState<number | null>(null);
  const [fileThumbnail, setFileThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [fileVideo, setFileVideo] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [plans, setPlans] = useState<Plans[]>([]);
  const [price, setPrice] = useState<number>(0);
  const [planId, setPlanId] = useState<number | null>(null);
  const { user } = useUserStore();
  const router = useRouter();

  const shareComponent = async () => {
    const newComponent: CreateComponent = {
      name,
      description,
      categories: [categoryId!],
      price,
      uploader: user?.id!,
      video: "https://images.unsplash.com/photo-1525923838299-2312b60f6d69" || "",
      image: "https://images.unsplash.com/photo-1525923838299-2312b60f6d69" || "",
      plan: planId!,
      styles: "https://github.com/mdn/todo-react/blob/main/src/App.jsx",
      structure: "https://github.com/mdn/todo-react/blob/main/src/App.jsx",
      readme: "https://github.com/mdn/todo-react/blob/main/src/App.jsx",
    };

    const response = await api.post("/components", newComponent);

    if (response.status === 201) {
      console.log("Componente creado");
      alert("Componente creado");
      window.location.reload();
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getCategories();
      setCategories(categories);
    };

    const fetchPlans = async () => {
      const plans = await getPlans();
      setPlans(plans);
    };

    fetchCategories();
    fetchPlans();
  }, []);

  // Función para manejar la carga de la imagen
  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileThumbnail(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  // Función para manejar la carga del video
  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.detail_container}>
          <section className={styles.detail_section}>
            <h2 className={styles.title}>Detalles</h2>
            <div className={styles.input_container}>
              <label className={styles.label}>
                Titulo<span className={styles.asterisk}>*</span>{" "}
                <CircleHelp size={14} />
              </label>
              <textarea
                name="title"
                id="title"
                placeholder="Escribe un titulo para tu componente"
                className={styles.textarea}
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></textarea>
            </div>

            <div className={styles.input_container}>
              <label className={styles.label}>
                Descripción<span className={styles.asterisk}>*</span>{" "}
                <CircleHelp size={14} />
              </label>
              <textarea
                name="description"
                id="description"
                placeholder="Cuenta al usuario sobre tu componente"
                className={styles.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              ></textarea>
            </div>

            <div className={styles.input_container}>
              <label className={styles.label}>Precio</label>
              <input
                type="number"
                name="price"
                id="price"
                placeholder="Ponle precio a tu componente"
                className={styles.textarea}
                value={price}
                onChange={(e) => setPrice(e.target.valueAsNumber)}
              />
            </div>
          </section>

          <section>
            <h2 className={styles.title}>Plan</h2>
            <div className={styles.buttons}>
              {plans &&
                plans.map((plan) => (
                  <span
                    key={plan.id}
                    className={styles.button}
                    onClick={() => setPlanId(plan.id)}
                    style={{
                      backgroundColor: planId === plan.id ? "#ffcc00" : "transparent",
                    }}
                  >
                    {plan.name}
                  </span>
                ))}
            </div>
          </section>

          <div>
            <h2 className={styles.title}>Video</h2>
            <div className={styles.fileUpload}>
              <input
                type="file"
                id="file-video"
                name="file-video"
                className={styles.fileInput}
                onChange={handleVideoChange}
              />
              <label htmlFor="file-video" className={styles.uploadLabel}>
                <span className={styles.uploadIcon}>
                  <ImageUp size={24} />
                </span>
                <span className={styles.uploadText}>Subir archivo</span>
              </label>
            </div>
            {videoPreview && (
              <video
                src={videoPreview}
                controls
                className={styles.videoPreview}
              />
            )}
          </div>
        </div>

        <div className={styles.detail_container}>
          <section className={styles.section_preview}>
            <div className={styles.image_container}>
              {thumbnailPreview ? (
                <img src={thumbnailPreview} alt="Preview" />
              ) : (
                <span className={styles.image_preview}>
                  <FileImage size={30} />
                </span>
              )}
            </div>
            <h3 className={styles.title_preview}>{name || "Titulo"}</h3>
            <p className={styles.description_preview}>
              {description || "Descripción del componente"}
            </p>
          </section>

          <section>
            <h2 className={styles.title}>Categorías</h2>
            {categories &&
              categories.map((category) => (
                <div key={category.id} className={styles.buttons}>
                  <button
                    className={styles.button}
                    onClick={() => setCategoryId(category.id)}
                    style={{
                      backgroundColor: categoryId === category.id ? "#ffcc00" : "transparent",
                    }}
                  >
                    {category.name}
                  </button>
                </div>
              ))}
          </section>

          <section>
            <h2 className={styles.title}>Thumbnail</h2>
            <div className={styles.fileUpload}>
              <input
                type="file"
                id="file-thumbnail"
                name="file-thumbnail"
                className={styles.fileInput}
                onChange={handleThumbnailChange}
              />
              <label htmlFor="file-thumbnail" className={styles.uploadLabel}>
                <span className={styles.uploadIcon}>
                  <ImageUp size={24} />
                </span>
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
          <Button type="button" variant="main" onClick={shareComponent}>
            Compartir
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Preview;
