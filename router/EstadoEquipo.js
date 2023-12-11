const {Router} = require('express');
const { validationResult } = require('express-validator');
const EstadoEquipo = require('../models/EstadoEquipo');
const { status } = require('express/lib/response');


const router = Router();

router.post('/',[
    check('nombre', 'invalid.nombre').not().isEmpty(),
    check('estado', 'invalid.estado').isIn(['Activo', 'Inactivo'])
], async function(req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()});
        }

        let estadoEquipo = new EstadoEquipo();

        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();
        res.send(estadoEquipo)

    }catch(error){
        console.log(error);
        res.status(500).send("Ha ocurrido un error");
    }
});

route.get('/', async function(req, res){

    try{
        const estadosEquipos = await EstadoEquipo.find();
        res.send(estadosEquipos);
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }
})

module.exports = router;