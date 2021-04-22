import React from 'react'
import Home from './components/Home.jsx'
import UploadForm from './components/UploadForm.jsx'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ContextProvider from './ContextProvider'
const App = () => {
  return (
    <Router>
      <ContextProvider>
        <Switch>
          <Container>
            <Route exact path='/' component={Home} />
            <Route exact path='/upload' component={UploadForm} />
          </Container>
        </Switch>
      </ContextProvider>
    </Router>
  )
}

export default App
