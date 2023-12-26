import React, { Component } from 'react';
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import { FormattedMessage } from 'react-intl'; // fomat language
import * as action from "../../../store/actions";
import { LANGUAGE, dateFormat } from '../../../utils'; // vi or en
import Select from 'react-select';
import DatePicker from '../../../components/Input/DatePicker';
import moment from 'moment';
import { Toast, toast } from 'react-toastify';
import _, { times } from 'lodash';
import * as actions from "../../../store/actions";
import { saveBulkScheduleDoctor } from '../../../services/userService'
class ManageSchedule extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            selectedDoctor: {},
            listDoctor: [],
            currentDate: '',
            rangeTime: [],
            fullName: []
        };
    }

    componentDidMount ()
    {
        this.props.fetchAllDoctor();
        this.props.fetchAllScheduleHour();
        if ( this.props.userInfo.roleId === 'R2' )
        {
            let fullName = {}
            let { language } = this.props;
            fullName.label = language === 'vi' ? `${ this.props.userInfo.firstName } ${ this.props.userInfo.lastName }`
                : `${ this.props.userInfo.lastName } ${ this.props.userInfo.firstName }`;
            fullName.value = this.props.userInfo.id
            this.setState( {
                fullName: fullName
            } )
        }
    }
    handleChangeSelect = async ( selectedDoctor ) =>
    {
        this.setState( {
            selectedDoctor,
        } );
        console.log( selectedDoctor )
    };
    buildInputSelect = ( data ) =>
    {
        let result = [];
        let { language } = this.props;
        if ( data && data.length > 0 )
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
        return result;
    }

    componentDidUpdate ( prevProps, prevState )
    {
        if ( prevProps.allDoctorRedux !== this.props.allDoctorRedux )
        {
            let dataSelect = this.buildInputSelect( this.props.allDoctorRedux );
            this.setState( {
                listDoctor: dataSelect
            } )
        }
        if ( prevProps.language !== this.props.language )
        {
            let dataSelect = this.buildInputSelect( this.props.allDoctorRedux );
            this.setState( {
                listDoctor: dataSelect
            } )
        }

        if ( prevProps.allScheduleTime !== this.props.allScheduleTime )
        {
            let data = this.props.allScheduleTime;
            if ( data && data.length > 0 )
            {
                data = data.map( item => ( { ...item, isselected: false } ) )
            }
            this.setState( {
                rangeTime: data
            } )
        }
    }

    handleOnchangeDatePicker = ( date ) =>
    {
        this.setState( {
            currentDate: date[ 0 ],
        } )
    }

    handleButtonTime = ( time ) =>
    {
        let { rangeTime } = this.state;
        if ( rangeTime && rangeTime.length > 0 )
        {
            rangeTime = rangeTime.map( item =>
            {
                if ( item.id === time.id ) item.isselected = !item.isselected;
                return item;
            } )
            this.setState( {
                rangeTime: rangeTime
            } )
        }
    }

    handleSaveSchedule = async () =>
    {
        let result = [];
        let response = ''
        let { rangeTime, selectedDoctor, currentDate, fullName } = this.state;

        if ( !fullName )
        {
            if ( selectedDoctor && _.isEmpty( selectedDoctor ) )
            {
                toast.error( "Invalid selected Doctor!" )
                return;
            }
        }
        if ( !currentDate )
        {
            toast.error( "Invalid date!" )
            return;
        }
        let formatedDate = new Date( currentDate ).getTime();
        if ( fullName && !_.isEmpty( fullName ) )
        {
            if ( rangeTime && rangeTime.length > 0 )
            {
                let selectedTime = rangeTime.filter( item => item.isselected === true )
                if ( selectedTime && selectedTime.length > 0 )
                {
                    selectedTime.map( item =>
                    {
                        let object = {};
                        object.doctorId = fullName.value;
                        object.date = formatedDate;
                        object.timeType = item.keyMap;
                        result.push( object )
                    } )
                } else
                {
                    toast.error( "Invalid selected time!" )
                    return;
                }
            }
        }
        else if ( selectedDoctor )
        {
            if ( rangeTime && rangeTime.length > 0 )
            {
                let selectedTime = rangeTime.filter( item => item.isselected === true )
                if ( selectedTime && selectedTime.length > 0 )
                {
                    selectedTime.map( item =>
                    {
                        let object = {};
                        object.doctorId = selectedDoctor.value;
                        object.date = formatedDate;
                        object.timeType = item.keyMap;
                        result.push( object )
                    } )
                } else
                {
                    toast.error( "Invalid selected time!" )
                    return;
                }
            }
        }

        if ( fullName && !_.isEmpty( fullName ) )
        {
            response = await saveBulkScheduleDoctor( {
                arrSchedule: result,
                doctorId: fullName.value,
                date: '' + formatedDate
            } );
        }
        else
        {
            response = await saveBulkScheduleDoctor( {
                arrSchedule: result,
                doctorId: selectedDoctor.value,
                date: '' + formatedDate
            } );
        }
        if ( response && response.errCode === 0 )
        {
            toast.success( "Create schedule success!" )
        }
        else
        {
            toast.error( "Create schedule fail!" )
        }
    }

    render ()
    {
        let { rangeTime } = this.state;
        let { language } = this.props;

        return (
            <React.Fragment>
                <head>
                    <title>Quản lý kế hoạch khám bệnh </title>
                </head>
                <div className='container manage-schedule'>
                    <div className='manage-schedule-content mx-auto'>
                        <div className='manage-schedule-title title my-5'>
                            <FormattedMessage id="manage-schedule.title" />
                        </div>
                        <div className='container'>
                            <div className='row'>

                                { this.props.userInfo.roleId === 'R1' ?
                                    <div className='col-6 form-group choose'>
                                        <label> <FormattedMessage id="manage-schedule.choose-doctor" /></label>
                                        <Select
                                            value={ this.state.selectedDoctor }
                                            onChange={ this.handleChangeSelect }
                                            options={ this.state.listDoctor }
                                        />
                                    </div> :
                                    <div className='col-6 form-group choose'>
                                        <label> <FormattedMessage id="manage-schedule.doctor" /></label>
                                        <Select
                                            value={ this.state.fullName }
                                            options=''
                                        />
                                        {/* <input
                                            value={fullName}
                                        /> */}
                                    </div> }
                                <div className='col-6 form-group'>
                                    <label> <FormattedMessage id="manage-schedule.choose-date" /></label>
                                    <DatePicker className="form-control date"
                                        onChange={ this.handleOnchangeDatePicker }
                                        /* value={this.state.currentDate} */
                                        selected={ this.state.currentDate }
                                        minDate={ new Date( new Date().setDate( new Date().getDate() - 1 ) ) }
                                    />
                                </div>
                                <div className='col-12 hour-container mt-2'>
                                    <div className='hour-container-content'>

                                        { language === LANGUAGE.VI && rangeTime && rangeTime.length > 0 && rangeTime.map( ( item, index ) =>
                                        {
                                            return (

                                                <button className={ item.isselected === true ? 'btn btn-schedule-vi active' : 'btn btn-schedule-vi' }
                                                    onClick={ () => this.handleButtonTime( item ) }
                                                    key={ index }>{ language === LANGUAGE.VI ? item.valueVi : item.valueEn }</button>
                                            )
                                        } ) }

                                        { language === LANGUAGE.EN && rangeTime && rangeTime.length > 0 && rangeTime.map( ( item, index ) =>
                                        {
                                            return (

                                                <button className={ item.isselected === true ? 'btn btn-schedule-en active' : 'btn btn-schedule-en' }
                                                    onClick={ () => this.handleButtonTime( item ) }
                                                    key={ index }>{ language === LANGUAGE.VI ? item.valueVi : item.valueEn }</button>
                                            )
                                        } ) }


                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='container container-manage-schedule.save'>
                            { language === LANGUAGE.VI &&
                                <div className=' container-save-vi'>
                                    <button className='btn btn-primary'
                                        onClick={ () => this.handleSaveSchedule() }
                                    ><FormattedMessage id="manage-schedule.save" /></button>
                                </div>
                            }
                            { language === LANGUAGE.EN &&
                                <div className=' container-save-en'>
                                    <button className='btn btn-primary'
                                        onClick={ () => this.handleSaveSchedule() }
                                    ><FormattedMessage id="manage-schedule.save" /></button>
                                </div>
                            }

                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        allDoctorRedux: state.admin.allDoctor,
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
        allScheduleTime: state.admin.allScheduleTime
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        fetchAllDoctor: () => dispatch( action.fetchAllDoctor() ),
        fetchAllScheduleHour: () => dispatch( action.fetchAllScheduleHour() ),
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( ManageSchedule );
