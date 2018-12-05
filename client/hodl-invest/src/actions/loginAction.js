

export const loginUser = (username) => {


     return (dispatch) => {
      console.log(username);
      dispatch({
        type: "LOGIN",
        payload: {
          username: username,
          isLoggedIn: true
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
