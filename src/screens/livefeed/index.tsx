import React from "react";
// import Head from "next/head";
// import { NavBar } from "@components";
// import { LiveFeedCSS } from "./styles";
import useFeed from './hooks/useFeed'

const LiveFeed = (props) => {
  
    // const { roomId } = 'test'; //getting roomID from URL
    const roomId = 'test'
    const { feedMessages } = useFeed(roomId); 
  
    return(
      // <LiveFeedCSS>
      <div className='LivefeedContainer'>
        <h1 className='roomName'>Livefeed: {roomId}</h1>
        <div className='feedContainer'>
          <ol className='feedList'>
            <div className='feedPosition'>
            {feedMessages.map((feed, i)=>(
              <li
                key={i}
                className={`feedItem ${feed}`}>
                  {feed.body}
                </li>
            ))}
            </div>
          </ol>
        </div>
      </div>
    //  </LiveFeedCSS>
    );
  };
  
  export default LiveFeed;
