
import { useEffect, useState } from "react";

export const useDelayedMount = (show: boolean, delayTime = 300): boolean => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (show && !mounted) {
      setMounted(true);
    } else if (!show && mounted) {
      timeoutId = setTimeout(() => {
        setMounted(false);
      }, delayTime);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [show, mounted, delayTime]);

  return mounted;
};

export const useFadeAnimation = (
  isVisible: boolean,
  options = { fadeInClass: "animate-fade-in", fadeOutClass: "animate-fade-out" }
): { className: string; isMounted: boolean } => {
  const isMounted = useDelayedMount(isVisible);
  const [className, setClassName] = useState("");

  useEffect(() => {
    if (isVisible) {
      setClassName(options.fadeInClass);
    } else if (isMounted) {
      setClassName(options.fadeOutClass);
    }
  }, [isVisible, isMounted, options]);

  return { className, isMounted };
};
