"use client";
import styles from "./styles.module.css";
import { PricingCard } from "@/components";

export default function Page() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>
        Vuélvete <span>Code</span>member
      </h1>
      <p className={styles.subtitle}>
        Elige tu plan favorito para ser parte de esta nueva aventura.
      </p>
      <div className={styles.cards_container}>
        <PricingCard
          title="Bronce"
          description="Componentes gratis"
          price="Gratis"
          limit="Hasta tres cuotas al mes"
          benefits={[
            "Actualizaciones semanales",
            "Descarga componentes gratis",
            "Conserva todas tus descargas",
          ]}
          recommended={false}
          button={{ variant: "secondary", text: "Obtener" }}
          onClick={() => {}}
        />
        <PricingCard
          title="Oro"
          description="Componentes premium"
          price="$10"
          limit="Hasta tres cuotas al mes"
          benefits={[
            "Actualizaciones semanales",
            "+1.000 componentes gratis",
            "Cupos ilimitados de descarga",
            "Conserva todas tus descargas",
            "Acceso a todos los componentes",
          ]}
          recommended={true}
          button={{ variant: "main", text: "Suscribirme" }}
          onClick={() => {}}
        />
        <PricingCard
          title="Plata"
          description="Componentes estándar"
          price="$5"
          limit="Hasta tres cuotas al mes"
          benefits={[
            "Actualizaciones semanales",
            "Acceso a componentes plata",
            "Cupos ilimitados de descarga",
            "Conserva todas tus descargas",
          ]}
          recommended={false}
          button={{ variant: "secondary", text: "Suscribirme" }}
          onClick={() => {}}
        />
      </div>
    </div>
  );
}
