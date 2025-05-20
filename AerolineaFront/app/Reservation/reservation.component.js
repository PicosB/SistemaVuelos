import { navegarA } from "../script.js";
import { AuthService } from "../Login/auth.service.js";

export class ReservationComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#agregarEstilos(shadow);
    this.#render(shadow);
    this.#agregarEventos(shadow);
  }

  #render(shadow) {
    shadow.innerHTML += `
        <main class="main-content">
            <section class="vuelo-seleccionado">
            <h2>Vuelo Seleccionado</h2>
            <table id="tabla-vuelos">
                <thead>
                <tr>
                    <th>Fecha</th>
                    <th>Origen</th>
                    <th>Destino</th>
                    <th>Salida</th>
                    <th>Llegada</th>
                    <th>Monto</th>
                </tr>
                </thead>
                <tbody id="tabla-body">
                <!--Filas de vuelo-->
                </tbody>
            </table>
            </section>

            <section class="metodo-pago2">
                <h2>Método de Pago</h2>
                
                <div class="tarjeta" id="metodo-actual">
                    <span class="icono-tarjeta">💳</span>
                    <span id="numero-tarjeta">•••• •••• 4589</span>
                    <button class="cambiar" id="btn-cambiar">Cambiar</button>
                </div>

                <div id="opciones-pago" class="opciones-pago oculto">
                    <div class="opcion" data-tarjeta="•••• •••• 1234">💳 •••• •••• 1234</div>
                    <div class="opcion" data-tarjeta="•••• •••• 5678">💳 •••• •••• 5678</div>
                    <div class="opcion" data-tarjeta="•••• •••• 9012">💳 •••• •••• 9012</div>
                </div>
            </section>

            <section class="metodo-pago">
            <h2>Método de Pago</h2>

            <div class="formulario-tarjeta">
                <label>
                Número de tarjeta:
                <input type="text" id="input-tarjeta" maxlength="19" placeholder="1234 5678 9012 3456" />
                </label>
                <label>
                Nombre del titular:
                <input type="text" id="input-titular" placeholder="Juan Pérez" />
                </label>
                <label>
                Fecha de expiración:
                <input type="month" id="input-expiracion" />
                </label>
                <label>
                CVV:
                <input type="text" id="input-cvv" maxlength="4" placeholder="123" />
                </label>
            </div>
            </section>
            <div class="reservar-vuelo">
                <button id="btn-reservar">Reservar Vuelo</button>
            </div>
        </main>
        `;
  }

  #agregarEstilos(shadow) {
    let link = document.createElement("link");
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./Reservation/reservation.component.css");
    shadow.appendChild(link);
  }

  #agregarEventos(shadow) {
    // Recuperar vuelo desde localStorage
    const vuelo = JSON.parse(localStorage.getItem("vueloSeleccionado"));

    if (!vuelo) {
      // Si no hay vuelo, mostrar mensaje o redirigir
      const tablaBody = shadow.getElementById("tabla-body");
      tablaBody.innerHTML = `<tr><td colspan="6">No hay vuelo seleccionado.</td></tr>`;
      return;
    }

    // Formatear fechas y horas
    const fechaSalida = new Date(vuelo.fechaSalida);
    const fechaLlegada = new Date(vuelo.fechaLlegada);
    const fecha = fechaSalida.toLocaleDateString("es-MX");
    const horaSalida = fechaSalida.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });
    const horaLlegada = fechaLlegada.toLocaleTimeString("es-MX", {
      hour: "2-digit",
      minute: "2-digit",
    });

    // Insertar fila en la tabla
    const tablaBody = shadow.getElementById("tabla-body");
    tablaBody.innerHTML = `
        <tr>
            <td>${fecha}</td>
            <td>${vuelo.origen}</td>
            <td>${vuelo.destino}</td>
            <td>${horaSalida}</td>
            <td>${horaLlegada}</td>
            <td>$${vuelo.precio} MXN</td>
        </tr>
    `;

    // Manejar cambio de método de pago (opcional)
    const btnCambiar = shadow.getElementById("btn-cambiar");
    const opciones = shadow.getElementById("opciones-pago");
    const numeroTarjeta = shadow.getElementById("numero-tarjeta");

    btnCambiar.addEventListener("click", () => {
      opciones.classList.toggle("oculto");
    });

    opciones.querySelectorAll(".opcion").forEach((opcion) => {
      opcion.addEventListener("click", () => {
        const nuevaTarjeta = opcion.dataset.tarjeta;
        numeroTarjeta.textContent = nuevaTarjeta;
        opciones.classList.add("oculto");
      });
    });
    
    shadow
      .getElementById("btn-reservar")
      .addEventListener("click", async () => {
        const numeroTarjeta = shadow
          .getElementById("input-tarjeta")
          .value.trim();
        const titular = shadow.getElementById("input-titular").value.trim();
        const expiracion = shadow.getElementById("input-expiracion").value;
        const cvv = shadow.getElementById("input-cvv").value.trim();

        // if (!numeroTarjeta || !titular || !expiracion || !cvv) {
        //   alert("Por favor, complete todos los campos de la tarjeta.");
        //   return;
        // }

        const vuelo = JSON.parse(localStorage.getItem("vueloSeleccionado"));
        if (!vuelo) {
          alert("No hay vuelo seleccionado.");
          return;
        }
               
        const usuario = AuthService.obtenerUsuario();
        const idUsuario = usuario?.data?.id;
        const idVuelo = vuelo.id;

        if (!idUsuario) {
          alert("Debes iniciar sesión para hacer una reservación.");
          return;
        }
         const nuevaReservacion = {
            idUsuario,
            idVuelo,
            fechaReservacion: new Date().toISOString(),
            estado: "pendiente"
        };

        try {
            const response = await fetch('http://localhost:3000/api/reservas', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(nuevaReservacion)
            });

            if (!response.ok) {
                throw new Error("Error al guardar la reservación");
            }

            alert("Reservación registrada exitosamente");
            navegarA('mainpage-info');  

        } catch (error) {
            console.error(error);
            alert("Hubo un error al registrar la reservación.");
        }
        
      });
  }
}
