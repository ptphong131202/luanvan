import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./ListSpecialty.scss";
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router';
import { getAllSpecialty, searchSpecialty } from "../../../services/userService"
import HomeFooter from "../../HomePage/HomeFooter";
import _ from "lodash"
class ListSpecialty extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            listSpecialty: [],
            isopen: false
        };
    }

    async componentDidMount ()
    {

        let res = await getAllSpecialty();
        console.log( res );
        this.setState( {
            listSpecialty: res.data
        } )

    }
    componentDidUpdate = async ( prevProps, prevState ) =>
    {


    }

    handleOnclistopen = ( item ) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/detail-specialty/${ item.id }` );
        }
    }

    handleOnchaneInput = async ( event ) =>
    {
        console.log( "check event input: ", event.target.value )
        let response = await searchSpecialty( event.target.value );
        if ( response && !_.isEmpty( response ) )
        {
            this.setState( {
                listSpecialty: response.data
            } )
        }

    }
    render ()
    {

        let { listSpecialty } = this.state;
        console.log( listSpecialty )
        return (
            <>
                <head>
                    <title>Danh sách chuyên khoa</title>
                </head>
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
                        { listSpecialty && !_.isEmpty( listSpecialty )
                            && listSpecialty.map( ( item, index ) =>
                            {
                                return (
                                    <div className='arrSpecialty'>
                                        <div className='seemore'>
                                            <span onClick={ () => this.handleOnclistopen( item ) }>
                                                Xem thêm
                                            </span>
                                        </div>
                                        <div className='specialty-item' key={ index }>
                                            <div className='logo'>
                                                <img src={ item.image } />
                                            </div>
                                            <div className='right'>

                                                <div className='down'>
                                                    <div className='desc' dangerouslySetInnerHTML={ { __html: item.descriptionHTML } }></div>

                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                )
                            } )

                        }

                        {
                            !listSpecialty &&
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

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( ListSpecialty ) );