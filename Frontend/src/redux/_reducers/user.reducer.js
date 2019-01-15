import {
  userConstants
} from '../_constants';
const userInitState = {
  register_request: false,
  register_success: false,
  register_failure: false,

  login_request: false,
  login_success: false,
  login_failure: false,

  getall_request: false,
  getall_success: false,
  getall_failure: false,
  user: {},
  testers: []

}
export function user(state = userInitState, action) {
  switch (action.type) {
    case userConstants.REGISTER_REQUEST:
      return {
        ...state,
        register_request: true
      }
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        register_success: true
      }
    case userConstants.REGISTER_FAILURE:
      return {
        ...state,
        register_failure: true
      }
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        login_request: true
      }
    case userConstants.LOGIN_SUCCESS:
      return {
        ...state,
        login_success: true
      }
    case userConstants.LOGIN_FAILURE:
      return {
        ...state,
        login_failure: true
      }
    case userConstants.GETALL_REQUEST:
      return {
        ...state,
        getall_request: true
      }
    case userConstants.GETALL_SUCCESS:
      return {
        ...state,
        getall_success: true,
        testers: action.payload
      }
    case userConstants.GETALL_FAILURE:
      return {
        ...state,
        getall_failure: true
      }
    case userConstants.DELETE_REQUEST:
      return {
        ...state
      }
    case userConstants.DELETE_SUCCESS:
      return {
        ...state
      }
    case userConstants.DELETE_FAILURE:
      return {
        ...state
      }
    case userConstants.LOGOUT:
      return {
        ...state,
        user: {}
      }
    default:
      return state
  }
}