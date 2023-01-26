const { response } = require( 'express' );
const User = require( '../models/user' );
const bcryptjs = require('bcrypt');
const { generarJWT } = require('../helpers/generar-jwt');



const login = async( req, res = response ) => {

    const { email, password } = req.body;

    try {

        //Verificar si el email existe
        const user = await User.findOne({ email });
        if( !user ) {

            return res.status( 400 ).json({
                msg: 'User / Password not correct - email'
            });

        }

        //Si el usuario está activo
        if( !user.status ) {

            return res.status( 400 ).json({
                msg: 'User / Password not correct - status: false'
            });

        }

        // Verifivar la contraseña
        const validPassword = bcryptjs.compareSync( password, user.password );
        if ( !validPassword ) {
            
            return res.status( 400 ).json({
                msg: 'User / Password not correct - password'
            })
        }

        //Generar JWT
        const token = await generarJWT( user.id );

        res.json({
            user,
            token
        })    
        
    } catch (error) {

        console.log(error)

        return res.status( 500 ).json({
            msg: 'Talk to the administrator'
        })
        
    }

}



module.exports = {

    login

}