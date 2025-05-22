export class AerolineaCreateComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#agregarEstilos(shadow);
        this.#render(shadow);
        this.#agregarEventos(shadow);
    }

    #agregarEstilos(shadow) {
        const link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./Aerolinea/create/aerolinea-create.component.css");
        shadow.appendChild(link);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div class="container">
                <h2>Registrar Aerolínea</h2>
                <form id="formCrearAerolinea">
                    <input class="input" type="text" name="nombre" placeholder="Nombre de la Aerolínea" required>
                    <input class="input" type="text" name="codigo" placeholder="Código (ej. AMX)" required>
                    <button class="btn" type="submit">Guardar</button>
                </form>
            </div>
        `;
    }

    #agregarEventos(shadow) {
        const form = shadow.querySelector('#formCrearAerolinea');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const datos = {
                nombre: form.nombre.value,
                codigo: form.codigo.value,
            };

            try {
                const response = await fetch('http://localhost:3000/api/aerolineas', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(datos)
                });

                if (!response.ok) throw new Error('Error al registrar la aerolínea');
                alert('Aerolínea registrada exitosamente');
                form.reset();
                window.dispatchEvent(new CustomEvent('aerolinea-creada'));
            } catch (error) {
                alert('Error: ' + error.message);
            }
        });
    }
}
customElements.define('aerolinea-create', AerolineaCreateComponent);
