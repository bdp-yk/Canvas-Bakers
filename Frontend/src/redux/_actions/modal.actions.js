import { modalConstants } from '../_constants';

export const modalActions = {
    toggle,
    toggleRegisterModal,
    toggleLoginModal
};

function toggle() {
    return { type: modalConstants.TOGGLE };
}

function toggleRegisterModal() {
    return { type: modalConstants.REGISTER_MODAL_TOGGLE };
}

function toggleLoginModal() {
    return { type: modalConstants.LOGIN_MODAL_TOGGLE };
}