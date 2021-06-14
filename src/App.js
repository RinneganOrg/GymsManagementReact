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

export default function App() {
  return (
    <ProvideAuth>
      <Router>
        <TheHeader />
        <Toolbar />
        <AuthButton />
        <TheRouter />
      </Router>
    </ProvideAuth>
  )
}
