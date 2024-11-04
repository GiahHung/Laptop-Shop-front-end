import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import "./HomePageFooter.scss";
import payment from "../../assets/vnpay_banks.png";

class HomePageFooter extends Component {
  render() {
    return (
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-content-2">
            <div className="title">Thông Tin</div>
            <div className="content">
              <div className="content-2">Giới thiệu</div>
              <div className="content-2">Black friday</div>
            </div>
          </div>
          <div className="footer-content-2">
            <div className="title">Chính Sách Mua Hàng</div>
            <div className="content">
              <div className="content-2">chính sách bảo hành</div>
              <div className="content-2">chính sách giao hàng</div>
              <div className="content-2">chính sách bảo mật</div>
              <div className="content-2">chính sách thanh toán</div>
            </div>
          </div>

          <div className="footer-content-2">
            <div className="title">Liên Hệ</div>
            <div className="content">
              <div className="content-2">Hotline: 0918123762</div>
              <div className="content-2">Hotline: 0814918123</div>
              <div className="content-2">Email: Loggoo@gmail.com</div>
            </div>
          </div>
        </div>
        <div className="footer-content-down">
          <div className="payment-container">
            <div className="title">Phương thức thanh toán</div>
            <div className="payment">
              <div className="cash">
                <i class="fas fa-money-bill"></i>
                <span>Tiền mặt</span>
              </div>
              <div className="internet-banking">
                <i class="far fa-credit-card"></i>
                <span>Internet-banking</span>
              </div>
            </div>
          </div>
          <div className="bank">
            <div className="title">Danh sách ngân hàng thanh toán</div>
            <img src={payment}></img>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePageFooter);
