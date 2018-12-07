const initialState = {
  username: "",
  isLoggedIn: false
};


export default function loginReducer(state = initialState, action){
  switch (action.type) {
    case "LOGIN":
      return {
        username: action.payload.username,
        token: action.payload.token,
        isLoggedIn: true
      };
    case "LOGOUT":
      return {
         username: "NO_USER",
         isLoggedIn: false
      };
    default:
      return state;
  }

}
