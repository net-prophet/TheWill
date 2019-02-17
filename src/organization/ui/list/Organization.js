import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router";
import { getContractAt } from "../../../util/contracts";

const styles = theme => ({
  card: {
    width: "60%",
    margin: 10
  }
});

class Organization extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null,
      description: null,
      loading: true
    };
  }
  componentWillMount() {
    if (this.props.address) {
      this.contract = getContractAt("VotingOrganization", this.props.address);
      this.contract.getOrgDetails((err, result) =>
        this.setState({
          title: result[0],
          description: result[1],
          loading: false,
          loaded: true
        })
      );
    }
  }
  render() {
    
    const { classes, address } = this.props;
    if (this.state.loading) return <div>Loading...</div>;
    return (
      <Card className={classes.card} raised>
        <CardContent>
          <h2>
            <img
              alt="Contract blockie"
              src={"https://blockies.shipchain.io/" + address + ".png?size=medium"}
            /> &nbsp;
            <Link to={`/organization/${address}`}>
              {this.state.title}
            </Link>
          </h2>
          <h3>
            {this.state.description}
          </h3>
          <h3>
            <b>Address:</b>{" "}
          </h3>{" "}
          <img
            alt="Contract blockie"
            src={"https://blockies.shipchain.io/" + address + ".png?size=small"}
          />

          <Link to={`/organization/list/${address}`}>{address}</Link>
          {address}
        </CardContent>
        <CardActions />
      </Card>
    );
  }
}

export default withStyles(styles)(Organization);
