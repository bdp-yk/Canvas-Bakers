import React from 'react';
import { Router, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import NotificationAlert from "react-notification-alert";

import { history } from '../redux/_helpers';
import { alertActions } from '../redux/_actions';
import { PrivateRoute } from '../_components';
import { WelcomeLayout, CanvasLayout, AdminLayout } from '../layouts';

class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // clear alert on location change
            dispatch(alertActions.clear());
        });
    }
    notify = alert => {
        var options = {};
        options = {
            place: "tl",
            ...alert,
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
    };

    render() {
        // const { alert } = this.props;
        return (
            <>
                {/* {alert.message &&
                    <div className={`react-notification-alert-container alert ${alert.type}`}>{alert.message}</div>
                } */}
                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert" />
                </div>
                <Router history={history}>
                    <div>
                        <PrivateRoute exact path="/" component={CanvasLayout} />
                        <PrivateRoute path="/admin" render={props => <AdminLayout {...props} />} />
                        <Route path="/welcome" component={WelcomeLayout} />
                        <Redirect from="*" to="/" />
                    </div>
                </Router>
            </>
        );
    }
}

function mapStateToProps(state) {
    const { alert } = state;
    return {
        alert
    };
}

const connectedApp = connect(mapStateToProps)(App);
export { connectedApp as App }; 