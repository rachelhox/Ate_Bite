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
import MapPage from "./pages/map";
import DashboardPage from "./pages/dashboard"
import RoomPage from "./pages/room";
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
          <PrivateRoute path="/dashboard/:userId" component={DashboardPage} />
          <Route path="/room/random/:roomcode/:userId" component={RoomPage} />
          <PrivateRoute path="/room/:roomcode/:userId" component={RoomPage} />
        </Switch>
      </Router>
    );
}