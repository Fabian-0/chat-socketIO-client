import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { socketConnect } from "../../reducers/connectionReducer";
import { useForm } from "react-hook-form";
import "../../assets/css/chat.css";
import { Link } from "react-router-dom";

function Chat() {

  let location = useLocation();
  const dispatch = useDispatch();
  const [roomMessage, setRoomMessage] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const {user, connection} = useSelector((state) => state);
  const { register, handleSubmit, reset } = useForm();

  useEffect(()=>{
    console.log('render-socket-0');
    if(location.state?.chatroom && !connection.socket) dispatch(socketConnect(user.token, user.user, location.state?.chatroom));
    console.log(connection);
    console.log('render-socket');
  },[user.token]);

  useEffect(()=>{    
    console.log(connection);
    if(!connection.socket?.connected) return;
    connection.socket.on('roomData', (data)=>{
      setRoomData(data.users);
      console.log(data);
    })
    connection.socket.on("message", (data) => {
      const content = (data.text?.message) ? {user:data.user, text: data.text.message} : data;
      setRoomMessage(prevMessages => [...prevMessages, content]);
      console.log(data);
    });
    connection.socket.on("error", (data) => {
      console.log(data);
    });
  },[connection.socket?.connected]);

  const onSubmit = (data) => {
    console.log(data);
    connection.socket.emit('sendMessage', data, (error)=>{
      console.log(error);
    })
    reset();
  }
  console.log(roomMessage);
  return (
    <div className="Chat__messages-container">
      {connection.loading && <p className="Chat__loading">Loading....</p> }
      <div className="Chat__bar-info">
        <span className="Chat_connected-ball"></span>
        { user && <p className="Chat__user">{user.user}</p> }
        <Link onClick={()=> dispatch({type:'LOGOUT'})} to="/" replace className="Chat__logout">x</Link>
      </div>
      <div className="Chat__users-connected">
        { roomData.length && roomData.map(element => {
          return <p key={element.id} className="chat-users">{element.name}</p>
        })
      }
      </div>
      <div className="Chat__message-container">
        {roomMessage.length && 
          roomMessage.map((element, index)=>{
            return <p key={index} className="Chat__message-print"><span className="Chat__message-user">{element.user}</span>{element.text}</p>;
          })         
        }
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="Chat__form-messages">
        <input type="submit" value="Send"/>
        <input type="text" name="message" ref={register} />  
      </form>
    </div>
  );
}

export default Chat;