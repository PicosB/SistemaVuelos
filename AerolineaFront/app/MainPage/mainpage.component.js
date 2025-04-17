export class MainPageComponent extends HTMLElement{
    constructor(){
        super();
    }

    connectedCallback(){
        const shadow = this.attachShadow({mode : 'open'});
        this.#agregarEstilos(shadow);
        this.#render(shadow);
    }

    #render(shadow){
        shadow.innerHTML += `
            <div class="main-container">
                <div class="top-sections">
                    <div class="section1">
                        <section class="form-section">
                            <form class="form-container">
                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="origen">Lugar de Origen</label>
                                        <select id="origen" name="origen">
                                            <option value="">Seleccione un lugar de origen</option>
                                            <option value="Hermosillo">Hermosillo</option>
                                            <option value="Cd. Obregón">Cd. Obregón</option>
                                            <option value="Culiacán">Culiacán</option>
                                            <option value="Mazatlán">Mazatlán</option>
                                        </select>
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="destino">Lugar de Destino</label>
                                        <select id="destino" name="destino">
                                            <option value="">Seleccione un lugar de destino</option>
                                            <option value="Hermosillo">Hermosillo</option>
                                            <option value="Cd. Obregón">Cd. Obregón</option>
                                            <option value="Culiacán">Culiacán</option>
                                            <option value="Mazatlán">Mazatlán</option>
                                        </select>
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group">
                                        <label for="salida">Salida</label>
                                        <input type="date" id="salida" name="salida">
                                    </div>
                                    
                                    <div class="form-group">
                                        <label for="regreso">Regreso</label>
                                        <input type="date" id="regreso" name="regreso">
                                    </div>
                                </div>

                                <div class="form-row">
                                    <div class="form-group small">
                                        <label for="pasajeros">Pasajeros</label>
                                        <input type="number" id="pasajeros" name="pasajeros" min="1" placeholder="Ej. 1">
                                    </div>

                                    <button type="submit" class="btnBuscarVuelo">Buscar Vuelo</button>
                                </div>
                            </form>
                        </section>
                    </div>
                
                    <div class="section2">
                        <img src="/AerolineaFront/assets/anuncioVuelo.PNG" alt="Imagen decorativa" class="imagen-vuelo" />
                    </div>
                </div>

                <h1>Mejores Vuelos con AirCloud</h1>
                
                <div class="cards-container">
                    <div class="flight-card">
                    <img src="/AerolineaFront/assets/Hermosillo-1.jpg" alt="Hermosillo">
                    <div class="card-info">
                        <h3>Ciudad de México (MEX) a Hermosillo (HMO)</h3>
                        <p class="fecha">07/08/25</p>
                        <div class="precio">
                        <span>Desde</span>
                        <strong>750 <span class="moneda">MXN*</span></strong>
                        </div>
                        <button class="btnReservar">Reservar Ahora</button>
                    </div>
                    </div>

                    <div class="flight-card">
                        <img src="/AerolineaFront/assets/GDL.png" alt="Guadalajara">
                        <div class="card-info">
                        <h3>Hermosillo (HMO) a Guadalajara (GDL)</h3>
                        <p class="fecha">07/08/25</p>
                        <div class="precio">
                            <span>Desde</span>
                            <strong>940 <span class="moneda">MXN*</span></strong>
                        </div>
                        <button class="btnReservar">Reservar Ahora</button>
                        </div>
                    </div>

                    <div class="flight-card">
                        <img src="/AerolineaFront/assets/La Paz.jpg" alt="LaPaz">
                        <div class="card-info">
                        <h3>Ciudad de México (MEX) a la Paz (LAP)</h3>
                        <p class="fecha">07/08/25</p>
                        <div class="precio">
                            <span>Desde</span>
                            <strong>625 <span class="moneda">MXN*</span></strong>
                        </div>
                        <button class="btnReservar">Reservar Ahora</button>
                        </div>
                    </div>

                    <div class="flight-card">
                        <img src="/AerolineaFront/assets/mzt.jpg" alt="Mazatlan">
                        <div class="card-info">
                        <h3>Ciudad Obregón (COB) a Mazatlán (MZT)</h3>
                        <p class="fecha">07/08/25</p>
                        <div class="precio">
                            <span>Desde</span>
                            <strong>750 <span class="moneda">MXN*</span></strong>
                        </div>
                        <button class="btnReservar">Reservar Ahora</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    #agregarEstilos(shadow){
        let link = document.createElement('link');
        link.setAttribute("rel", "stylesheet");
        link.setAttribute("href", "./MainPage/mainpage.component.css")
        shadow.appendChild(link);
    }
}