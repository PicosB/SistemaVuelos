export class ReservationComponent extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode : 'open'});
        this.#agregarEstilos(shadow);
        this.#render(shadow);
    }

    #render(shadow){
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

            <section class="metodo-pago">
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
            <div class="reservar-vuelo">
                <button id="btn-reservar">Reservar Vuelo</button>
            </div>
        </main>
        `
    }

    #agregarEstilos(shadow){
        let link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./Reservation/reservation.component.css")
        shadow.appendChild(link);
    }
}