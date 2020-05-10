import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import HomePage from './pages/home/home.component';
import VideoPage from './pages/video/video.component';
import LoginPage from './pages/login/login.component';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';

import { setCurrentUser } from './redux/user/user.actions';


class App extends React.Component {

  handleSubmitp = data =>{
    setCurrentUser( {username: data.username,sessionId:data.sessionId} );
  }

  componentDidMount(){
    const { setCurrentUser } = this.props;
    setCurrentUser( {username:'',sessionId:''} );
  }

  componentWillUnmount(){
   
  }

  render(){
    return (
      <div className="App">
        <header className="App-header">
          <div>
            <BrowserRouter>
              <Switch>
                <Route exact path='/home' component={HomePage} />
                <Route path='/videos' component={VideoPage} />
                <Route exact path='/' render={() => this.props.currentUser.sessionId !== '' ?
                    (<Redirect to='/videos'/>) :
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

const mapStateToProps = ({ user }) => ({
  currentUser: user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch( setCurrentUser(user) )
});

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(App);