import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl'; // fomat language
import { LANGUAGE, CRUD_ACTION, CommonUtils } from '../../../utils'; // vi or en
import * as action from "../../../store/actions";
import { changeLanguage } from '../../../store/actions'; // change language
import { connect } from 'react-redux';
import down from "../../../assets/down.png";
/* import "./DoctorRedux.scss" */

import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';

import TableDoctor from './TableDoctor';

class DoctorRedux extends Component
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
            positionArr: [],
            previewImg: "",
            isOpen: false,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phone: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            avatar: '',
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

        // position 
        if ( prevProps.positionRedux !== this.props.positionRedux )
        {
            let arrPosition = this.props.positionRedux;
            this.setState( {
                positionArr: arrPosition,
                position: arrPosition[ 0 ].keyMap
            } )
        }


        if ( prevProps.userList !== this.props.userList )
        {
            let arrGender = this.props.genderRedux;
            let arrPosition = this.props.positionRedux;
            this.setState( {
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phone: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[ 0 ].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[ 0 ].keyMap : "",
                avatar: '',
                action: "CREATE",
                previewImg: ''

            } )
        }
    }

    async componentDidMount ()
    {

        this.props.getGenderStart();
        this.props.getPositionStart();
        this.props.createNewDoctors();
    }

    // event in img for input file 
    handleOnchangeImg = async ( event ) =>
    {
        let file = event.target.files[ 0 ];
        if ( file )
        {
            let getBase64 = await CommonUtils.getBase64( file );
            let objectUrl = URL.createObjectURL( file );
            this.setState( {
                previewImg: objectUrl,
                avatar: getBase64
            } )
        }
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
        console.log( "check state", this.state.action );
        let isValid = this.checkValidateInput();
        if ( isValid === false ) return;
        let { action } = this.state;
        if ( action === CRUD_ACTION.CREATE )
        {
            // fire redux action
            this.props.createNewDoctors( {
                email: this.state.email,
                password: this.state.password,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phone: this.state.phone,
                gender: this.state.gender,
                role: "R2",
                position: this.state.position,
                image: this.state.avatar
            } )
        }
        if ( action === CRUD_ACTION.EDIT )
        {
            this.props.editDoctor( {
                id: this.state.userEditId,
                email: this.state.email,
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                address: this.state.address,
                phone: this.state.phone,
                gender: this.state.gender,
                position: this.state.position,
                image: this.state.avatar
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
        else if ( this.state.lastName && this.state.lastName.length < 1 )
        {
            alert( "lastName must be greater than or equal to 1!" );
            isValid = false;
        }

        // check validate firstName 
        else if ( this.state.firstName && this.state.firstName.length < 1 )
        {
            alert( "firstName must be greater than or equal to 1!" );
            isValid = false;
        }

        // check validate phone 
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

        // check validate position
        else if ( !this.state.position )
        {
            alert( "Position can't be blank!" );
            isValid = false;
        }

        // check validate avatar
        else if ( !this.state.avatar )
        {
            alert( "Avatar can't be blank!" );
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
        console.log( "Check user from form children: ", user )
        let imageBase64 = '';
        if ( user.image )
        {
            imageBase64 = new Buffer( user.image, 'base64' ).toString( 'binary' );
        }
        this.setState( {
            email: user.email,
            password: 'hashcode',
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
            address: user.address,
            gender: user.gender,
            position: user.position,
            role: user.role,
            avatar: user.image,
            action: CRUD_ACTION.EDIT,
            userEditId: user.id,
            previewImg: imageBase64
        } )
    }

    render ()
    {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let language = this.props.language;
        let isLoadingGender = this.props.isLoadingGender;
        let { email, password, lastName, firstName, phone, gender, address, position, avatar } = this.state;
        console.log( "action: ", this.state )
        return (
            <>
                <head>
                    <title>Quản lý người dùng Redux</title>
                </head>
                <div className="user-redux-container">
                    <div className="title user-redux-name" ><FormattedMessage id="manage-user.manage-doctor" /></div>

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



                                    <div className="form-group pt-2 col-6">
                                        <label htmlFor="firstname"><FormattedMessage id="manage-user.firstname" /></label>
                                        <input type="text"
                                            className="form-control"
                                            id="firstname"
                                            placeholder="Họ tên đệm"
                                            value={ firstName }
                                            onChange={ ( event ) => { this.onChangeInput( event, "firstName" ) } } />
                                    </div>
                                    <div className="form-group pt-2 col-6">
                                        <label htmlFor="lastname"><FormattedMessage id="manage-user.lastname" /></label>
                                        <input type="text"
                                            className="form-control"
                                            id="lastname" placeholder="Tên"
                                            value={ lastName }
                                            onChange={ ( event ) => { this.onChangeInput( event, "lastName" ) } }
                                        />
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
                                    <div className="form-group pt-2 col-4 down-main">
                                        <label ><FormattedMessage id="manage-user.position" /></label>
                                        <img src={ down } />
                                        <select id="inputState" className="form-control"
                                            onChange={ ( event ) => { this.onChangeInput( event, "position" ) } }>
                                            { positions && positions.length > 0 && positions.map( ( item, index ) =>
                                            {
                                                return (
                                                    <option key={ index } value={ item.keyMap }>{ language === LANGUAGE.VI ? item.valueVi : item.valueEn }</option>
                                                )
                                            } ) }
                                        </select>
                                    </div>

                                    <div className="form-group pt-2 col-4">
                                        <label ><FormattedMessage id="manage-user.image" /></label>
                                        <div className='preview-img-container'>
                                            <input type="file" className="form-control" id="reviewImg" hidden
                                                onChange={ ( event ) => this.handleOnchangeImg( event ) } />
                                            <label className='label_upload-img' htmlFor='reviewImg'>Tải ảnh <i className='fas fa-upload'></i></label>
                                            <div className='reviewImage'
                                                style={ { backgroundImage: `url(${ this.state.previewImg })` } }
                                                onClick={ () => this.openPreviewImage() }></div>
                                        </div>
                                    </div>

                                    <p className='text-center pt-2'>
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
                    <TableDoctor
                        handleEditUserFromParent={ this.handleEditUserFromParent }
                        action={ this.state.action }
                    />
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
        userList: state.admin.doctors,

    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        getGenderStart: () => dispatch( action.fetchGenderStart() ),
        getPositionStart: () => dispatch( action.fetchPositionStart() ),
        createNewDoctors: ( data ) => dispatch( action.createNewDoctors( data ) ),
        editDoctor: ( data ) => dispatch( action.editDoctor( data ) ),
        /* processLogout: () => dispatch( actions.processLogout() ),*/
        changeLanguageApp: ( language ) => dispatch( action.changeLanguage( language ) ) // truyền action 
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( DoctorRedux );