export class AerolineaEditComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.aerolineaId = null;
    }

    connectedCallback() {
        this.#agregarEstilos();
        this.#renderFormulario();
        window.addEventListener('editar-aerolinea', this.#cargarDatosParaEditar);
    }

    disconnectedCallback() {
        window.removeEventListener('editar-aerolinea', this.#cargarDatosParaEditar);
    }

    #agregarEstilos() {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './Aerolinea/create/aerolinea-create.component.css');
        this.shadow.appendChild(link);
    }

    #renderFormulario() {
        this.shadow.innerHTML += `
            <div class="modal-content">
                <button class="close-btn">&times;</button>
                <h2>Editar Aerolínea</h2>
                <form id="formEditarAerolinea">
                    <label>Nombre: <input type="text" name="nombre" required></label><br>
                    <label>Código: <input type="text" name="codigo" required></label><br>
                    <button type="submit">Guardar Cambios</button>
                </form>
            </div>
        `;

        this.shadow.querySelector('#formEditarAerolinea').addEventListener('submit', this.#guardarCambios.bind(this));
        this.shadow.querySelector('.close-btn').addEventListener('click', () => this.remove());
    }

    #cargarDatosParaEditar = async (event) => {
        this.aerolineaId = event.detail.id;
        try {
            const res = await fetch(`http://localhost:3000/api/aerolineas/${this.aerolineaId}`);
            const data = await res.json();

            const form = this.shadow.querySelector('#formEditarAerolinea');
            form.nombre.value = data.data.nombre;
            form.codigo.value = data.data.codigo;
        } catch (error) {
            alert('Error al cargar los datos de la aerolínea');
        }
    }

    async #guardarCambios(event) {
        event.preventDefault();
        const form = event.target;

        try {
            const res = await fetch(`http://localhost:3000/api/aerolineas/${this.aerolineaId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    nombre: form.nombre.value,
                    codigo: form.codigo.value
                })
            });

            if (!res.ok) throw new Error('Error al actualizar aerolínea');
            alert('Aerolínea actualizada correctamente');
            window.dispatchEvent(new CustomEvent('aerolinea-actualizada'));
            this.remove();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

customElements.define('aerolinea-edit', AerolineaEditComponent);
