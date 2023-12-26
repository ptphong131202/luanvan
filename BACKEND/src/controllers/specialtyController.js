import specialtyService from "../services/specialtyService";
let createNewSpecialty = async (req, res) => {
    try {
        let doctors = await specialtyService.createSpecialty(req.body);
        return res.status(200).json(doctors);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}


let getAllSpecialty = async (req, res) => {
    try {
        let doctors = await specialtyService.getAllSpecialty();
        return res.status(200).json(doctors);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let getDetalSpecialtyById = async (req, res) => {
    try {
        let doctors = await specialtyService.getDetalSpecialtyById(req.query.id, req.query.location);
        return res.status(200).json(doctors);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}

let searchSpecialty = async (req, res) => {
    try {
        let specialty = await specialtyService.searchSpecialty(req.query.search);
        return res.status(200).json(specialty);
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
    createNewSpecialty: createNewSpecialty,
    getAllSpecialty: getAllSpecialty,
    getDetalSpecialtyById: getDetalSpecialtyById,
    searchSpecialty: searchSpecialty

}