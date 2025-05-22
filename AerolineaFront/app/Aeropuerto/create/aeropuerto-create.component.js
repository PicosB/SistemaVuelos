export class AeropuertoCreateComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#agregarEstilos(shadow);
        this.#render(shadow);
        this.#agregarEventos(shadow);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="container">
                <h2>Registrar Aeropuerto</h2>
                <form id="formCrearAeropuerto">
                    <input class="input" type="text" name="nombre" placeholder="Nombre del Aeropuerto" required>
                    <input class="input" type="text" name="codigo" placeholder="Código (ej. MEX)" required>
                    <input class="input" type="text" name="ciudad" placeholder="Ciudad" required>
                    <input class="input" type="text" name="pais" placeholder="País" required>
                    <button class="btn" type="submit">Guardar</button>
                </form>
            </div>
        `;
    }

    #agregarEstilos(shadow) {
        const link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./Aeropuerto/create/aeropuerto-create.component.css");
        shadow.appendChild(link);
    }

    #agregarEventos(shadow) {
        const form = shadow.querySelector('#formCrearAeropuerto');

        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const datos = {
                nombre: form.nombre.value,
                codigo: form.codigo.value,
                ciudad: form.ciudad.value,
                pais: form.pais.value
            };

            try {
                const response = await fetch('http://localhost:3000/api/aeropuertos', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });

                if (!response.ok) {
                    const result = await response.json();
                    throw new Error(result.message || 'Error al registrar el aeropuerto');
                }
                alert('Aeropuerto registrado exitosamente');
                form.reset();
                window.dispatchEvent(new CustomEvent('aeropuerto-create'));
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    }
}
customElements.define('aeropuerto-create', AeropuertoCreateComponent);
