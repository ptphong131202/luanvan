import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../HomePage/HomeHeader';
import "./DoctorSchedule.scss";
import { LANGUAGE } from "../../../utils"
import Select from 'react-select';
import localization from 'moment/locale/vi'
import { getScheduleDoctorById } from '../../../services/userService';
import moment, { lang } from 'moment';
import { FormattedMessage } from 'react-intl';
import { locale } from 'moment';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

import BookingModal from './Modal/BookingModal';
class DoctorSchedule extends Component {

    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvableTime: [],
            isOpenModalBooking: false,
            dataScheduleTimeModal: {}
        };
    }

    async componentDidMount() {
        let { language } = this.props;
        let alldays = this.getArrDay(language);
        let res = await getScheduleDoctorById(this.props.detailDoctor, alldays[0].value);
        this.setState({
            allDays: alldays,
            allAvableTime: res.data ? res.data : []
        })
    }

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    getArrDay = (language) => {
        const arrDay = [];
        for (let i = 0; i < 7; i++) {
            let object = {};
            const currentDate = moment().add(i, 'days');
            if (language === LANGUAGE.VI) {
                if (i === 0) {
                    let labelVi2 = moment(new Date()).add(i, 'days').format("DD/MM");
                    let today = `Hôm nay - ${labelVi2}`;
                    object.label = today;
                }
                else {
                    let labelVi = currentDate.format('dddd - DD/MM');
                    object.label = this.capitalize(labelVi);
                }

            } else if (language === LANGUAGE.EN) {
                if (i === 0) {
                    let labelVi2 = moment(new Date()).add(i, 'days').format("DD/MM");
                    let today = `Today - ${labelVi2}`;
                    object.label = today;
                }
                else {
                    object.label = currentDate.locale('en').format('ddd - DD/MM');
                }
            }
            object.value = currentDate.startOf('day').valueOf();
            arrDay.push(object);
        }
        return arrDay;
        /* this.setState({
            allDays: arrDay
        }) */
    }

    async componentDidUpdate(prevProps, prevState) {
        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrDay(this.props.language);
            this.setState({
                allDays: allDays
            })
        }

        if (this.props.detailDoctor !== prevProps.detailDoctor) {
            let allDays = this.getArrDay(this.props.language);
            let res = await getScheduleDoctorById(this.props.detailDoctor, allDays[0].value);
            this.setState({
                allDays: allDays,
                allAvableTime: res.data ? res.data : []
            })
        }
    }

    handleOnchangeSelect = async (event) => {
        if (this.props.detailDoctor && this.props.detailDoctor !== -1) {
            let id = this.props.detailDoctor;
            let res = await getScheduleDoctorById(id, event.target.value);
            if (res && res.errCode === 0) {
                this.setState({
                    allAvableTime: res.data ? res.data : []
                })
            }
        }
    }
    handleClickScheduleTime = (time) => {
        this.setState({
            isOpenModalBooking: true,
            dataScheduleTimeModal: time
        })
    }
    closeBookingModal = () => {
        this.setState({
            isOpenModalBooking: false,
        })
    }
    render() {
        let { allAvableTime } = this.state;
        let { language } = this.props;
        return (
            <React.Fragment>
                <div className='container doctor-schedule'>
                    <div className='doctor-schedule-content'>
                        <div className='all-schedule'>
                            <select className={language === LANGUAGE.VI ? 'select active1' : 'select active2'} onChange={(event) => this.handleOnchangeSelect(event)}>
                                {this.state.allDays && this.state.allDays.length > 0 && this.state.allDays.map((item, index) => {
                                    return (
                                        <option className='option' key={index} value={item.value}>{item.label}</option>
                                    )
                                })}
                            </select>
                        </div>
                        <div className='all-available-time'>
                            <div className='text-calender'>
                                <span> <i className='fas fa-calendar-alt'></i> <FormattedMessage id="patient.detail-doctor.schedule" /></span>
                            </div>
                            <div className='time-content'>
                                {allAvableTime && allAvableTime.length > 0 ?
                                    allAvableTime.map((item, index) => {
                                        let timeDisplay = language === LANGUAGE.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn;
                                        return (
                                            <button
                                                className={language === LANGUAGE.VI ? 'minWith1' : 'minWith2'}
                                                key={index}
                                                onClick={() => this.handleClickScheduleTime(item)}
                                            >{timeDisplay}</button>
                                        )
                                    })
                                    : <div className='py-3'><FormattedMessage id="patient.detail-doctor.no-schedule" /></div>
                                }
                            </div>
                            {allAvableTime && allAvableTime.length > 0 && <div className='mt-3'>Đặt lịch miễn phí</div>}
                        </div>
                    </div>
                </div>


                <BookingModal
                    isOpenModal={this.state.isOpenModalBooking}
                    closeBookingModal={this.closeBookingModal}
                    dataScheduleTimeModal={this.state.dataScheduleTimeModal}
                />
            </React.Fragment>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);