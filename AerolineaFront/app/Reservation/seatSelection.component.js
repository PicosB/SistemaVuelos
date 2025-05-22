import { navegarA } from "../script.js";

export class SeatSelectionComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#render(shadow);
    this.#agregarEventos(shadow);
    this.#agregarEstilos(shadow);
  }

  #render(shadow) {
    shadow.innerHTML = `
        <section class="seleccion-asientos">
            <h2>Selecciona tu asiento</h2>
            <div class="avion">
                <div class="pasillo" id="grid-asientos">
                    ${this.#generarFilasAsientos()}
                </div>
            </div>
            <div id="seleccion" style="text-align: center; margin-top: 20px;">
                Asiento seleccionado: <strong>-</strong>
            </div>
            <div style="text-align: center; margin-top: 10px;">
                <button id="confirmar" class="btn-modificar">Confirmar Asiento</button>
            </div>
        </section>
    `;
  }

  #generarFilasAsientos() {
    const totalAsientos = 40;
    let html = "";
    const asientosPorFila = 4;

    for (let i = 1; i <= totalAsientos; i++) {
      if ((i - 1) % asientosPorFila === 0) {
        html += '<div class="fila-asiento">';
      }

      const indexInRow = (i - 1) % asientosPorFila;
      if (indexInRow === 2) {
        html += '<div class="pasillo-central"></div>';
      }

      html += `
      <div class="asiento" data-asiento="${i}">
        ${i}
      </div>
    `;

      if (i % asientosPorFila === 0) {
        html += "</div>";
      }
    }

    if (totalAsientos % asientosPorFila !== 0) {
      html += "</div>";
    }

    return html;
  }

  #agregarEstilos(shadow) {
    const style = document.createElement("style");
    style.textContent = `
          :host {
            display: block;
            font-family: Arial, sans-serif;
            background-color: #f8f8f8;
            padding: 20px;
          }

          .seleccion-asientos {
            background-color: #ffffff;
            border-radius: 10px;
            padding: 30px;
            max-width: 600px;
            margin: 0 auto;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .seleccion-asientos h2 {
            text-align: center;
            font-size: 24px;
            margin-bottom: 30px;
            color: #333;
          }

          .avion {
            display: flex;
            justify-content: center;
          }

          .pasillo {
            display: flex;
            flex-direction: column;
            gap: 10px;
          }

          .fila-asiento {
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }

          .asiento {
            width: 50px;
            height: 50px;
            background-color: #e0e0e0;
            border-radius: 8px;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
            user-select: none;
          }

          .asiento:hover {
            background-color: #c0dfff;
          }

          .asiento.seleccionado {
            background-color: #009CFF;
            color: white;
          }

          .pasillo-central {
            width: 40px; /* espacio del pasillo */
          }

          #seleccion {
            font-size: 18px;
            color: #444;
          }

          .btn-modificar {
            padding: 10px 20px;
            background-color: #009CFF;
            color: white;
            border: none;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            transition: background-color 0.3s;
          }

          .btn-modificar:hover {
            background-color: #007acc;
          }
        `;
    shadow.appendChild(style);
  }

  #agregarEventos(shadow) {
    const grid = shadow.getElementById("grid-asientos");
    const textoSeleccion = shadow
      .getElementById("seleccion")
      .querySelector("strong");
    const botonConfirmar = shadow.getElementById("confirmar");

    this.seatSeleccionado = null;

    grid.addEventListener("click", (e) => {
      if (e.target.classList.contains("asiento")) {
        const anterior = grid.querySelector(".asiento.seleccionado");
        if (anterior) anterior.classList.remove("seleccionado");

        e.target.classList.add("seleccionado");
        this.seatSeleccionado = e.target.dataset.asiento;
        textoSeleccion.textContent = this.seatSeleccionado;
      }
    });

    botonConfirmar.addEventListener("click", () => {
      if (!this.seatSeleccionado) {
        alert("Selecciona un asiento antes de continuar.");
        return;
      }

      localStorage.setItem("asientoSeleccionado", this.seatSeleccionado);
      alert(`Asiento ${this.seatSeleccionado} reservado.`);
      navegarA("reservation-info");
    });
  }
}
