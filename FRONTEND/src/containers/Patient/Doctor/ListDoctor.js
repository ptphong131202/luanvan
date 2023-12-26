import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./ListDoctor.scss";
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router';
import { getAllDoctor, searchDoctor } from "../../../services/userService"
import HomeFooter from "../../HomePage/HomeFooter";
import _ from "lodash"

class ListDoctor extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            listdoctor: [],
            isopen: false
        };
    }

    async componentDidMount ()
    {

        let res = await getAllDoctor();
        console.log( res );
        this.setState( {
            listdoctor: res.data
        } )

    }
    componentDidUpdate = async ( prevProps, prevState ) =>
    {


    }

    handleOnclistopen = ( item ) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/detail-doctor/${ item.id }` );
        }
    }
    handleOnchaneInput = async ( event ) =>
    {
        let response = await searchDoctor( event.target.value );
        if ( response && !_.isEmpty( response ) )
        {
            this.setState( {
                listdoctor: response.data
            } )
        }

    }

    render ()
    {

        let { listdoctor } = this.state;
        let { language } = this.props
        return (
            <>
                <head>
                    <title>Danh sách bác sĩ</title>
                </head>
                <HomeHeader />
                <div className='container listSpecialty listdoctor'>
                    <div className='form-search col-5 mx-auto'>
                        <i className='fas fa-search'></i>
                        <input type='text'
                            placeholder='Nhập để tìm kiếm bác sĩ'
                            onChange={ ( event ) => this.handleOnchaneInput( event ) }
                        />
                    </div>
                    <div className='specialty-list'>
                        { listdoctor && !_.isEmpty( listdoctor )
                            && listdoctor.map( ( item, index ) =>
                            {
                                return (
                                    <div className='arrSpecialty'>
                                        <div className='seemore doctor'>
                                            <span onClick={ () => this.handleOnclistopen( item ) }>
                                                Xem thêm
                                            </span>
                                        </div>
                                        <div className='specialty-item' key={ index }>
                                            <div className='logo'>
                                                <img src={ new Buffer( item.image, 'base64' ).toString( 'binary' ) } />
                                            </div>
                                            <div className='right'>
                                                <div className='top'>
                                                    { language === 'vi' && `${ item.positionData.valueVi }, ${ item.firstName } ${ item.lastName }` }
                                                    { language === 'en' && `${ item.positionData.valueEn }, ${ item.lastName } ${ item.firstName }` }
                                                </div>
                                                <div className='down'>
                                                    { item.Markdown.description }
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                )
                            } )

                        }
                        {
                            listdoctor && _.isEmpty( listdoctor ) &&
                            <div div className=' text-center fw-bold mt-3 fs-4'>
                                Không tìm thấy bác sĩ
                            </div>
                        }

                    </div>

                </div >
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

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( ListDoctor ) );