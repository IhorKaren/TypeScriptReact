import { useEffect, useRef, FC, ReactNode } from "react";
import "intersection-observer";

interface Props {
  children: ReactNode;
  onContentEndVisible: () => void;
}

// Describe the Props
export const Observer: FC<Props> = ({ children, onContentEndVisible }) => {
  // Specify the correct type for useRef, pay attention to which DOM element we pass it to
  const endContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Specify the correct type for options, hint, class can also be specified as a type
    const options: IntersectionObserverInit = {
      rootMargin: "0px",
      threshold: 1.0,
      root: null,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.intersectionRatio > 0) {
          onContentEndVisible();
          observer.disconnect();
        }
      });
    }, options);

    if (endContentRef.current) {
      observer.observe(endContentRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [onContentEndVisible]);

  return (
    <div>
      {children}
      <div ref={endContentRef} />
    </div>
  );
};
