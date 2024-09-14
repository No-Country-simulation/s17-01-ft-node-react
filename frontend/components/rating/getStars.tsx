import { StarFill, StarHalf, Star } from "react-bootstrap-icons";
const getStar = (number: 0 | 0.5 | 1, index: number): JSX.Element => {
  switch (number) {
    case 0:
      return <Star key={index} size="12" color="#FFEA28" />;
    case 0.5:
      return <StarHalf key={index} size="12" color="#FFEA28" />;
    case 1:
      return <StarFill key={index} size="12" color="#FFEA28" />;
  }
};
export const showStars = (rating: number): JSX.Element[] => {
  if (rating < 0 || rating > 5)
    throw new Error("El rating debe ser mayor que 0 y menor que 5");
  let result = [];
  let stars: number[] = new Array(Math.floor(rating)).fill(1);
  if (Number.isInteger(rating)) {
    let emptyStars: number[] = new Array(5 - rating).fill(0);
    result.push(...stars, ...emptyStars);
  } else {
    stars.push(0.5);
    let emptyStars: number[] = new Array(5 - Math.floor(rating) - 1).fill(0);
    result.push(...stars, ...emptyStars);
  }
  return result.map((star: any, index) => getStar(star, index));
};
