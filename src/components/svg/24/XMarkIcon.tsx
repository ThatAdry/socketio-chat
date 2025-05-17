import { ComponentProps } from "react";

export default function XMarkIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" {...props}>
      <path d="M 6,6 18,18" />
      <path d="M 6,18 18,6" />
    </svg>
  );
}
