import React, { Component } from 'react';
import './App.css';


class Login extends Component {
    constructor(props){
      super(props);
      this.state = {disabled: "disabled", mess1: "", mess2: ""};
    }
    
    componentDidMount(){
        document.title = 'Chat Login'
        document.querySelector("#favicon").href = "./favicons/favicon_mario.ico";   
    }
    
    onChange = (e) => {
        let value = e.target.value;
        this.filterLetter(value);        
        this.props.onChange(e);
      }

    filterLetter = (inputtxt) =>{
      let pattern = /^[0-9a-zA-Z_-\s]+$/;
      const result = pattern.test(inputtxt);

      if(result === true){
        this.setState({mess1: null});
        this.setState({mess2: null});
        this.setState({disabled: ""});
      }
      else{
        this.setState({mess1: "Login name between 1 to 12 letters."});
        this.setState({mess2: "Approved characters (0-9 a-z A-Z _-)"});
        this.setState({disabled: "disabled"});
      }
      }  

    render (){

        
        return (
          <>
                <img className="mario_login" alt="mario_login" src={require("./pics/login_mario.png")}/>
                <div className="mainLogin">
                <div className="mainLoginTitle">Chat Login:</div><br/>
                <input className="mainLoginInput" type="text" maxLength="12" onChange={this.onChange}  value={this.props.name} placeholder="Login Name"/>
                <button disabled={this.state.disabled} className="loginBtn" onClick={this.props.onLogin}>Login</button>
                <div className="loginMess">{this.state.mess1}</div>
                <div className="loginMess">{this.state.mess2}</div>
                </div>
          </>      
                );
    }
  }

  export default Login;
