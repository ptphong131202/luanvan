import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./DoctorExtraInfor.scss";
import { LANGUAGE } from "../../../utils"
import { changeLanguage } from '../../../store/actions'; // change language
import { getExtraInforDoctorById } from '../../../services/userService';
import NumberFormat from 'react-number-format';
class DoctorExtraInfor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isShowDetailInfo: false,
            Price: '',
            Province: '',
            Payment: '',
            nameClicnic: '',
            addressclinic: '',
            note: '',
        };
    }
    async componentDidMount() {
        await this.getExtra();
    }

    getExtra = async () => {
        let res = await getExtraInforDoctorById(this.props.detailDoctor);
        let { paymentIdData, priceIdData, provinceIdData } = res.data;
        if (!paymentIdData || !paymentIdData ||
            !priceIdData || !priceIdData ||
            !provinceIdData || !provinceIdData) {
            this.setState({
                addressclinic: '',
                nameClicnic: '',
                note: '',
                Price: '',
                Province: '',
                Payment: ''
            })
        }
        else {
            let payment = this.props.language === LANGUAGE.VI ? paymentIdData.valueVi : paymentIdData.valueEn;
            let price = this.props.language === LANGUAGE.VI ? priceIdData.valueVi : priceIdData.valueEn;
            let province = this.props.language === LANGUAGE.VI ? provinceIdData.valueVi : provinceIdData.valueEn;
            this.setState({
                addressclinic: res.data.addressClinic,
                nameClicnic: res.data.nameClinic,
                note: res.data.note,
                Price: price,
                Province: province,
                Payment: payment
            })
        }
    }

    componentDidUpdate = async (prevProps, prevState) => {

        if (this.props.detailDoctor !== prevProps.detailDoctor) {
            await this.getExtra();

        }

        if (this.props.language !== prevProps.language) {
            await this.getExtra();
        }


    }

    showDetailInfor = (status) => {
        this.setState({
            isShowDetailInfo: status
        })
    }

    render() {
        let { isShowDetailInfo } = this.state;
        return (
            <div className='container DoctorExtraInfor'>
                <div className='up'>
                    <div className='text-address'>ĐỊA CHỈ PHÒNG KHÁM</div>
                    <div className='name-address'>{this.state.nameClicnic}</div>
                    <div className='address'><i>{this.state.addressclinic}</i></div>
                </div>
                <div className='down'>

                    {isShowDetailInfo === false &&
                        <div className='price-content'>
                            {this.props.language === LANGUAGE.VI &&
                                <>
                                    <div>Giá khám: {<NumberFormat value={this.state.Price} displayType={'text'} thousandSeparator={true} suffix={'vnd'} />}</div>
                                    <div className='xem' onClick={() => this.showDetailInfor(true)}>Xem chi tiết </div>
                                </>
                            }
                            {this.props.language === LANGUAGE.EN &&
                                <>
                                    <div>Giá khám: {<NumberFormat value={this.state.Price} displayType={'text'} thousandSeparator={true} prefix={'$'} />}</div>
                                    <div className='xem' onClick={() => this.showDetailInfor(true)}>Xem chi tiết </div>
                                </>
                            }

                        </div>
                    }

                    {isShowDetailInfo === true &&
                        <>
                            <div className='text-address'>GIÁ KHÁM</div>
                            <div className='price'>
                                <div className='up'>
                                    <div className='price-content'>
                                        {this.props.language === LANGUAGE.VI &&
                                            <>
                                                <div>Giá khám: </div>
                                                <div>{<NumberFormat value={this.state.Price} displayType={'text'} thousandSeparator={true} suffix={'vnd'} />}</div>
                                            </>
                                        }
                                        {this.props.language === LANGUAGE.EN &&
                                            <>
                                                <div>Giá khám: </div>
                                                <div >{<NumberFormat value={this.state.Price} displayType={'text'} thousandSeparator={true} prefix={'$'} />} </div>
                                            </>
                                        }
                                    </div>
                                    <div className='note' dangerouslySetInnerHTML={{ __html: this.state.note }}>{/* {this.state.note} */}</div></div>
                                <div className='center'>Người bệnh có thể thanh toán chi phí bằng hình {this.state.Payment}</div>
                            </div>
                            <div className='down' onClick={() => this.showDetailInfor(false)}>Ẩn bảng giá</div>
                        </>
                    }


                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);