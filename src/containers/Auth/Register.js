import React, { Component } from "react";
import { connect } from "react-redux";
import "./Register.scss";
import { Navigate } from "react-router-dom";
import * as actions from "../../store/actions";
import { handleRegisterService } from "../../services/userServices";

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      phoneNumber: "",
      success: false,
      showPassword: false,
      errMessage: "",
    };
  }

  onchangeHandleUserName = (event) => {
    this.setState({
      userName: event.target.value,
    });
  };

  onchangeHandlePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };
  onchangeHandlePhoneNumber = (event) => {
    this.setState({
      phoneNumber: event.target.value,
    });
  };
  handleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleKeyDown = (e) => {
    // console.log("check key", e);
    if (e.key === "Enter") {
      this.handleRegister();
    }
  };

  handleRegister = async () => {
    let { userName, password, phoneNumber } = this.state;
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleRegisterService(userName, password, phoneNumber );
     
      if (data && data.errCode !== 0) {
        let message = data.errMessage;
        this.setState({
          errMessage: message,
          success: false,
        });
      } else {
        let message = data.errMessage;
        this.setState({
          errMessage: message,
          success: true,
          userName: '',
          password: '',
          phoneNumber: ''
        });
      }
      console.log(data);
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
      console.log(error.response);
    }
  };

  render() {
    console.log("-----check state:", this.state);
    let {success} = this.state
    return (
      <>
          <div className="register-background">
            <div className="register-container ">
              <div className="register-content row">
                <div className="col-12 text-register">Register</div>
                <div className="col-12 form-group register-input">
                  <label className="lbl-text">Email</label>
                  <input
                    type="email"
                    className="form-control ipt-register"
                    placeholder="Enter Your Email"
                    value={this.state.userName}
                    onChange={(event) => {
                      this.onchangeHandleUserName(event);
                    }}
                  />
                </div>
                <div className="col-12 form-group register-input">
                  <label className="lbl-text">Phone Number</label>
                  <div className="custom-input-password">
                    <input
                      type="number"
                      className="form-control ipt-register"
                      placeholder="Enter Your Phone Number"
                      value={this.state.phoneNumber}
                      onChange={(event) => {
                        this.onchangeHandlePhoneNumber(event);
                      }}
                    />
                  </div>
                </div>
                <div className="col-12 form-group register-input">
                  <label className="lbl-text">Password</label>
                  <div className="custom-input-password">
                    <input
                      type={this.state.showPassword ? "text" : "password"}
                      className="form-control ipt-register"
                      placeholder="Enter Your Password"
                      value={this.state.password}
                      onChange={(event) => {
                        this.onchangeHandlePassword(event);
                      }}
                      onKeyDown={(e) => this.handleKeyDown(e)}
                    />
                    <span
                      onClick={() => {
                        this.handleShowPassword();
                      }}
                    >
                      <i
                        class={
                          this.state.showPassword
                            ? "fas fa-eye"
                            : "fas fa-eye-slash"
                        }
                      ></i>
                    </span>
                  </div>
                </div>

                <div className={success === true ? "col-12 success" : "col-12 err"}>{this.state.errMessage}</div>

                <div className="col-12 ">
                  <button
                    className="btn-register"
                    onClick={() => {
                      this.handleRegister();
                    }}
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>
       
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    createUser: (userInfo) =>
      dispatch(actions.createUser(userInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Register);
