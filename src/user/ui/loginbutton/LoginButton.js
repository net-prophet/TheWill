import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";
import { loginTypes } from "../../utils";

import "./LoginButton.css";

const styles = {
  root: {
    width: 110
  }
};

const LoginButton = ({ classes, loginType, handleLoginType }) => {
  console.log(loginType);
  return (
    // <li className="pure-menu-item">
    //   <a href="#" className="pure-menu-link" onClick={(event) => onLoginUserClick(event)}><img className="uport-logo" src={uPortLogo} alt="UPort Logo" />Login with UPort</a>
    // </li>
    <div className="loginButtonContainer">
      <Select
        value={loginType}
        onChange={handleLoginType}
        inputProps={{
          name: "age",
          id: "age-simple"
        }}
        className={classes.root}
      >
        <MenuItem value={loginTypes.metamask.value}>
          <em>{loginTypes.metamask.text}</em>
        </MenuItem>
        <MenuItem value={loginTypes.uport.value}>
          {loginTypes.uport.text}
        </MenuItem>
      </Select>
    </div>
  );
};

export default withStyles(styles)(LoginButton);
