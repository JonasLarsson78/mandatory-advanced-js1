import React, { Component } from 'react';
import Login from './login.js';
//import { Data } from './login.js';
import ChatWindow from './chatwindow.js'
import './App.css';



class App extends Component {
  //state = {isLoggedIn: false};
  constructor(props){
    super(props);
    this.state = {isLoggedIn: false};
    this.onLogin = this.onLogin.bind(this);
    this.onOut = this.onOut.bind(this);
  }

  onLogin() {
    this.setState({isLoggedIn: true});
  }
  onOut() {
    this.setState({isLoggedIn: false});
  }
    
  render() {
  

  return  (
        this.state.isLoggedIn ? <ChatWindow onOut={this.onOut}/> : <Login onLogin={this.onLogin}/>
        );
  }
}
 
export default App;