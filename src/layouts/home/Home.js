import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";

import { Link } from "react-router";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";

const styles = {
  card: {
    maxWidth: "650px",
    margin: "2em auto",
    fontSize: "90%",
    lineHeight: "250%"
  }
};
class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <main className="container">
        <Card className={classes.card} elevation={10}>
          <CardContent>
            Voting is one of the classic usecases of blockchain technology. The
            immutability and cryptographic identities provide auditiablity and
            certainty to participants, while maintaining a public ledger of all
            historical votes, and a voting dApp is a common "hello world" in
            learning how to write solidity. Despite this, dApp voting has yet to
            permeate any mainstream communities because of classic blockchain
            onboarding problems -- there's no simple voting dApp for small
            communities that makes it easy to get started "just counting votes"
            for a group of nontechnical users. On-chain governance is a
            roadblock because real world organizations don't exist on-chain. We
            propose a straightforward and easy-to-use dApp that any group,
            organization or government can implement straight away to begin
            recording votes with blockchain, while still retaining their
            off-chain governance structures. We introduce a voting mechanism
            that, using an external token as a voting marker, can be used to
            implement either one-person-one-vote structures or stake-weighted
            voting schemes, with support for a "liquid democracy" delegation
            pattern.
            <br />
            <br />
            <hr />
            <br />
            <b>
              It's imperative to understand that our app is built around the
              "Verify, Don't Trust" philosophy,
            </b>{" "}
            and explicitly eschews any on-chain governance mechanisms; nothing
            is ever implemented automatically. At the end of each voting period,
            we don't even mark a proposal as PASSED/FAILED until one of the
            Board Members returns after a proposal closes and honestly reports
            the results (or, with a good reason, instead chooses "FORCED" or
            "REJECTED" override). The tools are available for anyone to check
            the full history of the vote and tally the final count, but trust in
            the board members to behave honestly is implied. This is important
            for 2 main reasons. Firstly, on-chain governance is largely
            incompatible with existing legal systems, because almost every
            organization on Earth is accountable to some jurisdiction -- What if
            your smart contract votes in favor of funding a nuclear program in a
            sanctioned country? Being a DAO doesn't suddenly enable illegal
            activity or absolve the developer in a treason, terror or murder
            investigation. Second, by refusing to address the topic of on-chain
            governance, we force our application to be the purest version of
            what it is intended for, which is a historical registry and trusted
            single source of truth, not a rigid robotic enforcer that must be
            obeyed. If the people do not trust the government to execute their
            will, a dApp cannot fix this. The Board Members must honestly
            implement The Will Of The People, because the governance of a people
            must either be with their consent, or it faces their revolt.
          </CardContent>
          <CardActions>
            <a href="https://github.com/net-prophet/thewill/">Learn More</a>
          </CardActions>
        </Card>
      </main>
    );
  }
}

export default withStyles(styles)(Home);
