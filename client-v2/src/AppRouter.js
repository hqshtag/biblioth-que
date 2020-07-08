import React, { useEffect } from "react";
import { connect } from "react-redux";

import { BrowserRouter as Router, Route } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
//import apiActions from "./actions/apiActions";
import authActions from "./actions/authActions";
//import bookActions from "./actions/bookActions";

import Dashboard from "./components/Dashboard";
import Accessboard from "./components/Accessboard";

const AppRouter = ({ dispatch, isAuthenticated }) => {
  //const dispatch = useDispatch();
  /*  console.log(dispatch);
  const clickHandler = () => {
    dispatch(apiActions.testAPI());
  };
 */
  //console.log(books);
  //console.log(isAuthenticated);

  useEffect(() => {
    let token = localStorage.getItem("jwt-token");
    if (token) dispatch(authActions.verifyToken(token));
    //dispatch(bookActions.getAllBooks(token));
  });
  return (
    /*  <Fragment>
      {" "}
      <h1>hello react-redux</h1>
      <button onClick={clickHandler}>clickme</button>
    </Fragment> */

    <Router>
      <div>
        <Route
          path="/"
          exact
          component={isAuthenticated ? Dashboard : Accessboard}
        />
        <PrivateRoute
          exact
          path="/dashboard"
          component={Dashboard}
          isAuthenticated={isAuthenticated}
        />
      </div>
    </Router>
  );
};

const mapStateToProps = (state) => {
  const { isAuthenticated } = state.auth;
  // const { books } = state.books;

  return {
    isAuthenticated,
    // books,
  };
};

export default connect(mapStateToProps)(AppRouter);
