import React, { useState } from "react";
import {useForm} from 'react-hook-form'
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { userAuthThunk } from "../../reducers/userReducers";
import "../../assets/css/form.css";
import "../../assets/css/login.css";

function Login() {

  const [chatRoom, setChatRoom] = useState('');
  const dispatch = useDispatch();
  const {register, handleSubmit, errors} = useForm();
  const {user, error} =useSelector((state) => state.user)

  console.log(user);

  const onSubmit = (data) => {
    dispatch(userAuthThunk(data));
    setChatRoom(data.chatroom);
    return;
  };

  return (
    <>
      <div className="Chat__cont-loginForm form-container"> 
        <h2 className="form-title">Join</h2> 
        <form className="Chat__loginForm form" onSubmit={handleSubmit(onSubmit)}>
          <input ref={register({
            required: true
          })} type="email" name="email" placeholder="Email" className="Chat__login-input form-input" />
          {errors?.email && <span className="form-error">Email required</span>}
          <input ref={register({
            required: true
          })} type="password" name="password" placeholder="Password" className="Chat__login-input form-input" />
          {errors?.password && <span className="form-error">Password required</span>}
          <input ref={register({
            required: true
          })} type="text" name="chatroom" placeholder="Chat Room" className="Chat__login-input form-input" />
          {errors?.chatroom && <span className="form-error">Chat room required</span>}
          <input type="submit" className="Chat__login-btn form-btn" value="Sing up"/>
        </form>
        <Link to="./Signup" className="form-link">Create an accoutn</Link>
        {error && <span className="form-error">User not register</span>}
      </div>
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
    </>
  );
}

export default Login;