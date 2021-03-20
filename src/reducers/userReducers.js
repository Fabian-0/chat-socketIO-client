const INITIAL_STATE = {
  user: null,
  userId:null,
  error: null,
  loading: false,
};

export const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case "AUTH_USER":
      return {
        ...state,
        loading: true,
      };

    case "AUTH_SUCCES":
      return {
        ...state,
        user: action.payload.username,
        userId: action.payload.id,
        token: action.payload.token,
        error: null,
        loading: false,
      };

    case "AUTH_FAIL":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

      case "REGISTER_USER":
      return {
        ...state,
        loading: true,
      };

    case "REGISTER_SUCCES":
      return {
        ...state,
        user: action.payload.username,
        userId: action.payload.id,
        token: action.payload.token,
        error: null,
        loading: false,
      };

    case "REGISTER_FAIL":
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export const userAuthThunk = (data) => {
  return function (dispatch) {
    dispatch({ type: "AUTH_USER" });
    return fetch("https://academlo-chat.herokuapp.com/api/users/login/", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: data.email, password: data.password })
    })
    .then(res => res.json())
    .then(res => (res.access) ? dispatch({type: 'AUTH_SUCCES', payload: res.user}) : dispatch({type: 'AUTH_FAIL', payload: res.message }) )
    .catch(err => dispatch({type: 'AUTH_FAIL', payload: err}));
  };
};

export const userRegisterThunk = (data) => {
  return (dispatch) =>{
    dispatch({type: 'REGISTER_USER'});
    return fetch("https://academlo-chat.herokuapp.com/api/users/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: data.email, username: data.username, password: data.password })
    })
    .then(res => res.json())
    .then(res => (res.access) ? dispatch({type: 'REGISTER_SUCCES', payload: res.user}) : dispatch({type: 'REGISTER_FAIL', payload: res.message }) )
    .catch(err => dispatch({type: 'REGISTER_FAIL', payload: err}));
  };
}