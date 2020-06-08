import React, { Component } from 'react';
import Login from './login.js';
import ChatWindow from './chatwindow.js'
import {init , authWithPassword} from "./firebase/firebase"
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoggedIn: false,
      name: "",
      auth: false,
      inputData: {email: "", password:""}
    };

  }

  componentDidMount(){
        init()
  }


  onChange = (e) => {
    this.setState({name: e.target.value});
  };

  onLogin = () => this.setState({isLoggedIn: true});
  onOut = () => this.setState({isLoggedIn: false, auth: false});

  onChangeInputData = (e) =>{
     let { name, value } = e.target;
    this.setState({
        inputData: {
            ...this.state.inputData,
            [name]: value
        }
    });
  }
  auth =()=>{
    authWithPassword({email:this.state.inputData.email, password: this.state.inputData.password}).then((res) =>{
      this.setState({auth: true})
    }).catch(err => console.error(err.message)
    );
  }

  renderAuth = () => {
    return(<div>
      <input onChange={this.onChangeInputData} name="email" type="text" placeholder="mail"/>
    <br/>
    <input onChange={this.onChangeInputData} name="password" type="password" placeholder="password"/>
    <br/>
    <button onClick={this.auth}>Auth</button>
    </div>
    )
  }    
  render() {
    return  (
    !this.state.auth ? <div>{this.renderAuth()}</div> : this.state.isLoggedIn ? <ChatWindow name={this.state.name} onOut={this.onOut}/> : <Login onChange={this.onChange} username={this.state.name} onLogin={this.onLogin}/>
          );
    }
}
 
export default App;