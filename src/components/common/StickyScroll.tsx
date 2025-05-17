import { useEffect, useRef, HTMLAttributes } from "react";

function StickyScroll({ children, ...attrs }: HTMLAttributes<HTMLDivElement>) {
  const sticky = useRef<boolean>(true);
  const element = useRef<HTMLDivElement>(null);

  const onScrollEvent = (event: React.UIEvent<HTMLDivElement>) => {
    const { scrollHeight, scrollTop, offsetHeight } = event.target as HTMLDivElement;
    sticky.current = scrollHeight - scrollTop == offsetHeight;
  };

  useEffect(() => {
    if (element.current != undefined && sticky.current) {
      element.current.scrollTo(0, element.current.scrollHeight);
    }
  });

  return (
    <div ref={element} onScroll={onScrollEvent} {...attrs}>
      {children}
    </div>
  );
}

export default StickyScroll;
