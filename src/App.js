import React from 'react';
import './App.css';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import HomePage from './pages/home/home.component';
import VideoPage from './pages/video/video.component';
import LoginPage from './pages/login/login.component';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      login:{
        username:'Nitenz',
        movie: {
          timeWatched:'',
          isWatching: false,
          name:'',
          type:''
        }
      }
    };
  }
 
  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <BrowserRouter>
              <Switch>
                <Route exact path='/' component={HomePage} />
                <Route path='/videos' component={VideoPage} />
                <Route exact path='/login' render={() => this.props.currentUser ?
                    (<Redirect to='/'/>) :
                    (<LoginPage/> )} 
                />
              </Switch>
            </BrowserRouter>
          </div>
        </header>
      </div>
    );
  }
} 

export default App;
