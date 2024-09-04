import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function useUnderlineEffect() {
  const menuRef = useRef<HTMLDivElement>(null);
  const underlineRef = useRef<HTMLSpanElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const menu = menuRef.current;
    const underline = underlineRef.current;

    // Solo realiza manipulaciones si los elementos están disponibles
    if (menu && underline) {
      const links = Array.from(menu.querySelectorAll('a')) as HTMLAnchorElement[];
      const activeLink = links.find(link => link.getAttribute('href') === pathname);

      if (activeLink) {
        // Actualiza el estilo del subrayado
        underline.style.width = `${activeLink.offsetWidth}px`;
        underline.style.left = `${activeLink.offsetLeft}px`;
      }
    }
  }, [pathname]); // Dependencia en `pathname` para evitar renders innecesarios

  return { menuRef, underlineRef };
}
