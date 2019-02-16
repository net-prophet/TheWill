import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

// Images
// import uPortLogo from "../../../img/uport-logo.svg";
import "./LoginButton.css";

const styles = {
  root: {
    width: 110,
    color: "white",
    display: "inline"
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
        <MenuItem value="metamask">
          <em>Metamask</em>
        </MenuItem>
        <MenuItem value={"fortmatic"}>Fortmatic</MenuItem>
        {/*<MenuItem value={"uport"}>Uport</MenuItem>*/}
      </Select>
    </div>
  );
};

export default withStyles(styles)(LoginButton);
