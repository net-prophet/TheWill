import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Organization from "./Organization";

const styles = theme => ({
  gridFormContainer: {
    boxSizing: "border-box",
    width: "100%",
    padding: "55px 20px"
  }
});

const ListOrganizations = ({ classes, title, description, addresses }) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.gridFormContainer}
    >
      {addresses.map((address, i) => (
        <Organization key={i} address={address} />
      ))}
    </Grid>
  );
};

export default withStyles(styles)(ListOrganizations);
