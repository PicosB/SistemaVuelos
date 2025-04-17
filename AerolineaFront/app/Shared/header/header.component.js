export class HeaderComponent extends HTMLElement{
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
            <header class="encabezado">
                <div class="logo-nombre">
                    <h1>AirCloud</h1>
                    <img src="/AerolineaFront/assets/logo-aircloud.png" alt="Logo AirCloud" class="logo">
                </div>
                <div class="buttons">
                    <button class="btn btn-Register">Regístrate</button>
                    <button class="btn btn-Login">Iniciar Sesión</button>
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
    
}