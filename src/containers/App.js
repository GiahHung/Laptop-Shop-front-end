import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { path } from "../utils/constant";
import Login from "./Auth/Login";
import HomePage from "./Homepage/HomePage";
import System from "../routes/System";
import Home from "../routes/Home";
import Register from "./Auth/Register";
import ManageUser from "./System/ManageUser";
import ManageLaptop from "./System/product/ManageLaptop";
import ManageItem from "./System/product/ManageItem";
import ManageMouse from "./System/product/ManageMouse";
import ManagePc from "./System/product/ManagePc";
import ManagePrinter from "./System/product/ManagePrinter";
import Revenue from "./System/Revenue";

class App extends Component {
  state = {};
  render() {
    const { systemMenuPath } = this.props;
    return (
      <Fragment>
        <BrowserRouter>
          <div className="main-container">
            <span className="content-container">
              <Routes>
                <Route path={path.HOME} element={<Home />} />

                <Route path={path.LOGIN} element={<Login />} />
                <Route path="/register" element={<Register />} />

                <Route path="/system/*" element={<System />}>
                  <Route path="revenue" element={<Revenue />} />

                  <Route path="laptop" element={<ManageLaptop />} />

                  <Route path="pc" element={<ManagePc />} />

                  <Route path="item" element={<ManageItem />} />

                  <Route path="printer" element={<ManagePrinter />} />

                  <Route path="mouse" element={<ManageMouse />} />

                  <Route path="manage-user" element={<ManageUser />} />

                  <Route path="*" element={<Navigate to={systemMenuPath} />} />
                </Route>

                <Route path={path.HOMEPAGE} element={<HomePage />} />
              </Routes>
            </span>

            <ToastContainer
              position="bottom-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
          </div>
        </BrowserRouter>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
