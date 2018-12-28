import { modalConstants } from '../_constants';

export function modal(state = {}, action) {
  switch (action.type) {
    case modalConstants.TOGGLE:
      return {
        open: !state.open
      };
    case modalConstants.LOGIN_MODAL_TOGGLE:
      return {
        open: true,
        target_modal:modalConstants.LOGIN_MODAL_NAME
      };
    case modalConstants.REGISTER_MODAL_TOGGLE:
      return {
        open: true,
        target_modal:modalConstants.REGISTER_MODAL_NAME
      };
    default:
      return state
  }
}