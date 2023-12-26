import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./ListClinic.scss";
import HomeHeader from '../../HomePage/HomeHeader';
import { withRouter } from 'react-router';
import { getAllClinic, searchClinic } from "../../../services/userService"
import HomeFooter from "../../HomePage/HomeFooter";
import _ from "lodash"
class ListClinic extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            listClinic: [],
            isopen: false
        };
    }

    async componentDidMount ()
    {

        let res = await getAllClinic();
        console.log( res );
        this.setState( {
            listClinic: res.data
        } )

    }
    componentDidUpdate = async ( prevProps, prevState ) =>
    {


    }

    handleOnclistopen = ( item ) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/detail-clinic/${ item.id }` );
        }
    }
    handleOnchaneInput = async ( event ) =>
    {
        console.log( "check event input: ", event.target.value )
        let response = await searchClinic( event.target.value );
        console.log( response )
        if ( response && !_.isEmpty( response ) )
        {
            this.setState( {
                listClinic: response.data
            } )
        }

    }

    render ()
    {

        let { listClinic } = this.state;
        return (
            <><head>
                <title>Danh sách phòng khám</title>
            </head>
                <HomeHeader />
                <div className='container listSpecialty'>
                    <div className='form-search col-5 mx-auto'>
                        <i className='fas fa-search'></i>
                        <input type='text'
                            placeholder='Nhập để tìm kiếm phòng khám'
                            onChange={ ( event ) => this.handleOnchaneInput( event ) }
                        />
                    </div>
                    <div className='specialty-list'>
                        { listClinic && !_.isEmpty( listClinic )
                            && listClinic.map( ( item, index ) =>
                            {
                                return (
                                    <div className='arrSpecialty'>
                                        <div className='seemore'>
                                            <span onClick={ () => this.handleOnclistopen( item ) } >
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
                            !listClinic &&
                            <div div className=' text-center fw-bold mt-3 fs-4'>
                                Không tìm thấy phòng khám
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

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( ListClinic ) );