import { ComponentProps } from "react";

export default function ExitIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" d="m 6,8 -4,4 4,4 v -3 h 8 V 11 H 6 Z" />
      <path fill="none" stroke="currentColor" strokeWidth="2" d="m 8,8 4,-4 8,8 -8,8 -4,-4" />
    </svg>
  );
}
