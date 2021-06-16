import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PrivateJournals from './Components/PrivateJournals';
import CreateJournal from './Components/CreateJournal';
import UserInfo from './Components/UserInfo';
import JournalInfo from './Components/JournalInfo';
import { HashRouter as Router, Switch, Route} from "react-router-dom";

function App() {
  return (
    <>
        <Router basename="/">
        <Switch>
             <Route exact path ="/" component={Home} />
             <Route exact path ="/login" component={Login} />
             <Route exact path ="/signup" component={Signup} />
             <Route exact path ="/privatejournals" component={PrivateJournals} />
             <Route exact path ="/createjournal" component={CreateJournal} />
             <Route exact path = "/account" component={UserInfo} />
             <Route exact path="/journal/:id" 
                  render = {routeProps => (
                    <JournalInfo blogId={routeProps.match.params.id}  />
                  )}
              />
         </Switch>
         </Router>
    </>
  );
}

export default App;
