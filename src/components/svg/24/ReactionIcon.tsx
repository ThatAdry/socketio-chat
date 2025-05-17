import { ComponentProps } from "react";

export default function ReactionIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M 16,14 H 8" id="path8" />
      <path d="M 9,10 V 9" id="path9" />
      <path d="M 15,10 V 9" id="path10" />
    </svg>
  );
}
