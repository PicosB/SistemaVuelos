export class AeropuertoListComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#agregarEstilos(shadow);
        this.#render(shadow);
        this.#cargarAeropuertos(shadow);
        window.addEventListener('aeropuerto-actualizado', () => {
            this.#cargarAeropuertos(shadow);
        });
        window.addEventListener('aeropuerto-creado', () => this.cargarAeropuertos());
    }

    #agregarEstilos(shadow) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './Aeropuerto/list/aeropuerto-list.component.css');
        shadow.appendChild(link);
    }

    disconnectedCallback() {
        window.removeEventListener('aeropuerto-creado', () => this.cargarAeropuertos());
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div>
                <h2>Lista de Aeropuertos</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Ciudad</th>
                            <th>País</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tablaAeropuertos"></tbody>
                </table>
            </div>
        `;
    }

    async #cargarAeropuertos(shadow) {
        try {
            const response = await fetch('http://localhost:3000/api/aeropuertos');
            const result = await response.json();
            const aeropuertos = result.data;

            const tbody = shadow.querySelector('#tablaAeropuertos');
            tbody.innerHTML = '';

            aeropuertos.forEach(a => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${a.nombre}</td>
                <td>${a.codigo}</td>
                <td>${a.ciudad}</td>
                <td>${a.pais}</td>
                <td>
                    <button class="btn edit" data-id="${a.id}">Editar</button>
                    <button class="btn delete" data-id="${a.id}">Eliminar</button>
                </td>
            `;
                tbody.appendChild(tr);
            });

            this.#agregarEventos(shadow);

        } catch (error) {
            alert('Error al cargar los aeropuertos: ' + error.message);
        }
    }

    #agregarEventos(shadow) {
        const btnsDelete = shadow.querySelectorAll('.btn.delete');
        btnsDelete.forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.getAttribute('data-id');
                if (confirm('¿Estás seguro de eliminar este aeropuerto?')) {
                    await this.#eliminarAeropuerto(id);
                    this.#cargarAeropuertos(shadow);
                }
            });
        });

        const btnsEdit = shadow.querySelectorAll('.btn.edit');
        btnsEdit.forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                const anterior = document.querySelector('aeropuerto-edit');
                if (anterior) anterior.remove();
                const modal = document.createElement('aeropuerto-edit');
                document.body.appendChild(modal);
                window.dispatchEvent(new CustomEvent('editar-aeropuerto', { detail: { id } }));
            });
        });
    }

    async #eliminarAeropuerto(id) {
        try {
            const response = await fetch(`http://localhost:3000/api/aeropuertos/${id}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'Error al eliminar');
            }

            alert('Aeropuerto eliminado correctamente');
        } catch (error) {
            alert('Error: ' + error.message);
        }
    }
}

customElements.define('aeropuerto-list', AeropuertoListComponent);
