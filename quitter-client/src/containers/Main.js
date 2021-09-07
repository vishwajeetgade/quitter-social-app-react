import React from 'react';
import { connect } from 'react-redux';
import { Switch, Route, withRouter, Redirect } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import Homepage from '../components/Homepage';
import { authUser } from '../store/actions/auth';
import { removeError } from '../store/actions/errors';
import MessageForm from './MessageForm';
import withAuth from '../hocs/withAuth';



const Main = props => {
    let { authUser, errors, removeError, currentUser } = props;
    return (
        <div className="container">
            <Switch>
                <Route exact path="/" render={props => <Homepage currentUser={currentUser} {...props} />} />
                <Route exact path="/signup" render={props =>
                    <AuthForm signup errors={errors} onAuth={authUser} removeError={removeError} heading="Are you Quiting Join Quitter" buttonText="Sign me up!" {...props} />
                } />
                <Route exact path="/signin" render={props =>
                    <AuthForm onAuth={authUser} errors={errors} removeError={removeError} heading="Welcome Back boi and gui" buttonText="Login" {...props} />
                } />
                <Route path="/user/:id/message/new" component={withAuth(MessageForm)} />
            </Switch>
        </div>
    )
};


function mapStateToProps(state) {
    return {
        // states from reducers
        currentUser: state.currentUser,
        errors: state.errors
    }
}


export default withRouter(connect(mapStateToProps, { authUser, removeError })(Main));
