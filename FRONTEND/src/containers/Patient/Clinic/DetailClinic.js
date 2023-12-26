import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./DetailClinic.scss";
import HomeHeader from '../../HomePage/HomeHeader';/*
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor'; */
import { withRouter } from 'react-router';
import { getDetaiClinic } from "../../../services/userService"
import _ from "lodash"
import HomeFooter from "../../HomePage/HomeFooter";

class DetailSpecialty extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            dataClinic: []
        };
    }

    async componentDidMount ()
    {
        if ( this.props.match && this.props.match.params && this.props.match.params.id )
        {
            let id = this.props.match.params.id;
            let res = await getDetaiClinic( id );
            if ( res && res.errCode === 0 )
            {
                this.setState( {
                    dataClinic: res.data
                } );
            }

        }
    }
    componentDidUpdate = async ( prevProps, prevState ) =>
    {


    }

    handleViewDetailDoctor = ( item ) =>
    {

    }

    handleOnclickMoreInfor = () =>
    {

    }
    render ()
    {
        let { dataClinic } = this.state;
        return (
            <>
                <head>
                    <title>{ dataClinic.name }</title></head>
                <HomeHeader />
                <div className='background-header-clinic'></div>
                <div className='container DetaiClinic'>
                    { dataClinic &&
                        <>
                            <div className='DetailClinic-name'>
                                <div className='DetailClinic-top-left'>
                                    <img src={ dataClinic.image } />
                                </div>
                                <div className='DetailClinic-top-right'>
                                    <div className='DetailClinic-top-right-top'>{ dataClinic.name }</div>
                                    <div className='DetailClinic-top-right-down'>{ dataClinic.address }</div>
                                </div>
                            </div>
                            <div className='DetailClinic-desc'>
                                BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện
                                - phòng khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                            </div>
                            <div className='DetailClinic-desc DetailClinic-desc2'                                >
                                Từ nay, người bệnh có thể đặt khám <b>{ dataClinic.name }</b> thông qua hệ thống đặt khám BookingCare.
                                <li>Được lựa chọn khám với các bác sĩ chuyên khoa giàu kinh nghiệm</li>
                                <li>Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch)</li>
                                <li>Giảm thiểu thời gian chờ đợi xếp hàng làm thủ tục khám  </li>
                                <li>Nhận được hướng dẫn đi khám chi tiết sau khi đặt lịch</li>
                            </div>
                            <div className='content-clinic'
                                dangerouslySetInnerHTML={ { __html: dataClinic.descriptionHTML } }>
                            </div>
                        </>
                    }

                </div>

                <HomeFooter />
            </>
        )
    }
}
const mapStateToProps = state =>
{
    return {
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( DetailSpecialty ) );