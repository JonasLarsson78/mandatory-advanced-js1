import React, { Component } from 'react';
import Login from './login.js';
import ChatWindow from './chatwindow.js'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {isLoggedIn: false};
  }

  onLogin = () => this.setState({isLoggedIn: true});
  onOut = () => this.setState({isLoggedIn: false});
    
  render() {
    return  (
          this.state.isLoggedIn ? <ChatWindow onOut={this.onOut}/> : <Login onLogin={this.onLogin}/>
          );
    }
}
 
export default App;