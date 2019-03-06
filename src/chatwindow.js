import React, { Component } from 'react';
import io from 'socket.io-client';
import { loginObj } from './login';
import {emojify} from 'react-emojione';
const Linkify = require('linkifyjs/react');

function convertUrlEmoji(str){
  let options = {/* … */};
  let content = emojify(str);
  return <Linkify tagName="span" options={options}>{content}</Linkify>;
    }

function scrollBottom(){
  let element = document.querySelector(".main");
      element.scrollTop = element.scrollHeight;
}

function Unix_timestamp(t){
  let ts = new Date(t);
  return ts.toLocaleString() + " ";
}

function createUser(str) {
  return (
  <div key={str.id}><br/>
  <span className="messTime"><b>{Unix_timestamp(str.timestamp)}</b></span><br/>
  <span className="userName"><span className="marioPic"><img className="charPic" alt="mario" src={require("./mario_new.png")}/></span><b>{" - " + str.username + " - "}</b></span>
  <span className="userMess">{convertUrlEmoji(str.content)}</span>
  </div>
  );
}

class ChatWindow extends Component {
  
  constructor(props) {
    super(props);
    this.state = {theamname: "Marios", username: "", content: "",
     messages: [
    {
      id: "",
      username: "",
      content: "",
      timestamp: 0,
    },
  ]};
}
  
  componentDidMount() {
    document.title = 'Chat Window';
    this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
    this.socket.on('messages', function(data){
      this.setState({ messages: data });
    }.bind(this));
    this.setState({username: loginObj.loginName});
    this.socket.on('new_message', function(data){
      this.setState({messages: [...this.state.messages, data]});
   }.bind(this));
  }

  componentDidUpdate() {
    scrollBottom();
}

  componentWillUnmount(){
    this.socket.disconnect();
    this.socket = null;
}
  
  onChange = (e) => this.setState({content:e.target.value});

  onEnterPress = (e) => {
    if(e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      this.onClick();
    }
  }
    
  onClick = () => {
    let textarea = document.querySelector(".inputText");
    if (textarea.value !== ""){
      textarea.value = "";
      this.socket.emit('message', {
        username: this.state.username,
        content: this.state.content ,
      }, (response) => {
        this.setState({messages: [...this.state.messages, response.data.newMessage]});
      });
      textarea.placeholder = "Write Chat Text...";
    }
    else{
      textarea.placeholder = "Must type in text in the chat box to send message...";
    }
  }

mario = () => {
  let img = document.querySelectorAll(".charPic");
  let back = document.querySelector(".main");
  back.classList.remove("lugi");
  back.classList.remove("peach");
  this.setState({theamname: "Marios"});
  for (let i of img){
    i.src = require("./mario_new.png");
  }
  }
lugi = () => {
 let img = document.querySelectorAll(".charPic");
 let back = document.querySelector(".main");
 this.setState({theamname: "Lugis"}); 
 back.classList.add("lugi");
 back.classList.remove("peach"); 
 for (let i of img){
   i.src = require("./lugi_new.png");
 }
}
peach = () => {
  let img = document.querySelectorAll(".charPic");
  let back = document.querySelector(".main");
  this.setState({theamname: "Peachs"}); 
  back.classList.add("peach");
  back.classList.remove("lugi"); 
  for (let i of img){
    i.src = require("./peach_new.png");
  }
 }
  render() {
    
    return (
       
    <div className="mainRoot">
    <div className="themBack">
    <span className="themText"><b>Choose Theme: </b></span>
    <span className="themIcon"><img alt="mario" src={require("./mario_new.png")} onClick={this.mario}/></span>
    <span className="themIcon"><img alt="lugi" src={require("./lugi_new.png")} onClick={this.lugi}/></span>
    <span className="themIcon"><img alt="peach" src={require("./peach_new.png")} onClick={this.peach}/></span>
    </div>
    <div className="mainHeader">
    <b><span role="img" aria-label="emoji1"> 🍄 </span>{this.state.theamname} Chat Window <span aria-label="emoji2" role="img"> 🍄 </span></b>
    <span className="mainChatName"><b>Signed in as:</b> {this.state.username}</span>
    <button onClick={this.props.onOut} className="closeChat" title="Logout">Logout</button>
    </div>
    <div className="main mario">{this.state.messages.map(createUser)}</div>
    <textarea maxLength="200" placeholder="Write Chat Text..." onChange={this.onChange} onKeyDown={this.onEnterPress} className="inputText" type="text"/>
    <button onClick={this.onClick} className="sendBtn">Send</button>
    <div className="textError"></div>
    </div>
    );
  }
}

export default ChatWindow;
