import io from 'socket.io-client';

const INITIAL_STATE = {
  socket: null,
  error: null,
  room: null,
  loading: false
}

export const connectionReducer = (state  = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SOCKET_INIT':
      return({
        ...state,
        loading: true
      });
    case 'SOCKET_CONNECT':
      return({
        ...state,
        socket: action.payload,
        loading: false
      });
    default:
      return state;
  }
}



export const socketConnect = (token, user, chatRoom) => {
  return (dispatch) => {
    dispatch({type: 'SOCKET_INIT'});
    const connection = io("https://academlo-chat.herokuapp.com/", {
      query: {
        token: token
      }
    }, (error) => console.error(error));
    return connection.on('connect',()=>{
      connection.emit('join', {name: user, room: chatRoom}, (error)=>{
        console.error(error);
      });
      return dispatch({type:'SOCKET_CONNECT', payload: connection});
    });
  }
}