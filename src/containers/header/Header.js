import { Link } from "react-router-dom";
import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./Header.scss";

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarOpen: false,
    };
  }

  openNav = () => {
    this.setState({ sidebarOpen: true });
  };

  closeNav = () => {
    this.setState({ sidebarOpen: false });
  };

  render() {
    const { processLogout } = this.props;
    const { sidebarOpen } = this.state;
    let {userInfo} = this.props;
    return (
      <>
        {/* Sidebar */}
        <div
          id="mySidebar"
          className="sidebar"
          style={{
            width: sidebarOpen ? "250px" : "0",
            transition: "0.3s",
          }}
        >
          <div className="name">
            <span>
              <i class="fas fa-smile"></i>
              {userInfo.firstName} {userInfo.lastName}
            </span>
            <a href="#" className="closebtn" onClick={this.closeNav}>
              ×
            </a>
          </div>

          <Link to="/system/revenue" className="link">
            Doanh thu
          </Link>
          <Link to="/system/manage-user" className="link">
            Quản lý người dùng
          </Link>
          <Link to="/system/manage-oder" className="link">
            Đơn hàng
          </Link>
          <Link className="link">Voucher</Link>

          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Sản phẩm
            </button>
            <ul
              class="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <Link class="dropdown-item " to="/system/laptop">
                  Laptop
                </Link>
              </li>
              <li>
                <Link class="dropdown-item " to="/system/pc">
                  Pc
                </Link>
              </li>
              <li>
                <Link class="dropdown-item " to="/system/mouse">
                  Chuột, bàn phím
                </Link>
              </li>
              <li>
                <Link class="dropdown-item " to="/system/printer">
                  Máy in
                </Link>
              </li>
              <li>
                <Link class="dropdown-item " to="/system/item">
                  Linh kiện
                </Link>
              </li>
            </ul>
          </div>
          <div class="dropdown">
            <button
              class="btn btn-secondary dropdown-toggle"
              type="button"
              id="dropdownMenuButton2"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Chi tiết sản phẩm
            </button>
            <ul
              class="dropdown-menu dropdown-menu-dark"
              aria-labelledby="dropdownMenuButton2"
            >
              <li>
                <Link class="dropdown-item ">Laptop</Link>
              </li>
              <li>
                <Link class="dropdown-item ">Pc</Link>
              </li>
              <li>
                <Link class="dropdown-item ">Chuột, bàn phím</Link>
              </li>
              <li>
                <Link class="dropdown-item ">Máy in</Link>
              </li>
              <li>
                <Link class="dropdown-item ">Linh kiện</Link>
              </li>
            </ul>
          </div>
          <div
            className="btn-login link"
            onClick={processLogout}
            title="Log in"
          >
            <i class="fas fa-sign-out-alt"></i>
            Đăng xuất
          </div>
        </div>

        {/* Main content */}
        <div
          id="main"
          style={{
            marginLeft: sidebarOpen ? "250px" : "0",
            transition: "0.3s",
          }}
        >
          <button className="openbtn" onClick={this.openNav}>
            ☰
          </button>
        </div>

        {/* Logout button */}
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {isLogin : state.user.isLoggedIn,
    userInfo: state.user.userInfo
  };
};

const mapDispatchToProps = (dispatch) => {
  return { processLogout: () => dispatch(actions.processLogout()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
