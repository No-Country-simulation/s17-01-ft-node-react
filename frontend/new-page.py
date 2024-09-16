import os
import sys


def getInput(question: str):
    while True:
        isPositive = input(
            f"¿{question}? Responda 'Sí' ó 'No': ").strip().lower()
        if isPositive in ["sí", "si", "no"]:
            return isPositive == "sí" or isPositive == "si"
        else:
            print("Entrada no válida. Intente de nuevo.")


def createFolder(route: str, folderName: str):
    isDynamic = getInput("Es una ruta dinámica")
    hasPage = getInput("Tiene página estática")
    hasLayout = getInput("Tiene layout")

    if not hasPage and not hasLayout:
        print(
            "\033[91m❌ La página debe tener al menos una página o un layout. Proceso cancelado.\033[0m")
        return

    if not os.path.exists(route):
        print(f"\033[91m🙈 La ruta {route} no existe.\033[0m")
        return

    folderPath = os.path.join(
        route, f"[{"_".join(folderName.split("-"))}]" if isDynamic else folderName)

    if os.path.exists(folderPath):
        print(f"\033[91m⛔ La carpeta '{
              folderName}' ya existe en la ruta '{route}'.\033[0m")
        return

    os.makedirs(folderPath)

    if (hasPage):
        pageFilePath = os.path.join(folderPath, "page.tsx")
        with open(pageFilePath, "w") as pageFile:
            pageWords = folderName.split("-")
            pageName = ""
            dynamicKey = "_".join(pageWords)
            for word in pageWords:
                pageName = pageName + word.title()
            pageFile.write(f""""use client";
import styles from "./styles.module.css";
{'import { useParams } from "next/navigation";' if isDynamic else ""}

export default function Page() {{
    {'const { ' + dynamicKey + ' } = useParams();' if isDynamic else ""}
    return (
        <div className={{styles.page}}>
            {f"{{{dynamicKey}}}" if isDynamic else pageName} Page
        </div>
    )
}};
                        """)

    if (hasLayout):
        pageFilePath = os.path.join(folderPath, "layout.tsx")
        with open(pageFilePath, "w") as pageFile:
            pageWords = folderName.split("-")
            pageName = ""
            dynamicKey = "_".join(pageWords)
            for word in pageWords:
                pageName = pageName + word.title()
            pageFile.write(f""""use client";
import styles from "./styles.module.css";
{'import { useParams } from "next/navigation";' if isDynamic else ""}

export default function {pageName}Layout({{children}}: {{children: React.ReactNode}}) {{
    {'const { ' + dynamicKey + ' } = useParams();' if isDynamic else ""}
    return (
        <div className={{styles.layout}}>
            {f"{{{dynamicKey}}}" if isDynamic else pageName} Layout
            <main className={{styles.layout_main}}>{{children}}</main>
        </div>
    )
}};
                        """)

    stylesFilePath = os.path.join(folderPath, "styles.module.css")
    with open(stylesFilePath, "w") as stylesFile:
        stylesFile.write("")
    folderName = "[" + "_".join(folderName.split("-")) + \
        "]" if isDynamic else folderName
    filesCreated = []
    fileNames = ["page", "layout"]
    for index, file in enumerate([hasPage, hasLayout]):
        if file:
            filesCreated.append(
                f"📃'{fileNames[index]}.tsx'")

    print(f"""\033[92m✅ Carpeta 📁'{folderName}' creada exitosamente en 📍'{
          route}' con los archivos {", ".join(filesCreated)} y 📃'styles.module.css'.\033[0m""")


if __name__ == "__main__":
    if len(sys.argv) > 1:
        print("Uso: python mkdir.py <ruta> <nombre_carpeta>")
        sys.exit(1)

    # uno = 1 == 1
    # dos = 1 == 0
    # files = []
    # for file in enumerate[uno, dos]:
    #     if file:
    #         files.append(f"📃'{"page" if file is uno else "layout"}.txt'")
    # print(files)
    ruta = input("Ingresá la ruta: ")
    nombre_carpeta = input(
        "Ingresá el nombre de la carpeta separado por '-': ")

    createFolder(ruta, nombre_carpeta)
