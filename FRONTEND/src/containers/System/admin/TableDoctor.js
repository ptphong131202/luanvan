import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
/* import "./TableDoctor.scss"; */
import * as action from "../../../store/actions";

import { withRouter } from 'react-router';

import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */ );

// Finish!
function handleEditorChange ( { html, text } )
{
}


class TableDoctor extends Component
{
    // constructor
    constructor ( props )
    {
        super();
        this.state = {
            userRedux: [],

        }
    }

    componentDidMount ()
    {
        this.props.fetchDoctorRedux();
    }

    componentDidUpdate ( prevProps, prevState )
    {
        if ( prevProps.userList !== this.props.userList )
        {
            this.setState( {
                userRedux: this.props.userList
            } );
        }
    }

    handleAddNewUser = ( user ) =>
    {
        this.props.deleteUserRedux( user.id );
    }

    handleEditUser = ( user ) =>
    {
        console.log( "check user: ", user )

        this.props.handleEditUserFromParent( user )
    }

    Moveto = ( name, id ) =>
    {

        console.log( 'Moveto', name, id );
        if ( this.props.history )
        {
            this.props.history.push( `/${ name }?id=${ id }` );
        }
    }
    render ()
    {
        let arrayUsers = this.state.userRedux;
        return (
            <React.Fragment>
                <div className="users-container container userManage tabledoctor" >

                    <table className="table container mt-3 table-striped  table-bordered table-manager">
                        <thead className="thead-dark text-center">
                            <tr className="thead-dark text-center bg-th">
                                <th scope="col">#</th>
                                <th scope="col">Email</th>
                                <th scope="col">FirstName</th>
                                <th scope="col">LastName</th>
                                <th scope="col">Phone</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            { arrayUsers && arrayUsers.map( ( item, index ) =>
                            {
                                return (
                                    <>
                                        <tr>
                                            <th scope="row">{ index + 1 }</th>
                                            <td className='email'>{ item.email }</td>
                                            <td className='name'>{ item.firstName }</td>
                                            <td className='name'>{ item.lastName }</td>
                                            <td className='phone'>{ item.phone }</td>
                                            <td ><p className='address'>{ item.address }</p></td>
                                            <td className='action'>
                                                <button type='submit'
                                                    className='button buttonDetail'
                                                    onClick={ () => this.Moveto( 'system/detail-doctor', item.id ) }
                                                ><i class="fas fa-info"></i></button>
                                                <button type='submit'
                                                    className='button buttonEdit'
                                                    onClick={ () => this.handleEditUser( item ) }
                                                ><i className='fas fa-pencil-alt'></i></button>
                                                <button type='submit'
                                                    className='button buttonDelete'
                                                    onClick={ () => this.handleAddNewUser( item ) }
                                                ><i className='fas fa-trash'></i></button>
                                            </td>
                                        </tr>
                                    </>
                                )
                            } ) }

                        </tbody>
                    </table>

                </div>
                {/* <div className='container'> <div className="markdown"><MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} onChange={handleEditorChange} /></div></div> */ }
            </React.Fragment>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        userList: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
        fetchDoctorRedux: () => dispatch( action.fetchAllDoctorStart() ),
        deleteUserRedux: ( id ) => dispatch( action.deleteDoctor( id ) ),
    };
};

export default withRouter( connect( mapStateToProps, mapDispatchToProps )( TableDoctor ) );
