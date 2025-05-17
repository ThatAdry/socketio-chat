import { ComponentProps } from "react";

export default function CrownIcon({ ...props }: ComponentProps<"svg">) {
  return (
    <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fill="currentColor" {...props}>
      <path d="m 3.6000001,7.2000003 1.2000001,8.4000007 c 4.9912299,1.699965 9.7684388,1.497361 14.4000008,0 l 1.2,-8.4000007 -4.8,6.0000007 L 12,3.6000001 8.4000003,13.200001 Z" />
      <path d="m 4.8000002,16.800001 c 4.6530634,1.511 9.6000008,1.2 14.4000008,0 v 2.4 c -5.01782,1.712328 -9.7888107,1.484276 -14.4000008,0 z" />
    </svg>
  );
}
