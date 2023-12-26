'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Patient extends Model
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
    Patient.init( {
        email: DataTypes.STRING, // email
        password: DataTypes.STRING, // email
        fullName: DataTypes.STRING, // full name
        birthday: DataTypes.STRING, // ngay sinh
        address: DataTypes.STRING, // dia chi
        phone: DataTypes.STRING, // so dien thoai
        role: DataTypes.STRING, // gioi tinh
        gender: DataTypes.STRING, // gioi tinh
    }, {
        sequelize,
        modelName: 'Patient',
    } );
    return Patient;
};