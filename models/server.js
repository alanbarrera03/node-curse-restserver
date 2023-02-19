const express = require('express');
const cors    = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT || 3000;

        this.paths = {

            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            user:       '/api/users',

        }

        this.userPath = '/api/users';
        this.authPath = '/api/auth';

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

        this.app.use(this.paths.auth,       require('../routes/auth'));
        this.app.use(this.paths.categories, require('../routes/categories'));
        this.app.use(this.paths.products,   require('../routes/products'));
        this.app.use(this.paths.search,     require('../routes/search'));
        this.app.use(this.paths.user,       require('../routes/user'));
    }

    listen(){

        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en el puerto', this.port);
        } );

    }

}

module.exports = Server;

