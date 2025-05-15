import React, { Component } from "react";
import { connect } from "react-redux";
import HomePageHeader from "./HomePageHeader";
import HomePageFooter from "./HomePageFooter";
import { Buffer } from "buffer";
import * as actions from "../../store/actions";
import { Link, Navigate } from "react-router-dom";
import "./OrderPage.scss";
import { handleGetUserOrderService } from "../../services/userServices";

class OrderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrOrder: [],
      arrTransaction: [],
    };
  }

  componentDidMount() {
    this.handleGetOrder();
  }

  handleGetOrder = async () => {
    try {
      let userId = this.props.userInfo.user.id;
      let data = await handleGetUserOrderService(userId);
      if (data.errCode === 0) {
        this.setState({
          arrOrder: data.order,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    console.log("checkstate: ", this.state.arrOrder.Transactions);
    const { arrOrder } = this.state;
    return (
      <>
        <HomePageHeader />
        <div className="order-container">
          {arrOrder.length > 0 ? (
            <div className="order-detail">
              {arrOrder.map((item, index) => {
                return (
                  <div className="order">
                    <div className="top">
                      <div className="date">
                        Ngày đặt hàng: {item.createdAt}
                      </div>
                      <div className="status">{item.statusDt.value}</div>
                    </div>

                    {item.Transactions.map((data, idx) => {
                      let imageBase64 = "";
                      if (data?.Product?.image) {
                        imageBase64 = Buffer.from(
                          data?.Product?.image,
                          "base64"
                        ).toString("binary");
                      }
                      return (
                        <div className="middle">
                          <img src={imageBase64}></img>
                          <div>{data.Product.title}</div>
                          <div>sl: x{data.quantity}</div>
                          <div>{data.totalPrice}/đ</div>{" "}
                        </div>
                      );
                    })}

                    <div className="down">Tổng tiền: {item.totalPrice}/đ</div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="empty-container">
              <div className="empty-content">Không có đơn hàng nào</div>
              <Link to="/home">Tiếp tục mua sắm</Link>
            </div>
          )}
        </div>
        <HomePageFooter />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderPage);
