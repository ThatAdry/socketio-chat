import { ComponentProps } from "react";

export default function SendIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <path d="M 3,2 22,12 3,22 5,13.5 12,12 5,10.5 Z" />
    </svg>
  );
}
