import {
  collection,
  doc,
  setDoc,
  getDocs,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js";

import {
  db
} from "./firebase.js";

/**
 * Datos iniciales de autobuses
 */
const buses = [
  {
    id: "BUS-001",
    name: "Mercedes Sprinter",
    type: "Ejecutivo",
    seats: 20,
    price: 5500,
    status: "available",
    features: [
      "Aire acondicionado",
      "WiFi",
      "USB"
    ]
  },
  {
    id: "BUS-002",
    name: "Volvo 9800",
    type: "Turismo",
    seats: 45,
    price: 9500,
    status: "available",
    features: [
      "Aire acondicionado",
      "WiFi",
      "Baño",
      "Pantallas"
    ]
  },
  {
    id: "BUS-003",
    name: "Irizar i8",
    type: "Premium",
    seats: 50,
    price: 12000,
    status: "available",
    features: [
      "Asientos reclinables",
      "WiFi",
      "Baño",
      "Pantallas",
      "USB"
    ]
  },
  {
    id: "BUS-004",
    name: "Scania Touring",
    type: "Turismo Plus",
    seats: 48,
    price: 10500,
    status: "available",
    features: [
      "Aire acondicionado",
      "WiFi",
      "Baño",
      "USB",
      "Pantallas"
    ]
  }
];

/**
 * Datos iniciales de rutas
 */
const routes = [
  {
    id: "LEON-QRO",
    origin: "León, Gto.",
    destination: "Querétaro, Qro.",
    distance: 170,
    duration: "2h 30min",
    routePrice: 2500,
    active: true
  },
  {
    id: "LEON-CDMX",
    origin: "León, Gto.",
    destination: "Ciudad de México",
    distance: 390,
    duration: "5h",
    routePrice: 4500,
    active: true
  },
  {
    id: "SAL-GDL",
    origin: "Salamanca, Gto.",
    destination: "Guadalajara, Jal.",
    distance: 260,
    duration: "3h 30min",
    routePrice: 3500,
    active: true
  },
  {
    id: "QRO-SMA",
    origin: "Querétaro, Qro.",
    destination: "San Miguel de Allende, Gto.",
    distance: 65,
    duration: "1h 15min",
    routePrice: 1800,
    active: true
  }
];

/**
 * Inserta autobuses
 */
async function seedBuses() {

  console.log("Insertando autobuses...");

  for (const bus of buses) {

    const {
      id,
      ...data
    } = bus;

    await setDoc(
      doc(
        db,
        "buses",
        id
      ),
      data
    );

    console.log(
      `Autobús insertado: ${id}`
    );
  }
}

/**
 * Inserta rutas
 */
async function seedRoutes() {

  console.log("Insertando rutas...");

  for (const route of routes) {

    const {
      id,
      ...data
    } = route;

    await setDoc(
      doc(
        db,
        "routes",
        id
      ),
      data
    );

    console.log(
      `Ruta insertada: ${id}`
    );
  }
}

/**
 * Elimina todos los documentos
 * de una colección.
 *
 * Solo se utiliza para la práctica
 * y facilitar que el seed pueda
 * ejecutarse nuevamente.
 */
async function clearCollection(
  collectionName
) {

  console.log(
    `Limpiando ${collectionName}...`
  );

  const snapshot =
    await getDocs(
      collection(
        db,
        collectionName
      )
    );

  for (
    const documentSnapshot
    of snapshot.docs
  ) {

    await deleteDoc(
      doc(
        db,
        collectionName,
        documentSnapshot.id
      )
    );
  }
}

/**
 * Ejecuta el seed completo
 */
async function seedDatabase() {

  const seedButton =
    document.querySelector(
      "#seed-button"
    );

  const status =
    document.querySelector(
      "#seed-status"
    );

  try {

    seedButton.disabled = true;

    seedButton.textContent =
      "Insertando...";

    status.className =
      "alert alert-info";

    status.textContent =
      "Preparando Firestore...";

    /**
     * Para poder ejecutar varias
     * veces la práctica.
     */
    await clearCollection(
      "buses"
    );

    await clearCollection(
      "routes"
    );

    await seedBuses();

    await seedRoutes();

    status.className =
      "alert alert-success";

    status.innerHTML = `
      <strong>
        Base de datos preparada correctamente.
      </strong>

      


      ${buses.length}
      autobuses insertados.

      


      ${routes.length}
      rutas insertadas.
    `;

    console.log(
      "Seed completado."
    );

  }
  catch (error) {

    console.error(
      "Error ejecutando seed:",
      error
    );

    status.className =
      "alert alert-danger";

    status.textContent =
      "Ocurrió un error al insertar los datos. Revisa la consola.";

  }
  finally {

    seedButton.disabled = false;

    seedButton.textContent =
      "Insertar datos nuevamente";

  }
}

document
  .querySelector(
    "#seed-button"
  )
  .addEventListener(
    "click",
    seedDatabase
  );