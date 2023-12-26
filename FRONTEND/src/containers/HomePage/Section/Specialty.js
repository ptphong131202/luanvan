import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import { getAllSpecialty } from "../../../services/userService"
import { FormattedMessage } from 'react-intl'; // fomat language
import { withRouter } from 'react-router';

class Specialty extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            dataSpecialty: [],
        }
    }

    async componentDidMount ()
    {
        let res = await getAllSpecialty();
        if ( res && res.errCode === 0 )
        {
            this.setState( {
                dataSpecialty: res.data
            } )
        }
    }
    handleViewDetailDoctor = ( item ) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/detail-specialty/${ item.id }` );
        }
    }

    handleListDoctor = () =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/list-specialty` );
        }
    }
    render ()
    {
        let { dataSpecialty } = this.state;
        return (
            <React.Fragment>
                <div className='Section specialty'>
                    <div className='section-content '>
                        <div className='section-content-header'>
                            <div className='section-header-name'><FormattedMessage id="homePage.Outstanding-specialties" /></div>
                            <div className='section-header-navi'
                                onClick={ () => this.handleListDoctor() }
                            ><FormattedMessage id="homePage.more-info" /></div>
                        </div>
                        <Slider { ...this.props.settings }>
                            { dataSpecialty && dataSpecialty.map( ( item, index ) =>
                            {
                                return (
                                    <div className='section-list-ck' key={ index }
                                        onClick={ () => this.handleViewDetailDoctor( item ) }>
                                        <div className='section-list'>
                                            <div className='section-list-img'>
                                                <img className='' src={ item.image } />
                                            </div>
                                            <div className='section-list-name'>{ item.name }</div>
                                        </div>
                                    </div>
                                )
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
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( Specialty ) );
