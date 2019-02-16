import { HANDLE_LOGIN_TYPE } from "./ui/loginbutton/LoginButtonActions";
const initialState = {
  loginType: "metamask"
};

const userReducer = (state = initialState, action) => {
  if (action.type === "HANDLE_LOGIN_TYPE") {
    console.log(state);
    return {
      ...state,
      loginType: action.payload
    };
  }

  // if (action.type === 'USER_LOGGED_OUT')
  // {
  //   return Object.assign({}, state, {
  //     data: null
  //   })
  // }

  return state;
};

export default userReducer;
