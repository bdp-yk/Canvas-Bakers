import { testerConstants } from '../_constants';
import { testerServices } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const testerActions = {
    check_test_season,
    signin_as_tester,
    logout_tester
};

function check_test_season() {
    return dispatch => {
        dispatch({ type: testerConstants.TESTING_SEASON_REQUEST })
        testerServices.checktestseason().then(
            response => {
                if (response.ok)
                    dispatch({ type: testerConstants.TESTER_REGISTER_SUCCESS })
                else
                    dispatch({ type: testerConstants.TESTING_SEASON_FAILURE })
            }
        ).catch(
            error => dispatch({ type: testerConstants.TESTING_SEASON_FAILURE })
        )
    }
}
function signin_as_tester(tester) {
    return dispatch => {
        dispatch(request(tester))
        testerServices.register_tester().then(
            response => {
                dispatch(success(response.tester));
                history.push('/quickstart/tester');
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
    return dispatch => dispatch({ type: testerConstants.TESTER_LOGOUT })
}
