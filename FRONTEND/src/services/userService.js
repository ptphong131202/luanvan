import axios from '../axios'

// ---------------------- patient -------------------
// function handle login
const handleLoginApi = ( email, password ) =>
{
    return axios.post( 'api/login', { email, password } ); // request len server
}

// get all patient
const getAllUser = () =>
{
    return axios.get( `api/get-patient` ); // request len server
}

// create a new patient
const createNewUserService = ( data ) =>
{
    return axios.post( `api/create-new-patient`, data );
}

// delete a patient
const deleteUserService = ( userid ) =>
{
    return axios.delete( `api/delete-patient`,
        {
            data: { id: userid },
        } );
}

// update patient
const editUserService = ( inputData ) =>
{
    return axios.put( `api/update-patient`, inputData );
}

// ----------------------------- admin -----------------


// create a new patient
const createNewAdmin = ( data ) =>
{
    return axios.post( `api/create-new-admin`, data );
}

// get all patient
const getAllAmin = () =>
{
    return axios.get( `api/get-admin` ); // request len server
}


// delete a admi
const deleteadmin = ( userid ) =>
{
    return axios.delete( `api/delete-admin`,
        {
            data: { id: userid },
        } );
}

// update patient
const editAdminService = ( inputData ) =>
{
    return axios.put( `api/update-admin`, inputData );
}
// ----------------------------- doctor -----------------

// create a new patient
const createNewDoctor = ( data ) =>
{
    return axios.post( `api/create-new-doctor`, data );
}

const getAllDoctor = () =>
{
    return axios.get( `/api/get-doctor` );
}


// update patient
const editDoctorService = ( inputData ) =>
{
    return axios.put( `api/update-doctor`, inputData );
}

const getAllcodeService = ( inputData ) =>
{
    return axios.get( `/api/allcode?type=${ inputData }` );
}

// delete a admi
const deletedDoctor = ( userid ) =>
{
    return axios.delete( `api/delete-doctor`,
        {
            data: { id: userid },
        } );
}

const getDetailInforDoctor = ( id ) =>
{
    return axios.get( `api/get-doctor-by-id?id=${ id }` );
}
// ----------------------------------------------



/// -------- clinic ---------
// update patient
const updateClinic = ( inputData ) =>
{
    return axios.put( `api/update-clicnic`, inputData );
}


// delete a admi
const deletedClinic = ( clinicId ) =>
{
    return axios.delete( `api/delete-clinic`,
        {
            data: { id: clinicId },
        } );
}




const getTopDoctorHomeService = ( limit ) =>
{
    return axios.get( `/api/get-top-doctor-home?limit=${ limit }` );

}


const saveDetailDoctor = ( data ) =>
{
    return axios.post( `api/save-infor-doctor`, data );
}



const saveBulkScheduleDoctor = ( data ) =>
{
    return axios.post( `api/bulk-create-schedule`, data );
}

const getScheduleDoctorById = ( inputId, date ) =>
{
    return axios.get( `api/get-schedule-doctor-by-id?doctorId=${ inputId }&date=${ date }` );
}
const getExtraInforDoctorById = ( id ) =>
{
    return axios.get( `api/get-extra-infor-doctor-by-id?doctorId=${ id }` );
}

const getProfileDoctorById = ( id ) =>
{
    return axios.get( `api/get-profile-doctor-by-id?doctorId=${ id }` );
}

const postPatientBookAppoiment = ( data ) =>
{
    return axios.post( `api/patient-booking-oppointment`, data );
}
const postVerifyBookAppoiment = ( data ) =>
{
    return axios.post( `api/verify-booking-oppointment`, data );
}

const createNewSpecialty = ( data ) =>
{
    return axios.post( `api/create-new-specialty`, data );
}

const getAllSpecialty = () =>
{
    return axios.get( `/api/get-all-specialty` );
}

const getDetaiSpecialty = ( data ) =>
{
    return axios.get( `/api/get-detail-specialty-by-id?id=${ data.id }&location=${ data.location }` );
}

const createNewClinic = ( data ) =>
{
    return axios.post( `api/create-new-clinic`, data );
}
const getAllClinic = () =>
{
    return axios.get( `/api/get-all-clinic` );
}

const getDetaiClinic = ( id ) =>
{
    return axios.get( `/api/get-detail-clinic-by-id?id=${ id }` );
}

const getPatientforDoctor = ( data ) =>
{
    return axios.get( `/api/get-patient-for-doctor?doctorId=${ data.doctorId }&date=${ data.date }` );
}


const postSendRemedy = ( data ) =>
{
    return axios.post( `api/send-remedy`, data );
}

const searchDoctor = ( search ) =>
{
    return axios.get( `/api/search-doctor?search=${ search }` );
}

const searchSpecialty = ( search ) =>
{
    return axios.get( `/api/search-specialty?search=${ search }` );
}

const searchClinic = ( search ) =>
{
    return axios.get( `/api/search-clinic?search=${ search }` );
}


const createNewHandBook = ( data ) =>
{
    return axios.post( `api/create-new-handbook`, data );
}


const getAllHandbook = () =>
{
    return axios.get( `/api/get-all-handbook` );
}



const getDetalhandbookById = ( id ) =>
{
    return axios.get( `/api/get-detail-handbook-by-id?id=${ id }` );
}
export
{
    handleLoginApi, getAllUser, createNewUserService,
    deleteUserService, editUserService, createNewAdmin,
    getAllAmin, deleteadmin, editAdminService, createNewDoctor,
    getAllDoctor, editDoctorService, deletedDoctor, updateClinic,
    deletedClinic,


    getAllcodeService,
    getTopDoctorHomeService, saveDetailDoctor,
    getDetailInforDoctor, saveBulkScheduleDoctor, getScheduleDoctorById,
    getExtraInforDoctorById, getProfileDoctorById, postPatientBookAppoiment,
    postVerifyBookAppoiment, createNewSpecialty,
    getAllSpecialty, getDetaiSpecialty,
    createNewClinic, getAllClinic, getDetaiClinic, getPatientforDoctor,
    postSendRemedy, searchDoctor, searchSpecialty, searchClinic,
    createNewHandBook, getAllHandbook, getDetalhandbookById
};