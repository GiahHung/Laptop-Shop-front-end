import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import "./Revenue.scss";
import {
  handleGetAmountOrderService,
  handleGetAmountOrderNotConfirmService,
  handleGetRevenueService,
  handleGetRevenueTodayService,
} from "../../services/adminServices";

class Revenue extends Component {
  constructor(props) {
    super(props);
    this.state = {
      amountOrder: "",
      amountOrderNotConfirm: "",
      revenueToday: "",
      detailRevenue: [],
      revenueId: "",
      arrRevenue: [],
    };
  }

  async componentDidMount() {
    try {
      // Fetch the revenueId first
      await this.props.fetchRevenueId();

      const { revenueId } = this.state;

      // Check if revenueId is valid
      if (!revenueId) {
        console.error("Revenue ID is null or undefined.");
        return; // Exit if revenueId is not available
      }

      this.handleGetAmountOrder();
      this.handleGetRevenueToday();
      this.handleGetAmountOrderNotConfirm();
      await Promise.all([this.handleGetRevenue(revenueId), ,]);
    } catch (error) {
      console.error("Error during component mount:", error);
    }
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.revenueId !== this.props.revenueId) {
      this.setState({
        arrRevenue: this.props.revenueId,
        revenueId:
          this.props.revenueId && this.props.revenueId.length > 0
            ? this.props.revenueId[0].keyMap
            : "",
      });
    }
  }

  handleGetAmountOrder = async () => {
    let res = await handleGetAmountOrderService();
    this.setState({
      amountOrder: res.data,
    });
  };

  handleGetRevenue = async (revenueId) => {
    let res = await handleGetRevenueService(revenueId);
    this.setState({
      detailRevenue: res.data,
    });
  };

  handleGetAmountOrderNotConfirm = async () => {
    let res = await handleGetAmountOrderNotConfirmService();
    this.setState({
      amountOrderNotConfirm: res.data,
    });
  };

  handleGetRevenueToday = async () => {
    let res = await handleGetRevenueTodayService();
    this.setState({
      revenueToday: res.data,
    });
  };
  handleOnchangeInput = (event, id) => {
    // Create a copy of the current state and update the specific value
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    // Update state asynchronously
    this.setState(copyState, () => {
      // Callback function runs after state is updated
      const { revenueId } = this.state;
      if (revenueId) {
        this.handleGetRevenue(revenueId); // Call with the updated revenueId
      }
    });
  };
  render() {
    const {
      arrRevenue,
      revenueId,
      amountOrder,
      amountOrderNotConfirm,
      revenueToday,
      detailRevenue,
    } = this.state;
    console.log(revenueId);
    const calculateTotalRevenue = () => {
      return detailRevenue.reduce(
        (total, item) => total + parseInt(item.totalRevenue || 0),
        0
      );
    };
    return (
      <React.Fragment>
        <div className="container revenue-container">
          <div className="row block">
            <div className="col-4 left">
              <div className="content">
                <div className="revenue-title">Đơn hàng chờ duyệt</div>
                <div className="number">{amountOrderNotConfirm}</div>
              </div>
            </div>
            <div className="col-4 middle">
              <div className="content">
                <div className="revenue-title">Đơn hàng trong ngày</div>
                <div className="number">{amountOrder}</div>
              </div>
            </div>
            <div className="col-4 right">
              <div className="content">
                <div className="revenue-title">Doanh thu trong ngày</div>
                <div className="number">
                  {Number(revenueToday).toLocaleString("vi-VN") + "đ"}
                </div>
              </div>
            </div>
          </div>
          <div className="row revenue-detail">
            <div className="col-4 ">
              <select
                className="form-control"
                value={revenueId}
                onChange={(event) => {
                  this.handleOnchangeInput(event, "revenueId");
                }}
              >
                {arrRevenue &&
                  arrRevenue.length > 0 &&
                  arrRevenue.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {item.value}
                      </option>
                    );
                  })}
              </select>
            </div>
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Phương thức thanh toán</th>
                  <th scope="col">Tổng tiền</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
                {detailRevenue &&
                  detailRevenue.length > 0 &&
                  detailRevenue.map((item, index) => {
                    return (
                      <tr>
                        <td>{item["paymentData.value"]}</td>
                        <td>
                          {Number(item.totalRevenue).toLocaleString("vi-VN") +
                            "đ"}
                        </td>
                      </tr>
                    );
                  })}

                <tr>
                  <td className="total">Tổng</td>
                  <td className="total">
                   
                    {Number(calculateTotalRevenue()).toLocaleString("vi-VN") + "đ"}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    revenueId: state.admin.revenueId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchRevenueId: () => dispatch(actions.fetchRevenueId()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Revenue);
