import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./RemeryMadal.scss";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { LANGUAGE, CRUD_ACTION, CommonUtils } from '../../../utils'; // vi or en

import { Toast, toast } from 'react-toastify';
/* import { postPatientBookAppoiment } from "../../../../services/userService" */
import moment from 'moment';
class RemeryMadal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            Diagnostics: '',
            imgBase64: '',
            isChangeImage: false
        };
    }
    componentDidMount() {
        if (this.props.dataModal) {
            this.setState({
                email: this.props.dataModal.email
            });
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.dataModal !== prevProps.dataModal) {
            this.setState({
                email: this.props.dataModal.email,

            })
        }
    }
    handleOnchangeEmail = (event) => {
        this.setState({
            email: event.target.value
        });
    }
    handleOnchangeDiagnosticsl = (event) => {
        this.setState({
            Diagnostics: event.target.value
        });
    }
    handleOnchangeImg = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let getBase64 = await CommonUtils.getBase64(file);
            this.setState({
                imgBase64: getBase64,
                isChangeImage: true
            })
        }
    }
    handleSendRemery = () => {
        this.props.sendRemery(this.state)
    }


    render() {
        console.log(this.state)
        let { isOpenRemery, closeRemery, dataModal, sendRemery } = this.props
        return (
            <div>
                <Button color="danger" onClick={closeRemery}>{this.props.buttonLabel}</Button>
                <Modal isOpen={isOpenRemery}
                    toggle={closeRemery}
                    className={this.props.className}
                    size='lg'
                >
                    <div className='modal-header'>
                        <h5 className='modal-title'>Gửi hóa đơn khám bệnh thành công</h5>
                        <button type='button' className='close' aria-label='Close'
                            onClick={closeRemery}
                        >
                            <span aria-hidden="true">x</span>
                        </button>
                    </div>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email bệnh nhân: </label>
                                <input className='form-control' value={this.state.email}
                                    onChange={(event) => this.handleOnchangeEmail(event)}
                                />

                            </div>
                            <div className='col-6 form-group'>
                                <label>Chuẩn đoán: </label>
                                <input className='form-control' value={this.state.Diagnostics}
                                    onChange={(event) => this.handleOnchangeDiagnosticsl(event)}
                                />

                            </div>
                            <div className='col-6 form-group file'>
                                <label>Chọn file thuốc: </label>
                                <input className='form-control-file' type='file'
                                    onChange={(event) => this.handleOnchangeImg(event)}
                                />

                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        {this.state.isChangeImage === true ?
                            <>
                                <Button color="primary" onClick={() => this.handleSendRemery()}>Send</Button>{' '} </> :
                            <>
                                <Button className='isChangeImageFalse' color="primary" >Send</Button>{' '}
                            </>
                        }
                        <Button color="secondary" onClick={closeRemery}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>

        )
    }
}
const mapStateToProps = state => {
    return {
        genderRedux: state.admin.genders,
        language: state.app.language,

    };
};

const mapDispatchToProps = dispatch => {
    return {
        /* getGenderStart: () => dispatch(action.fetchGenderStart()), */
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(RemeryMadal);