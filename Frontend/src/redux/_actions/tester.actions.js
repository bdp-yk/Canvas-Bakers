import {
    testerConstants,
    alertConstants
} from '../_constants';
import {
    testerServices
} from '../_services';
import {
    alertActions
} from './';
import {
    history
} from '../_helpers';
import {
    _tester_route,
    _welcome_route
} from '../../constants';

export const testerActions = {
    check_test_season,
    register_tester_action,
    logout_tester,
    disconnect_tester,
    toggle_tester_register_modal,
    assert_tester
};

function toggle_tester_register_modal() {
    return dispatch => dispatch({
        type: testerConstants.TESTER_REGISTER_TOGGLE_MODAL
    })

}

function assert_tester(tester) {
    return dispatch => {
        testerServices.get_all_groups().then(
            response => dispatch({
                type: testerConstants.TESTER_REGISTER_SUCCESS,
                payload: {
                    tester,
                    available_groups: response.groups
                }
            })
        )

    }

}

function check_test_season() {
    return dispatch => {
        dispatch({
            type: testerConstants.TESTING_SEASON_REQUEST
        })
        testerServices.checktestseason().then(
            response => {
                // console.log(response);

                if (response.ok) {
                    dispatch({
                        type: testerConstants.TESTING_SEASON_SUCCESS,
                        payload: {
                            admin_code: response.admin_code,
                            groups: response.groups
                        }

                    })
                    // dispatch({ type: testerConstants.TESTER_REGISTER_TOGGLE_MODAL })
                } else
                    dispatch({
                        type: testerConstants.TESTING_SEASON_FAILURE
                    })
            }
        ).catch(
            error => dispatch({
                type: testerConstants.TESTING_SEASON_FAILURE
            })
        )
    }
}

function disconnect_tester() {
    return dispatch => {
        testerServices.logout(false);
    }
}

function register_tester_action(tester, push = true) {
    return dispatch => {
        dispatch(request(tester))
        testerServices.register_tester(tester).then(
            response => {
                dispatch(success(tester));
                // console.log("!Joinable",push)
                if (push)
                    history.push(_tester_route);
                else
                    window.location.reload()
            }

        ).catch(
            error => {
                dispatch(alertActions.error(error.toString()));
                dispatch(failure());
            }
        )
    }

    function request(tester) {
        return {
            type: testerConstants.TESTER_REGISTER_REQUEST,
            tester
        }
    }

    function success(tester) {
        return {
            type: testerConstants.TESTER_REGISTER_SUCCESS,
            tester
        }
    }

    function failure() {
        return {
            type: testerConstants.TESTER_REGISTER_FAILURE
        }
    }
}

function logout_tester() {

    return dispatch => {
        testerServices.logout().then(
            r => {
                dispatch({
                    type: testerConstants.TESTER_LOGOUT
                })

            }

        ).catch(e => {
            dispatch({
                type: alertConstants.ERROR_CLASS,
                message: "Something Bad Happened"
            })
        }).then(() => history.push(_welcome_route))
    }
}