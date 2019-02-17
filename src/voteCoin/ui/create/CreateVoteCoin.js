import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import CheckBox from "@material-ui/core/Checkbox";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import "./CreateVoteCoin.css";

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    width: "100%"
  },
  button: {
    margin: 4,
    width: 90,
    height: 40,
    alignSelf: "flex-end"
  },
  grid: {
    width: "100%"
  },
  gridFormContainer: {
    boxSizing: "border-box",
    width: "100%",
    padding: "45px 20px"
  },
  form: {
    width: "80%"
  },
  checkbox: {
    justify: "left"
  }
});

const CreateVoteCoin = ({
  classes,
  weighted,
  address,
  onWeightedChange,
  onAddressChange,
  onSubmit
}) => {
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="center"
      className={classes.gridFormContainer}
    >
      <form className={classes.form} onSubmit={onSubmit}>
        <Grid
          container
          item
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.grid}
        >
          <h1> Create a VoteCoin</h1>
          <FormControlLabel control={
            <CheckBox
            checked={weighted}
            value={weighted}
            onChange={onWeightedChange}
            className={classes.checkbox}
            id="standard-checkbox"
          />
          } label="Are the Votes Weighted?"/>
          <TextField
            id="standard-name"
            label="Address"
            type="text"
            value={address}
            disabled={!weighted}
            onChange={onAddressChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <Grid item className={classes.button}>
            <Button variant="contained" color="primary" type="submit">
              Create
            </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>
  );
};

export default withStyles(styles)(CreateVoteCoin);
