import { combineReducers } from 'redux';
import trainers from './trainers';
import gyms from './gyms';
import users from './users';
import comments from './comments';
import courses from './courses';
import toolbar from './toolbar';
import activities from './activities';

export default combineReducers({
  gyms,
  trainers,
  courses,
  users,
  comments,
  toolbar,
  activities
});