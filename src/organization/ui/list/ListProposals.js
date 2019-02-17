import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Proposal from "./Proposal";

const styles = theme => ({
  gridFormContainer: {
    boxSizing: "border-box",
    width: "100%",
    padding: "55px 20px"
  }
});

const ListProposals = ({ classes, title, description, addresses }) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.gridFormContainer}
    >
      {/* {addresses.map((address, i) => (
        <Proposal key={i} address={address} />
      ))} */}
      List Proposals
    </Grid>
  );
};

export default withStyles(styles)(ListProposals);
