import actionTypes from '../actions/actionTypes';

const initialState = {
    isloadingGender: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    admins: [],
    doctors: [],
    topDoctors: [],
    allDoctor: [],
    allScheduleTime: [],
    allRequiredDoctorInfor: []
}

const adminReducer = ( state = initialState, action ) =>
{
    switch ( action.type )
    {
        case actionTypes.FETCH_GENDER_START:
            let copystate = { ...state };
            copystate.isloadingGender = true;
            return {
                ...copystate,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isloadingGender = false;
            state.genders = action.data;

            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAILED:
            state.isloadingGender = false;
            state.genders = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_EMAIL_START:
            state.isloadingGender = true;
            return {
                ...state,
            }
        case actionTypes.FETCH_EMAIL_SUCCESS:
            state.isloadingGender = false;
            state.emails = action.data;

            return {
                ...state,
            }
        case actionTypes.FETCH_EMAIL_FAILED:
            state.isloadingGender = false;
            state.emails = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_START:
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS:
            state.allRequiredDoctorInfor = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_REQUIRED_DOCTOR_INFOR_FAILED:
            state.allRequiredDoctorInfor = [];
            return {
                ...state,
            }



        case actionTypes.FETCH_POSITION_SUCCESS:
            state.position = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAILED:
            state.position = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAILED:
            state.roles = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.users;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAILED:
            state.users = [];
            return {
                ...state,
            }


        case actionTypes.FETCH_ALL_ADMIN_SUCCESS:
            state.admins = action.admins;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_ADMIN_FAILED:
            state.admins = [];
            return {
                ...state,
            }


        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.doctors = action.doctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAILED:
            state.doctors = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_TOP_DOCTOR_USERS_SUCCESS:
            state.topDoctors = action.dataDoctors;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTOR_USERS_FAILED:
            state.topDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_USERS_SUCCESS:
            state.allDoctor = action.dataAllDoctor;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTOR_USERS_FAILED:
            state.allDoctor = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS:
            state.allScheduleTime = action.dataTime;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALLCODE_SCHEDULE_TIME_FAILED:
            state.allScheduleTime = [];
            return {
                ...state,
            }

        default:
            return state;
    }
}

export default adminReducer;