import db from '../models/index';
const Sequelize = require('sequelize')
const Op = Sequelize.Op;
let createSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.name || !data.imageBase64 ||
                !data.descriptionHTML || !data.descriptionMarkdown) {
                return reject({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            }
            else {
                await db.Specialty.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,

                })

                resolve({
                    errCode: 0,
                    errMessage: "Create a new Specialty successfully!"
                })
            }


        }
        catch (e) {
            reject(e);
        }
    })
}


let getAllSpecialty = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialties = await db.Specialty.findAll();
            if (specialties && specialties.length > 0) {
                specialties.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            if (specialties && specialties.length > 0) {
                resolve({
                    errCode: 0,
                    data: specialties
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "No specialties found!"
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

let getDetalSpecialtyById = (id, location) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id || !location) {
                return reject({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            }
            else {
                let specialty = await db.Specialty.findOne({
                    where: { id: id },
                    attributes: ['id', 'descriptionHTML', 'descriptionMarkdown', "image", "name"]
                });
                if (specialty) {
                    specialty.image = new Buffer(specialty.image, 'base64').toString('binary');
                    let doctorSpecialty = [];
                    if (location === "ALL") {
                        doctorSpecialty = await db.Doctor_infor.findAll({
                            where: { specialtyId: id },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    else {
                        doctorSpecialty = await db.Doctor_infor.findAll({
                            where: {
                                specialtyId: id,
                                provinceId: location
                            },
                            attributes: ['doctorId', 'provinceId']
                        })
                    }
                    specialty.doctorSpecialty = doctorSpecialty;
                }
                else specialty = {};

                resolve({
                    errCode: 0,
                    data: specialty,
                    errMessage: "ok"
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

let searchSpecialty = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let specialties = await db.Specialty.findAll({
                where: {
                    name: {
                        [Op.like]: `%${data}%`
                    }
                }
            });

            if (specialties && specialties.length > 0) {
                specialties.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            if (specialties && specialties.length > 0) {
                resolve({
                    errCode: 0,
                    data: specialties
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "No specialties found!"
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createSpecialty: createSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetalSpecialtyById: getDetalSpecialtyById,
    searchSpecialty: searchSpecialty
}