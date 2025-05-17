import { ComponentProps } from "react";

export default function PlayIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <path d="M 5.046525,6.0003778 V 17.999622 c 0,1.081447 1.15755,1.768608 2.10695,1.250755 L 18.4,13.056801 c 0.83647,-0.456256 0.81979,-1.628006 0,-2.113602 L 7.153475,4.7496229 c -0.9494,-0.5178535 -2.10695,0.1693082 -2.10695,1.2507549 z" />
    </svg>
  );
}
