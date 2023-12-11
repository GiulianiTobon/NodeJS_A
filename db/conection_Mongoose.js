const mongoose = require('mongoose')


const getConnection = async () => {
    try{
        const url = 'mongoose: // usuario:l8zVuBEtkxNzTtkx@ac-mnutzym-shard-00-00.8o3ccjs.mongodb.net:27017, ac-mnutzym-shard-00-01.8o3ccjs.mongodb.net:27017,ac-mnutzym-shard-00-02.8o3ccjs.mongodb.net:27017/jwt-ea3?ssl=true&replicaSet=atkas-147jrs-shar-0&authSource=admin&retrytryWrite=true&w=majority'
        await mongoose.connect(url)
        console.log("Conexion Exitosa")
    }catch(error){
        console.log(error)
    }
}

module.exports = {
    getConnection
}