import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HandBook.scss";
import { getAllHandbook } from ".././../../services/userService"
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl'; // fomat language

class HandBook extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            listHandBook: []
        }
    }

    async componentDidMount ()
    {
        let res = await getAllHandbook();
        if ( res && res.errCode === 0 )
        {
            this.setState( {
                listHandBook: res.data
            } )
        }
    }

    handleViewDetailDoctor = ( item ) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/detail-handbook/${ item.id }` );
        }
    }

    handleListHandbook = () =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/list-handbook` );
        }
    }
    render ()
    {
        let settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 2,
            slidesToScroll: 1
        };
        let { listHandBook } = this.state;
        return (
            <React.Fragment>
                <div className='Section HandBook'>
                    <div className='section-content '>
                        <div className='section-content-header'>
                            <div className='section-header-name'><FormattedMessage id="homePage.Handbook" /></div>
                            <div className='section-header-navi'
                                onClick={ () => this.handleListHandbook() }
                            ><FormattedMessage id="homePage.more-info" /></div>
                        </div>
                        <Slider { ...settings }>
                            { listHandBook && listHandBook.map( ( item, index ) =>
                            {
                                return (
                                    <div className='section-list-ck section-list-handbook' key={ index }
                                        onClick={ () => this.handleViewDetailDoctor( item ) } >
                                        <div className='section-list handbook'>
                                            <div className='section-list-img section-list-img-handbook'>
                                                <img className='' src={ item.image } />
                                            </div>
                                            <div className=' section-list-name-handbook'>
                                                { item.name }
                                            </div>
                                        </div>
                                    </div>
                                )
                            } )
                            }



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
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( HandBook ) );
