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

function createUser(str) {

  return (
  <div key={str.id}><br/>
  <span className="messTime"><b>{Unix_timestamp(str.timestamp)}</b></span><br/>
  <span className="userName"><b>{str.username + ": "}</b></span>
  <span className="userMess">{convertUrlEmoji(str.content)}</span>
  </div>
  );
}

function scrollBottom(){
  let element = document.querySelector(".main");
      element.scrollTop = element.scrollHeight;
}

function Unix_timestamp(t){
  let ts = new Date(t);
  return ts.toLocaleString() + " ";
}

class ChatWindow extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
     username: "",
     content: "",
     messages: [
    {
      id: "",
      username: "",
      content: "",
      timestamp: 0,
    },
  ]};
  this.onClick = this.onClick.bind(this);
  this.onChange = this.onChange.bind(this);
  this.onLogOut = this.onLogOut.bind(this);
}
  
  componentDidMount() {
    document.title = 'Chat Window';
    this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
    this.socket.on('messages', function(data){
      this.setState({ messages: data });
    }.bind(this));

    let login = loginObj.loginName;
    this.setState({username: login});
    
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
  
  onChange(e){
    let value = e.target.value;
      this.setState({content:value});
  }
  
  onClick(){
    let textarea = document.querySelector(".inputText");
    if (textarea.value !== ""){
      textarea.value = "";
    this.socket.emit('message', {
      username: this.state.username,
      content: this.state.content ,
      }, (response) => {
        if (response.status === "error"){
          console.log("Fel");
        }

        let x = response.data.newMessage;
        this.setState({messages: [...this.state.messages, x]});
      });
      document.querySelector(".textError").innerHTML = "";
    }
    else{
      document.querySelector(".textError").innerHTML = "Must type in text in the chat box to send message...";
    }
  }

  onLogOut(){
    this.props.onOut();
  }

  render() {
    let x = this.state.messages.map(createUser);
    return (
    <div className="mainRoot">
    <div className="mainHeader">
    <b><span role="img" aria-label="emoji1">🍄</span> Chat Window <span aria-label="emoji2" role="img">🍄</span></b>
    <span className="mainChatName"><b>Signed in as:</b> {this.state.username}</span>
    <button onClick={this.onLogOut} className="closeChat" title="Logout">Logout</button>
    </div>
    <div className="main">{x}</div>
    <textarea maxLength="200" placeholder="Write Chat Text..." onChange={this.onChange} className="inputText" type="text"/>
    <button onClick={this.onClick} className="sendBtn">Send</button>
    <div className="textError"></div>
    </div>
    );
  }
}

export default ChatWindow;
