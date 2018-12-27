export const USER_DATA_REQUEST = 'USER_DATA_REQUEST';
export const USER_DATA_RECEIVE = 'USER_DATA_RECEIVE';
export const USER_DATA_FAILURE = 'USER_DATA_FAILURE';
export const LOGOUT = 'LOGOUT';
export const LOAD_UNAUTHORIZED_ROUTE = 'LOAD_UNAUTHORIZED_ROUTE';

export const userDataRequest = () => ({
  type: USER_DATA_REQUEST,
});

export const userDataReceive = data => ({
  type: USER_DATA_RECEIVE,
  data,
});

export const userDataFailure = error => ({
  type: USER_DATA_FAILURE,
  error,
});

export const logout = () => ({
  type: LOGOUT,
});


/**
 * state:
 *  { username
 *    token
 *    email
 *    is_tester}
 * use cases:
 *  register
 *     
 * login
 *    login as tester
 *    login as user
 *  logout
 *  
 * 
 * 
 */