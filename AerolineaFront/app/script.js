import { HeaderComponent } from "./Shared/header/header.component.js";
import { BarComponent } from "./Shared/bar/bar.components.js";
import { LoginComponent } from "./Login/login.component.js";
import { RegisterComponent } from "./Register/register.component.js";
import { MainPageComponent } from "./MainPage/mainpage.component.js";
import { ReservationComponent } from "./Reservation/reservation.component.js";
import { PaymentMethodComponent } from "./PaymentMethods/payment.method.component.js";
import { PaymentHistoryComponent } from "./PaymentHistory/payment-history.component.js";

window.customElements.define('header-info', HeaderComponent);
window.customElements.define('bar-info', BarComponent);
window.customElements.define('login-info', LoginComponent);
window.customElements.define('register-info', RegisterComponent);
window.customElements.define('mainpage-info', MainPageComponent);
window.customElements.define('reservation-info', ReservationComponent);
window.customElements.define('payment-method', PaymentMethodComponent);
window.customElements.define('payment-history', PaymentHistoryComponent);

