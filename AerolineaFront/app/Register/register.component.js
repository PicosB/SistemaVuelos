export class RegisterComponent extends HTMLElement{
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
            <Register>
                <div class="container">
                    <div class="left">
                        <h1>¡Regístrate!</h1>
                        <h3>Información General</h3>
                        <form>
                            <div class="row">
                                <input type="text" placeholder="Nombre(s)" class="input" />
                                <input type="text" placeholder="Número Telefonico" class="input" />
                            </div>
                            <div class="row">
                                <input type="text" placeholder="Apellido Materno" class="input" />
                                <input type="text" placeholder="Apellido Paterno" class="input" />
                            </div>
                            <div class="row">
                                <input type="email" placeholder="Email" class="input" />
                                <input type="password" placeholder="Contraseña" class="input" id="password" />
                            </div>
                            <button class="btn">Crear mi cuenta</button>
                        </form>
                    </div>
                    <div class="right">
                        <div class="logo-container">
                            <img src="/AerolineaFront/assets/logo-aircloud-title.png" alt="Logo AirCloud" class="logo" />
                        </div>
                    </div>
                </div>
            </Register>
        `
    }


    #agregarEstilos(shadow){
        let link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./Register/register.component.css")
        shadow.appendChild(link);
    }
}