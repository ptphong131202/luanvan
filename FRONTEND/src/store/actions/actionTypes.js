const actionTypes = Object.freeze( {
    //app
    APP_START_UP_COMPLETE: 'APP_START_UP_COMPLETE',
    SET_CONTENT_OF_CONFIRM_MODAL: 'SET_CONTENT_OF_CONFIRM_MODAL',
    CHANGE_LANGUAGE: 'CHANGE_LANGUAGE', /// Action type change language

    //user
    ADD_USER_SUCCESS: 'ADD_USER_SUCCESS',
    USER_LOGIN_SUCCESS: 'USER_LOGIN_SUCCESS',
    USER_LOGIN_FAIL: 'USER_LOGIN_FAIL',
    PROCESS_LOGOUT: 'PROCESS_LOGOUT',

    // admin
    FETCH_EMAIL_START: 'FETCH_EMAIL_START',
    FETCH_EMAIL_SUCCESS: "FETCH_EMAIL_SUCCESS",
    FETCH_EMAIL_FAILED: "FETCH_EMAIL_FAILED",

    FETCH_GENDER_START: 'FETCH_GENDER_START',
    FETCH_GENDER_SUCCESS: "FETCH_GENDER_SUCCESS",
    FETCH_GENDER_FAILED: "FETCH_GENDER_FAILED",

    FETCH_POSITION_START: 'FETCH_POSITION_START',
    FETCH_POSITION_SUCCESS: "FETCH_POSITION_SUCCESS",
    FETCH_POSITION_FAILED: "FETCH_POSITION_FAILED",

    FETCH_ROLE_START: 'FETCH_ROLE_START',
    FETCH_ROLE_SUCCESS: "FETCH_ROLE_SUCCESS",
    FETCH_ROLE_FAILED: "FETCH_ROLE_FAILED",

    /// -------------------------- patient ----------------------------------------------------------

    //  SAVE USER
    CREATE_USER_SUCCESS: "CREATE_USER_SUCCESS", // create a new patient successfully
    CREATE_USER_FAILED: "CREATE_USER_FAILED", // create a new patient failed
    // patient 
    FETCH_ALL_USERS_SUCCESS: "FETCH_ALL_USERS_SUCCESS", // get all admin successfully
    FETCH_ALL_USERS_FAILED: "FETCH_ALL_USERS_FAILED", // get all admin failed
    // delete 
    DELETE_USER_SUCCESS: "DELETE_USER_SUCCESS", // delete admin successfully
    DELETE_USER_FAILED: "DELETE_USER_FAILED", // delete admin failed
    // edit user
    EDIT_USER_SUCCESS: "EDIT_USER_SUCCESS",
    EDIT_USER_FAILED: "EDIT_USER_FAILED",

    // --------------------------------- admin ------------------------------------------------------
    // create admin
    CREATE_ADMIN_SUCCESS: "CREATE_ADMIN_SUCCESS", // create a new admin successfully
    CREATE_ADMIN_FAILED: "CREATE_ADMIN_FAILED", // create a new admin failed
    // get admin 
    FETCH_ALL_ADMIN_SUCCESS: "FETCH_ALL_ADMIN_SUCCESS", // get all patient successfully
    FETCH_ALL_ADMIN_FAILED: "FETCH_ALL_ADMIN_FAILED", // get all patient failed
    // delete 
    DELETE_ADMIN_SUCCESS: "DELETE_ADMIN_SUCCESS", // delete patient successfully
    DELETE_ADMIN_FAILED: "DELETE_ADMIN_FAILED", // delete patient failed
    // edit 
    EDIT_ADMIN_SUCCESS: "EDIT_ADMIN_SUCCESS",
    EDIT_ADMIN_FAILED: "EDIT_ADMIN_FAILED",

    // --------------------------------- Doctor ------------------------------------------------------
    // create 
    CREATE_DOCTOR_SUCCESS: "CREATE_DOCTOR_SUCCESS", // create a new admin successfully
    CREATE_DOCTOR_FAILED: "CREATE_DOCTOR_FAILED", // create a new admin failed
    // get admin 
    FETCH_ALL_DOCTOR_SUCCESS: "FETCH_ALL_DOCTOR_SUCCESS", // get all doctor successfully
    FETCH_ALL_DOCTOR_FAILED: "FETCH_ALL_DOCTOR_FAILED", // get all doctor failed

    // edit 
    EDIT_DOCTOR_SUCCESS: "EDIT_DOCTOR_SUCCESS",
    EDIT_DOCTOR_FAILED: "EDIT_DOCTOR_FAILED",
    // delete 
    DELETE_DOCTOR_SUCCESS: "DELETE_DOCTOR_SUCCESS", // delete patient successfully
    DELETE_DOCTOR_FAILED: "DELETE_DOCTOR_FAILED", // delete patient failed

    // get detail doctor
    FETCH_REQUIRED_DOCTOR_INFOR_FAILED: "FETCH_REQUIRED_DOCTOR_INFOR_FAILED",
    FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS: "FETCH_REQUIRED_DOCTOR_INFOR_SUCCESS",
    FETCH_REQUIRED_DOCTOR_INFOR_START: "FETCH_REQUIRED_DOCTOR_INFOR_START",

    // ---------------------------------  ------------------------------------------------------

    //top doctor
    FETCH_TOP_DOCTOR_USERS_SUCCESS: "FETCH_TOP_DOCTOR_USERS_SUCCESS",
    FETCH_TOP_DOCTOR_USERS_FAILED: "FETCH_TOP_DOCTOR_USERS_FAILED",

    //all doctor
    FETCH_ALL_DOCTOR_USERS_SUCCESS: "FETCH_ALL_DOCTOR_USERS_SUCCESS",
    FETCH_ALL_DOCTOR_USERS_FAILED: "FETCH_ALL_DOCTOR_USERS_FAILED",

    //save doctor
    SAVE_DOCTOR_INFOR_SUCCESS: "SAVE_DOCTOR_INFOR_SUCCESS",
    SAVE_DOCTOR_INFOR_FAILED: "SAVE_DOCTOR_INFOR_FAILED",

    //all doctor
    FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS: "FETCH_ALLCODE_SCHEDULE_TIME_SUCCESS",
    FETCH_ALLCODE_SCHEDULE_TIME_FAILED: "FETCH_ALLCODE_SCHEDULE_TIME_FAILED",


} )

export default actionTypes;