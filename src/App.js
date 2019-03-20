import React, { Component } from 'react';
import Login from './login.js';
import ChatWindow from './chatwindow.js'
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {isLoggedIn: false, name: ""};

  }
  onChange = (e) => {
    console.log(e.target.value)
    this.setState({name: e.target.value});
  };

  onLogin = () => this.setState({isLoggedIn: true});
  onOut = () => this.setState({isLoggedIn: false});
    
  render() {
    return  (
          this.state.isLoggedIn ? <ChatWindow name={this.state.name} onOut={this.onOut}/> : <Login onChange={this.onChange} username={this.state.name} onLogin={this.onLogin}/>
          );
    }
}
 
export default App;