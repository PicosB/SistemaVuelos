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
        const nombre = usuario?.data?.nombre || 'usuario';
        const rol = usuario?.data?.rol;

        shadow.innerHTML += `
            <header class="encabezado">
                <div class="logo-nombre">
                    <h1 class="titulo-aircloud">AirCloud</h1>
                    <img src="/AerolineaFront/assets/logo-aircloud.png" alt="Logo AirCloud" class="logo" id="logo-aircloud">
                </div>
                <div class="buttons">
                    ${
                        usuario ? (
                            rol === 'administrador' ? `
                                <div class="usuario-menu">
                                    <p>Bienvenido, ${nombre}</p>
                                    <select class="admin-select">
                                        <option value="" disabled selected hidden>Opciones</option>
                                        <option value="config">Configuración</option>
                                        <option value="logout">Cerrar sesión</option>
                                    </select>
                                </div>
                            ` : `
                                <p>Bienvenido, ${nombre}</p>
                                <button class="btn btn-Logout">Cerrar sesión</button>
                            `
                        ) : `
                            <button class="btn btn-Register">Regístrate</button>
                            <button class="btn btn-Login">Iniciar Sesión</button>
                        `
                    }
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
        const adminSelect = shadow.querySelector('.admin-select');
        const titulo = shadow.querySelector('.titulo-aircloud');
        const logo = shadow.querySelector('#logo-aircloud');

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

        if (adminSelect) {
            adminSelect.addEventListener('change', (e) => {
                const value = e.target.value;
                if (value === 'logout') {
                    AuthService.cerrarSesion();
                    alert('Sesión cerrada');
                    location.reload();
                } else if (value === 'config') {
                    navegarA('admin-configuracion');
                }
            });
        }

        if (titulo) {
            titulo.addEventListener('click', () => {
                navegarA('mainpage-info');
            });
        }

        if (logo) {
            logo.addEventListener('click', () => {
                navegarA('mainpage-info');
            });
        }
    }
}