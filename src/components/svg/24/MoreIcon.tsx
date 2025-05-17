import { ComponentProps } from "react";

export default function MoreIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <circle cy="12" cx="5" r="2" />
      <circle cy="12" cx="12" r="2" />
      <circle cy="12" cx="19" r="2" />
    </svg>
  );
}
