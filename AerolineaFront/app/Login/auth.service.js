const NOMBRE_CLAVE_LOCALSTORAGE = 'usuario';

export const AuthService = {
    guardarSesion(usuario) {
        localStorage.setItem(NOMBRE_CLAVE_LOCALSTORAGE, JSON.stringify(usuario));
    },

    obtenerUsuario() {
        const data = localStorage.getItem(NOMBRE_CLAVE_LOCALSTORAGE);
        return data ? JSON.parse(data) : null;
    },

    cerrarSesion() {
        localStorage.removeItem(NOMBRE_CLAVE_LOCALSTORAGE);
    },

    sesionActiva() {
        return !!localStorage.getItem(NOMBRE_CLAVE_LOCALSTORAGE);
    }
};
