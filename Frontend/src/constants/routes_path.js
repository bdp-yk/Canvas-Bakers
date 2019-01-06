import {
    who_am_i
} from "../utils";

//Requiring auth Routes
export const _admin_route = "/admin";
export const _user_route = "/user";
export const _tester_route = "/tester";
let _auth_route = () => {
    if (who_am_i())
        switch (who_am_i()["class"]) {
            case "tester":
                return _tester_route;

            case "admin":
                return _admin_route;

            default:
                return _user_route;
        }
    return ""
}


//require leading auth Routes
export const _dashboard_route = () => _auth_route() + "/dashboard";
export const _workspace_path = () => _auth_route() + "/workspace/";
export const _workspace_route = () => _auth_route() + "/workspace/:canvas_id/:stamp?";
export const _workspace_link = (canvas_id, stamp = "") => {
    return _workspace_path() + `${canvas_id}/${stamp}`
};

//public Routes
export const _quickstart_route = "/quickstart";
export const _welcome_route = "/welcome";
export const _document_route = "/docs";
export const _canvas_preview_path = "/preview/";
export const _canvas_preview_route = _canvas_preview_path + ":canvas_id";