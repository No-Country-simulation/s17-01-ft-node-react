import * as React from "react"
import { SVGProps } from "react"
const ButtonSVG = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={25}
    height={24}
    fill="none"
    {...props}
  >
    <path
      fill="#626270"
      d="M18.5 7.003h-.35a3.45 3.45 0 0 0 .35-1.5 3.49 3.49 0 0 0-6-2.44 3.49 3.49 0 0 0-6 2.44 3.45 3.45 0 0 0 .35 1.5H6.5a3 3 0 0 0-3 3v2a1 1 0 0 0 1 1h1v6a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3v-6h1a1 1 0 0 0 1-1v-2a3 3 0 0 0-3-3Zm-7 13h-3a1 1 0 0 1-1-1v-6h4v7Zm0-9h-6v-1a1 1 0 0 1 1-1h5v2Zm0-4H10a1.5 1.5 0 1 1 1.5-1.5v1.5Zm2-1.5a1.5 1.5 0 1 1 1.5 1.5h-1.5v-1.5Zm4 13.5a1 1 0 0 1-1 1h-3v-7h4v6Zm2-8h-6v-2h5a1 1 0 0 1 1 1v1Z"
    />
  </svg>
)
export default ButtonSVG