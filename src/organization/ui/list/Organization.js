import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

// import "./CreateOrganization.css";

const styles = theme => ({
  card: {
    idth: "80%"
  }
});

const Organization = ({ classes, contract }) => {
  return (
    <Card className={classes.card} raised>
      <CardContent>{contract.address}</CardContent>
      <CardActions />
    </Card>
  );
};

export default withStyles(styles)(Organization);
