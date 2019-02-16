import { connect } from "react-redux";
import LoginButton from "./LoginButton";
import {loginFortmaticUser, handleLoginType, loginUportUser, loginPortisUser} from "./LoginButtonActions";
import Web3 from 'web3';

const mapStateToProps = (state) => {
  console.log(state);
  return {
    loginType: state.user.loginType
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLoginUserClick: event => {
      event.preventDefault();

      dispatch(loginFortmaticUser());
    },
    handleLoginType: event => {
      dispatch(handleLoginType(event.target.value));
      if (event.target.value === 'fortmatic')
        dispatch(loginFortmaticUser());
      else if (event.target.value === 'uport')
        dispatch(loginUportUser())
      else if (event.target.value === 'metamask'){
        window.web3Provider = 'metamask';
        window.web3 = new Web3(window.ethereum);
      }
      else if (event.target.value === 'portis')
        dispatch(loginPortisUser());
    }
  };
};

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);

export default LoginButtonContainer;
