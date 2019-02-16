import React from "react";
import { withStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Organization from "./Organization";

// import "./CreateOrganization.css";

const styles = theme => ({
  gridFormContainer: {
    boxSizing: "border-box",
    width: "100%",
    padding: "45px 20px"
  }
});

const ListOrganizations = ({ classes, title, description, organizations }) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.gridFormContainer}
    >
      {organizations.map((contract, i) => (
        <Organization key={i} contract={contract} />
      ))}
    </Grid>
  );
};

export default withStyles(styles)(ListOrganizations);
