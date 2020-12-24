import React from "react";
// import Head from "next/head";
// import { NavBar } from "@components";
// import { VotingCSS } from "./styles";
import useVoting from "./hooks/useVoting";
import { VotingroomCSS } from "./styles";

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Check from "@material-ui/icons/Check";
import { green } from "@material-ui/core/colors";
import LinearProgress from "@material-ui/core/LinearProgress";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";

const Voting = (props) => {
  const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
  const roomcode = gettingParams[gettingParams.length - 2];

  const { votingOption, sendVoteOption } = useVoting(roomcode);
  // console.log(votingOption);
  const [newVoting, setnewVoting] = React.useState("");

  const { addCount, sendCount } = useVoting(roomcode);

  const handlenewVotingChange = (event) => {
    setnewVoting(event.target.value);
  };

  const handleSendVoteOption = () => {
    sendVoteOption(newVoting);
    setnewVoting("");
  };

  const handlenewCountChange = (voteOption, event) => {
    event.preventDefault();
    // console.log(voteOption);
    sendCount(voteOption);
  };

  //this is using material-ui's boxes to seperate stuff out, might be better to just change to divs and edit the styles in the styles.tsx
  
  //the 10 here needs to be changed to the amount of users in the room
  const revert = value => (value / 100) * 10;
  const normalise = value => (value - 0) * 100 / (10 - 0);

  function LinearProgressWithLabel(voteCount) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1}>
          <LinearProgress variant="determinate" {...voteCount} />
        </Box>
        <Box minWidth={50}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            revert(voteCount.value)
          )} votes`}</Typography>
        </Box>
      </Box>
    );
  }
 

  return (
    <VotingroomCSS>
      <div className="votingContainer">
        <div className="voteOptionsContainer">
          <TextField
            value={newVoting}
            onChange={handlenewVotingChange}
            placeholder="Enter a poll option"
            className="newVotingInputField"
          />
          <Button
            disabled={!newVoting}
            onClick={handleSendVoteOption}
            className="votingOptionButton"
          >
            Enter
          </Button>
          <ol className="voteOptionsList">
            <div className="voteOptionsPosition">
              {votingOption.map((voteOption, i) => {
                // console.log(voteOption)
                return (
                  <li key={"option" + i} className={`voteOptionItem`}>
                    <div>
                      <h4>{voteOption.resto}</h4>
                      {voteOption.address && <div><hr /><h5>{voteOption.address}</h5></div>}
                    </div>
                    <Button
                      disabled={voteOption.userHasVoted ? true : false}
                      onClick={handlenewCountChange.bind(this, voteOption)}
                    >
                      <Check
                        className={`voteButton ${
                          voteOption.userHasVoted
                            ? "disableButton"
                            : "enableButton"
                        }`}
                      />
                    </Button>
                  </li>
                );
              })}
            </div>
          </ol>
        </div>
        <div className="votingTable">
          <ol className="voteTableList">
            <div className="voteTablePosition">
              {votingOption.map((votingOption, t) => {
                return (
                  <li key={"table" + t} className={`voteCountItem`}>
                    {votingOption.resto}
                    <LinearProgressWithLabel
                      value={normalise(votingOption.vote.userID.length)}
                    />
                  </li>
                );
              })}
            </div>
          </ol>
        </div>
      </div>
    </VotingroomCSS>
  );
};

export default Voting;
