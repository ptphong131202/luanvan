import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as action from "../../../store/actions";
import { LANGUAGE, CRUD_ACTION, CommonUtils } from '../../../utils'; // vi or en
import { changeLanguage } from '../../../store/actions'; // change language

import Select from 'react-select';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import "./ManageDoctor.scss"
import { getDetailInforDoctor } from '../../../services/userService';
const mdParser = new MarkdownIt(/* Markdown-it options */ );



class ManageDoctor extends Component
{
    // constructor
    constructor ( props )
    {
        super();
        this.state = {
            doctorMarkdonw: '',
            descMarkdonw: '',
            doctorHTML: '',
            descHTML: '',
            selectedDoctor: '',
            discription: '',
            hasOldData: false,
            action: '',

            listDoctor: [],
            listPrice: [],
            listProvince: [],
            listPayment: [],
            listClinic: [],
            listSpecialty: [],

            selectedPrice: '',
            selectedProvince: '',
            selectedPayment: '',
            selectedClinic: '',
            selectedSpecialty: '',
            nameClicnic: '',
            addressclicnic: '',
            note: '',
            clinicId: '',
            specialtyId: '',
            fullName: '',

        }
    }




    async componentDidMount ()
    {
        this.props.getRquiredDoctorInfor();
        this.props.fetchAllDoctorStart();
        let id = +this.getid( this.props.location.search );
        let res = await this.handleChangeSelect( id );

    }


    getbuildInputSelect = () =>
    {
        let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
        console.log( "check state: kfgwufuwfguwe", this.props.allRequiredDoctorInfor );
        let dataSelect = this.buildInputSelect( this.props.allDoctorRedux, "USERS" );
        let dataSelectPrice = this.buildInputSelect( resPrice, "PRICE" );
        let dataSelectPayment = this.buildInputSelect( resPayment, "PAYMENT" );
        let dataSelectProvince = this.buildInputSelect( resProvince, "PROVINCE" );
        let dataSelectSpecialty = this.buildInputSelect( resSpecialty, "SPECIALTY" );
        let dataSelectClinic = this.buildInputSelect( resClinic, "CLINIC" );
        this.setState( {
            listDoctor: dataSelect,
            listPrice: dataSelectPrice,
            listPayment: dataSelectPayment,
            listProvince: dataSelectProvince,
            listSpecialty: dataSelectSpecialty,
            listClinic: dataSelectClinic,
        } )

    }

    getid = ( chuoi ) =>
    {
        var viTriDauBang = chuoi.indexOf( '=' );

        // Lấy phần sau dấu '=' là số
        var so = chuoi.substring( viTriDauBang + 1 );
        return so;
    }



    buildInputSelect = ( data, type ) =>
    {
        let result = [];
        let { language } = this.props;
        if ( data && data.length > 0 )
        {
            if ( type === "USERS" )
            {
                data.map( ( item, index ) =>
                {
                    let object = {};
                    let labelEn = `${ item.lastName } ${ item.firstName }`;
                    let labelVi = `${ item.firstName } ${ item.lastName }`;
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    object.value = item.id;
                    result.push( object )
                } )
            }
            if ( type === "PRICE" )
            {
                data.map( ( item, index ) =>
                {
                    let object = {};
                    let labelEn = `${ item.valueEn }`;
                    let labelVi = `${ item.valueVi }`;
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push( object )
                } )
            }
            if ( type === "PAYMENT" || type === "PROVINCE" )
            {
                data.map( ( item, index ) =>
                {
                    let object = {};
                    let labelEn = `${ item.valueEn }`;
                    let labelVi = `${ item.valueVi }`;
                    object.label = language === LANGUAGE.VI ? labelVi : labelEn;
                    object.value = item.keyMap;
                    result.push( object )
                } )
            }

            if ( type === "SPECIALTY" || type === "CLINIC" )
            {
                data.map( ( item, index ) =>
                {
                    let object = {};
                    object.label = item.name;
                    object.value = item.id;
                    result.push( object )
                } )
            }

        }
        return result;
    }



    async componentDidUpdate ( prevProps, prevState )
    {
        if ( prevProps.language !== this.props.language )
        {
            this.getbuildInputSelect();
            let id = +this.getid( this.props.location.search );
            await this.handleChangeSelect( id );

        }
        if ( prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor )
        {
            this.getbuildInputSelect();
            let id = +this.getid( this.props.location.search );
            await this.handleChangeSelect( id );
        }
    }


    handleEditorChangedesc = ( { html, text } ) =>
    {
        this.setState( {
            descMarkdonw: text,
            descHTML: html,
        } )
    }

    handleEditorChange = ( { html, text } ) =>
    {
        this.setState( {
            doctorMarkdonw: text,
            doctorHTML: html,
        } )
    }

    handleSaveContentMarkdown = async () =>
    {
        let { hasOldData } = this.state;
        console.log( "check  stateaaaaa: ", this.state );
        let id = +this.getid( this.props.location.search );
        let res = await this.props.saveInforDetailDoctor( {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            descHTML: this.state.descHTML,
            descMarkdonw: this.state.descMarkdonw,
            doctorHTML: this.state.doctorHTML,
            doctorMarkdonw: this.state.doctorMarkdonw,
            doctorId: id,
            action: hasOldData === true ? CRUD_ACTION.EDIT : CRUD_ACTION.CREATE,
            selectedPrice: this.state.selectedPrice.value,
            selectedProvince: this.state.selectedPayment.value,
            selectedPayment: this.state.selectedProvince.value,
            nameClicnic: this.state.nameClicnic,
            addressclicnic: this.state.addressclicnic,
            note: this.state.note,
            /* clinicId: this.state.selectedClinic.value,
            specialtyId: this.state.selectedSpecialty.value, */

        } )
        if ( res && res.errCode == 0 )
        {
            let id = +this.getid( this.props.location.search );
            await this.handleChangeSelect( id );
        }
    }

    handleChangeSelect = async ( selectedDoctor ) =>
    {
        let { resPrice, resPayment, resProvince, resSpecialty, resClinic } = this.props.allRequiredDoctorInfor;
        console.log( "check state: kfgwufuwfguwe", this.props.allRequiredDoctorInfor );
        let dataSelectPrice = this.buildInputSelect( resPrice, "PRICE" );
        let dataSelectPayment = this.buildInputSelect( resPayment, "PAYMENT" );
        let dataSelectProvince = this.buildInputSelect( resProvince, "PROVINCE" );
        let dataSelectSpecialty = this.buildInputSelect( resSpecialty, "SPECIALTY" );
        let dataSelectClinic = this.buildInputSelect( resClinic, "CLINIC" );
        let res = await getDetailInforDoctor( selectedDoctor );
        if ( res && res.data && res.data.Doctor_infor )
        {
            let addressclicnic = '', nameClicnic = '',
                note = '', paymentId = '', priceId = '',
                provinceId = '', selectedPrice = '', selectedPayment = '',
                selectedClinic = '', clinicId = '',
                selectedProvince = '', specialtyId = '', selectedSpecialty = '';
            if ( res.data.Doctor_infor )
            {
                addressclicnic = res.data.Doctor_infor.addressClinic;
                nameClicnic = res.data.Doctor_infor.nameClinic;
                note = res.data.Doctor_infor.note;
                paymentId = res.data.Doctor_infor.paymentId;
                priceId = res.data.Doctor_infor.priceId;
                provinceId = res.data.Doctor_infor.provinceId;
                specialtyId = res.data.Doctor_infor.specialtyId;
                clinicId = res.data.Doctor_infor.clinicId;

                selectedPrice = dataSelectPrice.find( item =>
                {
                    return item && item.value === priceId
                } )

                selectedPayment = dataSelectPayment.find( item =>
                {
                    return item && item.value === paymentId
                } )

                selectedProvince = dataSelectProvince.find( item =>
                {
                    return item && item.value === provinceId
                } )
                selectedSpecialty = dataSelectSpecialty.find( item =>
                {
                    return item && +item.value === +specialtyId
                } )

                selectedClinic = dataSelectClinic.find( item =>
                {
                    return item && +item.value === + clinicId
                } )

            }

            this.setState( {
                firstName: res.data.firstName,
                lastName: res.data.lastName,
                doctorHTML: res.data.Doctor_infor.doctorHTML,
                doctorMarkdonw: res.data.Doctor_infor.doctorMarkdonw,
                descMarkdonw: res.data.Doctor_infor.descMarkdonw,
                descHTML: res.data.Doctor_infor.descHTML,
                hasOldData: true,
                nameClicnic: nameClicnic,
                note: note,
                addressclicnic: addressclicnic,
                selectedPrice: selectedPrice,
                selectedPayment: selectedPayment,
                selectedProvince: selectedProvince,
                selectedSpecialty: selectedSpecialty,
                selectedClinic: selectedClinic
            } )
        }
        else
        {
            this.setState( {
                doctorHTML: "",
                doctorMarkdonw: "",
                descMarkdonw: "",
                descHTML: "",
                hasOldData: false,
                selectedPrice: '',
                selectedProvince: '',
                selectedPayment: '',
                nameClicnic: '',
                addressclicnic: '',
                selectedSpecialty: '',
                note: '',
                selectedClinic: '',
            } )
        }
    };


    handleChangeSelectDoctorInfor = async ( selectedDoctor, name ) =>
    {
        let stateName = name.name;
        let stateCopy = { ...this.state };
        stateCopy[ stateName ] = selectedDoctor;
        this.setState( stateCopy );
    }

    handleOnchangeDescription = ( event, id ) =>
    {
        let stateCopy = { ...this.state };
        stateCopy[ id ] = event.target.value;
        this.setState( {
            ...stateCopy
        } )
    }

    render ()
    {
        let { language } = this.props;
        console.log( "Check state: ", this.state.selectedPrice )
        return (
            < React.Fragment >
                <head>
                    <title>Quản lý bác sĩ</title>
                </head>
                <div className='container manage-doctor ' >
                    <h3 className='text-center text-primary pt-5 pb-3 fw-bold mt-3'><FormattedMessage id="admin.manage-doctor.title" /></h3>
                    <div className='more-infor'>

                        {/* name */ }
                        <div className='control-left form-group'>
                            <label className='d-block'><FormattedMessage id="admin.manage-doctor.doctor" />  </label>
                            { language === LANGUAGE.VI ?
                                <div className='d-flex justify-content-between'>
                                    <input type='text' name="name" onChange={ ( event ) => this.handleOnchangeDescription( event, "firstName" ) } value={ this.state.firstName } className='form-controll col-6' />
                                    <input type='text' name="name" onChange={ ( event ) => this.handleOnchangeDescription( event, "lastName" ) } value={ this.state.lastName } className='form-controll col-6' />
                                </div> :
                                <div className='d-flex justify-content-between mx-1'>

                                    <input type='text' name="name" onChange={ ( event ) => this.handleOnchangeDescription( event, "lastName" ) } value={ this.state.lastName } className='form-controll col-6' />
                                    <input type='text' name="name" onChange={ ( event ) => this.handleOnchangeDescription( event, "firstName" ) } value={ this.state.firstName } className='form-controll col-6' />
                                </div>
                            }
                        </div>

                        {/**top infor */ }
                        <div className='control-right form-group'>
                            <label><FormattedMessage id="admin.manage-doctor.intro" /></label>
                            <MdEditor
                                style={ { height: '150px' } }
                                renderHTML={ text => mdParser.render( text ) }
                                onChange={ this.handleEditorChangedesc }
                                value={ this.state.descMarkdonw }
                            />
                        </div>
                    </div>


                    <div className='more-infor-extra mt-3'>
                        <div className='row'>
                            <div className='col-4 form-group  '>
                                <label><FormattedMessage id="admin.manage-doctor.choose-price" /></label>
                                <Select
                                    options={ this.state.listPrice }
                                    value={ this.state.selectedPrice }
                                    onChange={ this.handleChangeSelectDoctorInfor }
                                    placeholder={ <FormattedMessage id="admin.manage-doctor.choose-price" /> }
                                    name="selectedPrice"
                                />
                            </div>
                            <div className='col-4 form-group   '>
                                <label><FormattedMessage id="admin.manage-doctor.choose-payment" /></label>
                                <Select
                                    options={ this.state.listPayment }
                                    value={ this.state.selectedPayment }
                                    onChange={ this.handleChangeSelectDoctorInfor }
                                    placeholder={ <FormattedMessage id="admin.manage-doctor.choose-payment" /> }
                                    name="selectedPayment"
                                />
                            </div>
                            <div className='col-4 form-group   '>
                                <label><FormattedMessage id="admin.manage-doctor.choose-province" /></label>
                                <Select
                                    options={ this.state.listProvince }
                                    value={ this.state.selectedProvince }
                                    onChange={ this.handleChangeSelectDoctorInfor }
                                    placeholder={ <FormattedMessage id="admin.manage-doctor.choose-province" /> }
                                    name="selectedProvince"
                                />
                            </div>
                        </div>
                    </div>
                    <div className='row '>
                        <div className='col-8 '>
                            <div className='row'>
                                <div className='col-6 mt-2  form-group '>
                                    <label><FormattedMessage id="admin.manage-doctor.name-clinic" /> </label>
                                    <input className='form-control'
                                        onChange={ ( event ) => this.handleOnchangeDescription( event, "nameClicnic" ) }
                                        value={ this.state.nameClicnic }
                                    />
                                </div>
                                <div className='col-6 mt-2  form-group '>
                                    <label><FormattedMessage id="admin.manage-doctor.address-clinic" /></label>
                                    <input className='form-control'
                                        onChange={ ( event ) => this.handleOnchangeDescription( event, "addressclicnic" ) }
                                        value={ this.state.addressclicnic } />
                                </div>


                                <div className='col-6 mt-2 form-group   '>
                                    <label>Tên Chuyên khoa</label>
                                    <Select
                                        options={ this.state.listSpecialty }
                                        value={ this.state.selectedSpecialty }
                                        onChange={ this.handleChangeSelectDoctorInfor }
                                        name="selectedSpecialty"
                                    />
                                </div>
                                <div className='col-6 mt-2 form-group   '>
                                    <label>Cơ sở y tế </label>
                                    <Select
                                        options={ this.state.listClinic }
                                        value={ this.state.selectedClinic }
                                        onChange={ this.handleChangeSelectDoctorInfor }
                                        name="selectedClinic"
                                    />
                                </div>
                            </div>
                        </div>


                        <div className='col-4 mt-2 form-group '>
                            <label>Note</label>
                            <textarea
                                className='form-control'
                                onChange={ ( event ) => this.handleOnchangeDescription( event, "note" ) }
                                value={ this.state.note }
                                rows={ 4 }
                            >
                            </textarea>
                        </div>
                    </div>
                    <div className="markdown mt-3">
                        <MdEditor
                            style={ { height: '250px' } }
                            renderHTML={ text => mdParser.render( text ) }
                            onChange={ this.handleEditorChange }
                            value={ this.state.doctorMarkdonw }
                        />
                    </div>

                    <p className='text-center py-3'>
                        <button
                            className={ this.state.hasOldData === true ? 'save-content-doctor' : 'create-content-doctor' }
                            onClick={ () => this.handleSaveContentMarkdown() }
                        ><FormattedMessage id="admin.manage-doctor.save" /></button>
                    </p>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
        allDoctorRedux: state.admin.doctors,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        getRquiredDoctorInfor: () => dispatch( action.getRquiredDoctorInfor() ),
        fetchAllDoctorStart: () => dispatch( action.fetchAllDoctorStart() ),
        saveInforDetailDoctor: ( data ) => dispatch( action.saveInforDetailDoctor( data ) )
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( ManageDoctor );
