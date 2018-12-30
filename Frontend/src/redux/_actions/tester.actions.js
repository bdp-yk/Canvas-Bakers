import { testerConstants } from '../_constants';
import { testerServices } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const testerActions = {
    check_test_season,
    register_tester_action,
    logout_tester,
    toggle_tester_register_modal,
    assert_tester
};
function toggle_tester_register_modal() {
    return dispatch => dispatch({ type: testerConstants.TESTER_REGISTER_TOGGLE_MODAL })

}

function assert_tester(tester) {
    return dispatch=>dispatch(success(tester));
    function success(tester) { return { type: testerConstants.TESTER_REGISTER_SUCCESS, tester } }

}
function check_test_season() {
    return dispatch => {
        dispatch({ type: testerConstants.TESTING_SEASON_REQUEST })
        testerServices.checktestseason().then(
            response => {
                console.log(response);

                if (response.ok) {
                    dispatch({ type: testerConstants.TESTING_SEASON_SUCCESS })
                    // dispatch({ type: testerConstants.TESTER_REGISTER_TOGGLE_MODAL })
                }
                else
                    dispatch({ type: testerConstants.TESTING_SEASON_FAILURE })
            }
        ).catch(
            error => dispatch({ type: testerConstants.TESTING_SEASON_FAILURE })
        )
    }
}
function register_tester_action(tester) {
    return dispatch => {
        dispatch(request(tester))
        testerServices.register_tester(tester).then(
            response => {
                dispatch(success(tester));
                history.push('/quicktest');
            }

        ).catch(
            error => {
                dispatch(alertActions.error(error.toString()));
                dispatch(failure());
                history.push('/');
            }
        )
    }
    function request(tester) { return { type: testerConstants.TESTER_REGISTER_REQUEST, tester } }
    function success(tester) { return { type: testerConstants.TESTER_REGISTER_SUCCESS, tester } }
    function failure() { return { type: testerConstants.TESTER_REGISTER_FAILURE } }
}
function logout_tester() {

    return dispatch => {
        testerServices.logout().then(
            r => {
                dispatch({ type: testerConstants.TESTER_LOGOUT })
                history.push('/');
            }

        )
    }
}
