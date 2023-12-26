import patientService from "../services/patientService"

let postPatientBookingOppointment = async (req, res) => {
    try {

        let infor = await patientService.postPatientBookingOppointment(req.body);
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

let postVerifyBookingOppointment = async (req, res) => {
    try {

        let infor = await patientService.postVerifyBookingOppointment(req.body);
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

module.exports = {
    postPatientBookingOppointment: postPatientBookingOppointment,
    postVerifyBookingOppointment: postVerifyBookingOppointment
}