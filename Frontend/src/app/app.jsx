import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import NotificationAlert from "react-notification-alert";

import { history } from '../redux/_helpers';
import { alertActions } from '../redux/_actions';
import { PrivateRoute } from '../_components';
import { WelcomeLayout, CanvasDefaultLayout, AdminLayout, TesterLayout, UserLayout, DocumentationLayout } from '../layouts';
import { _admin_route, _user_route, _tester_route, _canvas_preview_route, _welcome_route, _document_route } from '../constants';
class App extends React.Component {
    constructor(props) {
        super(props);

        const { dispatch } = this.props;
        history.listen((location, action) => {
            // console.log("Clear every alert?", location, action);

            // clear alert on location change
            dispatch(alertActions.clear());
        });
        this.notify = this.notify.bind(this)
    }
    notify = alert => {
        var options = {};
        options = {
            ...alert,
            place: "bl",
            icon: "tim-icons icon-bell-55",
            autoDismiss: 7
        };
        this.refs.notificationAlert.notificationAlert(options);
    };

    render() {
        const { alert } = this.props;
        alert.message && this.notify(alert);
        return (
            <>

                <div className="react-notification-alert-container">
                    <NotificationAlert ref="notificationAlert" />
                </div>
                <Router history={history}>
                    <Switch>
                        <PrivateRoute path={_admin_route} component={AdminLayout} />
                        <PrivateRoute path={_user_route} component={UserLayout} />
                        <PrivateRoute path={_tester_route} component={TesterLayout} />
                        <Route path={_canvas_preview_route} component={CanvasDefaultLayout} />
                        <Route path={_welcome_route} component={WelcomeLayout} />
                        <Route path={_document_route} component={DocumentationLayout} />
                        <Redirect from="/*" to={_welcome_route} />
                    </Switch>
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