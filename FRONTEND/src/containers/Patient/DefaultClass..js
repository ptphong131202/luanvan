import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
/* import "./DefaultClass.scss"; */
class DefaultClass extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidUpdate = async (prevProps, prevState) => {


    }


    render() {
        return (<div></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);