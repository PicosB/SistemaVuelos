export function navegarA(nombreComponente) {
  const app = document.getElementById('app');
  app.innerHTML = ''; 

  console.log(`Cargando el componente: ${nombreComponente}`);

  const header = document.createElement('header-info');
  const bar = document.createElement('bar-info');
  app.appendChild(header);
  app.appendChild(bar);

  const componente = document.createElement(nombreComponente);
  app.appendChild(componente);
}

import { HeaderComponent } from "./Shared/header/header.component.js";
import { BarComponent } from "./Shared/bar/bar.components.js";
import { LoginComponent } from "./Login/login.component.js";
import { RegisterComponent } from "./Register/register.component.js";
import { MainPageComponent } from "./MainPage/mainpage.component.js";
import { ReservationComponent } from "./Reservation/reservation.component.js";
import { PaymentMethodComponent } from "./PaymentMethods/payment.method.component.js";
import { PaymentHistoryComponent } from "./PaymentHistory/payment-history.component.js";
import { SearchFlightsComponent } from "./SearchFlights/searchFlights.component.js";
import { AdminPageComponent } from "./AdminPage/adminpage.component.js";
import { AeropuertoComponent } from "./Aeropuerto/aeropuerto.component.js";
import { AerolineaComponent } from "./Aerolineas/aerolinea.component.js";
import { AdministradoresComponent } from "./Administradores/administradores.component.js";
import { VuelosComponent } from "./Vuelos/vuelo.component.js";
import { SeatSelectionComponent } from "./Reservation/seatSelection.component.js";

window.customElements.define('header-info', HeaderComponent);
window.customElements.define('bar-info', BarComponent);
window.customElements.define('login-info', LoginComponent);
window.customElements.define('register-info', RegisterComponent);
window.customElements.define('mainpage-info', MainPageComponent);
window.customElements.define('reservation-info', ReservationComponent);
window.customElements.define('payment-method', PaymentMethodComponent);
window.customElements.define('payment-history', PaymentHistoryComponent);
window.customElements.define('search-flights', SearchFlightsComponent);
window.customElements.define('adminpage-info', AdminPageComponent);
window.customElements.define('aeropuerto-info', AeropuertoComponent);
window.customElements.define('aerolinea-info', AerolineaComponent);
window.customElements.define('administradores-info', AdministradoresComponent);
window.customElements.define('vuelo-info', VuelosComponent);
window.customElements.define('seat-selection', SeatSelectionComponent);

navegarA('mainpage-info');