import * as React from "react";
import { SVGProps } from "react";
const GooglePlaySVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#16C5B4"
      d="M20.919 10.653c-.315-.17-3.01-1.734-4.023-2.323l-.003-.002L4.64 1.253a1.679 1.679 0 0 0-1.408-.16.953.953 0 0 0-.076.031c-.059.02-.117.042-.173.07a1.519 1.519 0 0 0-.738 1.363v18.986a1.436 1.436 0 0 0 .692 1.27c.05.025.102.046.155.064a1.377 1.377 0 0 0 .533.118c.292-.003.579-.083.831-.232l12.438-7.182 4.02-2.321a1.525 1.525 0 0 0 .843-1.334 1.49 1.49 0 0 0-.837-1.273ZM4.244 19.84V4.102l7.94 7.86-7.94 7.877Zm5.018-2.162 4.343-4.31 1.15 1.139-5.493 3.171Zm4.342-7.125L9.206 6.2l5.554 3.207-1.156 1.146Zm2.947 2.917-1.526-1.51 1.528-1.515c.72.418 1.843 1.069 2.616 1.514l-2.618 1.511Z"
    />
  </svg>
);
export default GooglePlaySVG;
