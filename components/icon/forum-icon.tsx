import { SVGProps } from "react";

export function ForumIcon(props: SVGProps<SVGSVGElement>) {
  const color = props.fill || "#D9D9D9";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      {...props}
    >
      <mask
        id="a"
        width={20}
        height={20}
        x={0}
        y={0}
        maskUnits="userSpaceOnUse"
        style={{
          maskType: "alpha",
        }}
      >
        <path fill="#D9D9D9" d="M0 0h20v20H0z" />
      </mask>
      <g mask="url(#a)">
        <path
          fill={color}
          d="M7.5 15c-.417 0-.77-.146-1.063-.438A1.447 1.447 0 0 1 6 13.5v-1h9.5V6h1c.417 0 .77.146 1.063.438.291.291.437.645.437 1.062V18l-3-3H7.5ZM2 14V3.5c0-.417.146-.77.438-1.063A1.447 1.447 0 0 1 3.5 2h9c.417 0 .77.146 1.063.438.291.291.437.645.437 1.062v6c0 .417-.146.77-.438 1.063A1.446 1.446 0 0 1 12.5 11H5l-3 3Zm10.5-4.5v-6h-9v6.875l.875-.875H12.5Z"
        />
      </g>
    </svg>
  );
}
