import { navegarA } from "../script.js";
import { AuthService } from "../Login/auth.service.js";

export class RegisterComponent extends HTMLElement{
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
        shadow.innerHTML += `
            <Register>
                <div class="container">
                    <div class="left">
                        <h1>¡Regístrate!</h1>
                        <h3>Información General</h3>
                        <form id="formRegistro">
                            <div class="row">
                                <input name="nombre" type="text" placeholder="Nombre(s)" class="input" required/>
                                <input name="numTelefono" type="text" placeholder="Número Telefonico" class="input" required/>
                            </div>
                            <div class="row">
                                <input name="apellidoMaterno" type="text" placeholder="Apellido Materno" class="input" required/>
                                <input name="apellidoPaterno" type="text" placeholder="Apellido Paterno" class="input" required/>
                            </div>
                            <div class="row">
                                <input name="correo" type="email" placeholder="Email" class="input" required/>
                                <input name="contraseña" type="password" placeholder="Contraseña" class="input" id="password" required/>
                            </div>
                            <button type="submit" class="btn">Crear mi cuenta</button>
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

    #agregarEventos(shadow) {
        const form = shadow.querySelector('#formRegistro');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const datos = {
                nombre: form.nombre.value,
                apellidoPaterno: form.apellidoPaterno.value,
                apellidoMaterno: form.apellidoMaterno.value,
                correo: form.correo.value,
                contraseña: form.contraseña.value,
                numTelefono: form.numTelefono.value,
                rol: 'usuario' 
            };

            try {
                const response = await fetch('http://localhost:3000/api/usuarios', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(datos)
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.message || 'Error al registrar');
                }

                AuthService.guardarSesion(result);
                alert('¡Registro exitoso!');
                navegarA('mainpage-info');
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    }
}