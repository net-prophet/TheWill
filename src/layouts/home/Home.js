import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const styles = {
  card: {
    maxWidth: "650px",
    margin: "2em auto",
    fontSize: "90%",
    lineHeight: "250%",
    textAlign: "center"
  }
};
class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <main className="container">
        <Card className={classes.card} elevation={10}>
          <CardContent>
          <h3>An Open, Easy-To-Use Blockchain Voting dApp For Anyone</h3>

          <h1><Link to="/organization/list">Organization Registry</Link></h1>
          - or - 
          <h1><Link to="/organization/create">Create a new Voting Organization</Link></h1>

          </CardContent>
          <CardActions>
            <Link to="/about">Learn More</Link>
          </CardActions>
        </Card>
      </main>
    );
  }
}

export default withStyles(styles)(Home);
