import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./PacketExam.scss";
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router';
import { getDetalhandbookById } from "../../../services/userService"
import _ from "lodash";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import HealthFacility from "../../HomePage/Section/HealthFacility"
import HomeFooter from ".././../HomePage/HomeFooter"
class PacketExam extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }


    componentDidUpdate = async (prevProps, prevState) => {


    }

    render() {
        let settings2 = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 5,
            slidesToScroll: 1
        };
        return (
            <>
                <head>
                    <title>Khám tổng quát</title>
                </head>
                <HomeHeader />
                <div className='packet-exam'>
                    <div className='banner'>

                    </div>
                    <p className='exam'>
                        <span>KHÁM TỔNG QUÁT</span>
                    </p>

                    <div className='container search'>
                        <div className='search-content'>
                            <div className='col-12 form-search'>
                                <input type='text' placeholder='tìm kiếm' />
                                <span>Tìm kiếm</span>
                            </div>
                            <div className='down-search'>
                                <div className='col-3 selected'>
                                    <div className='selected-content'>
                                        Khu vực <i class="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                                <div className='col-3 selected'>
                                    <div className='selected-content'>
                                        Danh mục <i class="fas fa-chevron-down"></i>
                                    </div>
                                </div>

                                <div className='col-3 selected'>
                                    <div className='selected-content'>
                                        Mức giá <i class="fas fa-chevron-down"></i>
                                    </div>
                                </div>

                                <div className='col-3 selected'>
                                    <div className='selected-content'>
                                        Cơ sở y tế <i class="fas fa-chevron-down"></i>
                                    </div>
                                </div>
                            </div>

                        </div>


                    </div>
                    <div className='container cat'>
                        <div className='cat-content'>
                            <h3>Danh mục</h3>
                            <hr />
                            <Slider {...settings2}>
                                <div className='category'>
                                    <img src="https://cdn.bookingcare.vn/fo/w1920/2022/10/26/095749-khamtongquat.png" />
                                    <div className='name'>
                                        Cơ bản
                                    </div>
                                </div>
                                <div className='category'>
                                    <img src="https://cdn.bookingcare.vn/fo/w1920/2023/05/18/101925-iconkhamvip.png" />
                                    <div className='name'>
                                        Gói khám VIP
                                    </div>
                                </div>
                                <div className='category'>
                                    <img src="https://cdn.bookingcare.vn/fo/w1920/2022/10/26/095803-nangcao.png" />
                                    <div className='name'>
                                        Nâng cao
                                    </div>
                                </div>
                                <div className='category'>
                                    <img src="https://cdn.bookingcare.vn/fo/w1920/2022/10/26/095756-nam.png" />
                                    <div className='name'>
                                        Nam
                                    </div>
                                </div>
                                <div className='category'>
                                    <img src="https://cdn.bookingcare.vn/fo/w1920/2022/10/26/095828-nu.png" />
                                    <div className='name'>
                                        Nữ
                                    </div>
                                </div>
                                <div className='category'>
                                    <img src="https://cdn.bookingcare.vn/fo/w1920/2022/10/26/095850-trem.png" />
                                    <div className='name'>
                                        Trẻ em
                                    </div>
                                </div>
                                <div className='category'>
                                    <img src="https://cdn.bookingcare.vn/fo/w1920/2022/10/26/095812-nguoigia.png" />
                                    <div className='name'>
                                        Người già
                                    </div>
                                </div>
                                <div className='category'>
                                    <img src="https://cdn.bookingcare.vn/fo/w1920/2022/10/26/095844-tienhonnhan.png" />
                                    <div className='name'>
                                        Tiền hôn nhân
                                    </div>
                                </div>
                                <div className='category'>
                                    <img src="https://cdn.bookingcare.vn/fo/w1920/2022/10/26/095836-tamsoatungthu.png" />
                                    <div className='name'>
                                        Tầm soát ung thư
                                    </div>
                                </div>
                                <div className='category'>
                                    <img src="https://cdn.bookingcare.vn/fo/w1920/2022/10/28/093823-icon1-2.png" />
                                    <div className='name'>
                                        Tầm soát tiêu hóa
                                    </div>
                                </div>


                            </Slider>
                        </div>
                    </div>

                    <div className='container'>
                        <HealthFacility />


                    </div>
                </div>
                <HomeFooter />
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PacketExam));