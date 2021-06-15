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
import AuthButton from './components/AuthButton'
import { Grid } from 'semantic-ui-react'

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <TheHeader />
        <Grid columns={2}>
          <Grid.Column>
            <Toolbar />
          </Grid.Column>
          <Grid.Column>
            <AuthButton />
            <TheRouter />
          </Grid.Column>
        </Grid>
      </Router>
    </ProvideAuth>
  )
}
