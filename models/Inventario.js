const {Schema, model} = require('mongoose');


const InventarioSchema = Schema({
    serial:{type:String, require: true, unique: true},
    modelo:{type:String, require:true},
    descripcion:{type:String, require:true},
    color:{type:String},
    foto:{type:String, require:true},
    fechaCompra:{type:Date, require:true},
    precio:{type:Number, require:true},
    usuario:{type:Schema.Types.ObjectId, ref:'Usuario', require: false},
    marca:{type:Schema.Types.ObjectId, ref:'Marca', require:true},
    tipoEquipo:{type:Schema.Types.ObjectId, ref:'TipoEquipo', require:true},
    EstadoEquipo:{type:Schema.Types.ObjectId, ref:'EstadoEquipo', require:true},
    estado: {type:String, requre: true, enum: [Activo, Inactivo]},
    fechaCreacion:{type:Date, require: true},
    fechaActualizacion:{type:Date, require: true}
});

module.exports = model('Inventario', InventarioSchema);