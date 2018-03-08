import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import session from './session';
import validateUserFields from './validateUserFields';

const appReducer = combineReducers({
  form,
  session,
  validateUserFields,
});

export default function (state, action) {
  if (action.type === 'LOGOUT') {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
}
