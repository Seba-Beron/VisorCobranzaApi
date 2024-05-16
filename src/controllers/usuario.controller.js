// FUNCIONAMIENTO DE TODAS LAS RUTAS DE USUARIO
const bcrypt = require('bcryptjs')
const globalConstants = require('../const/globalConstants.js')
const { createToken } = require('../utils.js')
const { Pool } = require('pg')

const pool = new Pool({
    host: globalConstants.HOST,
    user: globalConstants.USER,
    password: globalConstants.PASSWORD,
    database: globalConstants.DATABASE,
    port: globalConstants.DB_PORT
})

module.exports = {

    login: async (req, res) => {

        const { rut, password } = req.body;
        if (!rut || !password) return res.json({ message: 'Datos incompletos' })

        try {
            data = await pool.query(`select * from login('${rut}')`);
        } catch (e) {
            return res.json({ message: e })
        }

        if (data.rows.length == 0) return res.json({ message: 'rut incorrecto' })

        let user = data.rows[0];
        let autenticado = await bcrypt.compare(password, user.password);

        if (!autenticado) return res.json({ message: 'contraseña incorrecta' });

        return res.json({
            token: createToken(rut, user.name),
            expiratedPassword: user.expirated
        })
    },

    register: async (req, res) => {
        let { name, rut, email, birthdate, password } = req.body;

        if (!name, !rut, !email, !birthdate, !password) return res.json({ message: 'Datos incompletos' })

        let passHash = await bcrypt.hash(password, 8);
        let query = `call insertuser('${name}', '${rut}', '${email}', '${birthdate}', '${passHash}')`;

        try {
            const response = await pool.query(query);
            return res.json({ message: 'Usuario creado con exito' });
        } catch (e) {
            return res.json({ message: e })
        }
    },

    prueba: async (req, res) => {
        try {
            const response = await pool.query('select * from prueba3()');
            return res.json(response.rows);
        } catch (e) {
            return res.json({ message: e })
        }
        //pool.end() // no es necesario?
    }
}