import styles from "./styles.module.css";
import { showStars } from "./getStars";

export function Rating({rating}: {rating:number}) {
    const stars = showStars(rating);
    return (
        <div className={styles.rating_container}>
            <b className={styles.rating}>{rating}</b>
            <ul className={styles.stars_list}>
                {stars.map((star, index) => {
                    return <li key={index}>{star}</li>
                })}
            </ul>
        </div>
    )
};
                        