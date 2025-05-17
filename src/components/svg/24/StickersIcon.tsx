import { ComponentProps } from "react";

export default function StickersIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <rect width="8" height="8" x="2" y="2" ry="1.5" />
      <rect width="8" height="8" x="14" y="2" ry="1.5" />
      <rect width="8" height="8" x="2" y="14" ry="1.5" />
      <rect width="8" height="8" x="14" y="14" ry="1.5" />
    </svg>
  );
}
