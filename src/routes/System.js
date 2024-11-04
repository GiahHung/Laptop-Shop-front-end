import React, { Component } from "react";
import { connect } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import Header from "../containers/header/Header";

class System extends Component {
  render() {
    const { isLoggedIn } = this.props;
    return (
      <React.Fragment>
        {isLoggedIn ? (
          <>
            <Header />
            <div className="system-container">
              <div className="system-list">
                <Outlet />
              </div>
            </div>
          </>
        ) : (
          <Navigate to="/login" />
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
