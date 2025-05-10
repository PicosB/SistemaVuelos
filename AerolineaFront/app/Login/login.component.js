import { navegarA } from "../script.js";

export class LoginComponent extends HTMLElement{
    constructor(){
        super()
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode : 'open'});
        this.#agregarEstilos(shadow);
        this.#render(shadow);
        this.#agregarEventos(shadow);
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
                        <input type="email" placeholder="Email" class="input email" />

                        <input type="password" placeholder="Contraseña" class="input password" />

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

    #agregarEventos(shadow) {
        const btn = shadow.querySelector('.btn');
        btn.addEventListener('click', async () => {
            const email = shadow.querySelector('.email').value;
            const password = shadow.querySelector('.password').value;

            try {
                const response = await fetch('http://localhost:3000/api/usuarios/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        correo: email,
                        contraseña: password
                    })
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Credenciales incorrectas');
                }

                alert('Inicio de sesión exitoso');
                // Aquí podrías guardar el token o datos del usuario si tu backend lo devuelve
                navegarA('mainpage-info');
            } catch (error) {
                alert('Error al iniciar sesión: ' + error.message);
            }
        });
    }
}