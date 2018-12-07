

export const loginUser = (username, token) => {


     return (dispatch) => {
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          token: token
        }

      });

    }
}

export const logoutUser = (username) => {
  return (dispatch) =>{
    dispatch({
    type: "LOGOUT",
    payload: {
      username: "NO_USER"
    }

  });

  }
}
