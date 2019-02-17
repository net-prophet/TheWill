import React from "react";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { withStyles } from "@material-ui/core/styles";

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
        <MenuItem value="metamask">Metamask</MenuItem>
        <MenuItem value={"fortmatic"}>Fortmatic</MenuItem>
        <MenuItem value={"portis"}>Portis</MenuItem>
      </Select>
    </div>
  );
};

export default withStyles(styles)(LoginButton);
