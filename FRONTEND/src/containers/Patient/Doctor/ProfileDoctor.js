import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
/* import "./ProfileDoctor.scss"; */
import { LANGUAGE } from "../../../utils"
import "./ProfileDoctor.scss"
import { getProfileDoctorById } from "../../../services/userService"
import { FormattedMessage } from 'react-intl';
import NumberFormat from 'react-number-format';
import _ from "lodash";
import moment from "moment";
class ProfileDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dataProfile: [],
            price: '',
            position: '',
            firstName: '',
            lastName: '',
        };
    }

    async componentDidMount() {
        let data = await this.getInforDoctor(this.props.doctorId);
        if (!data.Doctor_infor) {
            this.setState({
                dataProfile: data,
                position: data.positionData,
                firstName: data.firstName,
                lastName: data.lastName,
            });
        }
        else {
            this.setState({
                price: data.Doctor_infor.priceIdData,
                dataProfile: data,
                position: data.positionData,
                firstName: data.firstName,
                lastName: data.lastName,
            });
        }
    }

    getInforDoctor = async (id) => {
        let result = {};
        if (id) {
            let res = await getProfileDoctorById(id);
            if (res && res.errCode === 0) {
                result = res.data;
            }
        }
        return result;
    }

    componentDidUpdate = async (prevProps, prevState) => {
        if (this.props.doctorId !== prevProps.doctorId) {
            let data = await this.getInforDoctor(this.props.doctorId);
            if (!data.Doctor_infor) {
                this.setState({
                    dataProfile: data,
                    position: data.positionData,
                    firstName: data.firstName,
                    lastName: data.lastName,
                });
            }
            else {
                this.setState({
                    price: data.Doctor_infor.priceIdData,
                    dataProfile: data,
                    position: data.positionData,
                    firstName: data.firstName,
                    lastName: data.lastName,
                });
            }
        }

    }

    capitalize = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }


    renderBooking(time, address) {
        if (time && address && !_.isEmpty(time) && !_.isEmpty(address)) {
            let timeSchedule = this.props.language === 'vi' ? time.timeTypeData.valueVi : time.timeTypeData.valueEn;
            let date = this.props.language === 'vi' ?
                moment.unix(+time.date / 1000).format('dddd - DD/MM/YYYY') :
                moment.unix(+time.date / 1000).format('ddd - MM/DD/YYYY');
            return (<div>
                <p>{address}</p>
                <p>
                    <>
                        {timeSchedule} - {date}
                    </>
                </p>
                <p>Đặt lịch miễn phí!</p>
            </div>)
        }
    }
    render() {
        let profile = this.state.dataProfile;
        let language = this.props;
        let Vi = LANGUAGE.VI;
        let pricevi = '', priceEn = '', namevi = '', namen = '';
        let positionEn = this.state.position.valueEn;
        let positionvi = this.state.position.valueVi;
        namevi = `${positionvi},  ${this.state.firstName} ${this.state.lastName}`
        namen = `${positionEn},  ${this.state.lastName} ${this.state.firstName}`
        pricevi = this.state.price.valueVi;
        priceEn = this.state.price.valueEn;
        return (
            <div className="profile">
                <div className='intro-doctor'>
                    <div className='content-left'>
                        <img src={profile && profile.image ? profile.image : ""} alt='avatar' />
                    </div>
                    <div className='content-right'>
                        <div className='up'>
                            {this.props.language === 'vi' ? namevi : namen} </div>
                        <div className='down'>
                            <>
                                {this.props.isOpenProfileDoctor === true && profile.Markdown && profile.Markdown.description
                                    && <div>
                                        <span> {profile.Markdown.description}
                                        </span>
                                        <p className='hasLocation'>
                                            <p className='location'> </p> {profile.address}
                                        </p>
                                    </div>
                                }
                                {
                                    this.props.isOpenProfileDoctor === false
                                    && this.renderBooking(this.props.time, profile.address)
                                }

                            </>
                        </div>
                    </div>
                </div>
                {this.props.isOpenProfileDoctor === false && <div className='price'>
                    <div className='price-left'>
                        <FormattedMessage id="admin.manage-schedule.price"></FormattedMessage>:
                    </div>
                    <div className='price-right'>
                        <div className='price-text'>
                            {this.props.language === 'vi' ?
                                <NumberFormat value={pricevi} displayType={'text'} thousandSeparator={true} suffix={'đ'} /> :
                                <NumberFormat value={priceEn} displayType={'text'} thousandSeparator={true} prefix={'$'} />
                            }
                        </div>
                    </div>
                </div>}

            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);