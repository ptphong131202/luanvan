import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./ManageClinic.scss";
/* import { LANGUAGE } from "../../../utils" */
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import { CommonUtils } from '../../../../utils';
import { createNewClinic, getDetaiClinic, getAllClinic, updateClinic, deletedClinic } from "../../../../services/userService"
import { Toast, toast } from 'react-toastify';
import { update } from 'lodash';
const mdParser = new MarkdownIt(/* Markdown-it options */ );
class ManageClinic extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            name: '',
            address: '',
            imageBase64: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            listClinic: [],
            action: "",
            id: "",
            imgEdit: '',
            updateimgEdit: '',
        };
    }

    async componentDidMount ()
    {
        let res = await getAllClinic();
        if ( res && res.errCode === 0 )
        {
            this.setState( {
                listClinic: res.data,
                action: "CREATE",
                imgEdit: '0'
            } );
        }
    }

    componentDidUpdate = async ( prevProps, prevState ) =>
    {
    }
    handleOnchangeInput = ( event, name ) =>
    {
        let stateCopy = { ...this.state };
        stateCopy[ name ] = event.target.value;
        this.setState( stateCopy );
    };
    handleEditorChange = ( { html, text } ) =>
    {
        this.setState( {
            descriptionMarkdown: text,
            descriptionHTML: html,
        } )
    }


    // event in img for input file 
    handleOnchangeImg = async ( event ) =>
    {
        let file = event.target.files[ 0 ];
        if ( file )
        {
            let getBase64 = await CommonUtils.getBase64( file );
            /* let objectUrl = URL.createObjectURL(file); */
            this.setState( {
                /*   previewImg: objectUrl, */
                imageBase64: getBase64
            } )
        }
    }

    handleSaveClinic = async () =>
    {
        if ( this.state.action === "CREATE" )
        {
            let res = await createNewClinic( this.state );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Clinic saved successfully!" );
                this.setState( {
                    name: '',
                    address: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',

                } )
                let allclinic = await getAllClinic();
                if ( allclinic && allclinic.errCode === 0 )
                {
                    this.setState( {
                        listClinic: allclinic.data,
                        action: "CREATE",
                        imgEdit: '0'
                    } );
                }
            }
            else
            {
                toast.error( "Clinic saved error!" );
            }
        }
        else
        {
            let res = await updateClinic( {
                name: this.state.name,
                address: this.state.address,
                /* imageBase64: this.state.image, */
                descriptionHTML: this.state.descriptionHTML,
                descriptionMarkdown: this.state.descriptionMarkdown,
                id: this.state.id
            } );
            if ( res && res.errCode === 0 )
            {
                toast.success( "Clinic change successfully!" );
                this.setState( {
                    name: '',
                    address: '',
                    imageBase64: '',
                    descriptionHTML: '',
                    descriptionMarkdown: '',

                } )
            }
            else
            {
                toast.error( "Clinic change error!" );
            }
        }

    }


    handleEditUser = async ( item ) =>
    {
        let res = await getDetaiClinic( item.id );
        let imageBase64 = new Buffer( res.data.image, 'base64' ).toString( 'binary' );
        if ( res && res.errCode === 0 )
        {
            this.setState( {
                name: res.data.name,
                address: res.data.address,
                imageBase64: imageBase64,
                descriptionHTML: res.data.descriptionHTML,
                descriptionMarkdown: res.data.descriptionMarkdown,
                action: "EDIT",
                id: item.id
            } )
        }

        if ( this.state.action === "EDIT" )
        {
            this.setState( {
                imgEdit: "1"
            } )
        }
        else
        {
            this.setState( {
                imgEdit: "0"
            } )
        }
    }

    handleDeleteClinic = async ( item ) =>
    {
        let res = await deletedClinic( item.id );
        if ( res && res.errCode === 0 )
        {
            let allclinic = await getAllClinic();
            if ( allclinic && allclinic.errCode === 0 )
            {
                this.setState( {
                    listClinic: allclinic.data,
                    action: "CREATE",
                    imgEdit: "0"
                } );
            }
            toast.success( "Clinic delete successfully!" );
        }
        else
        {
            toast.error( "Clinic delete error!" );
        }
    }

    render ()
    {
        let { listClinic } = this.state;
        return (
            <>
                <div className='classManageClinic'>
                    <div className='container clinic-container'>
                        <head>
                            <title>quản lý phòng khám</title>
                        </head>
                        <div className='title mt-5'>QUẢN LÝ PHÒNG KHÁM</div>

                        <div className='all-specialty'>
                            <div className='row'>
                                <div className='col-4 form-group'>
                                    <label>Tên Phòng khám: </label>
                                    <input className='form-control'
                                        type='text' value={ this.state.name }
                                        onChange={ ( event ) => this.handleOnchangeInput( event, "name" ) } />
                                </div>
                                <div className='col-4 form-group'>
                                    <label>Địa chỉ phòng khám: </label>
                                    <input className='form-control'
                                        type='text' value={ this.state.address }
                                        onChange={ ( event ) => this.handleOnchangeInput( event, "address" ) } />
                                </div>
                                <div className='col-2 form-group file'>
                                    <label>Ảnh Phòng khám: </label>
                                    <input className='form-control-file' type='file'
                                        onChange={ ( event ) => this.handleOnchangeImg( event ) }
                                    />
                                </div>
                            </div>

                            <div className='label-markdown'>
                                <label >Description: </label>
                            </div>
                            <div className='markdown'>
                                <MdEditor
                                    style={ { height: '300px' } }
                                    renderHTML={ text => mdParser.render( text ) }
                                    onChange={ this.handleEditorChange }
                                    value={ this.state.descriptionMarkdown }
                                />
                            </div>
                        </div>
                        <div className='col-12 text-center button mt-2'>
                            <button className='btn btn-primary'
                                onClick={ () => this.handleSaveClinic() }
                            >{ this.state.action === "CREATE" ? 'Save' : "Change" }</button>
                        </div>
                    </div>
                </div>
                <div className='tableClinic'>
                    <div className='container'>
                        { listClinic && listClinic.map( ( item, index ) =>
                        {
                            return (
                                <div className='tableClinicContent'>
                                    <div className='tableClinicContent-name'>
                                        <img src={ item.image } />
                                        <div className='tableClinicContent-name-left'>
                                            <div className='contentName'>{ item.name }</div>
                                            <div className='contentAddress'>{ item.address }</div>
                                        </div>
                                    </div>
                                    <div className='tableClinicContent-action'>
                                        <button type='submit'
                                            className='button buttonDetail'
                                            onClick={ () => this.Moveto( 'system/detail-doctor', item.id ) }
                                            title='Infor clinic'
                                        ><i class="fas fa-info"></i></button>
                                        <button type='submit'
                                            className='button buttonEdit'
                                            onClick={ () => this.handleEditUser( item ) }
                                            title='Edit clinic'
                                        ><i className='fas fa-pencil-alt'></i></button>
                                        <button type='submit'
                                            className='button buttonDelete'
                                            onClick={ () => this.handleDeleteClinic( item ) }
                                            title='Delete clinic'
                                        ><i className='fas fa-trash'></i></button>
                                    </div>
                                </div>
                            )
                        } ) }
                    </div>
                </div>
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

export default connect( mapStateToProps, mapDispatchToProps )( ManageClinic );