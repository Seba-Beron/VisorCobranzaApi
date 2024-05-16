// TIENE TODA LA CONFIGURACION DE LA API

const express = require('express')
const routerConfig = require('./routes/index.routes.js')
const { PORT } = require('./const/globalConstants.js')
const cors = require('cors')
const { createHandler } = require("graphql-http/lib/use/express")
const { ruruHTML } = require("ruru/server")
const { schema, root } = require('./schema.js')

//const { setJWT_KEYS } = require('../jwt_keys/jwt.js')

//setJWT_KEYS();

const configuracionApi = (app) => { // configurar la api

    app.all(
        "/graphql",
        createHandler({
            schema: schema,
            rootValue: root,
        })
    )

    // Serve the GraphiQL IDE.
    app.get("/", (_req, res) => {
        res.type("html")
        res.end(ruruHTML({ endpoint: "/graphql" }))
    })

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
    app.listen(PORT) // escuchar en el puerto
    console.log('La aplicacion se está ejecutando en el puerto:' + PORT)
};

init(); // iniciar la aplicación