// TIENE TODA LA CONFIGURACION DE LA API

const express = require('express') // importar express
const routerConfig = require('./routes/index.routes.js') // importar el archivo de rutas
const globalConstants = require('./const/globalConstants.js') // importar el archivo de constantes globales
const cors = require('cors')

const configuracionApi = (app) => { // configurar la api
    // middlwares
    app.use(express.json()) // para que la api pueda recibir json
    app.use(express.urlencoded({ extended: true })) // para que la api pueda recibir formularios

    app.use(cors()); // acepta peticiones de todos los dominios
    // configurar opciones de los cors mas adelante
    return;
};

const configuracionRouter = (app) => { // configurar las rutas
    app.use('/api/', routerConfig.rutas_init()) // para acceder a las rutas de la api siempre deberá empezar con /api/
};

const init = () => {
    const app = express() // crear una instancia de express
    configuracionApi(app) // configurar la api
    configuracionRouter(app) // configurar las rutas
    app.listen(globalConstants.PORT) // escuchar en el puerto
    console.log('La aplicacion se está ejecutando en el puerto:' + globalConstants.PORT) // mostrar en consola que se está ejecutando la aplicación en el puerto correspondiente
};

init(); // iniciar la aplicación