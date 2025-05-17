import { ComponentProps } from "react";

export default function ReplyIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <path d="m 2,12 9,-9 v 6 c 5,0 11,4 11,11 0,0 0,-6 -11,-6 v 6 z" />
    </svg>
  );
}
