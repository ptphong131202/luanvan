import hanbookService from "../services/handbookService"

let createNewHandBook = async (req, res) => {
    try {
        let handbook = await hanbookService.createNewHandBook(req.body);
        return res.status(200).json(handbook);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}
let getAllHandbook = async (req, res) => {
    try {
        let handbook = await hanbookService.getAllHandbook();
        return res.status(200).json(handbook);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let getDetalhandbookById = async (req, res) => {
    try {
        let handbook = await hanbookService.getDetalhandbookById(req.query.id);
        return res.status(200).json(handbook);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

module.exports = {
    createNewHandBook: createNewHandBook,
    getAllHandbook: getAllHandbook,
    getDetalhandbookById: getDetalhandbookById
}