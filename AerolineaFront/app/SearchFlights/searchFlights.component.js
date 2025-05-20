import { navegarA } from "../script.js";

export class SearchFlightsComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.shadow = shadow;
        this.#formatearHoraLocal();
        this.#render(shadow);
        this.#agregarEstilos(shadow);        
    }

    #formatearHoraLocal(fechaUTC, offset = -6) {
    const fecha = new Date(fechaUTC);
    fecha.setHours(fecha.getHours() + offset);
    return fecha.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}

    async #render(shadow) {
        

        const criteriosBusqueda = JSON.parse(localStorage.getItem('criteriosBusqueda')) || {};
        const { origen, destino, salida } = criteriosBusqueda;

        shadow.innerHTML = `
            <div class="container">
                <header class="header">
                    <h1>Vuelos de ${origen} a ${destino}</h1>
                    <p class="fecha">"${salida}"</p>
                </header>
                <section id="vuelos-container" class="vuelos">
                    <p>Cargando vuelos...</p>
                </section>
            </div>
        `;


        function mismaFecha(fecha1, fecha2) {
            const f1 = new Date(fecha1).toISOString().slice(0,10);
            const f2 = new Date(fecha2).toISOString().slice(0,10);
            return f1 === f2;
        }

        const container = shadow.getElementById("vuelos-container");

        try {
            const response = await fetch(`http://localhost:3000/api/vuelos`);
            if (!response.ok) {
            container.innerHTML = "<p>Error al obtener los vuelos.</p>";
            return;
            }
            const result = await response.json();
            const vuelos = result.data;

            if (vuelos.length === 0) {
            container.innerHTML = "<p>No hay vuelos registrados.</p>";
            return;
            }

            // Filtrar vuelos según criterios de búsqueda
            const vuelosFiltrados = vuelos.filter(vuelo => {
                const matchOrigen = origen ? vuelo.origen === origen : true;
                const matchDestino = destino ? vuelo.destino === destino : true;
                const matchFecha = salida ? mismaFecha(vuelo.fechaSalida, salida) : true;
                return matchOrigen && matchDestino && matchFecha;
            });

            if (vuelosFiltrados.length === 0) {
            container.innerHTML = "<p>No se encontraron vuelos con los criterios seleccionados.</p>";
            return;
            }

            // Renderizar vuelos filtrados
            container.innerHTML = "";
            vuelosFiltrados.forEach(vuelo => {

            const fechaSalida = new Date(vuelo.fechaSalida);
            const fechaLlegada = new Date(vuelo.fechaLlegada);
            const duracionMs = fechaLlegada - fechaSalida;
            const duracionMin = Math.floor(duracionMs / 60000);
            const horas = Math.floor(duracionMin / 60);
            const minutos = duracionMin % 60;
            const duracion = `${horas}h ${minutos}min`;

            const vueloHTML = `
                <div class="vuelo">
                <div class="info-vuelo">
                    <p class="duracion"><img src="/AerolineaFront/assets/clock.svg" alt="Avión despegando" width="15" height="15" /> ${duracion}</p>
                    <div class="icono-avion">
                    <img src="/AerolineaFront/assets/avionDespegando.svg" alt="Avión despegando" width="30" height="30" />
                    </div>
                    <div class="linea-tiempo">
                    <span class="hora hora-salida">${this.#formatearHoraLocal(vuelo.fechaSalida)}</span>
                    <div class="linea-con-puntos"></div>
                    <span class="hora hora-llegada">${this.#formatearHoraLocal(vuelo.fechaLlegada)}</span>
                    </div>
                </div>
                <div class="precio">
                    <p>$${vuelo.precio} <span class="moneda">MXN</span></p>
                    <button class="btn-modificar">Reservar</button>
                </div>
                </div>
            `;
            container.insertAdjacentHTML("beforeend", vueloHTML);

            
            const botones = container.querySelectorAll('.btn-modificar');
            const botonActual = botones[botones.length - 1]; 
            botonActual.addEventListener('click', () => {
           
            localStorage.setItem('vueloSeleccionado', JSON.stringify(vuelo));
            
            navegarA('reservation-info'); 
            });

        });

        } catch (error) {
            container.innerHTML = "<p>Error al cargar los vuelos. Intente más tarde.</p>";
            console.error(error);
        }
    }

    


    #agregarEstilos(shadow) {
        const style = document.createElement('style');
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                }

                body {
                font-family: Arial, sans-serif;
                background-color: #f8f8f8;
                }

                .container {
                width: 60%;
                margin: 0 auto;
                }

                .header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                margin-bottom: 20px;
                }

                .header h1 {
                font-size: 24px;
                font-weight: bold;
                }

                .header .fecha {
                font-size: 18px;
                color: #555;
                }

                .btn-modificar {
                padding: 10px 20px;
                background-color: #009CFF;
                color: white;
                border: none;
                border-radius: 5px;
                cursor: pointer;
                }

                .vuelos {
                display: flex;
                flex-direction: column;
                gap: 15px;
                }

                .vuelo {
                display: flex;
                justify-content: space-between;
                align-items: center;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 10px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                max-width: 800px;
                width: 100%;
                margin: 0 auto;
                }

                .info-vuelo {
                display: flex;
                flex-direction: column;
                align-items: center;
                flex: 1;

                }

                .duracion {
                font-size: 14px;
                color: #333;
                margin-bottom: 8px;
                }

                .linea-tiempo {
                display: flex;
                align-items: center;
                gap: 10px;
                }

                .hora {
                font-size: 16px;
                font-weight: bold;
                color: #000;
                }

                .linea-con-puntos {
                position: relative;
                width: 280px;
                height: 2px;
                background-color: #999;
                }

                .linea-con-puntos::before,
                .linea-con-puntos::after {
                content: "";
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 10px;
                height: 10px;
                background-color: black;
                border-radius: 50%;
                }

                .linea-con-puntos::before {
                left: 0;
                }

                .linea-con-puntos::after {
                right: 0;
                }

                .precio {
                min-width: 120px;
                text-align: right;
                }

                .precio p {
                font-size: 18px;
                color: #009CFF;
                font-weight: bold;
                }

                .precio .moneda {
                font-size: 14px;
                color: #aad4f5;
                }

                .icono-avion {
                display: flex;
                justify-content: center;
                margin-bottom: 5px;
                }
            `;
        shadow.appendChild(style)
    }
}
