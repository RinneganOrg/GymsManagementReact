import { combineReducers } from 'redux';
import trainers from './trainers';
import gyms from './gyms';
import users from './users';
import suppliers from './suppliers';
import products from './products';

console.log({gyms})
export default combineReducers({
  gyms,
  trainers,
  users,
  suppliers,
  products
});