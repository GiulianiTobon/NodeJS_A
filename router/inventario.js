const {Router} = require('express');
const Inventario = require('../models/Inventario')
const { validationResult } = require('express-validator');

const router = Router();

router.post( '/', [
check('modelo', 'invalid.modelo').not().isEmpty(),
check('descripcion', 'invalid.descripcion').not().isEmpty(),
check('color', 'invalid.color').not().isEmpty(),
Check('foto', 'invalid.foto').not().isEmpty(),
Check('fechaCompra', 'invalid.fechaCompra').not().isEmpty(),
Check('precio', 'invalid.precio').not().isEmpty(),
Check('usuario', 'invalid.usuario').not().isEmpty(),
Check('marca', 'invalid.marca').not().isEmpty(),
Check('estadoEquipo', 'invalid.estadoEquipo').not().isEmpty(),
Check('tipoEquipo', 'invalid.tipoEquipo').not().isEmpty()], async function (req, res){
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(mensaje = errors.array());
        }

        const existeInvetarioPorSerial = await Inventario.findOne({serial: req.body.serial});
        if(existeInvetarioPorSerial){
            return res.status(400).send('El seria ya existe en el inventario');
        }

        let invetario = new Inventario();

        inventario.serial = req.body.serial;
        invetario.modelo = req.body.modelo;
        invetario.descripcion = req.body.descripcion;
        invetario.color = req.body.color;
        invetario.foto = req.body.foto;
        invetario.fechaCompra = req.body.fechaCompra;
        invetario.precio = req.body.precio;
        invetario.usuario = req.body.usuario._id;
        invetario.marca = req.body.marca._id;
        invetario.estadoEquipo = req.body.estadoEquipo._id;
        invetario.tipoEquipo = req.body.tipoEquipo._id;
        invetario.fechaCreacion = new Date();
        invetario.fechaActualizacion = new Date();
        
        invetario = await inventario.save();
        res.send(inventario)
    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }
});
