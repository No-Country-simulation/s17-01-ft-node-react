# ARQUITECTURA

## PAGES

- Las pages se encuentran en la carpeta /app
- Para crear una nueva ruta tenemos que crear una nueva carpeta con el nombre de la ruta usando dash-case. En caso de ser una ruta dinámica habrá que envolver el nombre de la carpeta entre corchetes [subruta]
- Dentro de la carpeta se encuentran los siguientes archivos:
  - En caso de que la ruta tenga un layout agregaremos el archivo layout.tsx
  - En caso de que la ruta tenga una página estática agreamos un page.tsx
  - Si tiene estilos propios agregamos un styles.module.css
- PARA CREAR UNA NUEVA PAGE CORRER EL SCRIPT `yarn newPage` y seguir las intrucciones

## COMPONENTS

- Para crear un nuevo componente (forms, cards, etc) tenemos que crear una nueva carpeta con el nombre del componente en dash-case.
  - Dentro de la carpeta se encuentran los siguientes archivos:
    - index.tsx
    - styles.module.css
- Tendremos un index.tsx que servirá para centralizar los imports y los exports.
- PARA CREAR UN NUEVO COMPONENTE CORRER EL SCRIPT `yarn newComp` y seguir las intrucciones

## UI-ATOMS

- Para crear un nuevo UI-ATOM (buttons, inputs, etc) tenemos que crear una nueva carpeta con el nombre del átomo en dash-case.
  - Dentro de la carpeta se encuentran los siguientes archivos:
    - index.tsx
    - styles.module.css
- Tendremos un index.tsx que servirá para centralizar los imports y los exports.
- PARA CREAR UN NUEVO UI-ATOM CORRER EL SCRIPT `yarn newComp` y seguir las intrucciones
