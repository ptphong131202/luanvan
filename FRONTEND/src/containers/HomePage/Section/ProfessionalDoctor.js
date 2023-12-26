import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "./ProfessionalDoctor.scss";
import * as actions from "../../../store/actions";
import { LANGUAGE } from "../../../utils"
import { FormattedMessage } from 'react-intl'; // fomat language
import { withRouter } from 'react-router';
class ProfessionalDoctor extends Component
{
    constructor ( props )
    {
        super();
        this.state = {
            arrDoctor: [],
        }
    }

    componentDidUpdate ( prevProps, prevState, snapshot )
    {
        if ( prevProps.topDoctorRedux !== this.props.topDoctorRedux )
        {

            this.setState( {
                arrDoctor: this.props.topDoctorRedux
            } )
        }
    }
    componentDidMount ()
    {
        this.props.loadTopDoctors();
    }

    handleViewDetailDoctor = ( doctor ) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/detail-doctor/${ doctor.id }` );
        }
    }

    handleListlDoctor = () =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/list-doctor` );
        }
    }
    render ()
    {
        let arrDoctors = this.state.arrDoctor;
        let { language } = this.props;
        return (
            <React.Fragment>
                <div className='Section ProfessionalDoctor'>
                    <div className='section-content '>
                        <div className='section-content-header'>
                            <div className='section-header-name'><FormattedMessage id="homePage.out-standing-doctor" /></div>
                            <div className='section-header-navi' onClick={ () => this.handleListlDoctor() }><FormattedMessage id="homePage.more-info" /></div>
                        </div>
                        <Slider { ...this.props.settings }>

                            { arrDoctors && arrDoctors.length > 0 && arrDoctors.map( ( item, index ) =>
                            {
                                let imageBase64 = '';
                                if ( item.image )
                                {
                                    imageBase64 = new Buffer( item.image, 'base64' ).toString( 'binary' );
                                }
                                let namevi = `${ item.positionData.valueVi }, ${ item.firstName } ${ item.lastName }`
                                let namen = `${ item.positionData.valueEn }, ${ item.firstName } ${ item.lastName }`
                                return ( <div className='section-list-ck' key={ index } onClick={ () => this.handleViewDetailDoctor( item ) }>
                                    <div className='section-list imgProfessionalDoctor'>
                                        <div className='section-list-img'>
                                            <img className='imgProfessionalDoctor' src={ imageBase64 } />
                                        </div>
                                        <div className='section-list-name imgProfessionalDoctor-name'>
                                            <div> { language === LANGUAGE.VI ? namevi : namen }</div>
                                            <div></div>
                                        </div>
                                    </div>
                                </div> );
                            } ) }



                        </Slider>
                    </div>
                </div >
            </React.Fragment >
        );
    }

}

const mapStateToProps = state =>
{
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        topDoctorRedux: state.admin.topDoctors,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        loadTopDoctors: () => dispatch( actions.fetchTopDoctorHome() )
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( ProfessionalDoctor ) );
