import React from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import Home from './page/home'
import ExpressionZero from './page/expressionZero'
import Traveler from './page/traveler'
import 'antd/dist/antd.css'
import './App.css'
import './common/commonCSS/index.css'

function App() {
  const history = useHistory()

  return (
    <div className="App">
      <Switch>
        <Route path='/expressionZero'>
          <ExpressionZero
            history={history}
          />
        </Route>
        <Route path='/traveler'>
          <Traveler
            history={history}
          />
        </Route>
        <Route path='/'>
          <Home
            history={history}
          />
        </Route>
      </Switch>
    </div>
  )
}

export default App
