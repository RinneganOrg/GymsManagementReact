import { combineReducers } from 'redux';
import trainers from './trainers';
import gyms from './gyms';

console.log({gyms})
export default combineReducers({
  gyms,
  trainers
});