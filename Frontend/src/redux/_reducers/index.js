import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { user } from './user.reducer';
import { alert } from './alert.reducer';
import { modal } from './modal.reducer';
import { tester } from './tester.reducer';
import { canvas } from './canvas.reducer';
// import { notesVerdict } from './notes.verdict.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  user,
  alert,
  modal,
  tester,
  canvas,
  // notesVerdict
});

export default rootReducer;