
// The key for our auth token, stored in a cookie
// TODO: Dedupe with the value in server/config/defaults.json
// As well as in webpackDevServer.config
export const AUTH_TOKEN_KEY = 'canvas-baker-auth-token';

// The key for our local-storage content
export const LOCAL_STORAGE_REDUX_DATA_KEY = 'canvas-baker-redux-data';

// The Api Providing Server adress
export const BASE_URL = 'http://127.0.0.1/';
export const API_URL = BASE_URL+'api/v1/';
export const AUTH_API_URL = API_URL+'auth/';
export const CANVAS_API_URL = API_URL+'canvas/';