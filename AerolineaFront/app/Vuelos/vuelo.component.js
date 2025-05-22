export class VuelosComponent extends HTMLElement {

    aeropuertos = [];
    aerolineas = [];

  constructor() {
    super();
  }

  async connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#agregarEstilos(shadow);
    this.#render(shadow);
    this.#agregarEventos(shadow);
    await this.#cargarSelects(shadow);
    this.#cargarVuelos(shadow);
    

    window.addEventListener("vuelo-create", () => {
      this.#cargarVuelos(shadow);
    });
  }

  #render(shadow) {
    shadow.innerHTML += `
      <div class="container">
        <h2>Registrar Vuelo</h2>
        <form id="formCrearVuelo">
            <input class="input" type="text" name="origen" placeholder="Origen" required>
            <input class="input" type="text" name="destino" placeholder="Destino" required>
            <input class="input" type="datetime-local" name="fechaSalida" required>
            <input class="input" type="datetime-local" name="fechaLlegada" required>
            <input class="input" type="number" name="precio" placeholder="Precio" step="0.01" required>
            <select class="input" name="idAeropuerto" required></select>
            <select class="input" name="idAerolinea" required></select>
            <button class="btnGuardar" type="submit">Guardar</button>
        </form>

        <div>
            <h2>Lista de Vuelos</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th>Origen</th>
                        <th>Destino</th>
                        <th>Salida</th>
                        <th>Llegada</th>
                        <th>Precio</th>
                        <th>Aeropuerto</th>
                        <th>Aerolínea</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody id="tablaVuelos"></tbody>
            </table>
        </div>

        <div id="modal" class="modal hidden">
            <div class="modal-content">
                <button class="close-btn" aria-label="Cerrar">&times;</button>
                <h2>Editar Vuelo</h2>
                    <form id="formEditarVuelo">
                    <label>Origen: <input type="text" name="origen" required></label><br>
                    <label>Destino: <input type="text" name="destino" required></label><br>
                    <label>Fecha: <input type="date" name="fecha" required></label><br>
                    <label>Hora: <input type="time" name="hora" required></label><br>
                    <label>Aeropuerto:
                        <select name="idAeropuerto" required></select>
                    </label><br>
                    <label>Aerolínea:
                        <select name="idAerolinea" required></select>
                    </label><br>
                    <button type="submit">Guardar Cambios</button>
                </form>
            </div>
        </div>

      </div>
    `;
  }

  #agregarEstilos(shadow) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./Vuelos/vuelo.component.css";
    shadow.appendChild(link);
  }

  #agregarEventos(shadow) {
    const form = shadow.querySelector("#formCrearVuelo");
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const datos = {
        origen: form.origen.value,
        destino: form.destino.value,
        fechaSalida: form.fechaSalida.value,
        fechaLlegada: form.fechaLlegada.value,
        precio: parseFloat(form.precio.value),
        idAeropuerto: form.idAeropuerto.value,
        idAerolinea: form.idAerolinea.value,
      };

      const editandoId = form.dataset.editando;

      try {
        const response = await fetch(
          `http://localhost:3000/api/vuelos${
            editandoId ? "/" + editandoId : ""
          }`,
          {
            method: editandoId ? "PUT" : "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(datos),
          }
        );

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || "Error al guardar el vuelo");
        }

        const vueloGuardado = await response.json();

        alert(
          editandoId
            ? "Vuelo actualizado exitosamente"
            : "Vuelo registrado exitosamente"
        );
        form.reset();
        delete form.dataset.editando;
        shadow.querySelector(".btnGuardar").textContent = "Guardar";
        window.dispatchEvent(new CustomEvent("vuelo-create"));

        if (!editandoId) {
        const idVuelo = vueloGuardado.data.id;

        const peticionesAsientos = [];
        for (let i = 1; i <= 40; i++) {
          const tipoAsiento = i <= 10 ? "VIP" : "Económico";
          const asiento = {
            idVuelo,
            numAsiento: i,
            disponibilidad: true,
            tipoAsiento,
          };

          peticionesAsientos.push(
            fetch("http://localhost:3000/api/asientos", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(asiento),
            })
          );
        }

        await Promise.all(peticionesAsientos);
        console.log("Asientos creados exitosamente");
      }

      } catch (error) {
        alert("Error: " + error.message);
      }
    });
  }

  #cargarVuelos(shadow) {
    const tbody = shadow.querySelector("#tablaVuelos");
    tbody.innerHTML = "";

    fetch("http://localhost:3000/api/vuelos")
        .then((res) => {
        if (!res.ok) throw new Error("Error al obtener vuelos");
        return res.json();
        })
        .then((data) => {
        const vuelos = data.data;
        vuelos.forEach((vuelo) => {
            const aeropuerto = this.aeropuertos.find(a => a.id == vuelo.idAeropuerto);
            const aerolinea = this.aerolineas.find(a => a.id == vuelo.idAerolinea);

            const fila = document.createElement("tr");
            fila.dataset.id = vuelo.id;
            fila.innerHTML = `
            <td>${vuelo.origen}</td>
            <td>${vuelo.destino}</td>
            <td>${vuelo.fechaSalida}</td>
            <td>${vuelo.fechaLlegada}</td>
            <td>$${Number(vuelo.precio).toFixed(2)}</td>
            <td>${aeropuerto ? aeropuerto.nombre : "N/A"}</td>
            <td>${aerolinea ? aerolinea.nombre : "N/A"}</td>
            <td>
                <button class="btnEditar">Editar</button>
                <button class="btnEliminar">Eliminar</button>
            </td>
            `;
            tbody.appendChild(fila);
        });

        this.#agregarEventoEliminar(shadow);
        this.#agregarEventoEditar(shadow);
        })
        .catch((error) => {
        console.error("Error:", error.message);
        });
    }


  #cargarSelects(shadow) {
  const aeropuertoSelectCrear = shadow.querySelector('select[name="idAeropuerto"]');
  const aerolineaSelectCrear = shadow.querySelector('select[name="idAerolinea"]');

  const modal = shadow.querySelector("#modal");
  const aeropuertoSelectEditar = modal.querySelector('select[name="idAeropuerto"]');
  const aerolineaSelectEditar = modal.querySelector('select[name="idAerolinea"]');

  return Promise.all([
    fetch("http://localhost:3000/api/aeropuertos")
      .then((res) => res.json())
      .then((data) => {
        this.aeropuertos = data.data;
        const opciones = ['<option value="">Seleccione Aeropuerto</option>'];
        this.aeropuertos.forEach((aeropuerto) => {
          opciones.push(`<option value="${aeropuerto.id}">${aeropuerto.nombre}</option>`);
        });
        const htmlOpciones = opciones.join("");
        aeropuertoSelectCrear.innerHTML = htmlOpciones;
        aeropuertoSelectEditar.innerHTML = htmlOpciones;
      }),
    fetch("http://localhost:3000/api/aerolineas")
      .then((res) => res.json())
      .then((data) => {
        this.aerolineas = data.data;
        const opciones = ['<option value="">Seleccione Aerolínea</option>'];
        this.aerolineas.forEach((aerolinea) => {
          opciones.push(`<option value="${aerolinea.id}">${aerolinea.nombre}</option>`);
        });
        const htmlOpciones = opciones.join("");
        aerolineaSelectCrear.innerHTML = htmlOpciones;
        aerolineaSelectEditar.innerHTML = htmlOpciones;
      }),
  ]);
}


  #agregarEventoEliminar(shadow) {
    const botonesEliminar = shadow.querySelectorAll(".btnEliminar");
    botonesEliminar.forEach((boton) => {
      boton.addEventListener("click", async (e) => {
        const fila = e.target.closest("tr");
        const id = fila.dataset.id;

        if (confirm("¿Estás seguro de eliminar este vuelo?")) {
          try {
            const res = await fetch(`http://localhost:3000/api/vuelos/${id}`, {
              method: "DELETE",
            });

            if (!res.ok) {
              throw new Error("Error al eliminar el vuelo");
            }

            alert("Vuelo eliminado exitosamente");
            this.#cargarVuelos(shadow);
          } catch (error) {
            alert("Error: " + error.message);
          }
        }
      });
    });
  }

  #agregarEventoEditar(shadow) {
    const botonesEditar = shadow.querySelectorAll(".btnEditar");
    const modal = shadow.querySelector("#modal");
    const closeModalBtn = modal.querySelector(".close-btn");
    const formEditar = modal.querySelector("#formEditarVuelo");

    botonesEditar.forEach((boton) => {
      boton.addEventListener("click", (e) => {
        const fila = e.target.closest("tr");
        const id = fila.dataset.id;

        const celdas = fila.querySelectorAll("td");

        formEditar.origen.value = celdas[0].textContent;
        formEditar.destino.value = celdas[1].textContent;

        const fechaHoraSalida = new Date(celdas[2].textContent);
        formEditar.fecha.value = fechaHoraSalida.toISOString().split("T")[0];
        formEditar.hora.value = fechaHoraSalida.toTimeString().slice(0, 5);

        // Selects aeropuerto y aerolínea
        const aeropuertoNombre = celdas[5].textContent;
        const aerolineaNombre = celdas[6].textContent;

        formEditar.idAeropuerto.value =
          [...formEditar.idAeropuerto.options].find(
            (opt) => opt.textContent === aeropuertoNombre
          )?.value || "";

        formEditar.idAerolinea.value =
          [...formEditar.idAerolinea.options].find(
            (opt) => opt.textContent === aerolineaNombre
          )?.value || "";

        formEditar.dataset.id = id;
        modal.classList.remove("hidden");
      });
    });

    closeModalBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
    });

    formEditar.addEventListener("submit", async (e) => {
      e.preventDefault();

      const id = formEditar.dataset.id;
      const fecha = formEditar.fecha.value;
      const hora = formEditar.hora.value;

      const datos = {
        origen: formEditar.origen.value,
        destino: formEditar.destino.value,
        fechaSalida: `${fecha}T${hora}:00`,
        idAeropuerto: formEditar.idAeropuerto.value,
        idAerolinea: formEditar.idAerolinea.value,
      };

      try {
        const res = await fetch(`http://localhost:3000/api/vuelos/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        });

        if (!res.ok) throw new Error("Error al actualizar el vuelo");

        alert("Vuelo actualizado exitosamente");
        modal.classList.add("hidden");
        this.#cargarVuelos(shadow);
      } catch (err) {
        alert("Error: " + err.message);
      }
    });
  }
}
