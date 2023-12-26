import doctorSevice from "../services/doctorService"

let getTopDoctorHome = async (req, res) => {
    let limit = req.query.limit;
    if (!limit) limit = 10;
    try {
        let doctors = await doctorSevice.getTopDoctorHome(+limit);
        return res.status(200).json(doctors);
    }
    catch (e) {
        return res.status(200).json({
            errCode: -1,
            message: "Error from server!"
        })
    }
}

let getAllDoctor = async (req, res) => {
    try {
        let doctors = await doctorSevice.getAllDoctor();
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
let postInforDoctor = async (req, res) => {
    try {
        let response = await doctorSevice.saveInforDoctor(req.body);
        return res.status(200).json(response);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from server"
        })
    }
}


let getDetialDoctor = async (req, res) => {
    try {
        if (!req.query.id) {
            return res.status(200).json({
                errCode: -2,
                errMessage: "Missing required paramiter!"
            })
        }
        let infor = await doctorSevice.getDetialDoctorbyid(req.query.id);
        return res.status(200).json(infor);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the serser!"
        })
    }
}


let postBulkCreateSchedule = async (req, res) => {
    try {
        let infor = await doctorSevice.bulkCreateSchedule(req.body);
        return res.status(200).json(infor);
    }
    catch (err) {
        console.log(err);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the serser!"
        })
    }
}

let getScheduleDoctorById = async (req, res) => {
    try {

        let infor = await doctorSevice.getScheduleDoctorDate(req.query.doctorId, req.query.date);
        return res.status(200).json(infor);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the serser!"
        })
    }
}

let getExtraInforDoctorById = async (req, res) => {
    try {

        let infor = await doctorSevice.getExtraInforDoctor(req.query.doctorId);
        return res.status(200).json(infor);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the serser!"
        })
    }
}

let getProfileDoctorById = async (req, res) => {
    try {

        let infor = await doctorSevice.getProfileDoctor(req.query.doctorId);
        return res.status(200).json(infor);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the serser!"
        })
    }
}
let getPatientForDoctor = async (req, res) => {
    try {

        let patient = await doctorSevice.getPatientForDoctor(req.query.doctorId, req.query.date);
        return res.status(200).json(patient);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the serser!"
        })
    }
}

let sendRemedy = async (req, res) => {
    try {

        let patient = await doctorSevice.sendRemedy(req.body);
        return res.status(200).json(patient);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the serser!"
        })
    }
}

let searchDoctor = async (req, res) => {
    try {
        let patient = await doctorSevice.searchDoctor(req.query.search);
        return res.status(200).json(patient);
    }
    catch (e) {
        console.log(e);
        return res.status(200).json({
            errCode: -1,
            errMessage: "Error from the serser!"
        })
    }
}
module.exports = {
    getTopDoctorHome: getTopDoctorHome,
    getAllDoctor: getAllDoctor,
    postInforDoctor: postInforDoctor,
    getDetialDoctor: getDetialDoctor,
    postBulkCreateSchedule: postBulkCreateSchedule,
    getScheduleDoctorById: getScheduleDoctorById,
    getExtraInforDoctorById: getExtraInforDoctorById,
    getProfileDoctorById: getProfileDoctorById,
    getPatientForDoctor: getPatientForDoctor,
    sendRemedy: sendRemedy,
    searchDoctor: searchDoctor,

}