import express from "express";
import homeController from '../controllers/homeController';
import doctorController from "../controllers/doctorController";
import patientController from "../controllers/patientController";
import specialtyController from "../controllers/specialtyController";
import clinicController from "../controllers/clinicController";
import hanbookController from "../controllers/handbookController";



import userController from '../controllers/userController';
import patient from "../controllers/patient";
import admin from "../controllers/admin";
import doctor from "../controllers/doctor";

let router = express.Router();

let initWebRoutes = ( app ) =>
{

    // route 
    router.post( '/api/login', userController.handleLoging ); // login system

    // route patient
    router.get( '/api/get-patient', patient.getPatient ); // get all patient
    router.post( '/api/create-new-patient', patient.createNewPatient ); // create a new patient
    router.put( '/api/update-patient', patient.updatePatient ); // update a patient
    router.delete( '/api/delete-patient', patient.deletePatient ); // delete patient 

    // route admin
    router.post( '/api/create-new-admin', admin.createNewAdmin ); // create a new admin
    router.get( '/api/get-admin', admin.getAdmin ); // get all admin
    router.put( '/api/update-admin', admin.updateAdmin ); // update a patient
    router.delete( '/api/delete-admin', admin.deleteAdmin ); // delete admin updateAdmin

    // route doctor
    router.post( '/api/create-new-doctor', doctor.createNewDoctor ); // create a new doctor
    router.get( '/api/get-doctor', doctor.getDoctor ); // get all admin
    router.put( '/api/update-doctor', doctor.updateDoctor ); // update a patient
    router.get( '/api/get-doctor-by-id', doctor.getDoctorById ); // get all admin
    router.delete( '/api/delete-doctor', doctor.deleteDoctor ); // delete admin updateAdmin
    router.get( "/api/get-detial-doctor-by-id", doctorController.getDetialDoctor );
    router.post( "/api/save-infor-doctor", doctor.postInforDoctor );

    // clinic
    router.put( '/api/update-clicnic', clinicController.updateClinic );  // update a patient
    router.post( "/api/create-new-clinic", clinicController.createNewClinic );
    router.get( "/api/get-all-clinic", clinicController.getAllClinic );
    router.get( "/api/get-detail-clinic-by-id", clinicController.getDetalClinicById );
    router.delete( "/api/delete-clinic", clinicController.deleteClinic );


    // route table allcode
    router.get( "/api/allcode", doctor.getAllCode );
    // route get doctor home page
    router.get( "/api/get-top-doctor-home", doctorController.getTopDoctorHome );
    router.get( "/api/getAllDoctor", doctorController.getAllDoctor );

    router.get( "/api/get-patient-for-doctor", doctorController.getPatientForDoctor );
    router.post( "/api/send-remedy", doctorController.sendRemedy );

    router.post( "/api/bulk-create-schedule", doctorController.postBulkCreateSchedule );
    router.get( "/api/get-schedule-doctor-by-id", doctorController.getScheduleDoctorById );
    router.get( "/api/get-extra-infor-doctor-by-id", doctorController.getExtraInforDoctorById );
    router.get( "/api/get-profile-doctor-by-id", doctorController.getProfileDoctorById );
    router.post( "/api/patient-booking-oppointment", patientController.postPatientBookingOppointment );
    router.post( "/api/verify-booking-oppointment", patientController.postVerifyBookingOppointment );

    router.post( "/api/create-new-specialty", specialtyController.createNewSpecialty );
    router.get( "/api/get-all-specialty", specialtyController.getAllSpecialty );
    router.get( "/api/get-detail-specialty-by-id", specialtyController.getDetalSpecialtyById );



    router.get( "/api/search-doctor", doctorController.searchDoctor );
    router.get( "/api/search-specialty", specialtyController.searchSpecialty );
    router.get( "/api/search-clinic", clinicController.searchClinic );

    router.post( "/api/create-new-handbook", hanbookController.createNewHandBook );
    router.get( "/api/get-all-handbook", hanbookController.getAllHandbook );
    router.get( "/api/get-detail-handbook-by-id", hanbookController.getDetalhandbookById );



    return app.use( "/", router );
}

module.exports = initWebRoutes;