import { ComponentProps } from "react";

export default function TrashIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path fill="currentColor" strokeWidth={2} d="m 8.21875,2 -1,4 H 5.7148437 2.8476562 V 8 H 3.9804687 L 5.1328125,22 H 18.867188 L 20.019532,8 h 1.132812 V 6 H 18.285156 16.78125 l -1,-4 z m 1.5625,2 h 4.4375 l 0.5,2 H 9.28125 Z M 6,8 H 8.0175781 15.982422 18 L 17.132812,20 H 6.8671875 Z" />
    </svg>
  );
}
