'use strict';
module.exports = {
    up: async ( queryInterface, Sequelize ) =>
    {
        await queryInterface.createTable( 'doctors', {

            /**
             email: DataTypes.STRING, // email
        password: DataTypes.STRING, // email
        doctorID: DataTypes.STRING, //  id doctor
        firstName: DataTypes.STRING, // full name
        lastName: DataTypes.STRING, // full name
        address: DataTypes.STRING, // full name
        gender: DataTypes.STRING, // full name
        position: DataTypes.STRING, // full name
        phone: DataTypes.STRING, // so dien thoai
            */

            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            },
            address: {
                type: Sequelize.STRING
            },
            gender: {
                type: Sequelize.STRING
            },
            position: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING
            },
            clinicId: {
                type: Sequelize.STRING
            },
            specialtyId: {
                type: Sequelize.STRING
            },
            image: {
                type: Sequelize.BLOB( 'long' )
            },

            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        } );
    },
    down: async ( queryInterface, Sequelize ) =>
    {
        await queryInterface.dropTable( 'doctors' );
    }
};