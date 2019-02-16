import { connect } from "react-redux";
import LoginButton from "./LoginButton";
import { loginUser, handleLoginType } from "./LoginButtonActions";

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  return {
    loginType: state.user.loginType
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoginUserClick: event => {
      event.preventDefault();

      dispatch(loginUser());
    },
    handleLoginType: event => {
      dispatch(handleLoginType(event.target.value));
    }
  };
};

const LoginButtonContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginButton);

export default LoginButtonContainer;
