import { canvasConstants } from '../_constants';
const nanoid = require('nanoid');

const canvas_initial_schema = new_canvas => {
    return {
        canvas_id: nanoid(),
        // canvas_description: "",
        // canvas_name: "",
        // canvas_notes: [],
        // canvas_team: [],
        canvas_base_version: null,
        canvas_version_name: "",
        canvas_version_stamp: 0,
        ...new_canvas,
    }
}

// const canvas_store = {
//     init_canvas_request: true,
//     init_canvas_success: false,
//     init_canvas_failure: false,

//     update_canvas_request: false,
//     update_canvas_success: false,
//     update_canvas_failure: false,

//     load_canvas_request: false,
//     load_canvas_success: false,
//     load_canvas_failure: false,

//     delete_canvas_request: false,
//     delete_canvas_success: false,
//     delete_canvas_failure: false,

//     load_user_canvas_request: true,
//     load_user_canvas_success: false,
//     load_user_canvas_failure: false,

//     user_canvas: [],

//     canvas_versions: [],

// }
export function canvas(state = {}, action) {
    switch (action.type) {
        case canvasConstants.INIT_CANVAS_REQUEST:
            return {
                ...state,
                canvas_schema: canvas_initial_schema(action.schema)
            }
        case canvasConstants.INIT_CANVAS_SUCCESS:
            return {
                ...state,
                init_canvas_request: false,
                init_canvas_success: true,
                init_canvas_failure: false,
            };
        case canvasConstants.INIT_CANVAS_FAILURE:
            return {
                ...state,
                init_canvas_request: false,
                init_canvas_success: false,
                init_canvas_failure: true,

            };
        case canvasConstants.UPDATE_CANVAS_REQUEST:
            return {
                ...state,
                update_canvas_request: true,
                update_canvas_success: false,
                update_canvas_failure: false,
                canvas_schema: {
                    ...state.canvas_schema,
                    ...action.payload,
                }

            };
        case canvasConstants.UPDATE_CANVAS_SUCCESS:
            return {
                ...state,
                update_canvas_request: false,
                update_canvas_success: true,
                update_canvas_failure: false,

            };
        case canvasConstants.UPDATE_CANVAS_FAILURE:
            return {
                ...state,
                update_canvas_request: false,
                update_canvas_success: false,
                update_canvas_failure: true,

            };
        case canvasConstants.LOAD_CANVAS_REQUEST:
            return {
                ...state,
                update_canvas_request: true,
                update_canvas_success: false,
                update_canvas_failure: false,

            };
        case canvasConstants.LOAD_CANVAS_SUCCESS:
            return {
                ...state,
                ...action.payload,
                update_canvas_request: false,
                update_canvas_success: true,
                update_canvas_failure: false,

            };
        case canvasConstants.LOAD_CANVAS_FAILURE:
            return {
                ...state,
                update_canvas_request: false,
                update_canvas_success: false,
                update_canvas_failure: true,

            };
        case canvasConstants.DELETE_CANVAS_REQUEST:
            return {
                ...state,
                canvas_schema: {},
                delete_canvas_request: true,
                delete_canvas_success: false,
                delete_canvas_failure: false,

            };
        case canvasConstants.DELETE_CANVAS_SUCCESS:
            return {
                ...state,
                canvas_schema: {},
                delete_canvas_request: false,
                delete_canvas_success: true,
                delete_canvas_failure: false,

            };
        case canvasConstants.DELETE_CANVAS_FAILURE:
            return {
                ...state,
                canvas_schema: {},
                delete_canvas_request: false,
                delete_canvas_success: false,
                delete_canvas_failure: true,

            };


        case canvasConstants.LOAD_USER_CANVAS_REQUEST:
            return {
                ...state,
                load_user_canvas_request: true,
                load_user_canvas_success: false,
                load_user_canvas_failure: false,
            }
        case canvasConstants.LOAD_USER_CANVAS_SUCCESS:
            return {
                ...state,
                load_user_canvas_request: false,
                load_user_canvas_success: true,
                load_user_canvas_failure: false,
                user_canvas: action.user_canvas,
            }
        case canvasConstants.LOAD_USER_CANVAS_FAILURE:
            return {
                ...state,
                user_canvas: [],
                load_user_canvas_request: false,
                load_user_canvas_success: false,
                load_user_canvas_failure: true,

            }
        case canvasConstants.CLEAR_CANVAS_SCHEMA:
            return {
                ...state,
                canvas_schema: {}

            }
        default:
            return state
    }
}