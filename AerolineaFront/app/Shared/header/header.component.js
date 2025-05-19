import { navegarA } from "../../script.js";
import { AuthService } from "../../Login/auth.service.js";

export class HeaderComponent extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode : 'open'});
        this.#agregarEstilos(shadow);
        this.#render(shadow);
        this.#agregarEventos(shadow);
    }

    #render(shadow){
        const usuario = AuthService.obtenerUsuario();

        shadow.innerHTML += `
            <header class="encabezado">
                <div class="logo-nombre">
                    <h1>AirCloud</h1>
                    <img src="/AerolineaFront/assets/logo-aircloud.png" alt="Logo AirCloud" class="logo">
                </div>
                <div class="buttons">
                    ${usuario ? `
                        <p>Bienvenido, ${usuario?.data?.nombre || 'usuario'}</p>
                        <button class="btn btn-Logout">Cerrar sesión</button>
                    ` : `
                        <button class="btn btn-Register">Regístrate</button>
                        <button class="btn btn-Login">Iniciar Sesión</button>
                    `}
                </div>
            </header>
        `
    }

    #agregarEstilos(shadow){
        let link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./Shared/header/header.component.css");
        shadow.appendChild(link);
    }

    #agregarEventos(shadow) {
        const btnRegister = shadow.querySelector('.btn-Register');
        const btnLogin = shadow.querySelector('.btn-Login');
        const btnLogout = shadow.querySelector('.btn-Logout');

        if (btnRegister) {
            btnRegister.addEventListener('click', () => {
                navegarA('register-info');
            });
        }

        if (btnLogin) {
            btnLogin.addEventListener('click', () => {
                navegarA('login-info');
            });
        }

        if (btnLogout) {
            btnLogout.addEventListener('click', () => {
                AuthService.cerrarSesion();
                alert('Sesión cerrada');
                location.reload();
            });
        }
    }
}