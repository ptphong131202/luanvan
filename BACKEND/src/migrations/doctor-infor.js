'use strict';
module.exports = {
    up: async ( queryInterface, Sequelize ) =>
    {
        await queryInterface.createTable( 'doctor_infor', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            /**
             * specialtyId: DataTypes.STRING,
        clinicId: DataTypes.STRING,
        priceId: DataTypes.STRING,
        provinceId: DataTypes.STRING,
        paymentId: DataTypes.STRING,
        addressClinic: DataTypes.STRING,
        nameClinic: DataTypes.STRING,
        note: DataTypes.STRING,
        doctorInfor: DataTypes.STRING,
        doctorMarkdonw: DataTypes.STRING,
        doctorHTML: DataTypes.STRING,
        count: DataTypes.INTEGER,
            */
            doctorId: {
                type: Sequelize.STRING
            },
            specialtyId: {
                type: Sequelize.STRING
            },
            clinicId: {
                type: Sequelize.STRING
            },
            priceId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            provinceId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            paymentId: {
                allowNull: false,
                type: Sequelize.STRING
            },
            addressClinic: {
                allowNull: false,
                type: Sequelize.STRING
            },
            nameClinic: {
                allowNull: false,
                type: Sequelize.STRING
            },
            doctorMarkdonw: {
                type: Sequelize.STRING
            },
            doctorHTML: {
                type: Sequelize.STRING
            },
            descMarkdonw: {
                type: Sequelize.STRING
            },
            descHTML: {
                type: Sequelize.STRING
            },
            note: {
                type: Sequelize.STRING
            },
            count: {
                allowNull: false,
                type: Sequelize.INTEGER,
                defaultValue: 0
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
        await queryInterface.dropTable( 'doctor_infor' );
    }
};