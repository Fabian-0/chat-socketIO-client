import React from "react";
import { HashRouter, Route } from 'react-router-dom';
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Chat from "./components/chat/Chat";
import './App.css';

function App() {
  return (
    <div className="chat__container">
      <HashRouter>
        
        <Route path="/Signup" component={Signup} />
        <ProtectedRoute path="/chat">
          <Chat />
        </ProtectedRoute>
        <Route exact path="/" component={Login} />
      </HashRouter>
    </div>
  );
}

export default App;
