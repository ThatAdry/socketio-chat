import { ComponentProps } from "react";

export default function UserIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <path d="M 3.6000001,21.600001 H 20.400001 c 0,-2.4 -2.4,-6 -8.400001,-6 -5.9999993,0 -8.423922,3.555806 -8.3999999,6 z" />
      <circle cx="12" cy="8.3999996" r="5" />
    </svg>
  );
}
