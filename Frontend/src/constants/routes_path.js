//Requiring auth Routes
export const _admin_route = "/admin";
export const _user_route = "/user";
export const _tester_route = "/tester";

//require leading auth Routes
const _dashboard_route = "/dashboard";
const _workspace_route = "/workspace/:canvas_id";
export const _admin_dashboard_route = _admin_route + _dashboard_route;
export const _admin_workspace_route = _admin_route + _workspace_route;

export const _user_dashboard_route = _user_route + _dashboard_route;
export const _user_workspace_route = _user_route + _workspace_route;

export const _tester_dashboard_route = _tester_route + _dashboard_route;
export const _tester_workspace_route = _tester_route + _workspace_route;

//public Routes
export const _quickstart_route = "/quickstart";
export const _welcome_route = "/welcome";
export const _document_route = "/docs";
export const _canvas_preview_route = "/preview/:canvas_id";