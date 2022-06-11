import {Route, Switch} from 'react-router-dom'
import Login from './components/Login/index.js'
import Candidates from './components/Candidates/index.js'
import HomeWelcome from './components/HomeWelcome/index.js'
import AddCandidate from './components/AddCandidate'
import Register from './components/Register/index.js'
import EditCandidate from './components/EditCandidate'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound/index.js'


import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here 
const App = () => (
  <div>
    
    <Switch>
      <Route exact path="/" component={HomeWelcome} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/register" component={Register} />
      <ProtectedRoute exact path="/candidates" component={Candidates} />
      <ProtectedRoute exact path="/candidates/:id" component={EditCandidate} />
      <ProtectedRoute exact path="/add-candidate" component={AddCandidate} />
      <Route component={NotFound}/>
    </Switch>
    </div>
  
)

export default App