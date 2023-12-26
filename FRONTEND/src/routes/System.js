import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
/* import UserManage from '../containers/System/UserManage'; */
import UserRedux from '../containers/System/admin/UserRedux';
import Header from '../containers/Header/Header';
import ManageDoctor from '../containers/System/admin/ManageDoctor';
import DoctorRedux from '../containers/System/admin/DoctorRedux';
import ManageAdmin from '../containers/System/admin/ManageAdmin';
import ManageSpecialty from '../containers/System/admin/Specialty/ManageSpecialty';
import ManageClinic from '../containers/System/admin/Clinic/ManageClinic';
import ManageHandbook from '../containers/System/admin/HandBook/ManageHandbook';
class System extends Component
{
    render ()
    {
        /* { this.props.isLoggedIn && <Header /> } */
        const { systemMenuPath, isLoggedIn } = this.props;
        return (
            <React.Fragment>
                { isLoggedIn && <Header /> }
                <div className="system-container">
                    <div className="system-list">
                        <Switch>
                            <Route path="/system/user-redux" component={ UserRedux } />
                            <Route path="/system/manage-doctor" component={ DoctorRedux } />
                            <Route path="/system/detail-doctor" component={ ManageDoctor } />
                            <Route path="/system/manage-admin" component={ ManageAdmin } />
                            <Route path="/system/manage-specialty" component={ ManageSpecialty } />
                            <Route path="/system/manage-clinic" component={ ManageClinic } />
                            <Route path="/system/manage-handbook" component={ ManageHandbook } />
                            <Route component={ () => { return ( <Redirect to={ systemMenuPath } /> ) } } />
                        </Switch>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state =>
{
    return {
        systemMenuPath: state.app.systemMenuPath,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( System );
