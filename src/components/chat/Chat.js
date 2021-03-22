import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { socketConnect } from "../../reducers/connectionReducer";
import { useForm } from "react-hook-form";
import "../../assets/css/chat.css";

function Chat() {
  let location = useLocation();
  const dispatch = useDispatch();
  const [roomMessage, setRoomMessage] = useState([]);
  const [roomData, setRoomData] = useState([]);
  const { user, connection } = useSelector((state) => state);
  const { register, handleSubmit, reset } = useForm();
  const scrollMessage = document.getElementById('scroll-message');

  useEffect(() => {  
    if (location.state?.chatroom && !connection.socket) {    
      dispatch(socketConnect(user.token, user.user, location.state?.chatroom));
    }
  }, [user.token]);

  useEffect(() => {  
    if (!connection.socket?.connected) return;
    connection.socket.on("roomData", (data) => {
      setRoomData(data.users);
    })
    connection.socket.on("message", (data) => {
      const content = data.text?.message
        ? { user: data.user, text: data.text.message }
        : data;
      setRoomMessage((prevMessages) => [...prevMessages, content]);
    });
    connection.socket.on("error", (error) => {   
      console.error(error); 
    });
  }, [connection.socket?.connected]);

  useEffect(()=>{
    if(!roomMessage.length) return;
    const innerHeight = scrollMessage.scrollHeight;
    scrollMessage.scroll(0,innerHeight);
  }, [roomMessage]);

  const onSubmit = (data) => {
    if(!data?.message) return;
    connection.socket.emit("sendMessage", data,(error) => {
      console.error(error);
    });
    reset();
  };
  return (
    <div className="Chat__messages-container">
      {connection.loading && <p className="Chat__loading">Loading....</p>}
      <div className="Chat__bar-info">
        <span className="Chat_connected-ball"></span>
        {user && <p className="Chat__user">{user.user}</p>}
        <a href="/" className="Chat__logout">x</a>
      </div>
      <div className="Chat__users-connected">
        {(roomData.length !== 0) &&
          roomData.map((element) => {
            return (
              <p key={element.id} className="chat-users">
                <span className="Chat_connected-ball"></span>{" "+element.name}
              </p>
            );
          })}
      </div>
      <div className="Chat__message-container" id="scroll-message">
        {(roomMessage.length !== 0) &&
          roomMessage.map((element, index) => {
            return (
              <div key={index} className={ (element.user === user.user) ? "Chat__message-print-right" : "Chat__message-print-left"}>
                {element.user === user.user && <span className="Chat__message-user">{element.user}</span>}
                <p>
                  {element.text}
                </p>
                {element.user !== user.user && <span className="Chat__message-user">{element.user}</span>}
              </div>
            );
          })}
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className="Chat__form-messages">
        <input type="text" name="message" ref={register} placeholder="message" className="input-messages" />
        <input type="submit" value="Send" className="btn-messages" />
      </form>
    </div>
  );
}

export default Chat;
