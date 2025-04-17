export class LoginComponent extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode : 'open'});
        this.#agregarEstilos(shadow);
        this.#render(shadow);
    }

    #render(shadow){
        shadow.innerHTML += `
            <login>
                <div class="container">
                    <div class="left">
                        <div class="logo-container">
                            <img src="/AerolineaFront/assets/logo-aircloud-title.png" alt="Logo AirCloud" class="logo" />
                        </div>
                    </div>
                    <div class="right">
                        <h1>¡Inicia Sesión!</h1>
                        <input type="email" placeholder="Email" class="input" />

                        <input type="password" placeholder="Contraseña" class="input" />

                        <button class="btn">Acceder</button>
                    </div>
                </div>
            </login>
        `
    }


    #agregarEstilos(shadow){
        let link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./Login/login.component.css")
        shadow.appendChild(link);
    }
}