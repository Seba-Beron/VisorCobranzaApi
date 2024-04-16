// FUNCIONAMIENTO DE TODAS LAS RUTAS DE USUARIO

const { response } = require('express');
const { Pool } = require('pg');
const pool = new Pool({
    host: 'localhost',
    user: 'postgres',
    password: 'Carlos17%',
    database: 'postgres',
    port: 5432
})
const globalConstants = require('../const/globalConstants.js')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');

module.exports = {

    login: async (req, res) => {

        let { rut, password } = req.body;

        if (!rut, !password) {
            res.json({ message: 'Datos incompletos' });
        }
        else {
            let passHash = await bcrypt.hash(password, 8);
            console.log(passHash);
            let query = `select login('${rut}', '${passHash}')`;

            try {
                const response = await pool.query(query);
                console.log(response);

                var fechaActual = new Date();
                fechaActual.setHours(fechaActual.getHours() + 1);

                const userForToken = {
                    rut: response.rut,
                    username: response.name,
                    expirationDate: fechaActual
                }

                const token = jwt.sign(userForToken, globalConstants.SECRETWORD)

                res.json({
                    token: token
                })
            } catch (e) {
                res.json({
                    message: e
                })
            }
        }
    },

    register: async (req, res) => {
        let { name, rut, email, birthdate, password } = req.body;

        if (!name, !rut, !email, !birthdate, !password) {
            res.json({ message: 'Datos incompletos' });
        }
        else {
            let passHash = await bcrypt.hash(password, 8);
            let query = `call insertuser('${name}', '${rut}', '${email}', '${birthdate}', '${passHash}')`;

            try {
                const response = await pool.query(query);
                res.json({ message: 'Usuario creado con exito' });
            } catch (e) {
                res.json({
                    message: e
                })
            }
        }
    },

    prueba: async (req, res) => {
        try {
            const response = await pool.query('select prueba3()');
            console.log(response);
            res.json(response.rows);
        } catch (e) {
            res.json({
                message: e
            })
        }
        //pool.end() // no es necesario?
    }
}