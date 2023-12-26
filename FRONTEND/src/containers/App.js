import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { history } from '../redux'
import { ToastContainer } from 'react-toastify';


import { userIsAuthenticated, userIsNotAuthenticated } from '../hoc/authentication';

import { path } from '../utils'

import Home from '../routes/Home';
// import Login from '../routes/Login';
import Login from './Auth/Login';

import Header from './Header/Header';
import System from '../routes/System';

import { CustomToastCloseButton } from '../components/CustomToast';
import ConfirmModal from '../components/ConfirmModal';
import HomePage from './HomePage/HomePage';
import Doctor from '../routes/Doctor';

import DetailDoctor from './Patient/Doctor/DetailDoctor';
import VerifyEmail from './Patient/VerifyEmail';
import DetailSpecialty from './Patient/Specialty/DetailSpecialty';
import DetailClinic from "./Patient/Clinic/DetailClinic"
import ListSpecialty from './Patient/Specialty/ListSpecialty';
import ListClinic from './Patient/Clinic/ListClinic';
import ListDoctor from './Patient/Doctor/ListDoctor';
import DetailHandbook from './Patient/Handbook/DetailHandbook';
import ListHandBook from './Patient/Handbook/ListHandBook';
import PacketExam from './Patient/PacketExam/PacketExam';
class App extends Component {

    handlePersistorState = () => {
        const { persistor } = this.props;
        let { bootstrapped } = persistor.getState();
        if (bootstrapped) {
            if (this.props.onBeforeLift) {
                Promise.resolve(this.props.onBeforeLift())
                    .then(() => this.setState({ bootstrapped: true }))
                    .catch(() => this.setState({ bootstrapped: true }));
            } else {
                this.setState({ bootstrapped: true });
            }
        }
    };

    componentDidMount() {
        this.handlePersistorState();
    }

    render() {
        return (
            <Fragment>
                <Router history={history}>
                    <div className="main-container">
                        <ConfirmModal />


                        <span className="content-container">
                            <Switch>
                                <Route path={path.HOME} exact component={(Home)} />
                                <Route path={path.LOGIN} component={userIsNotAuthenticated(Login)} />
                                <Route path={path.SYSTEM} component={userIsAuthenticated(System)} />
                                <Route path={"/doctor/"} component={userIsAuthenticated(Doctor)} />
                                <Route path={path.HOMEPAGE} component={HomePage} />
                                <Route path={path.LISTSPECIALTY} component={ListSpecialty} />
                                <Route path={path.LISTCLINIC} component={ListClinic} />
                                <Route path={path.LISTDOCTOR} component={ListDoctor} />
                                <Route path={path.LISTHANDBOOK} component={ListHandBook} />
                                <Route path={path.DETAIL_DOCTOR} component={DetailDoctor} />
                                <Route path={path.PACKETEXAM} component={PacketExam} />
                                <Route path={path.DETAIL_SPECIALTY} component={DetailSpecialty} />
                                <Route path={path.DETAIL_CLINIC} component={DetailClinic} />
                                <Route path={path.DETAIL_HANDBOOK} component={DetailHandbook} />
                                <Route path={path.VERIFY_EMAIL_BOOK} component={VerifyEmail} />

                            </Switch>
                        </span>



                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                        />
                    </div>
                </Router>
            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);