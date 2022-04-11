import React from 'react';
import { Routes, Route } from "react-router-dom";
import Authenticate from './authenticate/Authenticate'
import Gyms from './gyms/Gyms'
import Trainers from './trainers/Trainers'
import Trainer from './trainers/Trainer'
import Users from './users/Users'
import Profile from './profile/Profile'
import Gym from './gyms/Gym'
import GymForm from './gyms/GymForm'
import TrainerForm from './trainers/TrainerForm'
import CourseForm from './courses/CourseForm'
import Courses from './courses/Courses'
import Course from './courses/Course'
import PrivateRoute from './PrivateRoute'

const TheRouter = () => {
  return (
    <Routes>
      <Route
        path="signin" 
        element={<Authenticate mode="signIn" />}>
      </Route>
      <Route 
        path="signup"
        element = {<Authenticate mode = "signUp" />}>
      </Route>
      <Route path="gyms">
        <Route index element={<Gyms />}/>
        <Route path=":gymId">
          <Route index element={<Gym />}/>
          <Route
            path="edit"
            element= {
              <PrivateRoute>
                <GymForm mode="edit" />
              </PrivateRoute>
            }/> 
          <Route path="trainers">
            <Route index element={<Trainers />}/>
            <Route path=":trainerId">
              <Route index element={<Trainer />}/>
              <Route
                path="edit"
                element= {
                  <PrivateRoute>
                    <TrainerForm mode="edit" />
                  </PrivateRoute>
                }/> 
            </Route>
            <Route
            path="add"
            element= {
              <PrivateRoute>
                <TrainerForm mode="add" />
              </PrivateRoute>
            }/>
        </Route>
        <Route path="courses">
          <Route index element={<Courses />}/>
          <Route path=":courseId">
            <Route index element={<Course />}/>
            <Route
              path="edit"
              element= {
                <PrivateRoute>
                  <CourseForm mode="edit" />
                </PrivateRoute>
              }/>
            <Route path="trainers">
              <Route path=":trainerId">
                <Route index element={<Trainer />}/>
                <Route
                  path="edit"
                  element= {
                  <PrivateRoute>
                    <TrainerForm mode="edit" />
                  </PrivateRoute>
                  }/>
              </Route>
            </Route>
            </Route>
          <Route
            path="add"
            element= {
              <PrivateRoute>
                <CourseForm mode="add" />
              </PrivateRoute>
            }/>
        </Route>
      </Route>
      <Route 
          path="add" 
          element= {
            <PrivateRoute>
              <GymForm mode="add" />
            </PrivateRoute>
          }/>
      </Route>
      <Route path="trainers">
        <Route index element={<Trainers />}/>
        <Route path=":trainerId" >
          <Route index element={<Trainer />}/>
          <Route
            path="edit"
            element= {
              <PrivateRoute>
                <TrainerForm mode="edit" />
              </PrivateRoute>
            }/> 
        </Route>
        <Route 
          path="add" 
          element= {
            <PrivateRoute>
              <TrainerForm mode="add" />
            </PrivateRoute>
          }/>
      </Route>
      <Route 
        path="users" 
        element= {
          <PrivateRoute>
            <Users />
          </PrivateRoute>
        }>
      </Route>
      <Route path="profile">
        <Route
        path=":userId" 
        element= {
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }/>
      </Route>
    </Routes>
  )
}
export default TheRouter;