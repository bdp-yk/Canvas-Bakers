import React from 'react';
import { Route, Redirect } from 'react-router-dom';
function AuthGuard() {
    return localStorage.getItem('user') || localStorage.getItem('tester') || localStorage.getItem('admin')
}
export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        AuthGuard()
            ? <Component {...props} />
            : <Redirect to={{ pathname: '/welcome', state: { from: props.location } }} />
    )} />
)