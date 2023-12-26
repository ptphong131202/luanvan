import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./ManagePatient.scss";
import DatePicker from '../../../components/Input/DatePicker';
import { getPatientforDoctor, postSendRemedy } from "../../../services/userService"
import moment from 'moment';
import { Toast, toast } from 'react-toastify';
import RemeryMadal from './RemeryMadal';
class ManagePatient extends Component {

    constructor(props) {
        super(props);
        this.state = {
            currentDate: moment(new Date()).startOf('day').valueOf(),
            dataPatient: [],
            isOpenRemery: false,
            dataModal: {},
        };
    }


    async componentDidMount() {
        await this.getDataPatient();
    }

    getDataPatient = async () => {
        let { user } = this.props;
        let { currentDate } = this.state;
        let formatdate = new Date(currentDate).getTime();
        let res = await getPatientforDoctor({
            doctorId: user.id,
            date: formatdate
        });
        console.log(res)
        if (res && res.errCode === 0) {
            this.setState({
                dataPatient: res.data
            })
        }
    }
    componentDidUpdate = async (prevProps, prevState) => {


    }
    handleOnchangeDatePicker = (date) => {
        this.setState({
            currentDate: date[0],
        }, () => {
            this.getDataPatient();
        })
    }
    handleBtnConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientIdData.email,
            timetype: item.timetype
        }
        this.setState({
            dataModal: data,
            isOpenRemery: true
        })
    }
    closeRemery = () => {
        this.setState({
            dataModal: {},
            isOpenRemery: false
        })
    }

    sendRemery = async (data) => {
        let { dataModal } = this.state
        let res = await postSendRemedy({
            email: data.email,
            imgBase64: data.imgBase64,
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            timetype: dataModal.timetype,
            language: this.props.language,
            Diagnostics: data.Diagnostics

        })

        if (res && res.errCode === 0) {
            toast.success("Send Remedy Success!");
            this.setState({
                isOpenRemery: false
            })
            this.getDataPatient();
        }
        else {
            toast.error("Send Remedy Error!")
        }
    }

    render() {
        let { dataPatient } = this.state;
        let { language } = this.props;
        console.log(this.state)
        return (
            <>
                <head>
                    <title>Quản lý bệnh nhân</title>
                </head>
                <RemeryMadal
                    isOpenRemery={this.state.isOpenRemery}
                    dataModal={this.state.dataModal}
                    closeRemery={this.closeRemery}
                    sendRemery={this.sendRemery}
                    handleOnchangeImg={this.handleOnchangeImg}
                />
                <div className='container mt-5 managePatient'>
                    <div className='title mt-2'> QUẢN LÝ BỆNH NHÂN KHÁM BỆNH</div>
                    <div className='form-group col-2'>
                        <label>Chọn ngày khám: </label>
                        <DatePicker className="form-control"
                            onChange={this.handleOnchangeDatePicker}
                            value={this.state.currentDate}

                        />
                    </div>
                    <table className="table table-bordered mt-3 bg-white">
                        <thead>
                            <tr>
                                <th scope="col">STT</th>
                                <th scope="col">Họ tên</th>
                                <th scope="col">Địa chỉ</th>
                                <th scope="col">Thời gian</th>
                                <th scope="col">Giới tính</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {dataPatient && dataPatient.length > 0 ? dataPatient.map((item, index) => {
                                return (
                                    <tr>
                                        <th scope="row">{index}</th>
                                        <td>{item.patientIdData.lastName}</td>
                                        <td>{item.patientIdData.address}</td>
                                        <td className='center'>
                                            {language === 'vi' ?
                                                item.timeTypeBookingData.valueVi :
                                                item.timeTypeBookingData.valueEn
                                            }</td>
                                        <td className='center'>{
                                            language === 'vi' ?
                                                item.patientIdData.genderData.valueVi :
                                                item.patientIdData.genderData.valueEn
                                        }</td>
                                        <td className='center'>
                                            <button className='btn-submit btn-confirm'
                                                onClick={() => this.handleBtnConfirm(item)}
                                            >Xác nhận</button>
                                        </td>
                                    </tr>
                                )
                            }) :
                                <tr>
                                    <th className='text-center' scope="row" colSpan={6}>No data!</th>

                                </tr>
                            }


                        </tbody>
                    </table>
                </div>
            </>
        )
    }
}
const mapStateToProps = state => {
    return {
        language: state.app.language,
        user: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);