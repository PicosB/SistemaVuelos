import { navegarA } from "../script.js";

export class AdminPageComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode : 'open'});
        this.#agregarEstilos(shadow);
        this.#render(shadow);
        this.#agregarEventos(shadow);
    }

    #render(shadow){
        shadow.innerHTML += `
            <div class="wrapper">
                <div class="container">
                    <div class="btn" id="gestionarAeropuerto">Gestionar<br>Aeropuertos</div>
                    <div class="btn" id="gestionarAerolineas">Gestionar<br>Aerolíneas</div>
                    <div class="btn" id="gestionarVuelo">Gestionar<br>Vuelos</div>
                    <div class="btn" id="gestionarAdmin">Gestionar<br>Usuarios</div>
                </div>
            </div>
        `;
    }

    #agregarEstilos(shadow){
        const style = document.createElement('style');
        style.textContent = `
            .wrapper {
                display: flex;
                justify-content: center;
                align-items: flex-start;
                padding-top: 80px; /* Puedes ajustar este valor */
                height: 100vh;
                background-color: #f4f4f4;
            }

            .container {
                display: grid;
                grid-template-columns: repeat(2, 280px);
                grid-gap: 40px;
            }

            .btn {
                background-color: #d9d9d9;
                border-radius: 15px;
                padding: 60px 20px;
                font-size: 24px;
                font-weight: bold;
                text-align: center;
                cursor: pointer;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }

            .btn:hover {
                background-color: #c9c9c9;
            }
        `;
        shadow.appendChild(style);
    }

    #agregarEventos(shadow){
        const btnAeropuerto = shadow.querySelector('#gestionarAeropuerto');
        const btnAerolineas = shadow.querySelector('#gestionarAerolineas');
        const btnAdmin = shadow.querySelector('#gestionarAdmin');
        const btnVuelo = shadow.querySelector('#gestionarVuelo');

        if(btnAeropuerto){
            btnAeropuerto.addEventListener('click', ()=>{
                navegarA('aeropuerto-info');
            });
        }

        if(btnAerolineas){
            btnAerolineas.addEventListener('click', ()=>{
                navegarA('aerolinea-info');
            })
        }

        if(btnAdmin){
            btnAdmin.addEventListener('click', ()=>{
                navegarA('administradores-info');
            })
        }

        if(btnVuelo){
            btnVuelo.addEventListener('click', ()=>{
                navegarA('vuelo-info');
            })
        }
    }
}