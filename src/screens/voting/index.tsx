import React from "react";
// import Head from "next/head";
// import { NavBar } from "@components";
// import { VotingCSS } from "./styles";
import useVoting from './hooks/useVoting'

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Check from '@material-ui/icons/Check';
import { green } from '@material-ui/core/colors';
import LinearProgress from '@material-ui/core/LinearProgress';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

const Voting = (props) => {
  
    // const { roomId } = 'test'; //getting roomID from URL
    const roomId = '1'
    const { votingOption, sendVoteOption } = useVoting(roomId); 
    const [newVoting, setnewVoting] = React.useState('');
    const [count, setCount] = React.useState('')
  
    const handlenewVotingChange = (event) => {
      setnewVoting(event.target.value);
    };
  
    const handleSendVoteOption = () => {
      sendVoteOption(newVoting);
      setnewVoting('');
    };
  
    const handleSendVoteCount = () => {

    }

    return(
    //   <VotingCSS>
      <div className='votingContainer'>
        <h1 className='roomName'>Voting: {roomId}</h1>
        <TextField
            value={newVoting}
            onChange={handlenewVotingChange}
            placeholder='Enter a poll option'
            className='newVotingInputField'
          />
          <Button 
          disabled={!newVoting}
          onClick={handleSendVoteOption} className='votingOptionButton'>
            Enter
          </Button>
        <div className='voteOptionsContainer'>
          <ol className='voteOptionsList'>
            <div className='voteOptionsPosition'>
            {votingOption.map((voteOption, i)=>(
              <li
                key={i}
                className={`voteOptionItem`}>
                  {voteOption.resto}
                  <Button>
                    <Check style={{ color: green[500] }}/>
                  </Button>
                </li>
            ))}
            </div>
          </ol>
        </div>
        <div className='votingTable'>
        <ol className='voteTableList'>
            <div className='voteTablePosition'>
            {votingOption.map((voteOption, t)=>(
              <li
                key={t}
                className={`voteOptionItem`}>
                  {voteOption.resto}
                  <LinearProgressWithLabel value={voteOption.vote} />
                  
                </li>
            ))}
            </div>
          </ol>
        </div>
      </div>
    //  </VotingroomCSS>
    );
  };
  
  export default Voting;
