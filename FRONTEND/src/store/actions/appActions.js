import actionTypes from './actionTypes';

export const appStartUpComplete = () => ( {
    type: actionTypes.APP_START_UP_COMPLETE
} );

export const setContentOfConfirmModal = ( contentOfConfirmModal ) => ( {
    type: actionTypes.SET_CONTENT_OF_CONFIRM_MODAL,
    contentOfConfirmModal: contentOfConfirmModal
} );

// change language
export const changeLanguage = ( language ) => ( {
    type: actionTypes.CHANGE_LANGUAGE, // action changes language
    language: language // data truyền đi language
} );