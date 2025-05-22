export class AeropuertoComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#agregarEstilos(shadow);
    this.#render(shadow);
    this.#agregarEventos(shadow);
    this.#cargarAeropuertos(shadow);

    window.addEventListener('aeropuerto-create', () => {
      this.#cargarAeropuertos(shadow);
    });
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
            <button class="btnGuardar" type="submit">Guardar</button>
        </form>

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

        <div id="modal" class="modal hidden">
          <div class="modal-content">
            <button class="close-btn" aria-label="Cerrar">&times;</button>
            <h2>Editar Aeropuerto</h2>
            <form id="formEditar">
              <label>Nombre: <input type="text" name="nombre" required></label><br>
              <label>Código: <input type="text" name="codigo" required></label><br>
              <label>Ciudad: <input type="text" name="ciudad" required></label><br>
              <label>País: <input type="text" name="pais" required></label><br>
              <button type="submit">Guardar Cambios</button>
            </form>
          </div>
        </div>

    </div>
    `;
  }

  #agregarEstilos(shadow) {
    let link = document.createElement('link');
    link.setAttribute("rel", "stylesheet");
    link.setAttribute("href", "./Aeropuerto/aeropuerto.component.css")
    shadow.appendChild(link);
  }

  #agregarEventos(shadow) {
    const form = shadow.querySelector('#formCrearAeropuerto');
    const tbody = shadow.querySelector('#tablaAeropuertos');

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
      
      tbody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btnEliminar')) {
          const id = e.target.getAttribute('data-id');
          if (confirm('¿Estás seguro de eliminar este aeropuerto?')) {
            try {
              const response = await fetch(`http://localhost:3000/api/aeropuertos/${id}`, {
                method: 'DELETE'
              });
              if (!response.ok) {
                const result = await response.json();
                throw new Error(result.message || 'Error al eliminar el aeropuerto');
              }
              alert('Aeropuerto eliminado correctamente');
              this.#cargarAeropuertos(shadow);
            } catch (error) {
              alert('Error: ' + error.message);
            }
          }
        }
      });

      const modal = shadow.querySelector('#modal');
      const formEditar = shadow.querySelector('#formEditar');
      const closeBtn = shadow.querySelector('.close-btn');

      tbody.addEventListener('click', async (e) => {
        if (e.target.classList.contains('btnEditar')) {
          const id = e.target.getAttribute('data-id');
          try {
            const response = await fetch(`http://localhost:3000/api/aeropuertos/${id}`);
            if (!response.ok) throw new Error('Error al obtener aeropuerto');
            const result = await response.json();
            const aeropuerto = result.data;

            formEditar.nombre.value = aeropuerto.nombre;
            formEditar.codigo.value = aeropuerto.codigo;
            formEditar.ciudad.value = aeropuerto.ciudad;
            formEditar.pais.value = aeropuerto.pais;

            formEditar.setAttribute('data-id', id); 

            modal.classList.remove('hidden');
          } catch (error) {
            alert('Error: ' + error.message);
          }
        }
      });

      closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
      });

      formEditar.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = formEditar.getAttribute('data-id');
        const datos = {
          nombre: formEditar.nombre.value,
          codigo: formEditar.codigo.value,
          ciudad: formEditar.ciudad.value,
          pais: formEditar.pais.value,
        };

        try {
          const response = await fetch(`http://localhost:3000/api/aeropuertos/${id}`, {
            method: 'PUT', 
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datos)
          });

          if (!response.ok) {
            const result = await response.json();
            throw new Error(result.message || 'Error al actualizar aeropuerto');
          }
          alert('Aeropuerto actualizado correctamente');
          modal.classList.add('hidden');
          this.#cargarAeropuertos(shadow);
        } catch (error) {
          alert('Error: ' + error.message);
        }
      });
  }

  #cargarAeropuertos(shadow) {
    const tbody = shadow.querySelector('#tablaAeropuertos');
    tbody.innerHTML = ''; 

    fetch('http://localhost:3000/api/aeropuertos')
      .then(res => {
        if (!res.ok) throw new Error('Error al obtener aeropuertos');
        return res.json();
      })
      .then(data => {
        const aeropuertos = data.data;
        aeropuertos.forEach(aeropuerto => {
          const fila = document.createElement('tr');
          fila.innerHTML = `
            <td>${aeropuerto.nombre}</td>
            <td>${aeropuerto.codigo}</td>
            <td>${aeropuerto.ciudad}</td>
            <td>${aeropuerto.pais}</td>
            <td>
              <button class="btnEditar" data-id="${aeropuerto.id}">Editar</button>
              <button class="btnEliminar" data-id="${aeropuerto.id}">Eliminar</button>
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
