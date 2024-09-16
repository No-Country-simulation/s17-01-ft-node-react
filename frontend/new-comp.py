import os
import sys


def createFolder(route: str, folderName: str):
    if not os.path.exists(route):
        print(f"La ruta {route} no existe.")
        return

    folderPath = os.path.join(route, folderName)

    if os.path.exists(folderPath):
        print(f"La carpeta '{folderName}' ya existe en la ruta '{route}'.")
        return

    os.makedirs(folderPath)

    indexFilePath = os.path.join(folderPath, "index.tsx")
    with open(indexFilePath, "w") as indexFile:
        componentWords = folderName.split("-")
        componentName = ""
        for word in componentWords:
            componentName = componentName + word.title()
        indexFile.write(f"""import styles from "./styles.module.css";
import {{ {componentName}Props }} from "@/lib/types";

export function {componentName}(props:{componentName}Props) {{
    return <div>{componentName} component</div>;
}};
                        """)

    stylesFilePath = os.path.join(folderPath, "styles.module.css")
    with open(stylesFilePath, "w") as stylesFile:
        stylesFile.write("")

    print(f"""Carpeta 📁'{folderName}' creada exitosamente en 📍'{
          route}' con los archivos 📃'index.tsx' y 📃'styles.module.css'.""")


def rewriteFile(file: str, componentFile: str) -> str:
    imports = []
    lines = file.split(";")
    for index, line in enumerate(lines):
        line = line.strip()
        if line and not line.startswith("export "):
            imports.append(f"{line};")
    componentName = "".join(word.title() for word in componentFile.split("-"))
    imports.append(f'import {{ {componentName} }} from "./{componentFile}";')

    exportLine = file.split("export ")
    exports = exportLine[1][2:-4].split(",")
    exports.append(componentName)
    exports = sorted(list(map(lambda comp: comp.strip(), exports)))
    exportLine = f'export {{ {", ".join(exports)} }};'
    newFileContent = f"""{f"""
""".join(sorted(imports))}

{exportLine}
"""
    return newFileContent


def addComponent(route: str, componentFile: str):
    indexFilePath = os.path.join(route, "index.tsx")
    lines = []
    if not os.path.exists(indexFilePath):
        print(f"El archivo 'index.tsx' no existe en la ruta '{route}'.")
        return

    with open(indexFilePath, "r") as indexFile:
        fileLines = indexFile.readlines()
        for line in fileLines:
            lines.append(line)
    newFileContent = rewriteFile("".join(lines), componentFile)
    with open(indexFilePath, "w") as indexFile:
        indexFile.write(newFileContent)


if __name__ == "__main__":
    if len(sys.argv) > 1:
        print("Uso: python mkdir.py <ruta> <nombre_carpeta>")
        sys.exit(1)

    ruta = input("Ingresá la ruta: ")
    nombre_carpeta = input(
        "Ingresá el nombre de la carpeta separado por '-': ")

    createFolder(ruta, nombre_carpeta)
    addComponent(ruta, nombre_carpeta)
