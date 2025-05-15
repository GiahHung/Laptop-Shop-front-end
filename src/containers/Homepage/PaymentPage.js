import { connect } from "react-redux";
import React, { Component } from "react";
import HomePageHeader from "./HomePageHeader";
import HomePageFooter from "./HomePageFooter";
import "./PaymentPage.scss";
import { Buffer } from "buffer";
import * as actions from "../../store/actions";
import axios from "axios";

class PaymentPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      arrCart: [],
      arrPayment: [],
      amount: "",
      email: "",
      name: "",
      address: "",
      phoneNumber: "",
      paymentId: "",
      note: "",
    };
  }

  componentDidMount() {
    const userId = this.props.userInfo?.user?.id || "";
    this.setState({ userId });
    this.props.fetchCart(userId);
    this.props.fetchPaymentId();
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.carts !== this.props.carts) {
      const cart = this.props.carts;
      this.setState({
        arrCart: cart,
        amount: cart.reduce((total, item) => total + (item.totalPrice || 0), 0),
      });
    }
    if (prevProps.paymentIds !== this.props.paymentIds) {
      this.setState({
        arrPayment: this.props.paymentIds,
        paymentId:
          this.props.paymentIds && this.props.paymentIds.length > 0
            ? this.props.paymentIds[0].keyMap
            : "",
      });
    }
  }

  handlePaymentZalo = async () => {
    const {
      amount,
      userId,
      paymentId,
      name,
      email,
      address,
      phoneNumber,
      note,
    } = this.state;

    // Validate input fields
    if (!this.checkValidate()) {
      return;
    }

    try {
      // Step 1: Initiate ZaloPay payment
      const paymentResponse = await axios.post(
        "http://localhost:8080/api/payment",
        {
          amount: parseInt(amount, 10),
          redirecturl: "http://localhost:3000/payment-success",
        }
      );

      if (paymentResponse.data.message.order_url) {
        localStorage.setItem(
          "orderDetails",
          JSON.stringify({
            userId,
            name,
            email,
            address,
            phoneNumber,
            note,
            amount,
            paymentId,
            product: this.state.arrCart,
          })
        );
        window.location.href = paymentResponse.data.message.order_url;
      } else {
        alert("Cannot create payment order. Please try again.");
      }
    } catch (error) {
      console.error("Error processing payment:", error);
      alert("An error occurred. Please try again.");
    }
  };
  checkValidate = () => {
    let isValid = true;
    let arrInput = ["name", "email", "phoneNumber", "address"];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Input is require " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };
  render() {
    console.log("bbbbbbbbbb", this.state);
    const {
      arrCart,
      arrPayment,
      paymentId,
      name,
      address,
      phoneNumber,
      email,
      note,
    } = this.state;
    const calculateTotalPrice = () => {
      return arrCart.reduce((total, item) => total + (item.totalPrice || 0), 0);
    };
    return (
      <>
        <HomePageHeader />
        <div className="container pay-container">
          <div className="row pay-content">
            <div className="content-left col-6">
              {arrCart &&
                arrCart.length > 0 &&
                arrCart.map((item, index) => {
                  let imageBase64 = "";
                  if (item?.Product?.image) {
                    imageBase64 = Buffer.from(
                      item?.Product?.image,
                      "base64"
                    ).toString("binary");
                  }

                  return (
                    <div className="main-content">
                      <div className="col-3 left">
                        <img src={imageBase64}></img>
                      </div>
                      <div className="col-6 middle">{item?.Product?.title}</div>
                      <div className="col-3 right">
                        <div className="price">{item.totalPrice}/đ</div>
                        <div className="quantity">
                          <span>x{item.quantity}</span>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="content-right col-6">
              <div className="col-12 form-group mt-3">
                <label>Email</label>
                <input
                  type="email"
                  className="form-control"
                  value={email}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "email");
                  }}
                />
              </div>
              <div className="col-12 form-group mt-3">
                <label>Họ tên</label>
                <input
                  className="form-control"
                  value={name}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "name");
                  }}
                />
              </div>
              <div className="col-12 form-group mt-3">
                <label>Số điện thoại</label>
                <input
                  type="number"
                  className="form-control"
                  value={phoneNumber}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "phoneNumber");
                  }}
                />
              </div>
              <div className="col-12 form-group mt-3">
                <label>Địa chỉ</label>
                <input
                  className="form-control"
                  value={address}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "address");
                  }}
                />
              </div>
              <div className="col-12 form-group mt-3">
                <label>Ghi chú</label>
                <input
                  className="form-control"
                  value={note}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "note");
                  }}
                />
              </div>
              <div className="col-12 mt-3 total-price">
                Tổng số tiền: {calculateTotalPrice()}/đ
              </div>
              <div className="col-4 mt-2">
                <label>Phương thức thanh toán</label>
                <select
                  className="form-control"
                  value={paymentId}
                  onChange={(event) => {
                    this.handleOnchangeInput(event, "paymentId");
                  }}
                >
                  {arrPayment &&
                    arrPayment.length > 0 &&
                    arrPayment.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
              </div>
              <button
                className="col-12 mt-3"
                onClick={() => {
                  this.handlePaymentZalo();
                }}
              >
                Đặt hàng
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
    userInfo: state.user.userInfo,
    carts: state.user.carts,
    paymentIds: state.admin.paymentIds,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCart: (userId) => dispatch(actions.fetchCart(userId)),
    fetchPaymentId: () => dispatch(actions.fetchPaymentId()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PaymentPage);
