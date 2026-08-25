# BusRent — Preparación del entorno

## Objetivo

Preparar el equipo antes de iniciar las tres sesiones del proyecto **BusRent**, una aplicación web para consultar autobuses, rutas, calcular una cotización y registrar reservaciones utilizando:

- HTML5
- JavaScript moderno
- Bootstrap 5.3.8
- Firebase Cloud Firestore
- Git
- GitHub
- GitFlow

> El proyecto no requiere Node.js, npm, React, Vue, Angular ni un backend propio.

---

# 1. Software requerido

## 1.1 Visual Studio Code

Descarga oficial:

https://code.visualstudio.com/download

Instalar la versión correspondiente al sistema operativo.

Después de instalar, comprobar que VS Code abre correctamente.

---

## 1.2 Git

Descarga oficial:

https://git-scm.com/install/

Comprobar instalación:

```bash
git --version
```

Ejemplo:

```text
git version 2.55.0
```

Configurar nombre:

```bash
git config --global user.name "Nombre del Alumno"
```

Configurar correo:

```bash
git config --global user.email "correo@ejemplo.com"
```

Comprobar:

```bash
git config --global --list
```

---

# 2. Extensión recomendada: Live Server

Utilizaremos módulos JavaScript ES (`type="module"`). Por ello es recomendable servir el proyecto mediante HTTP y no abrir únicamente el archivo con doble clic.

Extensión:

**Live Server — Ritwick Dey**

Marketplace:

https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer

También puede instalarse desde VS Code:

1. Abrir VS Code.
2. Entrar a Extensions.
3. Buscar `Live Server`.
4. Seleccionar la extensión de Ritwick Dey.
5. Presionar Install.

Desde la consola de VS Code también puede instalarse con:

```text
ext install ritwickdey.LiveServer
```

Para ejecutar el proyecto:

1. Abrir `index.html`.
2. Clic derecho.
3. Seleccionar **Open with Live Server**.

---

# 3. Bootstrap

Utilizaremos Bootstrap mediante CDN.

No se instala nada.

Documentación oficial:

https://getbootstrap.com/docs/5.3/getting-started/introduction/

CSS:

```html
<link
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css"
  rel="stylesheet"
  integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB"
  crossorigin="anonymous"
/>
```

JavaScript de Bootstrap:

```html
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI"
  crossorigin="anonymous"
></script>
```

---

# 4. Firebase

Utilizaremos Firebase mediante CDN.

No se instalará Firebase con npm.

Documentación oficial:

https://firebase.google.com/docs/web/alt-setup

Cloud Firestore:

https://firebase.google.com/docs/firestore/quickstart

Versión utilizada en estas prácticas:

```text
Firebase JavaScript SDK 12.17.1
```

Firebase App:

```javascript
import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-app.js";
```

Firestore:

```javascript
import { getFirestore }
from "https://www.gstatic.com/firebasejs/12.17.1/firebase-firestore.js";
```

---

# 5. Crear cuenta y proyecto Firebase

Entrar a:

https://console.firebase.google.com/

Crear un proyecto.

Nombre recomendado:

```text
busrent
```

Después:

1. Seleccionar el proyecto.
2. Presionar el icono `</>` para agregar una aplicación Web.
3. Nombre:

```text
BusRent Web
```

4. Registrar la aplicación.
5. Firebase mostrará un objeto parecido a:

```javascript
const firebaseConfig = {
  apiKey: "XXXXXXXX",
  authDomain: "busrent.firebaseapp.com",
  projectId: "busrent",
  storageBucket: "busrent.firebasestorage.app",
  messagingSenderId: "000000000000",
  appId: "1:000000000000:web:xxxxxxxx"
};
```

Cada alumno debe utilizar la configuración generada por su propio proyecto.

---

# 6. Crear Cloud Firestore

Dentro de Firebase:

```text
Build
  └── Firestore Database
```

Seleccionar:

```text
Create database
```

Para esta práctica académica puede iniciarse en **Test mode**.

> Importante: Test mode permite acceso amplio temporalmente y no debe utilizarse tal cual en una aplicación real de producción. Firebase recomienda revisar las Security Rules antes de liberar una aplicación.

Seleccionar una región y crear la base de datos.

---

# 7. Crear repositorio GitHub

Entrar a:

https://github.com/new

Nombre sugerido:

```text
busrent
```

Para esta práctica se recomienda crear el repositorio **vacío**, sin README automático.

En la computadora:

```bash
mkdir busrent
cd busrent
```

Inicializar Git:

```bash
git init
```

Crear rama principal:

```bash
git branch -M main
```

Crear README inicial:

```bash
touch README.md
```

En Windows PowerShell puede utilizarse:

```powershell
New-Item README.md
```

Primer commit:

```bash
git add .
git commit -m "chore: initialize BusRent project"
```

Agregar el remoto:

```bash
git remote add origin https://github.com/USUARIO/busrent.git
```

Comprobar:

```bash
git remote -v
```

Subir:

```bash
git push -u origin main
```

---

# 8. GitFlow que utilizaremos

No es necesario instalar la extensión `git-flow`.

Aplicaremos el modelo mediante comandos Git normales.

Ramas permanentes:

```text
main
develop
```

Ramas temporales:

```text
feature/*
release/*
hotfix/*
```

Flujo:

```text
main
  │
  └── develop
        │
        ├── feature/project-base
        ├── feature/bus-catalog
        ├── feature/firebase
        ├── feature/routes
        └── feature/reservations
                    │
                    └── release/1.0.0
                              │
                              └── main
```

Regla principal:

> Ningún alumno desarrolla funcionalidades directamente sobre `main`.

---

# 9. Crear develop

Después del primer commit:

```bash
git checkout -b develop
```

Subir:

```bash
git push -u origin develop
```

Comprobar:

```bash
git branch
```

Resultado esperado:

```text
* develop
  main
```

---

# 10. Estructura que tendrá el proyecto al finalizar

```text
busrent/
│
├── index.html
├── reservations.html
│
├── css/
│   └── styles.css
│
├── js/
│   ├── app.js
│   ├── firebase.js
│   ├── buses.js
│   ├── routes.js
│   └── reservations.js
│
├── README.md
└── .gitignore
```

---

# 11. Verificación previa a la sesión 1

Ejecutar:

```bash
git --version
```

Abrir:

```text
Visual Studio Code
```

Comprobar:

- Git instalado.
- Cuenta GitHub disponible.
- Live Server instalado.
- Navegador Chrome, Edge o Firefox.
- Repositorio BusRent creado.
- Rama `main` creada.
- Rama `develop` creada.

---

# Referencias oficiales

Bootstrap:

https://getbootstrap.com/docs/5.3/getting-started/introduction/

Firebase Web:

https://firebase.google.com/docs/web/setup

Firebase CDN:

https://firebase.google.com/docs/web/alt-setup

Cloud Firestore:

https://firebase.google.com/docs/firestore/quickstart

Git:

https://git-scm.com/install/

GitHub:

https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-new-repository

VS Code:

https://code.visualstudio.com/download
