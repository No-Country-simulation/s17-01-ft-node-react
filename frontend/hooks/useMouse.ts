import { useEffect, useState } from "react";

export function useMouse() {
  const [mouse, setMouse] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", onMouseMove);
    return () => window.removeEventListener("mousemove", onMouseMove);
  }, []);
  return mouse;
}
