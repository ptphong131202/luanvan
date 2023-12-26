import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; // fomat language
import { LANGUAGE, CRUD_ACTION, CommonUtils } from '../../../utils'; // vi or en
import * as action from "../../../store/actions";
import { changeLanguage } from '../../../store/actions'; // change language
import { connect } from 'react-redux';
import down from "../../../assets/down.png";
import "./UserRedux.scss"

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';



import TableUserManage from './TableUserManage';
class UserRedux extends Component
{
    // change language
    changeLanguage = ( language ) =>
    {
        // fire redux event: action
        this.props.changeLanguageApp( language ); // prop bettween redux and react
    }

    constructor ( props )
    {
        super( props );
        this.state = {
            genderArr: [],
            isOpen: false,
            email: '',
            password: '',
            fullName: '',
            birthday: '',
            phone: '',
            address: '',
            gender: '',
            role: '',
            action: '',
            userEditId: '',
        };
    }

    componentDidUpdate ( prevProps, prevState, snapshot ) // so sanh prop hiện tại và prop trước đó
    {
        // gender
        if ( prevProps.genderRedux !== this.props.genderRedux )
        {
            let arrGender = this.props.genderRedux;
            this.setState( {
                genderArr: arrGender,
                gender: arrGender[ 0 ].keyMap
            } )
        }





        if ( prevProps.userList !== this.props.userList )
        {
            let arrGender = this.props.genderRedux;
            this.setState( {
                email: '',
                password: '',
                fullName: '',
                birthday: '',
                phone: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[ 0 ].keyMap : '',
                action: CRUD_ACTION.CREATE,
            } )
        }
    }

    async componentDidMount ()
    {

        this.props.getGenderStart();
        this.props.createNewUser();
    }


    // preview image
    openPreviewImage = () =>
    {
        if ( !this.state.previewImg ) return;
        this.setState( {
            isOpen: true
        } )
    }

    // onclick save
    handlesaveUser = () =>
    {
        let isValid = this.checkValidateInput();
        if ( isValid === false ) return;
        let { action } = this.state;
        if ( action === CRUD_ACTION.CREATE )
        {
            // fire redux action
            this.props.createNewUser( {
                email: this.state.email,
                password: this.state.password,
                fullName: this.state.fullName,
                birthday: this.state.birthday,
                address: this.state.address,
                phone: this.state.phone,
                gender: this.state.gender,
                role: "R3",
            } )
        }
        if ( action === CRUD_ACTION.EDIT )
        {
            this.props.editAUser( {
                id: this.state.userEditId,
                email: this.state.email,
                fullName: this.state.fullName,
                birthday: this.state.birthday,
                address: this.state.address,
                phone: this.state.phone,
                gender: this.state.gender,
            } )
        }


    }

    // validate input
    checkValidateInput = () =>
    {
        let isValid = true;
        // check validate email
        let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        if ( !this.state.email )
        {
            alert( "Email address can't be blank!" );
            isValid = false;
        }
        else if ( this.state.email && reg.test( this.state.email ) == false )
        {
            alert( "Invalid Email address!" );
            isValid = false;
        }


        // check validate password
        else if ( !this.state.password )
        {
            alert( "Password can't be blank!" );
            isValid = false;
        }
        else if ( this.state.password && this.state.password.length < 8 )
        {
            alert( "Password must be greater than or equal to 8!" );
            isValid = false;
        }

        // check validate lastName 
        else if ( this.state.fullName && this.state.fullName.length < 1 )
        {
            alert( "FullName must be greater than or equal to 1!" );
            isValid = false;
        }

        // check validate firstName 
        else if ( this.state.birthday && this.state.birthday.length < 1 )
        {
            alert( "birthday must be greater than or equal to 1!" );
            isValid = false;
        }

        // check validate phonenumber 
        else if ( this.state.phone && this.state.phone.length < 10 )
        {
            alert( "phone must be greater than or equal to 10!" );
            isValid = false;
        }

        // check validate gender
        else if ( !this.state.gender )
        {
            alert( "Gender can't be blank!" );
            isValid = false;
        }

        return isValid;
    }
    onChangeInput = ( event, id ) =>
    {
        let copystate = { ...this.state }
        copystate[ id ] = event.target.value;
        this.setState( {
            ...copystate
        } )
    }

    // handle edit user
    handleEditUserFromParent = ( user ) =>
    {
        /* let imageBase64 = '';
        if ( user.image )
        {
            imageBase64 = new Buffer( user.image, 'base64' ).toString( 'binary' );
        } */
        this.setState( {
            email: user.email,
            password: 'hashcode',
            fullName: user.fullName,
            birthday: user.birthday,
            phone: user.phone,
            address: user.address,
            gender: user.gender,
            action: CRUD_ACTION.EDIT,
            userEditId: user.id,
        } )
    }

    render ()
    {
        let genders = this.state.genderArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let { email, password, fullName, birthday, phone, gender, address, role } = this.state;
        return (
            <>
                <head>
                    <title>Quản lý người dùng Redux</title>
                </head>
                <div className="user-redux-container">
                    <div className="title user-redux-name" ><FormattedMessage id="manage-user.manage-patient" /></div>
                    <div className="user-redux-body">
                        <div className='container'>
                            <div className='col-8 mx-auto container-form'>
                                <div className='header-name-adduser'>
                                    { this.state.action === CRUD_ACTION.EDIT ? <FormattedMessage id="manage-user.edituser" /> : <FormattedMessage id="manage-user.adduser" /> }


                                </div>
                                <div>{ isLoadingGender === true ? "Loading Gender" : "" }</div>
                                <form className='row'>
                                    <div className="form-group pt-2 col-6">
                                        <label htmlFor="email">Email</label>
                                        <input type="email"
                                            className="form-control"
                                            id="email" placeholder="Email"
                                            value={ email }
                                            onChange={ ( event ) => { this.onChangeInput( event, "email" ) } } />
                                    </div>
                                    { this.state.action === CRUD_ACTION.EDIT ?
                                        <div className="form-group pt-2 col-6">
                                            <label htmlFor="password"><FormattedMessage id="manage-user.password" /></label>
                                            <input type="password"
                                                className="form-control"
                                                id="password" placeholder="Password"
                                                value={ password } disabled
                                                onChange={ ( event ) => { this.onChangeInput( event, "password" ) } } />
                                        </div> :
                                        <div className="form-group pt-2 col-6">
                                            <label htmlFor="password"><FormattedMessage id="manage-user.password" /></label>
                                            <input type="password"
                                                className="form-control"
                                                id="password" placeholder="Password"
                                                value={ password }
                                                onChange={ ( event ) => { this.onChangeInput( event, "password" ) } } />
                                        </div>
                                    }



                                    <div className="form-group pt-2 col-4">
                                        <label htmlFor="fullname"><FormattedMessage id="manage-user.fullname" /></label>
                                        <input type="text"
                                            className="form-control"
                                            id="fullname"
                                            placeholder="Họ tên đệm"
                                            value={ fullName }
                                            onChange={ ( event ) => { this.onChangeInput( event, "fullName" ) } } />
                                    </div>
                                    <div className="form-group pt-2 col-4">
                                        <label htmlFor="birthday"><FormattedMessage id="manage-user.birthday" /></label>
                                        <input type="text"
                                            className="form-control"
                                            id="birthday" placeholder="Ngày sinh"
                                            value={ birthday }
                                            onChange={ ( event ) => { this.onChangeInput( event, "birthday" ) } }
                                        />
                                    </div>

                                    <div className="form-group pt-2 col-4 down-main">
                                        <label ><FormattedMessage id="manage-user.gender-name" /></label>
                                        <img src={ down } />
                                        <select id="inputState" className="form-control"
                                            onChange={ ( event ) => { this.onChangeInput( event, "gender" ) } }>
                                            { genders && genders.length > 0 && genders.map( ( item, index ) =>
                                            {
                                                return (
                                                    <option key={ index } value={ item.keyMap }>{ language === LANGUAGE.VI ? item.valueVi : item.valueEn }</option>
                                                )
                                            } ) }
                                        </select>
                                    </div>
                                    <div className="form-group pt-2 col-3">
                                        <label htmlFor="phone"><FormattedMessage id="manage-user.phone" /></label>
                                        <input type="tel"
                                            className="form-control"
                                            id="phone" placeholder="số điện thoại"
                                            value={ phone }
                                            onChange={ ( event ) => { this.onChangeInput( event, "phone" ) } }
                                        />
                                    </div>
                                    <div className="form-group pt-2 col-9">
                                        <label htmlFor="address"><FormattedMessage id="manage-user.address" /></label>
                                        <input type="text"
                                            className="form-control"
                                            id="address" placeholder="Địa chỉ"
                                            value={ address }
                                            onChange={ ( event ) => { this.onChangeInput( event, "address" ) } } />
                                    </div>

                                    <p className='text-center pt-3'>
                                        <button type="button" className={ this.state.action === CRUD_ACTION.EDIT ? "btn btn-warning" : "btn btn-primary" }
                                            onClick={ () => this.handlesaveUser() }
                                        >
                                            { this.state.action === CRUD_ACTION.EDIT ? <FormattedMessage id="manage-user.edit" /> : <FormattedMessage id="manage-user.add" /> }

                                        </button>
                                    </p>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className='tablemanage'>
                        <TableUserManage
                            handleEditUserFromParent={ this.handleEditUserFromParent }
                            action={ this.state.action }
                        />
                    </div>
                    { this.state.isOpen === true && <Lightbox
                        mainSrc={ this.state.previewImg }
                        onCloseRequest={ () => this.setState( { isOpen: false } ) }
                    /> }

                </div>
            </>
        )
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        genderRedux: state.admin.genders,
        positionRedux: state.admin.position,
        roleRedux: state.admin.roles,
        isLoadingGender: state.admin.isloadingGender,
        userList: state.admin.users,
        user: state.admin.users

    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        getGenderStart: () => dispatch( action.fetchGenderStart() ),
        createNewUser: ( data ) => dispatch( action.createNewUser( data ) ),
        editAUser: ( data ) => dispatch( action.editAUser( data ) ),
        /* processLogout: () => dispatch( actions.processLogout() ),*/
        changeLanguageApp: ( language ) => dispatch( action.changeLanguage( language ) ) // truyền action 
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( UserRedux );
