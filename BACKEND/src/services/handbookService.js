import db from '../models/index';


let createNewHandBook = (data) => {
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
                await db.Handbook.create({
                    name: data.name,
                    image: data.imageBase64,
                    descriptionHTML: data.descriptionHTML,
                    descriptionMarkdown: data.descriptionMarkdown,

                })

                resolve({
                    errCode: 0,
                    errMessage: "Create a new Handbook successfully!"
                })
            }


        }
        catch (e) {
            reject(e);
        }
    })
}


let getAllHandbook = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let handbooks = await db.Handbook.findAll();
            if (handbooks && handbooks.length > 0) {
                handbooks.map(item => {
                    item.image = new Buffer(item.image, 'base64').toString('binary');
                    return item;
                })
            }
            if (handbooks && handbooks.length > 0) {
                resolve({
                    errCode: 0,
                    data: handbooks
                })
            }
            else {
                resolve({
                    errCode: 1,
                    errMessage: "No HandBooks found!"
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

let getDetalhandbookById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                return reject({
                    errCode: 1,
                    errMessage: "Missing required parameter!"
                })
            }
            else {
                let handbook = await db.Handbook.findOne({
                    where: { id: id },
                });
                if (handbook) {
                    handbook.image = new Buffer(handbook.image, 'base64').toString('binary');
                }
                else handbook = {};

                resolve({
                    errCode: 0,
                    data: handbook,
                    errMessage: "ok"
                })
            }
        }
        catch (e) {
            reject(e);
        }
    })
}

module.exports = {
    createNewHandBook: createNewHandBook,
    getAllHandbook: getAllHandbook,
    getDetalhandbookById: getDetalhandbookById
}