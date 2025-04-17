export class BarComponent extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode : 'open'});
        this.#agregarEstilos(shadow);
        this.#render(shadow);
        this.#agregarEventos(shadow);
    }

    #render(shadow){
        shadow.innerHTML += `
            <nav class="bar">
                <ul class="nav-tabs">
                    <li class="tab active">Vuelos</li>
                    <li class="tab">Mis Viajes</li>
                </ul>
            </nav>
        `
    }

    #agregarEstilos(shadow){
        let link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./Shared/bar/bar.component.css")
        shadow.appendChild(link);
    }

    #agregarEventos(shadow) {
        const tabs = shadow.querySelectorAll('.tab');  // Seleccionamos todas las pestañas
        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.#cambiarActivo(tab, tabs);
            });
        });
    }

    #cambiarActivo(tab, tabs) {
        tabs.forEach(t => t.classList.remove('active'));  // Removemos la clase 'active' de todas las pestañas
        tab.classList.add('active');  // Añadimos la clase 'active' a la pestaña seleccionada
    }
}