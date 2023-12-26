import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./ManageClinic.scss";
/* import { LANGUAGE } from "../../../utils" */
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../../utils';
import { createNewClinic } from "../../../../services/userService"
import { Toast, toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageClinic extends Component {

    constructor(props) {
        super(props);
        this.state = {
            clinicId: '',
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
        };
    }

    /* componentDidMount() {
        this.setState = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

        };
    } */
    componentDidUpdate = async (prevProps, prevState) => {


    }
    handleOnchangeInput = (event, name) => {
        let stateCopy = { ...this.state };
        stateCopy[name] = event.target.value;
        this.setState(stateCopy);
    };
    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html,
        })
    }


    // event in img for input file 
    handleOnchangeImg = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let getBase64 = await CommonUtils.getBase64(file);
            /* let objectUrl = URL.createObjectURL(file); */
            this.setState({
                /*   previewImg: objectUrl, */
                imageBase64: getBase64
            })
        }
    }

    handleSaveClinic = async () => {
        let res = await createNewClinic(this.state);
        if (res && res.errCode === 0) {
            toast.success("Clinic saved successfully!");
            this.setState({
                clinicId: '',
                name: '',
                address: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
                imageBase64: ''

            })
        }
        else {
            toast.error("Clinic saved error!");
        }
    }

    render() {
        return (
            <div className='container clinic-container'>
                <head>
                    <title>quản lý phòng khám</title>
                </head>
                <div className='title mt-5'>QUẢN LÝ PHÒNG KHÁM</div>

                <div className='all-specialty'>
                    <div className='row'>
                        <div className='col-2 form-group'>
                            <label>Mã Phòng khám: </label>
                            <input className='form-control'
                                type='text' value={this.state.clinicId}
                                onChange={(event) => this.handleOnchangeInput(event, "clinicId")} />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Tên Phòng khám: </label>
                            <input className='form-control'
                                type='text' value={this.state.name}
                                onChange={(event) => this.handleOnchangeInput(event, "name")} />
                        </div>
                        <div className='col-4 form-group'>
                            <label>Địa chỉ phòng khám: </label>
                            <input className='form-control'
                                type='text' value={this.state.address}
                                onChange={(event) => this.handleOnchangeInput(event, "address")} />
                        </div>
                        <div className='col-2 form-group file'>
                            <label>Ảnh Phòng khám: </label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleOnchangeImg(event)}
                            />
                        </div>
                    </div>

                    <div className='label-markdown'>
                        <label >Description: </label>
                    </div>
                    <div className='markdown'>
                        <MdEditor
                            style={{ height: '400px' }}
                            renderHTML={text => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                            value={this.state.descriptionMarkdown}
                        />
                    </div>
                </div>
                <div className='col-12 text-center button'>
                    <button className='btn btn-primary'
                        onClick={() => this.handleSaveClinic()}
                    >Save</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);