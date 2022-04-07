import './App.css';
import 'semantic-ui-css/semantic.min.css'
import React from 'react'
import {
  BrowserRouter as Router,
} from "react-router-dom"
import Toolbar from './components/Toolbar'
import TheHeader from './components/TheHeader'
import TheRouter from './components/TheRouter';
import ProvideAuth from './components/ProvideAuth'
import { Grid } from 'semantic-ui-react'
import './coursesCalendarStyle.css';

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <TheHeader />
        <Grid>
          <Grid.Row>
            <Grid.Column width={1}>
              <Toolbar />
            </Grid.Column>
            <Grid.Column width={13} floated="centered">
              <TheRouter />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Router>
    </ProvideAuth>
  )
}
