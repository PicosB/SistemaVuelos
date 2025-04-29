export class PaymentMethodComponent extends HTMLElement {
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
    link.setAttribute('href', './payment-method.component.css');
    shadow.appendChild(link);
  }

  #render(shadow) {
    shadow.innerHTML += `
      <div class="content">
        <h2>Métodos de Pago</h2>

        <div class="payment-method">
          <span> •••• •••• 4589 </span>
          <span class="method-details">Visa - Vigencia: 05-2027</span>
          <button class="delete-btn">Eliminar</button>
        </div>

        <div class="payment-method">
          <span> •••• •••• 4356 </span>
          <span class="method-details">Mastercard - Vigencia: 02-2029</span>
          <button class="delete-btn">Eliminar</button>
        </div>

        <button class="add-btn">+ Agregar Método de Pago</button>
      </div>
    `;
  }
}
