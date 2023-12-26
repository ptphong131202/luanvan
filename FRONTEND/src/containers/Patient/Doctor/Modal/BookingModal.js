import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./BookingModal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import DatePicker from '../../../../components/Input/DatePicker';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import * as action from '../../../../store/actions'
import Select from 'react-select'
import { Toast, toast } from 'react-toastify';
import { postPatientBookAppoiment } from "../../../../services/userService"
import moment from 'moment';
class BookingModal extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birtDay: '',
            genders: '',
            doctorId: '',
            selectedGender: '',
            timeType: ''
        };
    }
    componentDidMount ()
    {
        this.props.getGenderStart();

    }
    buildDataGender = ( data ) =>
    {
        let result = [];
        if ( data && data.length > 0 )
        {
            data.map( item =>
            {
                let object = {};
                object.label = this.props.language === 'vi' ? item.valueVi : item.valueEn;
                object.value = item.keyMap;
                result.push( object );
            } )
        }
        return result;
    }
    componentDidUpdate = async ( prevProps, prevState ) =>
    {
        if ( this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal )
        {
            if ( this.props.dataScheduleTimeModal && !_.isEmpty( this.props.dataScheduleTimeModal ) )
            {
                let doctorId = this.props.dataScheduleTimeModal.doctorId;
                let timeType = this.props.dataScheduleTimeModal.timeType;
                this.setState( {
                    doctorId: doctorId,
                    timeType: timeType
                } )
            }
        }
        if ( this.props.language !== prevProps.language )
        {
            this.setState( {
                genders: this.buildDataGender( this.props.genderRedux )
            } )
        }
        if ( this.props.genderRedux !== prevProps.genderRedux )
        {
            this.setState( {
                genders: this.buildDataGender( this.props.genderRedux )
            } )

        }



    }
    /* fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birtDay: '',
                genderId: '',
                doctorId: '',*/


    handleChangeInput = ( event, id ) =>
    {
        let valueInput = event.target.value;
        let stateCopy = { ...this.state };
        stateCopy[ id ] = valueInput;
        this.setState( { ...stateCopy } )
    }

    handleOnchangeDatePicker = ( date ) =>
    {
        this.setState( {
            birtDay: date[ 0 ]
        } )
    }
    handleChangeSelect = ( selectedOption ) =>
    {
        this.setState( {
            selectedGender: selectedOption
        } )
    }

    buildTimeBooking ( time )
    {
        if ( time && !_.isEmpty( time ) )
        {
            let timeSchedule = this.props.language === 'vi' ? time.timeTypeData.valueVi : time.timeTypeData.valueEn;
            let date = this.props.language === 'vi' ?
                moment.unix( +time.date / 1000 ).format( 'dddd - DD/MM/YYYY' ) :
                moment.unix( +time.date / 1000 ).format( 'ddd - MM/DD/YYYY' );
            return `${ timeSchedule } - ${ date }`
        }
        return '';
    }

    buildDoctorName ( time )
    {
        if ( time && !_.isEmpty( time ) )
        {
            let doctorName = this.props.language === 'vi' ?
                `${ time.doctorIdData.lastName }${ time.doctorIdData.firstName }` :
                `${ time.doctorIdData.firstName }${ time.doctorIdData.lastName }`;
            return doctorName;
        }
        return '';
    }
    handleConfirmBooking = async () =>
    {
        /*validate*/
        let date = new Date( this.state.birtDay ).getTime();
        let timestamp = this.buildTimeBooking( this.props.dataScheduleTimeModal )
        let doctorName = this.buildDoctorName( this.props.dataScheduleTimeModal );
        let timeType = this.props.dataScheduleTimeModal.timeType;
        let doctorId = this.props.dataScheduleTimeModal.doctorId;
        let res = await postPatientBookAppoiment( {
            fullName: this.state.fullName,
            phoneNumber: this.state.phoneNumber,
            email: this.state.email,
            address: this.state.address,
            reason: this.state.reason,
            date: this.props.dataScheduleTimeModal.date,
            birtDay: date,
            genders: this.state.selectedGender.value,
            doctorId: doctorId,
            timeType: timeType,
            language: this.props.language,
            timeString: timestamp,
            doctorName: doctorName
        } );

        if ( res && res.errCode === 0 )
        {
            toast.success( 'Booking a new appoiment success!' )
            this.props.closeBookingModal();
        }
        else
        {
            toast.error( 'Booking a new appoiment error!' )

        }
    }
    render ()
    {
        let doctorId = '';
        if ( this.props.dataScheduleTimeModal && !_.isEmpty( this.props.dataScheduleTimeModal ) )
        {
            doctorId = this.props.dataScheduleTimeModal.doctorId;
        }
        return (
            <div className='container bookingModal'>
                <Modal isOpen={ this.props.isOpenModal }
                    className={ 'booking-modal-content' }
                    size='lg'
                    centered
                >
                    <div className='modal-content-booking'>
                        <div className='booking-madal-header'>
                            <span className='left'>
                                <FormattedMessage id="admin.manage-schedule.infor-schedules">
                                </FormattedMessage>
                            </span>
                            <span className='right'
                                onClick={ this.props.closeBookingModal }><i className='fas fa-times'></i></span>
                        </div>
                        <div className='booking-madal-body'>
                            <div className='doctor-infor'>
                                <ProfileDoctor
                                    doctorId={ doctorId }
                                    isOpenProfileDoctor={ false }
                                    time={ this.props.dataScheduleTimeModal } />
                            </div>
                            <div className='doctor-price'></div>
                            <div className='row'>
                                <div className='col-6'>
                                    <label><FormattedMessage id="admin.manage-schedule.name">
                                    </FormattedMessage> </label>
                                    <input className='form-control' value={ this.state.fullName }
                                        onChange={ ( event ) => this.handleChangeInput( event, 'fullName' ) } />
                                </div>
                                <div className='col-6'>
                                    <label><FormattedMessage id="admin.manage-schedule.phone">
                                    </FormattedMessage> </label>
                                    <input
                                        className='form-control'
                                        value={ this.state.phoneNumber }
                                        onChange={ ( event ) => this.handleChangeInput( event, 'phoneNumber' ) }
                                    />
                                </div>
                                <div className='col-6'>
                                    <label>Email </label>
                                    <input
                                        className='form-control'
                                        value={ this.state.email }
                                        onChange={ ( event ) => this.handleChangeInput( event, 'email' ) }
                                    />
                                </div>
                                <div className='col-6'>
                                    <label><FormattedMessage id="admin.manage-schedule.address">
                                    </FormattedMessage> </label>
                                    <input
                                        className='form-control'
                                        value={ this.state.address }
                                        onChange={ ( event ) => this.handleChangeInput( event, 'address' ) }
                                    />
                                </div>
                                <div className='col-6'>
                                    <label><FormattedMessage id="admin.manage-schedule.gender">
                                    </FormattedMessage></label>
                                    <Select
                                        value={ this.state.selectedGender }
                                        onChange={ this.handleChangeSelect }
                                        options={ this.state.genders }
                                    /* placeholder={<FormattedMessage id="admin.manage-doctor.select-doctor" />} */
                                    />
                                </div>
                                <div className='col-6 form-group'>
                                    <label>{/* <FormattedMessage id="admin.manage-schedule.who">
                                    </FormattedMessage>  */} Ngày sinh</label>
                                    <DatePicker className="form-control"
                                        onChange={ this.handleOnchangeDatePicker }
                                        /* value={this.state.currentDate} */
                                        selected={ this.state.birtDay }
                                    />
                                </div>
                                <div className='col-12'>
                                    <label><FormattedMessage id="admin.manage-schedule.reason">
                                    </FormattedMessage></label>
                                    <input className='form-control'
                                        value={ this.state.reason }
                                        onChange={ ( event ) => this.handleChangeInput( event, 'reason' ) } />
                                </div>
                            </div>
                        </div>
                        <div className='booking-madal-footer'>
                            <button className='btn-booking-confirm' onClick={ () => this.handleConfirmBooking() }><FormattedMessage id="admin.manage-schedule.confirm">
                            </FormattedMessage></button>
                            <button className='btn-booking-cancel'
                                onClick={ this.props.closeBookingModal }><FormattedMessage id="admin.manage-schedule.cancel">
                                </FormattedMessage></button>
                        </div>
                    </div>
                </Modal>
            </div>
        )
    }
}
const mapStateToProps = state =>
{
    return {
        genderRedux: state.admin.genders,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        getGenderStart: () => dispatch( action.fetchGenderStart() ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( BookingModal );