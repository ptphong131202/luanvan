import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./ListHandBook.scss";
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router';
import { getAllHandbook, searchSpecialty } from "../../../services/userService"
import HomeFooter from "../../HomePage/HomeFooter";
import _ from "lodash"
class ListHandBook extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            listHandBook: [],
        };
    }

    async componentDidMount ()
    {

        let res = await getAllHandbook();
        console.log( res );
        this.setState( {
            listHandBook: res.data
        } )

    }
    componentDidUpdate = async ( prevProps, prevState ) =>
    {


    }

    handleOnclistopen = ( item ) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/detail-handbook/${ item.id }` );
        }
    }

    handleOnchaneInput = async ( event ) =>
    {
        console.log( "check event input: ", event.target.value )
        let response = await searchSpecialty( event.target.value );
        if ( response && !_.isEmpty( response ) )
        {
            this.setState( {
                listHandBook: response.data
            } )
        }

    }
    render ()
    {

        let { listHandBook } = this.state;
        console.log( listHandBook )
        return (
            <>
                <HomeHeader />
                <div className='container listSpecialty'>
                    <div className='form-search col-5 mx-auto'>
                        <i className='fas fa-search'></i>
                        <input type='text'
                            placeholder='Nhập để tìm kiếm chuyên khoa'
                            onChange={ ( event ) => this.handleOnchaneInput( event ) }
                        />
                    </div>
                    <div className='specialty-list'>
                        { listHandBook && !_.isEmpty( listHandBook )
                            && listHandBook.map( ( item, index ) =>
                            {
                                return (
                                    <div className='arrSpecialty-handbook' key={ index }
                                        onClick={ () => this.handleOnclistopen( item ) }
                                    >

                                        <div className='specialty-item' >
                                            <div className='logo'>
                                                <img className='img-handbook' src={ item.image } />
                                            </div>
                                            <div className='right'>

                                                { item.name }
                                            </div>

                                        </div>

                                    </div>
                                )
                            } )

                        }

                        {
                            !listHandBook &&
                            <div div className=' text-center fw-bold mt-3 fs-4'>
                                Không tìm thấy chuyên khoa
                            </div>
                        }

                    </div>

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

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( ListHandBook ) );