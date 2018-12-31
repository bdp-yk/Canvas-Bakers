import React from "react";
import { connect } from 'react-redux'
import { mapStateToProps, mapDispatchToProps } from "../utils";
import { canvasActions } from "../redux/_actions";

export function requireAuthentication(Component) {
    class StoreDependentRoute extends React.Component {
        render() {
            return <Route {...rest} render={() => (
                true ? <Component {...this.props} />
                    : <Redirect to={{ pathname: '/welcome', state: { from: props.location } }} />
            )} />
        }
    }


    return connect(mapStateToProps, mapDispatchToProps(canvasActions))(StoreDependentRoute);
}
