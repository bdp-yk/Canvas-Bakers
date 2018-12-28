import { testerConstants } from '../_constants';

state = {
  testing_season_request: false,
  testing_season_ok: false,
  testing_season_ko: false,

  tester_register_request: false,
  tester_register_success: false,
  tester_register_failure: false,

  tester: {
    testername: "",
    group: ""
  }

}
export function tester(state = {}, action) {
  switch (action.type) {
    case testerConstants.TESTING_SEASON_REQUEST:
      return {
        testing_season_request: true,
        testing_season_ok: false,
        testing_season_ko: false,

      };
    case testerConstants.TESTING_SEASON_SUCCESS:
      return {
        testing_season_request: false,
        testing_season_ok: true,
        testing_season_ko: false,

      };
    case testerConstants.TESTING_SEASON_FAILURE:
      return {
        testing_season_request: false,
        testing_season_ok: false,
        testing_season_ko: true,

      };

    case testerConstants.TESTER_REGISTER_REQUEST:
      return {
        tester: action.tester,
        tester_register_request: true,
        tester_register_success: false,
        tester_register_failure: false,

      };
    case testerConstants.TESTER_REGISTER_SUCCESS:
      return {
        tester: action.tester,
        tester_register_request: false,
        tester_register_success: true,
        tester_register_failure: false,
      };
    case testerConstants.TESTER_REGISTER_FAILURE:
      return {
        tester: {},
        tester_register_request: false,
        tester_register_success: true,
        tester_register_failure: false,
      };


    
    
    case testerConstants.TESTER_LOGOUT:
      return {
        tester: {}
      };

    default:
      return state
  }
}