const express = require('express');
const cors    = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT || 3000;
        this.userPath = '/api/users';

        //connect to database
        this.connectDB();

        //Middlewares
        this.middlewares();

        //Rutas de mi aplicación
        this.routes();

    }

    async connectDB(){

        await dbConnection();

    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio público
        this.app.use( express.static('public') );

    }

    routes(){
        this.app.use(this.userPath, require('../routes/user'));
    }

    listen(){

        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        } );

    }

}

module.exports = Server;

