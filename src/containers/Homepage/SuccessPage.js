import { connect } from "react-redux";
import React, { Component } from "react";
import HomePageHeader from "./HomePageHeader";
import HomePageFooter from "./HomePageFooter";
import "./SuccessPage.scss";
import { saveOrder,saveDetailOrder } from "../../services/userServices";
import * as actions from "../../store/actions";
import payment from "../../assets/payment_success_icon.png";
import axios from "axios";

class SuccessPage extends Component {
  constructor(props) {
    const { name, phoneNumber, amount } = JSON.parse(
      localStorage.getItem("orderDetails")
    );
    super(props);
    this.state = {
      name: name,
      phone: phoneNumber,
      amount: amount,
    };
  }

  componentDidMount() {
    this.handleSuccess()
  }

  handleSuccess = async () => {
    const queryParams = new URLSearchParams(window.location.search);
    const transactionId = queryParams.get("apptransid"); // Retrieve 'trans' from URL query
    console.log("c");
    if (transactionId) {
      try {
        // Step 2: Check payment status
        const paymentStatus = await axios.post(
          `http://localhost:8080/api/check-status-payment?trans=${transactionId}`
        );

        if (paymentStatus.data.return_code === 1) {
          // Step 3: Save the order
          const {
            userId,
            name,
            email,
            address,
            phoneNumber,
            note,
            amount,
            paymentId,
            product,
          } = JSON.parse(localStorage.getItem("orderDetails")); // Store user details locally before redirection
          console.log("a");
          const orderId = await saveOrder({
            userId,
            name,
            email,
            address,
            phoneNumber,
            note,
            amount,
            paymentId,
          });
          console.log("b");
          await saveDetailOrder(orderId.data.id, product);
          localStorage.removeItem("orderDetails");
          const newUrl = window.location.origin + window.location.pathname; // Base URL without params
          window.history.replaceState({}, document.title, newUrl);
        } else {
          alert("Payment failed or was not successful.");
        }
      } catch (error) {
        console.log("Error verifying payment:", error);
        alert(
          "An error occurred while verifying payment. Please try again.",
          error
        );
      }
    } else {
      alert("Invalid transaction data.");
    }
  };
  componentDidUpdate(prevProps, prevState, snapShot) {}

  render() {
    const { name, phone, amount } = this.state;
    return (
      <>
        <HomePageHeader />
        <div className="payment-success-container">
          <img src={payment}></img>
          <h3>Thanh toán thành công</h3>
          <p>Cảm ơn bạn đã mua hàng</p>
          <div className="content">
            <div className="total">
              <sapn>Tổng tiền:</sapn>
              <span>{amount}/đ</span>
            </div>
            <div className="name">
              <sapn>Họ tên:</sapn>
              <span>{name}</span>
            </div>
            <div className="number">
              <sapn>Số điện thoại:</sapn>
              <span>{phone}</span>
            </div>
          </div>
          <a href="/" className="btn btn-primary">
            Return to Home
          </a>
        </div>
        <HomePageFooter />
      </>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};
export default connect(mapStateToProps, mapDispatchToProps)(SuccessPage);
