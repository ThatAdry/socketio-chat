import { ComponentProps } from "react";

export default function LinkIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="m 11,11 1,-1 a 1.4142136,1.4142136 180 0 1 2,0 l 2,2 a 1.4142136,1.4142136 90 0 1 0,2 l -6,6 A 1.4142136,1.4142136 0 0 1 8,20 L 6,18 a 1.4142136,1.4142136 90 0 1 0,-2 l 1,-1" />
      <path d="m 13,13 -1,1 a 1.4142136,1.4142136 0 0 1 -2,0 L 8,12 a 1.4142136,1.4142136 90 0 1 0,-2 l 6,-6 a 1.4142136,1.4142136 0 0 1 2,0 l 2,2 a 1.4142136,1.4142136 90 0 1 0,2 l -1,1" />
    </svg>
  );
}
