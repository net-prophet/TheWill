import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import "./CreateOrganization.css";

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
  }
});

const CreateOrganization = ({
  classes,
  title,
  description,
  onTitleChange,
  onDescriptionChange,
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
          <h1> Create an Organization</h1>
          <TextField
            id="standard-name"
            label="Title"
            type="text"
            value={title}
            onChange={onTitleChange}
            className={classes.textField}
            margin="normal"
            variant="outlined"
          />
          <TextField
            id="standard-uncontrolled"
            label="Description"
            className={classes.textField}
            value={description}
            onChange={onDescriptionChange}
            margin="normal"
            multiline
            rows="6"
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

export default withStyles(styles)(CreateOrganization);
