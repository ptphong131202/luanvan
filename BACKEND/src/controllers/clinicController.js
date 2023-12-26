import clinicSevice from "../services/clinicService"

let createNewClinic = async (req, res) => {
    try {
        let clinic = await clinicSevice.createNewClinic(req.body);
        return res.status(200).json(clinic);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let getAllClinic = async (req, res) => {
    try {
        let clinic = await clinicSevice.getAllClinic();
        return res.status(200).json(clinic);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}
let getDetalClinicById = async (req, res) => {
    try {
        let clinic = await clinicSevice.getDetalClinicById(req.query.id);
        return res.status(200).json(clinic);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}
let searchClinic = async (req, res) => {
    try {
        let clinic = await clinicSevice.searchClinic(req.query.search);
        return res.status(200).json(clinic);
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
    createNewClinic: createNewClinic,
    getAllClinic: getAllClinic,
    getDetalClinicById: getDetalClinicById,
    searchClinic: searchClinic

}