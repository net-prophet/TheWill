import React, { Component } from "react";
import { withStyles } from '@material-ui/core/styles';


import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

const styles = {
  card: {
    maxWidth: "650px",
    margin: "2em auto",
    fontSize: '90%',
    lineHeight: "250%"
  }
}
class Home extends Component {
  render() {
    const { classes } = this.props;

    return <main className="container">
      <Card className={classes.card} elevation={10}>
        <CardContent>
          <h3>An Open, Easy-To-Use Blockchain Voting dApp For Anyone</h3>

          
          
        </CardContent>
        <CardActions>
          <a href="/about">About</a>
        </CardActions>
      </Card>
    </main>;
  }
}

export default withStyles(styles)(Home);