export class AerolineaListComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: 'open' });
        this.#agregarEstilos(shadow);
        this.#render(shadow);
        this.#cargarAerolíneas(shadow);

        window.addEventListener('aerolinea-creada', () => this.#cargarAerolíneas(shadow));
        window.addEventListener('aerolinea-actualizada', () => this.#cargarAerolíneas(shadow));
    }

    #agregarEstilos(shadow) {
        const link = document.createElement('link');
        link.setAttribute('rel', 'stylesheet');
        link.setAttribute('href', './Aerolinea/list/aerolinea-list.component.css');
        shadow.appendChild(link);
    }

    #render(shadow) {
        shadow.innerHTML += `
            <div>
                <h2>Lista de Aerolíneas</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Código</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody id="tablaAerolíneas"></tbody>
                </table>
            </div>
        `;
    }

    async #cargarAerolíneas(shadow) {
        try {
            const response = await fetch('http://localhost:3000/api/aerolineas');
            const result = await response.json();
            const aerolineas = result.data;
            const tbody = shadow.querySelector('#tablaAerolíneas');
            tbody.innerHTML = '';

            aerolineas.forEach(a => {
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${a.nombre}</td>
                    <td>${a.codigo}</td>
                    <td>
                        <button class="btn edit" data-id="${a.id}">Editar</button>
                        <button class="btn delete" data-id="${a.id}">Eliminar</button>
                    </td>
                `;
                tbody.appendChild(tr);
            });

            this.#agregarEventos(shadow);
        } catch (error) {
            alert('Error al cargar las aerolíneas: ' + error.message);
        }
    }

    #agregarEventos(shadow) {
        shadow.querySelectorAll('.btn.delete').forEach(btn => {
            btn.addEventListener('click', async () => {
                const id = btn.dataset.id;
                if (confirm('¿Estás seguro de eliminar esta aerolínea?')) {
                    await fetch(`http://localhost:3000/api/aerolineas/${id}`, {
                        method: 'DELETE'
                    });
                    this.#cargarAerolíneas(shadow);
                }
            });
        });

        shadow.querySelectorAll('.btn.edit').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.dataset.id;
                window.dispatchEvent(new CustomEvent('editar-aerolinea', { detail: { id } }));
            });
        });
    }
}
customElements.define('aerolinea-list', AerolineaListComponent);
