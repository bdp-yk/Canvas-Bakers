import {
    userConstants,
    alertConstants
} from '../_constants';
import {
    userService
} from '../_services';
// import {
//     alertActions
// } from './';
import {
    history
} from '../_helpers';
import {
    _dashboard_route
} from '../../constants';
import {
    who_am_i
} from '../../utils';

export const userActions = {
    // login,
    // logout,
    // register,
    // getAll,
    // delete: _delete,
    user_auth_action,
    user_login_action,
    user_get_by_id_action,
    user_register_action,
    user_update_action,
    user_delete_action,
    user_logout_action,
    get_all_testers_action
};

function user_auth_action(user) {
    return dispatch => {

    }

}

function user_login_action(user) {
    return dispatch => {
        userService.user_login_service(user).then(response => {
            console.log(response.ok);

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(response.user))
                history.push(_dashboard_route())
            } else {
                dispatch({
                    type: alertConstants.ERROR,
                    message: "Wrong Credentials!"
                })
            }
        })
    }

}

function user_get_by_id_action(user) {
    return dispatch => {


    }

}

function user_register_action(user) {
    return dispatch => {
        userService.user_register_service(user).then(response => {
            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(response.user))
                history.push(_dashboard_route())
                dispatch({
                    type: alertConstants.SUCCESS,
                    message: "Welcome to Smart Canvas"
                })
            } else {
                dispatch({
                    type: alertConstants.ERROR,
                    message: response.message
                })
            }
        })
    }

}

function user_update_action(user) {
    // console.log(user);

    return dispatch => {
        userService.user_update_service(user).then(
            response => {
                if (response.ok) {
                    let _user = who_am_i()
                    localStorage.setItem(_user.plan_type, JSON.stringify(response.user))
                    window.location.reload()
                } else {
                    dispatch({
                        type: alertConstants.ERROR,
                        message: "Can not update your profile!, Wrong Credentials"
                    })
                }
            }
        )
    }

}

function user_delete_action(user) {
    return dispatch => {

    }

}

function user_logout_action(user) {
    return dispatch => {

    }

}

// admin actions

function get_all_testers_action(user) {
    return dispatch => {
        dispatch({
            type: userConstants.GETALL_REQUEST,
            // payload: response["testers"]
        })
        userService.get_all_testers_service().then(response => {
            dispatch({
                type: userConstants.GETALL_SUCCESS,
                payload: response["testers"]
            })
        })
    }

}





// function login(email, password) {
//     return dispatch => {
//         dispatch(request({
//             email
//         }));

//         userService.login(email, password)
//             .then(
//                 user => {
//                     dispatch(success(user));
//                     history.push(_dashboard_route());
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };

//     function request(user) {
//         return {
//             type: userConstants.LOGIN_REQUEST,
//             user
//         }
//     }

//     function success(user) {
//         return {
//             type: userConstants.LOGIN_SUCCESS,
//             user
//         }
//     }

//     function failure(error) {
//         return {
//             type: userConstants.LOGIN_FAILURE,
//             error
//         }
//     }
// }

// function logout() {
//     userService.logout();
//     return {
//         type: userConstants.LOGOUT
//     };
// }

// function register(user) {
//     return dispatch => {
//         dispatch(request(user));

//         userService.register(user)
//             .then(
//                 user => {
//                     dispatch(success());
//                     history.push(_dashboard_route());
//                     dispatch(alertActions.success('Registration successful'));
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString()));
//                 }
//             );
//     };

//     function request(user) {
//         return {
//             type: userConstants.REGISTER_REQUEST,
//             user
//         }
//     }

//     function success(user) {
//         return {
//             type: userConstants.REGISTER_SUCCESS,
//             user
//         }
//     }

//     function failure(error) {
//         return {
//             type: userConstants.REGISTER_FAILURE,
//             error
//         }
//     }
// }

// function getAll() {
//     return dispatch => {
//         dispatch(request());

//         userService.getAll()
//             .then(
//                 users => dispatch(success(users)),
//                 error => dispatch(failure(error.toString()))
//             );
//     };

//     function request() {
//         return {
//             type: userConstants.GETALL_REQUEST
//         }
//     }

//     function success(users) {
//         return {
//             type: userConstants.GETALL_SUCCESS,
//             users
//         }
//     }

//     function failure(error) {
//         return {
//             type: userConstants.GETALL_FAILURE,
//             error
//         }
//     }
// }

// // prefixed function name with underscore because delete is a reserved word in javascript
// function _delete(id) {
//     return dispatch => {
//         dispatch(request(id));

//         userService.delete(id)
//             .then(
//                 user => dispatch(success(id)),
//                 error => dispatch(failure(id, error.toString()))
//             );
//     };

//     function request(id) {
//         return {
//             type: userConstants.DELETE_REQUEST,
//             id
//         }
//     }

//     function success(id) {
//         return {
//             type: userConstants.DELETE_SUCCESS,
//             id
//         }
//     }

//     function failure(id, error) {
//         return {
//             type: userConstants.DELETE_FAILURE,
//             id,
//             error
//         }
//     }
// }