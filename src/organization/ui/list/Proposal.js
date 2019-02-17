import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import { getContractAt } from "../../../util/contracts";

const styles = theme => ({
  card: {
    width: "60%",
    margin: 10
  }
});

class Proposal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        id: props.proposal[0],
        title: props.proposal[1],
        description: props.proposal[2],
        endBlock: props.proposal[3],
        creator: props.proposal[4],
        status: props.proposal[5],
        numVoters: props.proposal[6],
    }
  }

  render() {
    const { classes, address } = this.props;
    return (
      <Card className={classes.card} raised>
        <CardContent>
          <h3>
            <b>Title:</b>&nbsp;{this.state.title}
          </h3>{" "}
          {}
          <h3>
            <b>Description:</b>&nbsp;
            {this.state.description}
          </h3>
          <h3>
            <b>Creator:</b>{" "}
          </h3>{" "}
          <img
            alt="Contract blockie"
            src={"https://blockies.shipchain.io/" + this.state.creator + ".png?size=small"}
          />
          {this.state.creator.substring(0,8)}
        </CardContent>
        <CardActions />
      </Card>
    );
  }
}

export default withStyles(styles)(Proposal);
