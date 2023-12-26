'use strict';
module.exports = {
    up: async ( queryInterface, Sequelize ) =>
    {
        await queryInterface.createTable( 'admins', {

            /**
             email: DataTypes.STRING,
            fullName: DataTypes.STRING,
            birthday: DataTypes.STRING,
            address: DataTypes.STRING,
            phone: DataTypes.STRING,
            gender: DataTypes.STRING,
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
            fullName: {
                type: Sequelize.STRING
            },
            phone: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable( 'admins' );
    }
};