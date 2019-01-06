import React from 'react';
import { Router, Route, Redirect, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import NotificationAlert from "react-notification-alert";
import PerfectScrollbar from "perfect-scrollbar";

import { history } from '../redux/_helpers';
import { alertActions } from '../redux/_actions';
import { PrivateRoute } from '../_components';
import { WelcomeLayout, CanvasDefaultLayout, AdminLayout, TesterLayout, UserLayout, DocumentationLayout } from '../layouts';
import { _admin_route, _user_route, _tester_route, _canvas_preview_route, _welcome_route, _document_route } from '../constants';

var ps;

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

    componentDidMount() {
        if (navigator.platform.indexOf("Win") > -1) {
            document.documentElement.className += " perfect-scrollbar-on";
            document.documentElement.classList.remove("perfect-scrollbar-off");
            ps = new PerfectScrollbar(this.refs.mainPanel, { suppressScrollX: true });
            let tables = document.querySelectorAll(".table-responsive");
            for (let i = 0; i < tables.length; i++) {
                ps = new PerfectScrollbar(tables[i]);
            }
        }
    }
    componentWillUnmount() {
        if (navigator.platform.indexOf("Win") > -1) {
            ps.destroy();
            document.documentElement.className += " perfect-scrollbar-off";
            document.documentElement.classList.remove("perfect-scrollbar-on");
        }
    }
    componentDidUpdate(e) {
        if (history.action === "PUSH") {
            if (navigator.platform.indexOf("Win") > -1) {
                let tables = document.querySelectorAll(".table-responsive");
                for (let i = 0; i < tables.length; i++) {
                    ps = new PerfectScrollbar(tables[i]);
                }
            }
            document.documentElement.scrollTop = 0;
            document.scrollingElement.scrollTop = 0;
            this.refs.mainPanel.scrollTop = 0;
        }
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
        if (alert.message)
            this.notify(alert);
        return (
            <>
                <div className="wrapper">
                    <div
                        className="main-panel"
                        ref="mainPanel"
                    >

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
                    </div>
                </div>
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