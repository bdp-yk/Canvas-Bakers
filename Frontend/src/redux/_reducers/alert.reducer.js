import { alertConstants } from '../_constants';

export function alert(state = {}, action) {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: alertConstants.SUCCESS_CLASS,
        message: action.message
      };
    case alertConstants.ERROR:
      return {
        type: alertConstants.ERROR_CLASS,
        message: action.message
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state
  }
}