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

const ListProposals = ({ classes, proposals, contract}) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.gridFormContainer}
    >
      {proposals.map((proposal, i) => (
        <Proposal key={i} proposal={proposal} contract={contract} />
      ))}
    </Grid>
  );
};

export default withStyles(styles)(ListProposals);
