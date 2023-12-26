import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { postVerifyBookAppoiment } from "../../services/userService";
import HomeHeader from '../HomePage/HomeHeader';
import "./VerifyEmail.scss";
/* import { LANGUAGE } from "../../../utils" */
class VerifyEmail extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }
    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            let urlParam = new URLSearchParams(this.props.location.search);
            let token = urlParam.get('token');
            let doctorId = urlParam.get('doctorId');
            let res = await postVerifyBookAppoiment({
                token: token,
                doctorId: doctorId
            })

            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                })
            }
            else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                })
            }

        }
    }
    componentDidUpdate = async (prevProps, prevState) => {


    }


    render() {
        let { statusVerify, errCode } = this.state;
        return (
            <React.Fragment>
                <HomeHeader isShowBanner={false} />
                <div className='container verify '>
                    <div className='verify-container'>
                        {statusVerify === false ?
                            <div>Loading data...</div> :
                            <div className='verify-container-content'>
                                {+errCode === 0 ?
                                    <div className='success'>
                                        <div className='logo'></div>
                                        <p className='success-title'>Bạn đã xác nhận đặt lịch thành công!</p>
                                        <p className='success-title'>Bây giờ bạn có thể rời khỏi trình duyệt!</p>
                                    </div> :
                                    <div className='success failed'>
                                        <div className='logo'></div>
                                        <p className='success-title'>Lỗi đặt lịch khám bệnh!</p>
                                    </div>}
                            </div>
                        }
                    </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);