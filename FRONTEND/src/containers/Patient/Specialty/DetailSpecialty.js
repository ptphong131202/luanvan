import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import "./DetailSpecialty.scss";
import HomeHeader from '../../HomePage/HomeHeader';
import DoctorSchedule from '../Doctor/DoctorSchedule';
import DoctorExtraInfor from '../Doctor/DoctorExtraInfor';
import ProfileDoctor from '../Doctor/ProfileDoctor';
import { withRouter } from 'react-router';
import { getDetaiSpecialty } from "../../../services/userService"
import HomeFooter from "../../HomePage/HomeFooter";
import _ from "lodash"
class DetailSpecialty extends Component
{

    constructor ( props )
    {
        super( props );
        this.state = {
            arrDoctorIds: [ 2, 3, 4, 5, 6 ],
            dataDetaiSpecialty: {},
            moreInfor: true
        };
    }

    async componentDidMount ()
    {
        if ( this.props.match && this.props.match.params && this.props.match.params.id )
        {
            let id = this.props.match.params.id;

            let response = await getDetaiSpecialty( {
                id: id,
                location: "ALL"
            } );


            if ( response && response.errCode === 0 )
            {
                this.setState( {
                    dataDetaiSpecialty: response.data,
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

    handleOnclickMoreInfor = () =>
    {
        this.setState( {
            moreInfor: !this.state.moreInfor
        } )
    }
    render ()
    {
        let { arrDoctorIds, dataDetaiSpecialty } = this.state;
        let doctorSpecialty = dataDetaiSpecialty.doctorSpecialty;
        return (
            <>
                <head>
                    <title>Chuyên khoa - { dataDetaiSpecialty.name }</title>
                </head>
                <HomeHeader />
                <div className='container detail-specialty'>
                    <div className='top'>
                        { this.state.moreInfor === false ?
                            <div className='top-content'   >
                                { dataDetaiSpecialty && !_.isEmpty( dataDetaiSpecialty ) &&
                                    <div dangerouslySetInnerHTML={ { __html: dataDetaiSpecialty.descriptionHTML } }></div>
                                }

                                <p className='more1' >
                                    <span onClick={ () => this.handleOnclickMoreInfor() }>Ẩn bớt</span>
                                </p>
                            </div>
                            :
                            <div className='top-content-hidden '>
                                <p className='more' >
                                    <span onClick={ () => this.handleOnclickMoreInfor() }>Xem thêm</span>
                                </p>
                                { dataDetaiSpecialty && !_.isEmpty( dataDetaiSpecialty ) &&
                                    <div dangerouslySetInnerHTML={ { __html: dataDetaiSpecialty.descriptionHTML } }></div>
                                }

                            </div>
                        }

                    </div>
                    <div className='detail-specialty-content'>
                        { doctorSpecialty && doctorSpecialty.length > 0
                            && doctorSpecialty.map( ( item, index ) =>
                            {
                                return (
                                    <div className='detail-specialty-content-down'>
                                        <div className='detail-specialty-content-down-left'>
                                            <ProfileDoctor
                                                doctorId={ item.doctorId }
                                                isOpenProfileDoctor={ true }
                                                /* time={this.props.dataScheduleTimeModal}  */ />
                                            <div className='more-infor' key={ index }
                                                onClick={ () => this.handleViewDetailDoctor( item.doctorId ) }>Xem thêm</div>
                                        </div>
                                        <div className='content-right'>
                                            <div className='doctorSchedule'>
                                                <DoctorSchedule
                                                    detailDoctor={ item.doctorId }
                                                    key={ index }
                                                />
                                            </div>
                                            <DoctorExtraInfor detailDoctor={ item.doctorId } />

                                        </div>
                                    </div>

                                )
                            } ) }
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

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( DetailSpecialty ) );