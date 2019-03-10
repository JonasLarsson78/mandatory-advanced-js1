import React, { Component } from 'react';
import io from 'socket.io-client';
import { loginObj } from './login';
import { emojify } from 'react-emojione';
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

function Unix_timestamp(time){
  let ts = new Date(time);
  return ts.toLocaleString() + " ";
}

function createUser(str) {

  function ur(){
    let text = document.querySelector("#theamName");
    
    if (text === null){
      text = "Marios"
    }
    if (text.textContent === "Marios"){
      return   <img className="charPic" alt="mario" src={require("./pics/mario_new.png")}/>
    }
    else if (text.textContent === "Lugis"){
      return   <img className="charPic" alt="lugi" src={require("./pics/lugi_new.png")}/>
    }
    else if (text.textContent === "Peachs"){
      return   <img className="charPic" alt="peach" src={require("./pics/peach_new.png")}/>
    }
    else if (text.textContent === "Yoshis"){
      return   <img className="charPic" alt="yoshi" src={require("./pics/yoshi_new.png")}/>
    }
  }

  return (
  <div key={str.id}><br/>
  <span className="messTime"><b>{Unix_timestamp(str.timestamp)}</b></span><br/>
  <span className="userName"><span className="marioPic">{ur()}</span><b>{" " + str.username + "  🠚 "}</b></span>
  <span className="userMess">{convertUrlEmoji(str.content)}</span>
  </div>
  );
}

function playAudio() { 
  let x = document.getElementById("myAudio");
  x.play(); 
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
    document.title = 'Marios Chat Window';
    this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
    
    this.socket.on('messages', function(data){
    this.setState({ messages: data });
    }.bind(this));
    this.setState({username: loginObj.loginName});
    this.socket.on('new_message', function(data){
      playAudio();
    this.setState({messages: [...this.state.messages, data]});
   }.bind(this));
  }

  componentDidUpdate = () => scrollBottom();

  componentWillUnmount = () => this.socket.disconnect();
  
  onChange = (e) => this.setState({content: e.target.value});

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
        playAudio();
        this.setState({messages: [...this.state.messages, response.data.newMessage]});
      });      
      textarea.placeholder = "Write chat text and press send or hit enter...";
    }
    else{
      textarea.placeholder = "Must type in text in the chat box to send message...";
    }
  }

mario = () => {
  document.title = 'Marios Chat Window';
  document.querySelector("#favicon").href = "./favicons/favicon_mario.ico";
  let img = document.querySelectorAll(".charPic");
  let back = document.querySelector(".main");
  back.classList.remove("lugi");
  back.classList.remove("peach");
  back.classList.remove("yoshi");
  this.setState({theamname: "Marios"});
  for (let i of img){
    i.src = require("./pics/mario_new.png");
  }
  }
lugi = () => {
 document.title = 'Lugis Chat Window';
 document.querySelector("#favicon").href = "./favicons/favicon_lugi.ico";
 let img = document.querySelectorAll(".charPic");
 let back = document.querySelector(".main");
 this.setState({theamname: "Lugis"}); 
 back.classList.add("lugi");
 back.classList.remove("peach");
 back.classList.remove("yoshi"); 
 for (let i of img){
   i.src = require("./pics/lugi_new.png");
 }
}
peach = () => {
  document.querySelector("#favicon").href = "./favicons/favicon_peach.ico";
  document.title = 'Peachs Chat Window';
  let img = document.querySelectorAll(".charPic");
  let back = document.querySelector(".main");
  this.setState({theamname: "Peachs"}); 
  back.classList.add("peach");
  back.classList.remove("lugi");
  back.classList.remove("yoshi"); 
  for (let i of img){
    i.src = require("./pics/peach_new.png");
  }
 }
 yoshi = () => {
  document.querySelector("#favicon").href = "./favicons/favicon_yoshi.ico";
  document.title = 'Yoshis Chat Window'; 
  let img = document.querySelectorAll(".charPic");
  let back = document.querySelector(".main");
  this.setState({theamname: "Yoshis"}); 
  back.classList.add("yoshi");
  back.classList.remove("lugi");
  back.classList.remove("peach"); 
  for (let i of img){
    i.src = require("./pics/yoshi_new.png");
  }
 }
 
  render() {
    
    return (
    <div className="mainRoot">
    <div className="themBack">
    <span className="themText"><b>Choose Theme: </b></span>
    <span className="themIcon"><img alt="mario" src={require("./pics/mario_new.png")} onClick={this.mario}/></span>
    <span className="themIcon"><img alt="lugi" src={require("./pics/lugi_new.png")} onClick={this.lugi}/></span>
    <span className="themIcon"><img alt="peach" src={require("./pics/peach_new.png")} onClick={this.peach}/></span>
    <span className="themIcon"><img alt="yoshi" src={require("./pics/yoshi_new.png")} onClick={this.yoshi}/></span>
    </div>
    <div className="mainHeader">
    <b><span role="img" aria-label="emoji1"> 🍄 </span><span id="theamName">{this.state.theamname}</span> Chat Window <span aria-label="emoji2" role="img"> 🍄 </span></b>
    <span className="mainChatName"><b>Signed in as: <span className="chatNameColor"> {this.state.username}</span></b></span>
    <button onClick={this.props.onOut} className="closeChat" title="Logout">Logout</button>
    </div>
    <div className="main mario">{this.state.messages.map(createUser)}</div>
    <textarea maxLength="200" placeholder="Write chat text and press send or hit enter..." onChange={this.onChange} onKeyDown={this.onEnterPress} className="inputText" type="text"/>
    <button onClick={this.onClick} className="sendBtn">Send</button>
    <div className="textError"></div>
    </div>
    );
  }
}

export default ChatWindow;
