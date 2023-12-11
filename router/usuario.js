const {Router} = require('express');
const Usuario = require('../models/Usuario')
const {validationResult, check} = require('express-validator')
const bycript = require('bcryptjs')

const router = Router();

router.post('/', [check('nombre', 'invalid.nombre').not().isEmpty(),
                check('email', 'invalid.email').not().isEmpty(),
                check('password', 'invalid.password').not().isEmpty(),
                check('rol', 'invalid.rol').isIn(['Administrador','Docente']),
                check('estado', 'invalid.Estado').isIn(['Activo','Inactivo'])],
    async function(req, res){
            
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({mensaje: errors.array()})
        }

        const existeUsuario = await Usuario.findOne({email:req.body.email})
        if (existeUsuario){
            return res.status(400).send('Email utilizado ya se encuentra registrado')
        }

        let usuario = new Usuario();
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.rol = req.body.rol;

        const salt = bycript.genSaltSync();
        const password = bycript.hashSync(req.body.password, salt);
        usuario.password = password

        usuario.fechaCracion = new Date();
        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        res.send(usuario)

    }catch (error){

        console.log(error)
        res.status(500).send('Ha ocurrido un Error al crear el usuario')

    }   

});



router.get('/', async function (req, res){

    try{

        const usuarios = await Usuario.find();


    }catch(error){
        console.log(error);
        res.status(500).send('Ha ocurrido un error');
    }
});

router.put('/:usuarioId', [check('nombre', 'invalid.nombre').not().isEmpty(),
                check('email', 'invalid.email').not().isEmpty(),
                check('password', 'invalid.password').not().isEmpty(),
                check('rol', 'invalid.nombre').isIn(['Administrador','Docente']),
                check('estado', 'invalid.Estado').isIn(['Activo','Inactivo'])],
    async function(req, res){
            
    try{

        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(mensaje = errors.array())
        }

        let usuario = await Usuario.findById(req.params.usuarioID)
        if(!usuario){
            return res.status(400).json(mensaje = 'Usuario no existe')
        }
        const existeUsuario = await Usuario.findOne({email:req.body.email, _id: {$ne : usuario._id}})
        if (existeUsuario){
            return res.status(400).send('Email utilizado ya se encuentra registrado')
        }

        
        usuario.nombre = req.body.nombre;
        usuario.email = req.body.email;
        usuario.estado = req.body.estado;
        usuario.rol = req.body.rol;
        usuario.password = req.body.rol;

        usuario.fechaActualizacion = new Date();

        usuario = await usuario.save();
        res.send(usuario)

    }catch (error){

        console.log(error)
        res.status(500).send('Ha ocurrido un Error al crear el usuario')

    }   

});


module.exports = router;