import { ComponentProps } from "react";

export default function AddUserIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <circle cx="10" cy="8" r="5" />
      <path d="m 2,21 h 16 c 0,-2.4 -1.999999,-6 -8,-6 -5.9999992,0 -8.0239221,3.555806 -8,6 z" />
      <path d="M 15,13.007672 A 0.99617139,0.99617139 44.779368 0 0 16,14 h 2 v 2 a 1,1 45 0 0 1,1 1,1 135 0 0 1,-1 v -2 h 2 a 1,1 135 0 0 1,-1 1,1 45 0 0 -1,-1 h -2 v -2 a 1,1 45 0 0 -1,-1 1,1 135 0 0 -1,1 v 2 l -2.000003,0.0051 A 1.0025606,1.0025606 134.92674 0 0 15,13.007672 Z" transform="translate(-1)" />
    </svg>
  );
}
