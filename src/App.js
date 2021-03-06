import React from 'react';
import { connect } from 'react-redux';
import './App.css';

import VideoPage from './pages/video/video.component';
import LoginPage from './pages/login/login.component';
import Logout from './components/logout/logout.component';
import LoginInfo from './components/login-info/login-info.component';

import { BrowserRouter, Switch, Route } from 'react-router-dom';
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
          <div className="page-container">
            <LoginInfo userName={this.props.currentUser.username}/>
            <BrowserRouter>
              <Switch>
                <Route exact path='/' render={() => this.props.currentUser.sessionId !== '' ? (<VideoPage/>) : (<LoginPage/> )} />
              </Switch>
            </BrowserRouter>
            <Logout />
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