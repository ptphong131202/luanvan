import actionTypes from './actionTypes';
import
{
    getAllcodeService, createNewUserService, createNewAdmin,
    getAllAmin, getAllDoctor, getAllUser,
    deleteUserService, editUserService,



    getTopDoctorHomeService, saveDetailDoctor,
    getAllSpecialty, getAllClinic,


    deleteadmin, editAdminService, createNewDoctor, editDoctorService, deletedDoctor
} from '../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// gender

export const fetchGenderStart = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            dispatch( { type: actionTypes.FETCH_GENDER_START } );
            let res = await getAllcodeService( "GENDER" );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchGenderSuccess( res.data ) );
            }
            else
            {
                dispatch( fetchGenderFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchGenderFailed() );
            console.log( err );
        }
    }
}


export const fetchGenderSuccess = ( genderData ) => ( {
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
} )

export const fetchGenderFailed = () => ( {
    type: actionTypes.FETCH_GENDER_FAILED
} )


// position
export const fetchPositionStart = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            dispatch( { type: actionTypes.FETCH_POSITION_START } );
            let res = await getAllcodeService( "POSITION" );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchPositionSuccess( res.data ) );
            }
            else
            {
                dispatch( fetchPositionFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchPositionFailed() );
            console.log( err );
        }
    }
}


export const fetchPositionSuccess = ( positionData ) => ( {
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: positionData
} )

export const fetchPositionFailed = () => ( {
    type: actionTypes.FETCH_POSITION_FAILED
} )


/// role
export const fetchRoleStart = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            dispatch( { type: actionTypes.FETCH_ROLE_START } );
            let res = await getAllcodeService( "ROLE" );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchRoleSuccess( res.data ) );
            }
            else
            {
                dispatch( fetchRoleFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchRoleFailed() );
            console.log( err );
        }
    }
}


export const fetchRoleSuccess = ( RoleData ) => ( {
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: RoleData
} )

export const fetchRoleFailed = () => ( {
    type: actionTypes.FETCH_ROLE_FAILED
} )



// create a new patient

export const createNewUser = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await createNewUserService( data );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Create new user success!" );
                dispatch( saveUserSuccess() );
                dispatch( fetchAllUserStart() );
            }
            else
            {
                dispatch( saveUserFailed() );
            }
        }
        catch ( err )
        {
            dispatch( saveUserFailed() );
            console.log( err );
        }
    }
}

export const saveUserSuccess = () => ( {
    type: actionTypes.CREATE_USER_SUCCESS
} )


export const saveUserFailed = () => ( {
    type: actionTypes.CREATE_USER_FAILED
} )



// get all patient
export const fetchAllUserStart = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await getAllUser();
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchAllUserSuccess( res.data.reverse() ) );
            }
            else
            {
                dispatch( fetchAllUserFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchAllUserFailed() );
            console.log( err );
        }
    }
}

export const fetchAllUserSuccess = ( inputData ) => ( {
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    users: inputData
} )

export const fetchAllUserFailed = () => ( {
    type: actionTypes.FETCH_ALL_USERS_FAILED
} )


// delete patient by id
export const deleteUser = ( userid ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await deleteUserService( userid );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Delete user success!" );
                dispatch( deleteUserSuccess() );
                dispatch( fetchAllUserStart() );
            }
            else
            {
                toast.error( "Delete user error!" );
                dispatch( deleteUserFailed() );
            }
        }
        catch ( err )
        {
            toast.error( "Delete user error!" );
            dispatch( deleteUserFailed() );
            console.log( err );
        }
    }
}
export const deleteUserSuccess = () => ( {
    type: actionTypes.DELETE_USER_SUCCESS,
} )

export const deleteUserFailed = () => ( {
    type: actionTypes.DELETE_USER_FAILED
} )

// edit patient 
export const editAUser = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await editUserService( data );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Update user success!" );
                dispatch( updateUserSuccess() );
                dispatch( fetchAllUserStart() );
            }
            else
            {
                toast.error( "Update user error!" );
                dispatch( updateUserFailed() );
            }
        }
        catch ( err )
        {
            toast.error( "Update user error!" );
            dispatch( updateUserFailed() );
            console.log( err );
        }
    }
}
export const updateUserSuccess = () => ( {
    type: actionTypes.EDIT_USER_SUCCESS,
} )

export const updateUserFailed = () => ( {
    type: actionTypes.EDIT_USER_FAILED
} )

///-----------------------------------------------------------------


// create a new admin
export const createNewAdmins = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await createNewAdmin( data );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Create new user success!" );
                dispatch( saveAdminSuccess() );
                dispatch( fetchAllAdminStart() );
            }
            else
            {
                dispatch( saveAdminFailed() );
            }
        }
        catch ( err )
        {
            dispatch( saveAdminFailed() );
            console.log( err );
        }
    }
}

export const saveAdminSuccess = () => ( {
    type: actionTypes.CREATE_ADMIN_SUCCESS
} )


export const saveAdminFailed = () => ( {
    type: actionTypes.CREATE_ADMIN_FAILED
} )



// get all admin
export const fetchAllAdminStart = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await getAllAmin();
            console.log( "chexk res: ", res );
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchAllAdminSuccess( res.data.reverse() ) );
            }
            else
            {
                dispatch( fetchAllAdminFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchAllAdminFailed() );
            console.log( err );
        }
    }
}

export const fetchAllAdminSuccess = ( inputData ) => ( {
    type: actionTypes.FETCH_ALL_ADMIN_SUCCESS,
    admins: inputData
} )

export const fetchAllAdminFailed = () => ( {
    type: actionTypes.FETCH_ALL_ADMIN_FAILED
} )


// delete patient by id
export const deleteAdmin = ( userid ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await deleteadmin( userid );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Delete user success!" );
                dispatch( deleteAdminSuccess() );
                dispatch( fetchAllAdminStart() );
            }
            else
            {
                toast.error( "Delete Admin error!" );
                dispatch( deleteAdminFailed() );
            }
        }
        catch ( err )
        {
            toast.error( "Delete Admin error!" );
            dispatch( deleteAdminFailed() );
            console.log( err );
        }
    }
}
export const deleteAdminSuccess = () => ( {
    type: actionTypes.DELETE_ADMIN_SUCCESS,
} )

export const deleteAdminFailed = () => ( {
    type: actionTypes.DELETE_ADMIN_FAILED
} )


// edit patient 
export const editAdmin = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await editAdminService( data );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Update Admin success!" );
                dispatch( updateAdminSuccess() );
                dispatch( fetchAllAdminStart() );
            }
            else
            {
                toast.error( "Update Admin error!" );
                dispatch( updateAdminFailed() );
            }
        }
        catch ( err )
        {
            toast.error( "Update Admin error!" );
            dispatch( updateAdminFailed() );
            console.log( err );
        }
    }
}
export const updateAdminSuccess = () => ( {
    type: actionTypes.EDIT_ADMIN_SUCCESS,
} )

export const updateAdminFailed = () => ( {
    type: actionTypes.EDIT_ADMIN_FAILED
} )



//// ----------------------------------------------------------------

// create a new admin
export const createNewDoctors = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await createNewDoctor( data );
            console.log( "check createNewDoctor: ", res );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Create new user success!" );
                dispatch( saveDoctorSuccess() );
                dispatch( fetchAllDoctorStart() );
            }
            else
            {
                dispatch( saveDoctorFailed() );
            }
        }
        catch ( err )
        {
            dispatch( saveDoctorFailed() );
            console.log( err );
        }
    }
}

export const saveDoctorSuccess = () => ( {
    type: actionTypes.CREATE_DOCTOR_SUCCESS
} )


export const saveDoctorFailed = () => ( {
    type: actionTypes.CREATE_DOCTOR_FAILED
} )





// get all doctor
export const fetchAllDoctorStart = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await getAllDoctor();
            if ( res && res.errCode === 0 )
            {
                dispatch( fetchAllDoctorSuccess( res.data.reverse() ) );
            }
            else
            {
                dispatch( fetchAllDoctorFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchAllDoctorFailed() );
            console.log( err );
        }
    }
}

export const fetchAllDoctorSuccess = ( inputData ) => ( {
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    doctors: inputData
} )

export const fetchAllDoctorFailed = () => ( {
    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
} )

// delete patient by id
export const deleteDoctor = ( userid ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await deletedDoctor( userid );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Delete user success!" );
                dispatch( deleteDoctorSuccess() );
                dispatch( fetchAllDoctorStart() );
            }
            else
            {
                toast.error( "Delete Admin error!" );
                dispatch( deleteDoctorFailed() );
            }
        }
        catch ( err )
        {
            toast.error( "Delete Admin error!" );
            dispatch( deleteDoctorFailed() );
            console.log( err );
        }
    }
}
export const deleteDoctorSuccess = () => ( {
    type: actionTypes.DELETE_DOCTOR_SUCCESS,
} )

export const deleteDoctorFailed = () => ( {
    type: actionTypes.DELETE_DOCTOR_FAILED
} )

// edit doctor
export const editDoctor = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await editDoctorService( data );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Update Admin success!" );
                dispatch( updateDoctorSuccess() );
                dispatch( fetchAllDoctorStart() );
            }
            else
            {
                toast.error( "Update Doctor error!" );
                dispatch( updateDoctorFailed() );
            }
        }
        catch ( err )
        {
            toast.error( "Update Doctor error!" );
            dispatch( updateDoctorFailed() );
            console.log( err );
        }
    }
}
export const updateDoctorSuccess = () => ( {
    type: actionTypes.EDIT_DOCTOR_SUCCESS,
} )

export const updateDoctorFailed = () => ( {
    type: actionTypes.EDIT_DOCTOR_FAILED
} )

// get information doctor
export const getRquiredDoctorInfor = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            dispatch( { type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START } );
            let resPrice = await getAllcodeService( "PRICE" );
            let resPayment = await getAllcodeService( "PAYMENT" );
            let resProvince = await getAllcodeService( "PROVINCE" );
            /* let resSpecialty = await getAllSpecialty();
            let resClinic = await getAllClinic(); */
            /* && resSpecialty && resSpecialty.errCode === 0 &&
                resClinic && resClinic.errCode === 0  */
            /* resSpecialty: resSpecialty.data,
                    resClinic: resClinic.data, */
            if ( resPrice && resPrice.errCode === 0 &&
                resPayment && resPayment.errCode === 0 &&
                resProvince && resProvince.errCode === 0 )
            {
                let data = {
                    resPrice: resPrice.data,
                    resPayment: resPayment.data,
                    resProvince: resProvince.data,
                }
                dispatch( fetchRequiredDoctorInforSuccess( data ) );
            }
            else
            {
                dispatch( fetchRequiredDoctorInforFailed() );
            }
        }
        catch ( err )
        {
            dispatch( fetchRequiredDoctorInforFailed() );
            console.log( err );
        }
    }
}


export const fetchRequiredDoctorInforSuccess = ( requiredData ) => ( {
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS,
    data: requiredData
} )

export const fetchRequiredDoctorInforFailed = () => ( {
    type: actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED,
} )
/// -------------------------------------------------------------------
export const fetchTopDoctorHome = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await getTopDoctorHomeService( "20" );
            if ( res && res.errCode === 0 )
            {
                dispatch( {
                    type: actionTypes.FETCH_TOP_DOCTOR_USERS_SUCCESS,
                    dataDoctors: res.data
                } );
            }
            else
            {
                dispatch( {
                    type: actionTypes.FETCH_TOP_DOCTOR_USERS_FAILED
                } );
            }
        }
        catch ( err )
        {
            console.log( err );
            dispatch( {
                type: actionTypes.FETCH_TOP_DOCTOR_USERS_FAILED
            } );
        }
    }
}



export const fetchAllDoctor = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await getAllDoctor();
            if ( res && res.errCode === 0 )
            {
                dispatch( {
                    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
                    dataAllDoctor: res.data
                } );
            }
            else
            {
                dispatch( {
                    type: actionTypes.FETCH_ALL_DOCTOR_FAILED
                } );
            }
        }
        catch ( err )
        {
            console.log( err );
            dispatch( {
                type: actionTypes.FETCH_ALL_DOCTOR_USERS_FAILED
            } );
        }
    }
}



export const saveInforDetailDoctor = ( data ) =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await saveDetailDoctor( data );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Save information doctor success!" );
                dispatch( {
                    type: actionTypes.SAVE_DOCTOR_INFOR_SUCCESS,
                } );
            }
            else
            {
                toast.error( "Save information doctor error!" );
                dispatch( {
                    type: actionTypes.SAVE_DOCTOR_INFOR_FAILED
                } );
            }
        }
        catch ( err )
        {
            console.log( err );
            toast.error( "Save information doctor success!" );
            dispatch( {
                type: actionTypes.SAVE_DOCTOR_INFOR_FAILED
            } );
        }
    }
}



export const fetchAllScheduleHour = () =>
{
    return async ( dispatch, getState ) =>
    {
        try
        {
            let res = await getAllcodeService( "TIME" );
            if ( res && res.errCode === 0 )
            {
                dispatch( {
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS,
                    dataTime: res.data
                } );
            }
            else
            {
                dispatch( {
                    type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
                } );
            }
        }
        catch ( err )
        {
            console.log( err );
            dispatch( {
                type: actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED
            } );
        }
    }
}




