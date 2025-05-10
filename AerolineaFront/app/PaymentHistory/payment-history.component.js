export class PaymentHistoryComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#agregarEstilos(shadow);
        this.#render(shadow);
    }

    #agregarEstilos(shadow) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './payment-history.component.css');
        shadow.appendChild(link);
    }

    #render(shadow) {
        shadow.innerHTML += `
        <div class="content">
          <h2>Historial de Pagos</h2>
          <table class="payment-history">
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Descripción</th>
                <th>Método</th>
                <th>Monto</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>15/02/2025</td>
                <td>Vuelo HMO-CDMX</td>
                <td>Visa •••• 4589</td>
                <td>$2,720 MXN</td>
              </tr>
              <tr>
                <td>21/03/2024</td>
                <td>Vuelo HMO-CDMX</td>
                <td>Visa •••• 4589</td>
                <td>$1,850 MXN</td>
              </tr>
              <tr>
                <td>12/02/2023</td>
                <td>Vuelo HMO-CDMX</td>
                <td>Mastercard •••• 4356</td>
                <td>$2,950 MXN</td>
              </tr>
            </tbody>
          </table>
        </div>
      `;
    }
}