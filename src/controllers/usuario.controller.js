// FUNCIONAMIENTO DE TODAS LAS RUTAS DE USUARIO

const { response } = require('express');
const { Pool } = require('pg');
const globalConstants = require('../const/globalConstants.js')
const jwt = require('jsonwebtoken')
var bcrypt = require('bcryptjs');

const pool = new Pool({
    host: globalConstants.HOST,
    user: globalConstants.USER,
    password: globalConstants.PASSWORD,
    database: globalConstants.DATABASE,
    port: globalConstants.PORT
})

module.exports = {

    login: async (req, res) => {

        let { rut, password } = req.body;

        if (!rut, !password) {
            res.json({ message: 'Datos incompletos' });
        }
        else {
            try {
                data = await pool.query(`select * from login('${rut}')`);
            } catch (e) {
                res.json({message: e})
            }

            if (data.rows.length == 0){
                res.json({ message: 'rut incorrecto' });
            }

            let user = data.rows[0];
            let autenticado = await bcrypt.compare(password, user.password);

            if (autenticado) {
                    
                var fechaActual = new Date();
                fechaActual.setHours(fechaActual.getHours() + 1);

                const userForToken = {
                    rut: rut,
                    username: user.name,
                    expirationDate: fechaActual
                }

                res.json({
                    token: jwt.sign(userForToken, globalConstants.SECRETWORD),
                    expiratedPassword: user.expirated
                })
            }
            else{
                res.json({ message: 'contraseña incorrecta' });
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