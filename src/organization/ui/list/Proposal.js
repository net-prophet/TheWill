import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Button } from "@material-ui/core";
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
      voted: 0,
      votesFor: 0,
      tokensFor: 0,
      votesAgainst: 0,
      tokensAgainst: 0,
      votesAbstain: 0,
      tokensAbstain: 0
    };
  }

  // proposalId, uint voteValue
  vote = val => {
    const { id, contract } = this.props;

    contract.vote(
      id,
      val,
      { from: window.web3.eth.accounts[0] },
      (err, voted) => {
        if (err) {
          alert(err);
          return;
        }
        this.setState({ voted: val });
        if (val === 1) {
          this.setState({ votesFor: ++this.state.votesFor });
        } else if (val === 2) {
          this.setState({ votesAgainst: ++this.state.votesAgainst });
        } else if (val === 3) {
          this.setState({ votesAbstain: ++this.state.votesAbstain });
        }
      }
    );
  };

  componentWillMount() {
    const { contract, id } = this.props;
    contract.getVoteCount(id, (err, voteInfo) => {
      if (err) {
        //alert(err);
        return;
      }
      console.log();
      // voteInfo[0].toNumber(),
      // voteInfo[1].toNumber(),
      // voteInfo[2].toNumber(),
      // voteInfo[3].toNumber(),
      // voteInfo[4].toNumber(),
      // voteInfo[5].toNumber()
      this.setState({
        votesFor: voteInfo[0].toNumber(),
        tokensFor: voteInfo[1].toNumber(),
        votesAgainst: voteInfo[2].toNumber(),
        tokensAgainst: voteInfo[3].toNumber(),
        votesAbstain: voteInfo[4].toNumber(),
        tokensAbstain: voteInfo[5].toNumber()
      });
    });
  }

  render() {
    const { classes } = this.props;
    const {
      voted,
      votesFor
      // status,
      // title,
      // description,
      // endBlock,
      // creator,
      // numVoters
    } = this.state;
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
            src={
              "https://blockies.shipchain.io/" +
              this.state.creator +
              ".png?size=small"
            }
          />
          {this.state.creator.substring(0, 8)}
          <h3>
            <b>Votes for:</b> {votesFor}
          </h3>
          <h3>
            <b>
              You
              {voted !== 1 &&
                voted !== 2 &&
                voted !== 3 &&
                " haven't voted yet"}
              {voted === 1 && " voted for the proposoal"}
              {voted === 2 && " voted againt the proposal"}
              {voted === 3 && " abstained from voting"}
            </b>
          </h3>
        </CardContent>
        <div>
          <Button onClick={() => this.vote(1)}>{"+ Vote For"}</Button>
          <Button onClick={() => this.vote(2)}>{"- Vote Against"}</Button>
          <Button onClick={() => this.vote(3)}>{"o Abstain"}</Button>
          <CardActions />
        </div>
      </Card>
    );
  }
}

export default withStyles(styles)(Proposal);
