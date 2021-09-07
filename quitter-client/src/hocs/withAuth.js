import React, { Component } from 'react';
import { connect } from 'react-redux';


export default function withAuth(ComponentToBeRender) {
    class Authenticate extends Component {
        componentWillMount() {
            if (!this.props.isAuthenticated) {
                this.props.history.push('/signin');
            }
        }
        componentWillUpdate(nextProps) {
            if (!nextProps.isAuthenticated) {
                this.props.history.push('/signin');
            }
        }
        render(){
            return(
                <ComponentToBeRender {...this.props} />
            )
        }

    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.currentUser.isAuthenticated
        }
    }

    return connect(mapStateToProps, null)(Authenticate);
}

