import React from 'react'
import Home from './components/Home.jsx'
import UploadForm from './components/UploadForm.jsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
const App = () => {
  return (
    <Router>
      <Switch>
        <Container>
          <Route exact path='/' component={Home} />
          <Route exact path='/upload' component={UploadForm} />
        </Container>
      </Switch>
    </Router>
  )
}

export default App
