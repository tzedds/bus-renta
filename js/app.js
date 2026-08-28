import {getBuses} from './buses.js'
import {getRoutes} from './routes.js'

let buses = []
let routes = []
let selectedBus = null
let selectedRoute= null

/*
const buses = [
    {
        id: 'BUS-001',
        name: 'Mercedes Sprinter',
        type: 'Ejecutivo',
        seats: 20,
        price: 5500,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB']
    },
    {
        id: 'BUS-002',
        name: 'Volvo 9800',
        type: 'Turismo',
        seats: 45,
        price: 9500,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Baño', 'Pantallas']
    },
    {
        id: 'BUS-003',
        name: 'Irizar i8',
        type: 'Premium',
        seats: 50,
        price: 12000,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Pantallas', 'Asientos Reclinables', 'Baños']
    },
    {
        id: 'BUS-004',
        name: 'Mercedes Sprinter',
        type: 'Ejecutivo',
        seats: 30,
        price: 7500,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Pantallas']
    },
    {
        id: 'BUS-005',
        name: 'Volvo',
        type: 'Premium',
        seats: 45,
        price: 10000,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Baños', 'Pantallas']
    },
    {
        id: 'BUS-006',
        name: 'Scania K360',
        type: 'Turismo',
        seats: 48,
        price: 8900,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Baño', 'Pantallas', 'Asientos Reclinables']
    },
    {
        id: 'BUS-007',
        name: 'MAN Lion’s Coach',
        type: 'Premium',
        seats: 52,
        price: 13500,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Pantallas individuales', 'Baños', 'Asientos Cama', 'Nevera']
    },
    {
        id: 'BUS-008',
        name: 'Mercedes Tourismo',
        type: 'Ejecutivo',
        seats: 35,
        price: 8200,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Pantallas', 'Asientos Reclinables']
    },
    {
        id: 'BUS-009',
        name: 'Setra S 515 HD',
        type: 'Turismo',
        seats: 49,
        price: 9800,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Baño', 'Pantallas', 'Sistema de entretenimiento']
    },
    {
        id: 'BUS-010',
        name: 'Irizar i6',
        type: 'Ejecutivo',
        seats: 28,
        price: 6800,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Pantallas']
    },
    {
        id: 'BUS-011',
        name: 'Volvo 9700',
        type: 'Premium',
        seats: 44,
        price: 11500,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Baños', 'Pantallas', 'Asientos Cama', 'Bar']
    },
    {
        id: 'BUS-012',
        name: 'Scania Touring',
        type: 'Turismo',
        seats: 46,
        price: 9200,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Baño', 'Pantallas', 'Asientos Reclinables']
    },
    {
        id: 'BUS-013',
        name: 'Mercedes Sprinter Luxury',
        type: 'Ejecutivo',
        seats: 16,
        price: 6200,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Pantallas individuales', 'Asientos de cuero']
    },
    {
        id: 'BUS-014',
        name: 'Irizar i4',
        type: 'Económico',
        seats: 55,
        price: 7800,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Baño']
    },
    {
        id: 'BUS-015',
        name: 'MAN TGX Coach',
        type: 'Premium',
        seats: 40,
        price: 11000,
        status: 'avaliable',
        features: ['Aire acondicionado', 'WiFi', 'USB', 'Pantallas', 'Baños', 'Asientos Reclinables', 'Nevera']
    }
];
*/

// Varibales nuevas del form
const searchForm = document.querySelector('#search-form')
const routeSelect = document.querySelector('#route')
const travelDateInput = document.querySelector('#travel-date')
const passengersInput = document.querySelector('#passengers')

const statusMessage = document.querySelector('#status-message')

const busContainer = document.querySelector('#bus-container')
const busCount = document.querySelector('#bus-count')
const selectionSection = document.querySelector('#selection-section')
const selectedBusContainer = document.querySelector('#selected-bus')

// Funciones Nuevas
const setMinimumDate = () => {
    const today = new Date().toISOString().split('T')[0]

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
        routeSelect.innerHTML +=
        `
        <option value="${route.id}">
            ${route.origin}
            →
            ${route.destination}
        </option>
        ` 
    })
}

// Fin Funciones Nuevas

const formatCurrency = value => {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
    }).format(value)
}

const buildFeatures = features => {
    return features.map(
        feature => `
            <span class="feature-pill">
                ${feature}
            </span>
        `
    ).join('')
}

const renderBuses = busList => {
    // Queda Igual
    busCount.textContent = `${buses.length} unidades`

    // Funcion Nueva
    if (busList.length === 0) {
        busContainer.innerHTML = ''
        statusMessage.className = 'alert alert-warning'
        statusMessage.textContent = 'No existen autobuses con capacidad suficiente'
    }

    statusMessage.className = 'alert alert-succes'
    statusMessage.textContent = `Encontramos ${busList.length} opcion(es)`
    //

    busContainer.innerHTML = busList.map(
        bus => `
            <div class="col-md-6 col-lg-4">
                <article class="card bus-card shadow-sm h-100">
                    <div class="card-body p-4">
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <div class="bus-icon">
                                🚌
                            </div>
                            <span class="badge text-bg-success">
                                Disponible
                            </span>
                        </div>

                        <p class="text-primary fw-bold small mb-1">
                            ${bus.type.toUpperCase()}
                        </p>

                        <h3 class="h4 fw-bold">
                            ${bus.name}
                        </h3>

                        <p class="text-secondary mb-2">
                            Codigo:${bus.id}
                        </p>

                        <p class="mb-3">
                            <strong>
                                ${bus.seats}
                            </strong>
                            pasajeros
                        </p>

                        <div class="mb-4">
                            ${buildFeatures(bus.features)}
                        </div>

                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <small class="text-secondary d-block">
                                    Desde
                                </small>
                                <strong class="fs-4">
                                    ${formatCurrency(bus.price)}
                                </strong>
                            </div>
                            <button class="btn btn-primary select-bus-btn" data-busid="${bus.id}">
                                Seleccionar
                            </button>
                        </div>
                    </div>
                </article>
            </div>
        `
    ).join('')
    attachBusEvents()
}

const attachBusEvents = () => {
    const buttons = document.querySelectorAll('.select-bus-btn')

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            selectBus(button.dataset.busid)
        })
    })
}

const selectBus = busId => {
    const selectedBus = buses.find(bus => bus.id === busId)
    if (!selectedBus) {
        return
    }
    selectionSection.classList.remove('d-none')

    selectedBusContainer.innerHTML = `
        <div class="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3">
            <div>
                <p class="mb-1 text-secondary">
                    ${selectedBus.type}
                </p>
                <h4 class="mb-1">
                    ${selectedBus.name}
                </h4>
                <p class="mb-0">
                    Capacidad:
                    <strong>
                        ${selectedBus.seats} pasajeros
                    </strong>
                </p>
            </div>
            
            <div class="text-md-end">
                <small class="text-secondary d-block">
                    Precio Base
                </small>
                <strong class="fs-3 text-primary">
                    ${formatCurrency(selectedBus.price)}
                </strong>
            </div>
        </div>
    `
    selectionSection.scrollIntoView({
        behavior: "smooth"
    })
}

// Funcion Nueva
const handleSearch = event => {
    event.preventDefault()
    const routeId = routeSelect.value 
    const travelDate = travelDateInput.value 
    const passengers = Number(passengersInput.value)
    if (!routeId || !travelDate || !passengers){
        statusMessage.className = 'alert alert-danger'
        statusMessage.textContent = 'Completa todos los datos'
        return
    }
    selectedRoute = routes.find(route => route.id === routeId)
    selectedBus = null
    selectionSection.classList.add('d-none')
    const availableBuses = buses.filter(bus => {
        bus.satus === 'available' && Number(bus.seats) >= passengers
    })
    renderBuses(availableBuses)
}

const initialize = async () => {
    try{
        statusMessage.className = 'alert alert-info'
        statusMessage.textContent = 'Cargando informacion de la BD...';
        
        [buses, routes] = await Promise.all([
            getBuses(),
            getRoutes()
        ])

        renderRoutes()
        
        busContainer.innerHTML = ''
        busCount.textContent = `${buses.length} unidades registradas`

        statusMessage.className = 'alert alert-info'
        statusMessage.textContent = 'Selecciona ruta, fecha y pasajeros para poder buscar...'
    }catch (error) {
        console.log(error)
        statusMessage.className = 'alert alert-danger'
        statusMessage.textContent = 'No fue posible cargar la informacion de la base de datos' 
    }
}

searchForm.addEventListener('submit', handleSearch)

setMinimumDate()
initialize()
//