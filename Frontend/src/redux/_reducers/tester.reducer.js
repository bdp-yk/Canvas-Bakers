import { testerConstants } from '../_constants';

// state = {
//   testing_season_request: false,
//   testing_season_ok: false,

//   tester_register_request: false,
//   tester_register_success: false,
//   tester_register_failure: false,
//   tester_canvas: [],

//   tester: {
//     email: "",
//     group: ""
//   }

// }
export function tester(state = {}, action) {
  switch (action.type) {
    case testerConstants.TESTING_SEASON_REQUEST:
      return {
        ...state,
        testing_season_request: true,
        testing_season_ok: false,

      };
    case testerConstants.TESTING_SEASON_SUCCESS:
      return {
        ...state,
        testing_season_request: false,
        testing_season_ok: true,

      };
    case testerConstants.TESTING_SEASON_FAILURE:
      return {
        ...state,
        testing_season_request: false,
        testing_season_ok: false,

      };

    case testerConstants.TESTER_REGISTER_TOGGLE_MODAL:
      return {
        ...state,
        tester_register_request: !(state && state.tester_register_request),
        tester_register_success: false,
        tester_register_failure: false,

      };
    case testerConstants.TESTER_REGISTER_REQUEST:
      return {
        ...state,
        tester: action.tester,
        tester_register_request: true,
        tester_register_success: false,
        tester_register_failure: false,

      };
    case testerConstants.TESTER_REGISTER_SUCCESS:
      return {
        ...state,
        tester: action.tester,
        tester_register_request: false,
        tester_register_success: true,
        tester_register_failure: false,
      };
    case testerConstants.TESTER_REGISTER_FAILURE:
      return {
        ...state,
        tester: {},
        tester_register_request: false,
        tester_register_success: true,
        tester_register_failure: false,
      };




    case testerConstants.TESTER_LOGOUT:
      return {
        ...state,
        tester: {}
      };

    default:
      return state
  }
}