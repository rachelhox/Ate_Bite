import React from "react";
// import Head from "next/head";
// import { NavBar } from "@components";
import { LiveFeedCSS } from "./styles";
import useFeed from "./hooks/useFeed";

const LiveFeed = (props) => {
  const gettingParams = window.location.href.replaceAll("/", " ").split(" ");
  const roomcode = gettingParams[gettingParams.length - 2];

  const { feedMessages } = useFeed(roomcode);

  return (
    <LiveFeedCSS>
      <div className="LivefeedContainer">
        {/* <h1 className='roomName'>Livefeed: {roomcode}</h1> */}
        <div className="feedContainer">
          <ul className="feedList">
            <div className="feedPosition">
              {feedMessages.map((feed, i) => (
                <li key={i} className={`feedItem ${feed}`}>
                  <span>{feed.body}</span>
                  <span>{feed.time}</span>
                </li>
              ))}
            </div>
          </ul>
        </div>
      </div>
    </LiveFeedCSS>
  );
};

export default LiveFeed;
