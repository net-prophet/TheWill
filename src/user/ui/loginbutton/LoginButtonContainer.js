import { connect } from "react-redux";
import LoginButton from "./LoginButton";
import {loginFortmaticUser, handleLoginType, loginUportUser} from "./LoginButtonActions";

const mapStateToProps = (state, ownProps) => {
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
      if (event.target.value === 'uport')
        dispatch(loginUportUser())
      if (event.target.value === 'metamask')
        window.web3Provider = 'metamask';
    }
  };
};

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);

export default LoginButtonContainer;
