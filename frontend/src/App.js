import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Home from './components/Home/Home';
import ViewPost from './components/ViewPost/ViewPost';
import Profile from './components/Profile/Profile';
import Follow from './components/Follow/Follow';
import Explore from './components/Explore/Explore';
import Messages from './components/Messages/Messages';
import Bookmarks from './components/Bookmarks/Bookmarks';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path='/login'>
          <Login />
        </Route>
        <Route exact path='/signup'>
          <Signup />
        </Route>
        <Route exact path='/'>
          <Home />
        </Route>
        <Route exact path='/explore'>
          <Explore/>
        </Route>
        <Route exact path='/bookmarks'>
          <Bookmarks/>
        </Route>
        {/* <Route path='/post/:id'>
          <ViewPost/>
        </Route> */}
        <Route path='/post/:id' component={ViewPost}/>
        <Route path='/profile/:id' component={Profile}/>
        <Route path='/follow/:id' component={Follow}/>
        <Route path='/messages/:id' component={Messages}/>
        
      </Switch>
      
    </div>
  );
}

export default App;
