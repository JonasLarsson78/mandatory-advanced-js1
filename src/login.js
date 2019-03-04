import React, { Component } from 'react';
import './App.css';
export let loginObj = {loginName:""};


function filterLetter(inputtxt){
let btn = document.querySelector(".loginBtn");
let letters = /^[0-9a-zA-Z_-\s]+$/;
btn.setAttribute("disabled", "disabled");
   if(inputtxt.match(letters)){
     btn.removeAttribute("disabled");
      return inputtxt;
     }
     else{
        btn.setAttribute("disabled", "disabled");
     }
  }


class Login extends Component {
    constructor(props) {
      super(props);
      this.state = {login: "", isLoggedIn: false};
      this.onChange = this.onChange.bind(this);
      this.loginName = this.loginName.bind(this);
    }
    componentDidMount(){
        document.title = 'Chat Login'   
     filterLetter("");   
    }
    
    loginName(){
        this.props.onLogin();
    }
    
    onChange(e){
        let value = e.target.value;
        let validText = filterLetter(value);
        loginObj.loginName = validText;
        this.setState({login: validText});
      }

    render (){
        
        return (
                
                <div className="mainLogin">
                <div className="mainLoginTitle">Chat Login:</div><br/>
                <input className="mainLoginInput" type="text" maxLength="12" onChange={this.onChange} placeholder="Login Name"/>
                <button className="loginBtn" onClick={this.loginName}>Login</button>
                <div className="loginMess"></div>
                </div>
                
                );
    }
  }
  

  export default Login;
  