// // import logo from './logo.svg';
// // import './App.css';
// import IndexPage from "./pages/index"

// function App() {
//   return (
//     <IndexPage />
//   );
// }

// export default App;


import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/index";
import SignUpPage from "./pages/sign-up";
import ChatRoom from "./pages/chatroom";
import LiveFeed from "./pages/livefeed";
import Voting from "./pages/voting";
import DashboardPage from "./pages/dashboard"
import { connect } from "react-redux";

const PurePrivateRoute = ({ component, isAuthenticated, ...rest }) => {
    const Component = component;
    if (Component != null) {
        return (
        <Route
            {...rest}
            render={(props) =>
            isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect
                to={{
                    pathname: "/",
                }}
                />
            )
            }
        />
        );
    } else {
        return null;
    }
};

const PrivateRoute = connect((state) => ({
    isAuthenticated: state.authStore.isAuthenticated,
}))(PurePrivateRoute);

export default function App() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route path="/sign-up" component={SignUpPage} />
<<<<<<< HEAD
          <Route path="/chatroom" component={ChatRoom} />
          <Route path="/livefeed" component={LiveFeed} />
          <Route path="/voting" component={Voting} />
=======
          <PrivateRoute path="/dashboard" component={DashboardPage} />
>>>>>>> 5a79cf7c27877302e6df471b0f09a2ef2e019a3d
        </Switch>
      </Router>
    );
}