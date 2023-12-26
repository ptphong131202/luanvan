import React, { Component } from 'react';
import { connect } from 'react-redux';

class HomeFooter extends Component
{

    render ()
    {
         
        return (
            <React.Fragment>
                <div className="homefooter">
                    &copy; Trang web được thực hiện bởi <a href="#"> Phạm Thanh Phong</a>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state =>
{
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch =>
{
    return {
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( HomeFooter );
