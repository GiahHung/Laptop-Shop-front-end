import React, { Component } from "react";
import { connect } from "react-redux";
import "./Login.scss";
import { Link, Navigate } from "react-router-dom";
import * as actions from "../../store/actions";
import {
  handleLoginService,
  loginWithGoogle,
} from "../../services/userServices";
import _ from "lodash";
import { GoogleLogin } from "@react-oauth/google";
import { environment } from "../../Environment";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      password: "",
      showPassword: false,
      errMessage: "",
      link: "",
    };
  }

  componentDidMount() {}

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
  handleShowPassword = () => {
    this.setState({
      showPassword: !this.state.showPassword,
    });
  };

  handleKeyDown = (e) => {
    console.log("check key", e);
    if (e.key === "Enter") {
      this.handleLogin();
    }
  };

  handleLogin = async () => {
    console.log(environment.CLIENT_ID);
    let { userName, password } = this.state;
    this.setState({
      errMessage: "",
    });
    try {
      let data = await handleLoginService(userName, password);
      if (data && data.errCode !== 0) {
        let message = data.errMessage;
        this.setState({
          errMessage: message,
        });
      } else {
        sessionStorage.setItem("accessToken", data.token);
        this.props.userLoginSuccess(data.user);
        console.log("Login success!!!!!!!!");
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

  handleLoginWithGoogle = async (credentialResponse) => {
    
    this.setState({
      errMessage: "",
    });
    try {
      let data = await loginWithGoogle(credentialResponse.credential);
      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: "Đăng nhập thất bại",
        });
      } else {
        this.props.userLoginSuccess(data);
        console.log("Login success!!!!!!!!");
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
    //console.log("-----check state:", this.state);
    const { isLogin } = this.props;
    const { userInfo } = this.props;
    return (
      <>
        {isLogin ? (
          // <Navigate to={this.state.link} />
          userInfo.roleId === "R1" ? (
            <Navigate to="/system" />
          ) : (
            <Navigate to="/home" />
          )
        ) : (
          <div className="login-background">
            <div className="login-container ">
              <div className="login-content row">
                <div className="col-12 text-login">Login</div>
                <div className="col-12 form-group login-input">
                  <label className="lbl-text">Email</label>
                  <input
                    type="email"
                    className="form-control ipt-login"
                    placeholder="Enter Your Email"
                    value={this.state.userName}
                    onChange={(event) => {
                      this.onchangeHandleUserName(event);
                    }}
                  />
                </div>

                <div className="col-12 form-group login-input">
                  <label className="lbl-text">Password</label>
                  <div className="custom-input-password">
                    <input
                      type={this.state.showPassword ? "text" : "password"}
                      className="form-control ipt-login"
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

                <div className="col-12 err">{this.state.errMessage}</div>

                <div className="col-12 ">
                  <button
                    className="btn-login"
                    onClick={() => {
                      this.handleLogin();
                    }}
                  >
                    Log in
                  </button>
                </div>

                <div className="col-12 spn-forgot">
                  <Link to="/register" className="link">
                    Register
                  </Link>
                </div>

                <div className="col-12 text-center spn-or-login">
                  <span>Or Login With</span>
                </div>

                <div className="col-12 social-icon">
                  <GoogleLogin onSuccess={this.handleLoginWithGoogle} />
                  <i className="fab fa-facebook facebook"></i>
                </div>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
