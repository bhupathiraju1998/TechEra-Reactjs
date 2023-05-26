import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'
import MainPage from './components/MainPage'
import SubPage from './components/SubPage'
import NotFound from './components/NotFound'

import './App.css'

// Replace your code here
class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/courses/:id" component={SubPage} />
        <Route path="/not-found" component={NotFound} />
        <Redirect to="/not-found" />
      </Switch>
    )
  }
}

export default App
