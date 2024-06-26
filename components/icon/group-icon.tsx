import { SVGProps } from "react";

export function GroupIcon(props: SVGProps<SVGSVGElement>) {
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
          d="M2 16v-1.917c0-.358.087-.687.26-.987.174-.3.414-.54.72-.721A9.697 9.697 0 0 1 8 11c.917 0 1.795.118 2.635.354.84.236 1.636.577 2.386 1.021.305.18.545.42.719.721.173.3.26.63.26.987V16H2Zm13.5 0v-1.917c0-.583-.135-1.125-.406-1.625s-.636-.91-1.094-1.229c.542.111 1.066.26 1.573.448.507.188.99.42 1.448.698A1.972 1.972 0 0 1 18 14.083V16h-2.5ZM8 10a2.893 2.893 0 0 1-2.125-.875A2.893 2.893 0 0 1 5 7c0-.833.292-1.542.875-2.125A2.893 2.893 0 0 1 8 4c.833 0 1.542.292 2.125.875S11 6.167 11 7s-.292 1.542-.875 2.125A2.893 2.893 0 0 1 8 10Zm7-3c0 .833-.292 1.542-.875 2.125A2.893 2.893 0 0 1 12 10c-.111 0-.215-.003-.313-.01a1.831 1.831 0 0 1-.312-.053c.347-.402.621-.85.823-1.343A4.174 4.174 0 0 0 12.5 7c0-.57-.1-1.1-.302-1.594a4.858 4.858 0 0 0-.823-1.343c.111-.028.215-.046.313-.053.097-.007.2-.01.312-.01.833 0 1.542.292 2.125.875S15 6.167 15 7ZM3.5 14.5h9v-.417a.486.486 0 0 0-.23-.416 8.95 8.95 0 0 0-2.062-.865A8.183 8.183 0 0 0 8 12.5c-.75 0-1.486.097-2.208.292a8.154 8.154 0 0 0-2.063.875.452.452 0 0 0-.229.414v.419Zm4.504-6c.414 0 .767-.147 1.059-.442.291-.295.437-.649.437-1.062 0-.414-.147-.767-.442-1.059A1.456 1.456 0 0 0 7.996 5.5c-.414 0-.767.147-1.059.442A1.456 1.456 0 0 0 6.5 7.004c0 .414.147.767.442 1.059.295.291.649.437 1.062.437Z"
        />
      </g>
    </svg>
  );
}
