export class AeropuertoEditComponent extends HTMLElement {
    constructor() {
        super();
        this.shadow = this.attachShadow({ mode: 'open' });
        this.aeropuertoId = null;
    }

    connectedCallback() {
        this.#agregarEstilos(this.shadow);
        this.#renderFormulario(this.shadow);
        window.addEventListener('editar-aeropuerto', this.#cargarDatosParaEditar);

        this.shadow.addEventListener('click', (event) => {
            const modalContent = this.shadow.querySelector('.modal-content');
            if (!modalContent.contains(event.target)) {
                this.#cerrarModal();
            }
        });
    }

    disconnectedCallback() {
        window.removeEventListener('editar-aeropuerto', this.#cargarDatosParaEditar);
    }

    #agregarEstilos(shadow) {
        const link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./Aeropuerto/edit/aeropuerto-edit.component.css");
        shadow.appendChild(link);
    }

    #renderFormulario(shadow) {
        this.shadow.innerHTML += `
            <div class="modal-content">
                <button class="close-btn" title="Cerrar">&times;</button>
                <h2>Editar Aeropuerto</h2>
                <form id="formEditar">
                    <label>Nombre: <input type="text" name="nombre" required></label><br>
                    <label>Código: <input type="text" name="codigo" required></label><br>
                    <label>Ciudad: <input type="text" name="ciudad" required></label><br>
                    <label>País: <input type="text" name="pais" required></label><br>
                    <button type="submit">Guardar Cambios</button>
                </form>
            </div>
        `;

        this.shadow.querySelector('#formEditar')
            .addEventListener('submit', this.#guardarCambios.bind(this));

        this.shadow.querySelector('.close-btn')
            .addEventListener('click', () => this.#cerrarModal());
    }

    #cargarDatosParaEditar = async (event) => {
        this.aeropuertoId = event.detail.id;
        try {
            const res = await fetch(`http://localhost:3000/api/aeropuertos/${this.aeropuertoId}`);
            const data = await res.json();

            const form = this.shadow.querySelector('#formEditar');
            form.nombre.value = data.data.nombre;
            form.codigo.value = data.data.codigo;
            form.ciudad.value = data.data.ciudad;
            form.pais.value = data.data.pais;
        } catch (error) {
            alert('Error al cargar aeropuerto: ' + error.message);
        }
    }

    async #guardarCambios(event) {
        event.preventDefault();
        const form = event.target;
        const updatedData = {
            nombre: form.nombre.value,
            codigo: form.codigo.value,
            ciudad: form.ciudad.value,
            pais: form.pais.value,
        };

        try {
            const res = await fetch(`http://localhost:3000/api/aeropuertos/${this.aeropuertoId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updatedData)
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Error al actualizar');
            }

            alert('Aeropuerto actualizado con éxito');
            window.dispatchEvent(new CustomEvent('aeropuerto-actualizado'));
            this.#cerrarModal();
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }

    #cerrarModal() {
        this.remove();
    }
}

customElements.define('aeropuerto-edit', AeropuertoEditComponent);
