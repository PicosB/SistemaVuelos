export class AerolineaComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#agregarEstilos(shadow);
    this.#render(shadow);
    this.#agregarEventos(shadow);
    this.#cargarAerolineas(shadow);

    window.addEventListener('aerolinea-create', () => {
      this.#cargarAerolineas(shadow);
    });
  }

  #render(shadow) {
    shadow.innerHTML += `
      <div class="container">
        <h2>Registrar Aerolínea</h2>
        <form id="formCrearAerolinea">
            <input class="input" type="text" name="nombre" placeholder="Nombre de la Aerolínea" required>
            <input class="input" type="text" name="codigo" placeholder="Código (ej. AMX)" required>
            <button class="btnGuardar" type="submit">Guardar</button>
        </form>

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
                <tbody id="tablaAerolineas"></tbody>
            </table>
        </div>

        <div id="modal" class="modal hidden">
          <div class="modal-content">
            <button class="close-btn" aria-label="Cerrar">&times;</button>
            <h2>Editar Aerolínea</h2>
            <form id="formEditar">
              <label>Nombre: <input type="text" name="nombre" required></label><br>
              <label>Código: <input type="text" name="codigo" required></label><br>
              <button type="submit">Guardar Cambios</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  #agregarEstilos(shadow) {
    const link = document.createElement('link');
    link.rel = "stylesheet";
    link.href = "./Aerolineas/aerolinea.component.css";
    shadow.appendChild(link);
  }

  #agregarEventos(shadow) {
    const form = shadow.querySelector('#formCrearAerolinea');
    const tbody = shadow.querySelector('#tablaAerolineas');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const datos = {
        nombre: form.nombre.value,
        codigo: form.codigo.value
      };

      try {
        const response = await fetch('http://localhost:3000/api/aerolineas', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || 'Error al registrar la aerolínea');
        }

        alert('Aerolínea registrada exitosamente');
        form.reset();
        window.dispatchEvent(new CustomEvent('aerolinea-create'));
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });

    tbody.addEventListener('click', async (e) => {
      const id = e.target.getAttribute('data-id');

      if (e.target.classList.contains('btnEliminar')) {
        if (confirm('¿Eliminar esta aerolínea?')) {
          try {
            const response = await fetch(`http://localhost:3000/api/aerolineas/${id}`, {
              method: 'DELETE'
            });

            if (!response.ok) {
              const result = await response.json();
              throw new Error(result.message || 'Error al eliminar aerolínea');
            }

            alert('Aerolínea eliminada');
            this.#cargarAerolineas(shadow);
          } catch (error) {
            alert('Error: ' + error.message);
          }
        }
      }

      if (e.target.classList.contains('btnEditar')) {
        try {
          const response = await fetch(`http://localhost:3000/api/aerolineas/${id}`);
          if (!response.ok) throw new Error('Error al obtener aerolínea');

          const result = await response.json();
          const aerolinea = result.data;

          const modal = shadow.querySelector('#modal');
          const formEditar = shadow.querySelector('#formEditar');
          formEditar.nombre.value = aerolinea.nombre;
          formEditar.codigo.value = aerolinea.codigo;
          formEditar.setAttribute('data-id', id);
          modal.classList.remove('hidden');
          formEditar.nombre.focus();
        } catch (error) {
          alert('Error: ' + error.message);
        }
      }
    });

    const modal = shadow.querySelector('#modal');
    const closeBtn = shadow.querySelector('.close-btn');
    closeBtn.addEventListener('click', () => {
      modal.classList.add('hidden');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });

    const formEditar = shadow.querySelector('#formEditar');
    formEditar.addEventListener('submit', async (e) => {
      e.preventDefault();
      const id = formEditar.getAttribute('data-id');

      const datos = {
        nombre: formEditar.nombre.value,
        codigo: formEditar.codigo.value
      };

      try {
        const response = await fetch(`http://localhost:3000/api/aerolineas/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(datos)
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || 'Error al actualizar la aerolínea');
        }

        alert('Aerolínea actualizada correctamente');
        modal.classList.add('hidden');
        this.#cargarAerolineas(shadow);
      } catch (error) {
        alert('Error: ' + error.message);
      }
    });
  }

  #cargarAerolineas(shadow) {
    const tbody = shadow.querySelector('#tablaAerolineas');
    tbody.innerHTML = '';

    fetch('http://localhost:3000/api/aerolineas')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener aerolíneas');
        return res.json();
      })
      .then(data => {
        const aerolineas = data.data;
        aerolineas.forEach(aerolinea => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
            <td>${aerolinea.nombre}</td>
            <td>${aerolinea.codigo}</td>
            <td>
              <button class="btnEditar" data-id="${aerolinea.id}">Editar</button>
              <button class="btnEliminar" data-id="${aerolinea.id}">Eliminar</button>
            </td>
          `;
          tbody.appendChild(fila);
        });
      })
      .catch(error => {
        console.error('Error:', error.message);
      });
  }
}
