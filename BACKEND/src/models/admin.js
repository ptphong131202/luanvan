'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Admin extends Model
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate ( models )
        {
            // define association here
        }
    };
    Admin.init( {
        email: DataTypes.STRING, // email
        password: DataTypes.STRING, // email
        fullName: DataTypes.STRING, // full name
        phone: DataTypes.STRING, // so dien thoai
        role: DataTypes.STRING, // so dien thoai
    }, {
        sequelize,
        modelName: 'Admin',
    } );
    return Admin;
};