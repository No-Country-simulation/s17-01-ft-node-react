import styles from "./styles.module.css";
import { ManagementTableProps } from "@/lib/types";
import { format } from "date-fns";
import { Rating } from "../rating";
import { parseViews } from "@/app/my-management/parseViews";
import { useState } from "react";

export function ManagementTable(props: ManagementTableProps) {
  switch (props.current) {
    case "Contenido":
      return <ComponentTable {...props} />;
    case "Estadísticas":
      return <Stats {...props} />;
    case "Billetera":
      return <MyWallet {...props} />;
  }
}

function ComponentTable(props: ManagementTableProps) {
  return (
    <table className={styles.table}>
      <div className={styles.table_header}>
        <span>Sel</span>
        <span>Componentes</span>
        <span>Fechas</span>
        <span>Vistas</span>
        <span>Rating</span>
      </div>
      <ul className={styles.data_list}>
        {props.data.map((comp, index) => {
          return (
            <ComponentItem
              key={index}
              title={comp.title}
              date={comp.date}
              views={comp.views}
              rating={comp.rating}
            />
          );
        })}
      </ul>
    </table>
  );
}
type ComponentItemProps = {
  title: string;
  date: Date;
  views: number;
  rating: number;
};
function ComponentItem(props: ComponentItemProps) {
  const [checked, setChecked] = useState<boolean>(false);

  return (
    <div onClick={() => setChecked(!checked)} className={styles.item_container}>
      <input
        type="checkbox"
        checked={checked}
        className={styles.item_checkbox}
      />
      <b className={styles.item_title}>{props.title}</b>
      <p className={styles.item_date}>
        <span>Fecha: </span>
        {format(props.date, "dd-mm-yyyy").replaceAll("-", "/")}
      </p>
      <p className={styles.item_views}>
        <span>Vistas: </span>
        {parseViews(props.views)}
      </p>
      <div className={styles.item_rating}>
        <Rating rating={props.rating} />
      </div>
    </div>
  );
}

function Stats(props: ManagementTableProps) {
  return (
    <div className={styles.stats_container}>
      <div className={styles.graph_container}>
        <img src="/total-users.png" alt="total-users" />
      </div>
      <div className={styles.graph_container}>
        <img src="/total-downloads.png" alt="total-downloads" />
      </div>
      <div className={styles.graph_container}>
        <img src="/total-refunds.png" alt="total-refunds" />
      </div>
      <div className={styles.graph_container}>
        <img src="/sales-details.png" alt="sales-details" />
      </div>
    </div>
  );
}
function MyWallet(props: ManagementTableProps) {
  return <div>MyWallet</div>;
}
