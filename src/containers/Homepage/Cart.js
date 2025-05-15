import { connect } from "react-redux";
import React, { Component } from "react";
import HomePageHeader from "./HomePageHeader";
import HomePageFooter from "./HomePageFooter";
import "./Cart.scss";
import { Buffer } from "buffer";
import { Link, Navigate } from "react-router-dom";
import * as actions from "../../store/actions";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      link: "",
      arrCart: JSON.parse(localStorage.getItem("products")) || [],
    };
  }

  componentDidMount() {
    const userId = this.props.userInfo?.user?.id || "";
    this.setState({ userId });
    if (this.props.isLoggedIn) {
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

  removeProductFromLocalStorage = (productId) => {
    let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    storedProducts = storedProducts.filter(
      (product) => product.id !== productId
    );
    this.setState({
      arrCart: storedProducts,
    });
    localStorage.setItem("products", JSON.stringify(storedProducts));
  };

  deleteCartAfterLogin = (productId, userId) => {
    this.props.deleteProductInCart(productId, userId);
  };

  handleDeleteCart = (productId, userId) => {
    if (this.props.isLogin == true) {
      this.deleteCartAfterLogin(productId, userId);
    } else {
      this.removeProductFromLocalStorage(productId);
    }
  };

  handlePayment = () => {
    const { isLogin } = this.props;
    const { arrCart } = this.state;

    if (!isLogin) {
      alert("Bạn cần phải đăng nhập");
      return;
    }

    if (arrCart.length === 0) {
      alert("Vui lòng thêm sản phẩm vào giỏ hàng");
      return;
    }
  };

  decreaseQuantity = (data,userId) => {
    this.props.decreaseQuantity(data,userId);
  }

  increaseQuantity = (data,userId) => {
    this.props.increaseQuantity(data,userId);
  }
  render() {
    const { arrCart } = this.state;
    const { isLogin } = this.props;
    const calculateTotalPrice = () => {
      return arrCart.reduce((total, item) => total + (item.totalPrice || 0), 0);
    };
    return (
      <>
        <HomePageHeader />
        <div className="container cart-container">
          <div className="row cart-content">
            {arrCart && arrCart.length > 0 ? (
              arrCart.map((item, index) => {
                let imageBase64 = "";
                if (isLogin == true) {
                  if (item?.Product?.image) {
                    imageBase64 = Buffer.from(
                      item?.Product?.image,
                      "base64"
                    ).toString("binary");
                  }
                } else {
                  if (item.image) {
                    imageBase64 = Buffer.from(item.image, "base64").toString(
                      "binary"
                    );
                  }
                }

                return (
                  <>
                    <div className="col-3 left">
                      <img src={imageBase64}></img>
                      <div className="delete">
                        <button
                          onClick={() => {
                            this.handleDeleteCart(
                              item.id,
                              this.props.userInfo?.user?.id
                            );
                          }}
                        >
                          <i class="fas fa-trash"></i> xóa
                        </button>
                      </div>
                    </div>
                    <div className="col-6 middle">
                      {" "}
                      {isLogin == true
                        ? item?.Product?.title || "No Title Available"
                        : item.title}
                    </div>
                    <div className="col-3 right">
                      <div className="price">{item.totalPrice}/đ</div>
                      <div className="quantity">
                        <button className="decrease" onClick={()=>{this.decreaseQuantity(item, this.props.userInfo?.user?.id)}}>-</button>
                        <span>{item.quantity}</span>
                        <button className="increase" onClick={()=>{this.increaseQuantity(item, this.props.userInfo?.user?.id)}}>+</button>
                      </div>
                    </div>
                  </>
                );
              })
            ) : (
              <div className="emptyCart">
                <div className="content">Giỏ hàng không có sản phẩm</div>
              </div>
            )}
            <div className="bottom">
              <div className="total-price">
                <div className="content">Tổng tiền : </div>
                <div className="total">{calculateTotalPrice()}/đ</div>
              </div>
              <button
                onClick={() => {
                  this.handlePayment();
                }}
              >
                {this.props.isLogin && this.state.arrCart.length > 0 ? (
                  <Link to="/payment">ĐẶT HÀNG NGAY</Link>
                ) : (
                  "ĐẶT HÀNG NGAY"
                )}
              </button>
            </div>
          </div>
        </div>
        <HomePageFooter />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
    carts: state.user.carts,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: (userId) => dispatch(actions.fetchCart(userId)),
    deleteProductInCart: (productId, userId) =>
      dispatch(actions.deleteProductInCart(productId, userId)),
    increaseQuantity: (data, userId) => dispatch(actions.increaseQuantity(data,userId)),
    decreaseQuantity: (data, userId) => dispatch(actions.decreaseQuantity(data,userId)),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
