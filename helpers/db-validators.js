const Role = require('../models/role');
const User = require('../models/user');

const isRoleValided = async( role = '' ) => {

    const existRole = await Role.findOne({ role });
    if( !existRole ){
        throw new Error( `The role ${ role } not is registered in the DB` )
    }

};

const isEmailValid = async ( email = '') => {

    const existEmail = await User.findOne({ email });
    if( existEmail ) {
        throw new Error( `The email: ${ email }, is registered in DB` )
        }
    }

const existUserById = async ( id ) => {

    const existUser = await User.findById( id );
    if( !existUser ) {
        throw new Error( `The ID not exist: ${ id }` )
        }
    }

module.exports = {
    isRoleValided,
    isEmailValid,
    existUserById
}