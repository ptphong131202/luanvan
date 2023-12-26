import React, { Component } from 'react';
import { connect } from 'react-redux';

import HomeHeader from './HomeHeader.js';
import Specialty from "./Section/Specialty.js"
import ProfessionalDoctor from './Section/ProfessionalDoctor.js';
import HealthFacility from './Section/HealthFacility.js';
import HomeFooter from "./HomeFooter.js";
import HandBook from "./Section/HandBook.js"

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./HomePage.scss";
class HomePage extends Component {
    render() {
        var settings = {
            dots: false,
            infinite: false,
            speed: 500,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <React.Fragment>
                <head>
                    <title>Trang chủ</title>
                </head>
                <div> <HomeHeader isShowBanner={true} />
                    <Specialty settings={settings} />
                    <ProfessionalDoctor settings={settings} />
                    <HealthFacility settings={settings} />
                    <HandBook />
                    <HomeFooter />
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
