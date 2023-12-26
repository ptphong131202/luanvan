import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./HomeHeader.scss";
import { FormattedMessage } from 'react-intl'; // fomat language
import { LANGUAGE } from '../../utils'; // vi or en
import { changeLanguage } from '../../store/actions'; // change language
import { withRouter } from 'react-router';
import { searchDoctor } from "../../services/userService"
import _ from 'lodash'
class HomeHeader extends Component
{
    constructor ( props )
    {
        super( props );
        this.state = {
            isopen: false,
            listdoctor: []
        }
    }
    // change language
    changeLanguage = ( language ) =>
    {
        // fire redux event: action
        this.props.changeLanguageApp( language ); // prop bettween redux and react
    }
    Moveto = ( name ) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/${ name }` );
        }
    }
    handleOnchangeInput = async ( event ) =>
    {
        let response = await searchDoctor( event.target.value );
        if ( response && !_.isEmpty( response ) )
        {
            this.setState( {
                listdoctor: response.data,
                isopen: true

            } )
        }
    }

    handleOnclistopen = ( item ) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/detail-doctor/${ item.id }` );
        }
    }
    render ()
    {
        let language = this.props.language; // lấy ngôn loai ngôn ngữ từ redux
        let { listdoctor } = this.state;
        console.log( "listdoctor", listdoctor )
        return (

            <React.Fragment>
                {/* header */ }
                <div className='home-header-container   '>
                    <div className='home-header-content'>
                        <div className='home-header-left'>
                            <div className='logo-img' onClick={ () => this.Moveto( 'home' ) }></div>
                        </div>
                        <div className='home-header-center'>
                            <div className='child-content' onClick={ () => this.Moveto( 'list-specialty' ) }>
                                <div className='child-content-name'><FormattedMessage id="homeheader.specialty" /></div>
                                <div className='child-content-title'><FormattedMessage id="homeheader.searchdoctor" /></div>
                            </div>
                            <div className='child-content' onClick={ () => this.Moveto( 'list-linic' ) }>
                                <div className='child-content-name'><FormattedMessage id="homeheader.medicalfacilities" /></div>
                                <div className='child-content-title'><FormattedMessage id="homeheader.choosehospital" /></div>
                            </div>
                            <div className='child-content' onClick={ () => this.Moveto( 'list-doctor' ) }>
                                <div className='child-content-name'><FormattedMessage id="homeheader.doctor" /></div>
                                <div className='child-content-title'><FormattedMessage id="homeheader.choosegooddoctor" /></div>
                            </div>
                            <div className='child-content' onClick={ () => this.Moveto( 'packet-exam' ) }>
                                <div className='child-content-name'><FormattedMessage id="homeheader.exampaacket" /></div>
                                <div className='child-content-title'><FormattedMessage id="homeheader.generalexamination" /></div>
                            </div>
                        </div>
                        <div className='home-header-right'>
                            <div className='support'>
                                <i className='fas fa-question-circle'></i> <FormattedMessage id="homeheader.help" />
                            </div>
                            <div className='language'>
                                {/** Chuyển đổi ngôn ngữ */ }
                                <div className={ language === LANGUAGE.VI ? "language-vi active" : "language-vi" }><span onClick={ () => { this.changeLanguage( LANGUAGE.VI ) } }>VI</span></div>
                                <div className={ language === LANGUAGE.EN ? "language-en active" : "language-en" }><span onClick={ () => { this.changeLanguage( LANGUAGE.EN ) } }>EN</span></div>

                            </div>
                        </div>
                    </div>
                </div>
                {/* Banner */ }
                { this.props.isShowBanner === true &&
                    <div className='home-header-banner'>
                        <div className='banner-container'>
                            <div className='banner-header'>
                                <div className='banner-header-name'><FormattedMessage id="banner.medicalfoundation" /></div>
                                <div className='banner-header-title'><FormattedMessage id="banner.healthcare" /></div>
                            </div>
                            <div className='banner-search'>
                                <div className='banner-search-content'>
                                    <i className='fas fa-search'></i>
                                    <input type='text' placeholder='Nhập để tìm kiếm' name='search'
                                        onChange={ ( event ) => this.handleOnchangeInput( event ) }
                                    />
                                </div>
                                { this.state.isopen === true &&
                                    <div className='listSearch'>
                                        { listdoctor &&
                                            listdoctor.map( ( item, index ) =>
                                            {
                                                if ( index <= 4 )
                                                    return (
                                                        <li key={ index } onClick={ () => this.handleOnclistopen( item ) }>
                                                            { language === 'vi' ? `${ item.firstName } ${ item.lastName }`
                                                                : `${ item.lastName } ${ item.firstName }` }
                                                        </li>
                                                    )
                                            } )


                                        }
                                        <li className='listSearch-seemore' onClick={ () => this.Moveto( 'list-doctor' ) }>
                                            <FormattedMessage id="homePage.more-info" />
                                        </li>
                                    </div>
                                }

                            </div>
                            <div className='banner-footer'>
                                <div className='banner-footer-content'>
                                    <div className='banner-footer-child'
                                        onClick={ () => this.Moveto( 'list-specialty' ) }
                                    >
                                        <div className='content-img'>
                                            <div className='content-icon content-icon1'></div>
                                        </div>
                                        <div className='content-title'

                                        ><FormattedMessage id="banner.specialist" /></div>
                                    </div>
                                    <div className='banner-footer-child' onClick={ () => this.Moveto( 'list-specialty' ) }>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon2'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.telemedicine" /></div>
                                    </div>
                                    <div className='banner-footer-child' onClick={ () => this.Moveto( 'list-specialty' ) }>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon3'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.generalsexam" /></div>
                                    </div>
                                    <div className='banner-footer-child' onClick={ () => this.Moveto( 'list-specialty' ) }>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon4'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.medicaltest" /></div>
                                    </div>
                                    <div className='banner-footer-child' onClick={ () => this.Moveto( 'list-specialty' ) }>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon5'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.mentalhealth" /></div>
                                    </div>
                                    <div className='banner-footer-child' onClick={ () => this.Moveto( 'list-specialty' ) }>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon6'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.dentalexam" /></div>
                                    </div>
                                    <div className='banner-footer-child' onClick={ () => this.Moveto( 'list-specialty' ) }>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon7'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.surgicalpacket" /></div>
                                    </div>
                                    <div className='banner-footer-child' onClick={ () => this.Moveto( 'list-specialty' ) }>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon8'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.healthylivedibet" /></div>
                                    </div>
                                    <div className='banner-footer-child' onClick={ () => this.Moveto( 'list-specialty' ) }>
                                        <div className='content-img'>
                                            <div className='content-icon content-icon9'></div>
                                        </div>
                                        <div className='content-title'><FormattedMessage id="banner.healthtest" /></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </React.Fragment>
        );
    }

}


const mapStateToProps = state =>
{
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        userInfo: state.user.userInfo,

    };
};

const mapDispatchToProps = dispatch => // fire event redux
{
    return {
        changeLanguageApp: ( language ) => dispatch( changeLanguage( language ) ) // truyền action
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( HomeHeader ) ); // kết nối redux và react
