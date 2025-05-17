import { ComponentProps } from "react";

export default function ChatIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <path d="M 5,5 C 3.338,5 2,6.338 2,8 v 14 l 4,-3 h 13 c 1.662,0 3,-1.338 3,-3 V 8 C 22,6.338 20.662,5 19,5 Z m 2,4 h 10 v 2 H 7 Z m 0,4 h 5 v 2 H 7 Z" />
    </svg>
  );
}
