import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userRegisterThunk } from "../../reducers/userReducers";
import "../../assets/css/form.css";

function Singup() {

  const [chatRoom, setChatRoom] = useState('');
  const {user, error} =useSelector((state) => state.user)
  const {register, handleSubmit, errors} = useForm();
  const dispatch = useDispatch()
  
  const onSubmit = (data) => {
    dispatch(userRegisterThunk(data));
    setChatRoom(data.chatroom);
    return console.log(data);
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Register</h2>   
      <form className="Chat__singup-form form" onSubmit={handleSubmit(onSubmit)}>
        <input ref={register({
          required: true
        })} type="text" name="username" placeholder="User name" className="Chat__signup-input form-input" />
        {errors?.username && <span className="form-error">User name required</span>}
        <input ref={register({
          required: true
        })} type="email" name="email" placeholder="Email" className="Chat__signup-input form-input" />
        {errors?.email && <span className="form-error">Email required</span>}
        <input ref={register({
          required: true
        })} type="password" name="password" placeholder="Password" className="Chat__signup-input form-input" />
        {errors?.password && <span className="form-error">Password required</span>}
        <input ref={register({
          required: true
        })} type="text" name="chatroom" placeholder="Chat Room" className="Chat__signup-input form-input" />
        {errors?.chatroom && <span className="form-error">Chat room required</span>}
        <input type="submit" className="Chat__signup-btn form-btn" value="Sign up"/>
      </form>
      {error && <span className="form-error">{error}</span>}
      {user &&
        <Redirect to={{
          pathname: '/chat',
          state: {
            chatroom: chatRoom
          }
        }}
        replace 
        />
      }
    </div>
  );
}

export default Singup;