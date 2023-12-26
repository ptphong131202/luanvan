import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./ManageSpecialty.scss";
/* import { LANGUAGE } from "../../../utils" */
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../../utils';
import { createNewSpecialty } from "../../../../services/userService"
import { Toast, toast } from 'react-toastify';
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManageSpecialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',

        };
    }

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

    handleSaveSpecialty = async () => {
        let res = await createNewSpecialty(this.state);
        if (res && res.errCode === 0) {
            toast.success("Specialty saved successfully!");
            this.setState({
                name: '',
                imageBase64: '',
                descriptionHTML: '',
                descriptionMarkdown: '',
            })
        }
        else {
            toast.error("Specialty saved error!");
        }
    }
    render() {
        return (
            <div className='container spcialty-container'>
                <head>
                    <title>Quản lý chuyên khoa</title>
                </head>
                <div className='title'>QUẢN LÝ CHUYÊN KHOA</div>

                <div className='all-specialty'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label>Tên chuyên khoa: </label>
                            <input className='form-control'
                                type='text' value={this.state.name}
                                onChange={(event) => this.handleOnchangeInput(event, "name")} />
                        </div>
                        <div className='col-6 form-group file'>
                            <label>Ảnh chuyên khoa: </label>
                            <input className='form-control-file' type='file'
                                onChange={(event) => this.handleOnchangeImg(event)}
                            />
                        </div>
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
                        onClick={() => this.handleSaveSpecialty()}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);