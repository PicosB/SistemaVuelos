import { AuthService } from "../Login/auth.service.js";

export class AdministradoresComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" });
    this.#agregarEstilos(shadow);
    this.#render(shadow);
    this.#agregarEventos(shadow);
    this.#cargarUsuarios(shadow);

    window.addEventListener("usuario-create", () => {
      this.#cargarUsuarios(shadow);
    });
  }

  #agregarEstilos(shadow) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "./Administradores/administradores.component.css";
    shadow.appendChild(link);
  }

  #render(shadow) {
    shadow.innerHTML += `
      <div class="container">
        <h2>Registrar Usuario</h2>
        <form id="formCrearUsuario">
          <input class="input" name="nombre" placeholder="Nombre" required>
          <input class="input" name="apellidoPaterno" placeholder="Apellido Paterno" required>
          <input class="input" name="apellidoMaterno" placeholder="Apellido Materno" required>
          <input class="input" name="correo" type="email" placeholder="Correo" required>
          <input class="input" name="contrasena" type="password" placeholder="Contraseña" required>
          <input class="input" name="numTelefono" placeholder="Número de Teléfono" required>
          <button class="btnGuardar" type="submit">Guardar</button>
        </form>

        <div>
          <h2>Lista de Usuarios</h2>
          <table class="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido Paterno</th>
                <th>Apellido Materno</th>
                <th>Correo</th>
                <th>Rol</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody id="tablaUsuarios"></tbody>
          </table>
        </div>

        <div id="modal" class="modal hidden">
          <div class="modal-content">
            <button class="close-btn">&times;</button>
            <h2>Editar Usuario</h2>
            <form id="formEditar">
              <input name="nombre" placeholder="Nombre" required>
              <input name="apellidoPaterno" placeholder="Apellido Paterno" required>
              <input name="apellidoMaterno" placeholder="Apellido Materno" required>
              <input name="correo" type="email" placeholder="Correo" required>
              <input name="contrasena" type="password" placeholder="Contraseña" required>
              <input name="numTelefono" placeholder="Número de Teléfono" required>
              <input name="rol" placeholder="Rol" required>
              <button type="submit">Guardar Cambios</button>
            </form>
          </div>
        </div>
      </div>
    `;
  }

  #agregarEventos(shadow) {
    const form = shadow.querySelector("#formCrearUsuario");
    const formEditar = shadow.querySelector("#formEditar");
    const tbody = shadow.querySelector("#tablaUsuarios");
    const modal = shadow.querySelector("#modal");
    const closeBtn = shadow.querySelector(".close-btn");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const datos = {
        nombre: form.nombre.value,
        apellidoPaterno: form.apellidoPaterno.value,
        apellidoMaterno: form.apellidoMaterno.value,
        correo: form.correo.value,
        contraseña: form.contrasena.value,
        numTelefono: form.numTelefono.value,
        rol: "administrador",
      };

      try {
        const res = await fetch("http://localhost:3000/api/usuarios", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        });

        if (!res.ok)
          throw new Error(
            (await res.json()).message || "Error al registrar usuario"
          );

        alert("Usuario registrado exitosamente");
        form.reset();
        window.dispatchEvent(new CustomEvent("usuario-create"));
      } catch (err) {
        alert("Error: " + err.message);
      }
    });

    tbody.addEventListener("click", async (e) => {
      if (e.target.classList.contains("btnEditar")) {
        const id = e.target.getAttribute("data-id");
        try {
          const usuario = AuthService.obtenerUsuario();
          const token = usuario?.token;

          const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!res.ok) throw new Error("Error al obtener usuario");
          const usuarioData = (await res.json()).data;

          formEditar.nombre.value = usuarioData.nombre;
          formEditar.apellidoPaterno.value = usuarioData.apellidoPaterno;
          formEditar.apellidoMaterno.value = usuarioData.apellidoMaterno;
          formEditar.correo.value = usuarioData.correo;
          formEditar.contrasena.value = usuarioData.contraseña;
          formEditar.numTelefono.value = usuarioData.numTelefono;
          formEditar.rol.value = usuarioData.rol;

          formEditar.setAttribute("data-id", id);
          modal.classList.remove("hidden");
        } catch (err) {
          alert("Error: " + err.message);
        }
      }

      if (e.target.classList.contains("btnEliminar")) {
        const id = e.target.getAttribute("data-id");
        if (confirm("¿Estás seguro de eliminar este usuario?")) {
          try {
            const res = await fetch(
              `http://localhost:3000/api/usuarios/${id}`,
              { method: "DELETE" }
            );
            if (!res.ok) throw new Error("Error al eliminar usuario");
            alert("Usuario eliminado correctamente");
            this.#cargarUsuarios(shadow);
          } catch (err) {
            alert("Error: " + err.message);
          }
        }
      }
    });

    closeBtn.addEventListener("click", () => modal.classList.add("hidden"));

    formEditar.addEventListener("submit", async (e) => {
      e.preventDefault();
      const id = formEditar.getAttribute("data-id");
      const datos = {
        nombre: formEditar.nombre.value,
        apellidoPaterno: formEditar.apellidoPaterno.value,
        apellidoMaterno: formEditar.apellidoMaterno.value,
        correo: formEditar.correo.value,
        contraseña: formEditar.contrasena.value,
        numTelefono: formEditar.numTelefono.value,
        rol: formEditar.rol.value,
      };

      try {
        const res = await fetch(`http://localhost:3000/api/usuarios/${id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        });

        if (!res.ok)
          throw new Error(
            (await res.json()).message || "Error al actualizar usuario"
          );

        alert("Usuario actualizado correctamente");
        modal.classList.add("hidden");
        this.#cargarUsuarios(shadow);
      } catch (err) {
        alert("Error: " + err.message);
      }
    });
  }

  #cargarUsuarios(shadow) {
    const tbody = shadow.querySelector("#tablaUsuarios");
    tbody.innerHTML = "";

    const usuario = AuthService.obtenerUsuario();
    const token = usuario?.token;

    fetch("http://localhost:3000/api/usuarios", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener usuarios");
        return res.json();
      })
      .then((data) => {
        const usuariosAdmin = data.data.filter(
          (usuario) => usuario.rol === "administrador"
        );

        usuariosAdmin.forEach((usuario) => {
          const fila = document.createElement("tr");
          fila.innerHTML = `
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellidoPaterno}</td>
                    <td>${usuario.apellidoMaterno}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.rol}</td>
                    <td>
                        <button class="btnEditar" data-id="${usuario.id}">Editar</button>
                        <button class="btnEliminar" data-id="${usuario.id}">Eliminar</button>
                    </td>
                `;
          tbody.appendChild(fila);
        });
      })
      .catch((err) => console.error("Error:", err.message));
  }
}
