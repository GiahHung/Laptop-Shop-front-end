import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomePageHeader.scss";
import { Link, Navigate } from "react-router-dom";
import * as actions from "../../store/actions";

class HomePageHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      arrCart: JSON.parse(localStorage.getItem("products")) || [],
    };
  }

  componentDidMount() {
    const userId = this.props.userInfo?.user?.id || "";
    this.setState({ userId });
    const localProducts = (() => {
      try {
        return JSON.parse(localStorage.getItem("products")) || [];
      } catch (error) {
        console.error("Error parsing localStorage:", error);
        return [];
      }
    })();
    if (this.props.isLoggedIn) {
      this.props.eastCart(userId, localProducts);
      localStorage.removeItem("products");
      this.props.fetchCart(userId);
    }
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.carts !== this.props.carts) {
      this.setState({
        arrCart: this.props.carts,
      });
    }
  }

  render() {
    const { processLogout } = this.props;
    const arrCart = this.state.arrCart;
    console.log("aaaaaaaaaa", this.state.arrCart);
    return (
      <>
        <div className="header-container">
          <div className="content-up ">
            <div className="row">
              <div className="col-2 logo">
                <i class="fab fa-pied-piper-alt"></i>
                <span>LOGGOO</span>
              </div>
              <div className="col-4 search">
                <input type="text" name="search" placeholder="Search..." />
                <span class="searchbar-icon">
                  <i class="fas fa-search"></i>
                </span>
              </div>
              <div className="col-2 cart">
                <i class="fas fa-shopping-basket"></i>
                <Link to="/cart">
                  Giỏ hàng <span className="cart-size">{arrCart.length}</span>
                </Link>
              </div>
              <div className="col-3 user">
                {this.props.isLoggedIn ? (
                  <div class="dropdown dropdown">
                    <button
                      class=" dropdown-toggle btn-dropdown"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <span>Xin chào </span>
                      {this.props.userInfo.user.lastName}
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <Link class="dropdown-item " to="/user-order">
                          Xem đơn hàng
                        </Link>
                      </li>
                      <li>
                        <span
                          class="dropdown-item btn-logout"
                          onClick={processLogout}
                        >
                          Đăng xuất
                        </span>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <div className="login">
                    <i class="fas fa-user"></i>
                    <Link to="/login">Đăng nhập</Link>
                  </div>
                )}
              </div>
              <div className="col-2 welcome">
                <span>How you been</span>
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
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    carts: state.user.carts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    processLogout: () => dispatch(actions.processLogout()),
    fetchCart: (userId) => dispatch(actions.fetchCart(userId)),
    eastCart: (userId, localProduct) =>
      dispatch(actions.eastCart(userId, localProduct)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageHeader);
