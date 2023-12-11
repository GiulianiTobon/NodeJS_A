const express = require('express');
const {getConnection} = require('./db/conection_Mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const host = '0.0.0.0';
const port = process.env.PORT;

app.use(cors());

getConnection();


//parseo JSON

app.use(express.json());

app.use('/usuario', require('./router/usuario'));
app.use('/marca', require('./router/marca'));
app.use('/tipo-equipo', require('./router/TipoEquipo'));
app.use('/estado-equipo', require('./router/EstadoEquipo'));
app.use('/inventario', require('./router/inventario'));

app.listen(port, host, () => {
    console.log('Example app listening on port ${port}')
});

