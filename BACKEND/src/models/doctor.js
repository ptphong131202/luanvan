'use strict';
const {
    Model
} = require( 'sequelize' );
module.exports = ( sequelize, DataTypes ) =>
{
    class Doctor extends Model
    {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate ( models )
        {
            // define association here
            Doctor.hasOne( models.Doctor_infor, { foreignKey: 'doctorId' } )
            Doctor.belongsTo( models.Allcode, { foreignKey: 'position', targetKey: 'keyMap', as: 'positionData' } );
            Doctor.belongsTo( models.Allcode, { foreignKey: 'gender', targetKey: 'keyMap', as: 'genderData' } );
        }
    };
    Doctor.init( {
        email: DataTypes.STRING, // email
        password: DataTypes.STRING, // email
        firstName: DataTypes.STRING, // full name
        lastName: DataTypes.STRING, // full name
        address: DataTypes.STRING, // full name
        gender: DataTypes.STRING, // full name
        position: DataTypes.STRING, // full name
        phone: DataTypes.STRING, // so dien thoai
        role: DataTypes.STRING, // so dien thoai
        clinicId: DataTypes.STRING, // so dien thoai
        specialtyId: DataTypes.STRING, // so dien thoai
        image: DataTypes.BLOB( 'long' ), // so dien thoai
    }, {
        sequelize,
        modelName: 'Doctor',
    } );
    return Doctor;
};