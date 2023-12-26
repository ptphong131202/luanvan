import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./DetailHandbook.scss";
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router';
import { getDetalhandbookById } from "../../../services/userService"
import HomeFooter from "../../HomePage/HomeFooter";
import _ from "lodash"
class DetailHanbook extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            dataHandbook: ''
        };
    }

    async componentDidMount ()
    {
        if ( this.props.match && this.props.match.params && this.props.match.params.id )
        {
            let id = this.props.match.params.id;
            let response = await getDetalhandbookById( id );

            if ( response && response.errCode === 0 )
            {
                this.setState( {
                    dataHandbook: response.data,
                } )
            }
        }
    }
    componentDidUpdate = async ( prevProps, prevState ) =>
    {


    }

    handleViewDetailDoctor = ( item ) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/detail-doctor/${ item }` );
        }
    }


    render ()
    {
        let { dataHandbook } = this.state;
        return (
            <>
                <head>
                    <title>Cẩm nang</title>
                </head>
                <HomeHeader />

                <div className='container detailHandbook'>
                    { dataHandbook &&
                        <div className='detailHandbook-content'>
                            <div className='detailHandbook-name'>
                                { dataHandbook.name }
                            </div>
                            <div className='detailHandbook-desc' dangerouslySetInnerHTML={ { __html: dataHandbook.descriptionHTML } }></div>

                        </div> }
                </div>
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

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( DetailHanbook ) );