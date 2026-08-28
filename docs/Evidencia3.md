# Evidencia 3
## 25 de agosto de 2026 Computo en la nube

``` HTML
    <header class="hero-section">
        <div class="container py-5">
            <div class="row align-items-center min-vh-50">
                <div class="col-lg-7">
                    <span class="badge text-bg-warning mb-3">
                        Busca tu proximo viaje 🏖️
                    </span>
                    <h1 class="display-4 fw-bold">
                        Autobuses para grupos, empresas, turismo
                    </h1>
                    <p class="lead text-secondary">
                        Selecciona una ruta, fecha y número de pasajeros
                    </p>
                </div>
                <div class="col-lg-5 text-center mt-4 mt-lg-8">
                    <div class="bus-hero-icon">
                        🚌
                    </div>
                </div>
            </div>
        </div>
    </header>
    <main class ="container py-5">
        <section class="card card border-0 shadow-sm mb-5">
            <div class="card-body p-4 p-lg-5">
                <h2 class="h3 fw-bold mb-4">
                    Buscar autobus
                </h2>
                <form id="search-form">
                    <div class="row g-3">
                        <div class="col-lg-5">
                            <label for="route" class="form-label">Ruta </label>
                                <select id="route" required class="form-select">
                                    <option value="">Cargando rutas ...
                                    </option>
                                </select>

                        </div>
                        <div class="col-md-6 col-lg-3">
                            <label for="travel-date" class="form-label">Fecha</label>
                            <input id="travel-date" required type ="date" class="form-control">
                        </div>
                        <div class="col-md-6 col-lg-3">
                            <label for="passangers" class="form-label">Pasajeros</label>
                            <input id="passangers" required type ="number" class="form-control" min ="1" max="70" value="1">
                        </div>
                        <div class="col-lg-2 d-flex align-items-end">
                            <button type="submit" class="btn btn-primary w-100">
                                Buscar
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </section>
        <section >
            <div class="d-flex justify-content-between align-items-end mb-4">
                <div>
                    <p class="text-primary fw-bold mb-1">
                        RESULTADOS
                    </p>
                    <h2 class="fw-bold mb-0">
                        Autobuses Disponibles
                    </h2>
                </div>
                <span id="bus-count" class="badge rounded-pill text-bg-dark">
                    0 Unidades
                </span>
            </div>
            <div id ="status message" class="alert alert-info">
                Selecciona los datos del viaje
            </div>
            <div id="bus-container" class="row g-4">
            </div>
        </section>
        <section id="selection-section" class="container pb-5 d-none">
            <div class="card border-0 shadow">
                <div class="card-body p-4">
                    <h3 class="h4 fw-bold">
                        Autobus Seleccionado 
                    </h3>
                    <div id="selected-bus"></div>
                </div>
            </div>
        </section>
    </main>
```

``` js
let buses = []
let routes = []
let selectedBus = null
let selectedRoute = null

// Variables nuevas del form
const searchForm = document.querySelector('#search-form')
const routeSelect = document.querySelector('#route')
const travelDateInput = document.querySelector('#travel-date')
const passengersInput = document.querySelector('#passangers')

const statusMessage = document.querySelector('#status-message')

// Funciones nuevas
const setMininumDate = () => {
    const today = new Date () .toISOString().split ('T')[0]

    travelDateInput.min = today
}

const renderRoutes = () => {
    routeSelect.innerHTML = 
`
        <option value="">
            Selecciona una ruta
        </option>
        `

    routes.forEach(route => {
        routeSelect.innerHTML += `
            <option value="${route.id}">
                ${route.origin} 
                🔜
                 ${route.destination}
            </option>
        `
    })
}

//Funcion nueva
if (busList.length === 0) {
    busContainer.innerHTML = ''
    statusMessage.className = 'alert alert-warning'
    statusMessage.textContent = 'No existen autobuses con capacidad suficiente.'
}

statusMessage.className = 'alert alert-success'
statusMessage.textContent = `Encontramos ${busList.length} opcion(es)`
//
    busContainer.innerHTML = busList.map(
        bus => `
        <div class="col-md-6 col-lg-4">
            <article class="card bus-card shadow-sm h-100">
                <div class="card-body p-4">

                    <div class="d-flex justify-content-between align-items-center mb-3">
                        <div class="bus-icon">🚌</div>
                        <span class="badge text-bg-success">Disponible</span>
                    </div>

                    <p class="text-primary fw-bold small mb-1">
                        ${bus.type.toUpperCase()}
                    </p>

                    <h3 class="h4 fw-bold">${bus.name}</h3>

                    <p class="text-secondary mb-2">
                        Código: ${bus.id}
                    </p>

                    <p class="mb-3">
                        <strong>${bus.seats}</strong> pasajeros
                    </p>

                    <div class="mb-4">
                        ${buildFeatures(bus.features)}
                    </div>

                    <div class="d-flex justify-content-between align-items-center">
                        <div>
                            <small class="text-secondary d-block">Desde</small>
                            <strong class="fs-4">
                                ${formatCurrency(bus.price)}
                            </strong>
                        </div>

                        <button
                            class="btn btn-primary select-bus-btn"
                            data-busid="${bus.id}">
                            Seleccionar
                        </button>
                    </div>

                </div>
            </article>
        </div>
    `).join('');

    attachBusEvents();
};

const attachBusEvents = () => {
    const buttons = document.querySelectorAll('.select-bus-btn');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const busId = button.dataset.busid;
            selectBus(busId);
        });
    });
};

const selectBus = busId => {
    const selectedBus = buses.find(bus => bus.id === busId);

    if (!selectedBus) return;

    selectionSection.classList.remove('d-none');

    selectedBusContainer.innerHTML = `
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">

            <div>
                <p class="mb-1 text-secondary">Autobús seleccionado</p>

                <h4 class="mb-1">${selectedBus.name}</h4>

                <p class="mb-0">
                    Capacidad:
                    <strong>${selectedBus.seats} pasajeros</strong>
                </p>
            </div>

            <div class="text-md-end">
                <small class="text-secondary d-block">Precio base</small>

                <strong class="fs-3 text-primary">
                    ${formatCurrency(selectedBus.price)}
                </strong>
            </div>

        </div>
    `;
};

//Funcion nueva
const handleSearch = event => {
    event.preventDefault ()
    const routeId = routeSelect.value 
    const travelDate = travelDateInput.value
    const passengers = Number(passengersInput.value)
    if (!routeId || !travelDate || !passengers) {
        statusMessage.className = 'alert alert-danger'
        statusMessage.textContent = ' Completa todos los datos'
        return
    }
    selectedRoute = routes.find(route => route.id === routeId)
    selectedBus = null
    selectionSection.classList.add ('d-none')
    const availableBuses = buses.filter (bus => {
         return bus.status === 'available' && Number (bus.seats) >= passengers
    })
    renderBuses (availableBuses)
}

const initialize = async () => {
    try {
        statusMessage.className ='alert alert-info'
        statusMessage.textContent = ' Cargando información de BD.....'

        [buses, routes] = await Promise.all ([
            getBuses (),
            getRoutes ()
        ])

        renderRoutes () 

        busContainer.innerHTML = ''
        busCount.textContent = ` $ { buses.length} unidades registradas`

        statusMessage.className ='alert alert-info'
        statusMessage.textContent = ' Selecciona ruta, fecha y pasajeros para poder buscar....'

    } catch (error) {
        console.log (error)
        statusMessage.className ='alert alert-danger'
        statusMessage.textContent = ' no fue posible cargar la info de la base de datos'
    }
}

searchForm.addEventListener('submit', handleSearch)

setMininumDate()
initialize ()

```

``` css

```

