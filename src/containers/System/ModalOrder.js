import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import _ from "lodash";
import "./ModalOrder.scss";
import * as actions from "../../store/actions";
import PropTypes from "prop-types";


class ModalOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: "",
      id: "",
      phoneNumber: "",
      note: "",
      address: "",
      email: "",
      payment: "",
      createdAt: "",
      totalPrice: "",
      arrProduct: [],
      statusId: "",
      arrStatus: [],
    };
  }

  componentDidMount() {
    this.props.fetchStatus();
  }

  componentDidUpdate(prevProps) {
    const { detailOrder, arrProduct } = this.props;

    if (
      detailOrder !== prevProps.detailOrder &&
      detailOrder &&
      !_.isEmpty(detailOrder)
    ) {
      this.setState({
        fullName: detailOrder.fullName,
        id: detailOrder.id,
        phoneNumber: detailOrder.phoneNumber,
        note: detailOrder.note,
        address: detailOrder.address,
        email: detailOrder.email,
        payment: detailOrder["paymentData.value"],
        createdAt: detailOrder.createdAt,
        totalPrice: detailOrder.totalPrice,
        statusId: detailOrder.statusId,
      });
    }

    if (
      arrProduct !== prevProps.arrProduct &&
      arrProduct &&
      !_.isEmpty(arrProduct)
    ) {
      this.setState({ arrProduct });
    }
    if (prevProps.statusIds !== this.props.statusIds) {
      const arrStatusId = this.props.statusIds;
      this.setState({
        arrStatus: arrStatusId,
        statusId:
          arrStatusId && arrStatusId.length > 0 ? arrStatusId[0].keyMap : "",
      });
    }
  }
  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnchange = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleClose = () => {
    this.props.onHide();
  };

  handleSave =async () =>{
    this.props.handleEditStatus(this.state)

  } 
  render() {
    // console.log("sssaa", this.state.email);
    let {
      fullName,
      id,
      phoneNumber,
      note,
      address,
      email,
      payment,
      createdAt,
      totalPrice,
      arrProduct,
      statusId,
      arrStatus,
    } = this.state;
    return (
      <>
        <Modal
          show={this.props.show}
          onHide={() => {
            this.handleClose();
          }}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Mã đơn hàng: {id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="container modal-container">
              <div className="row">
                <div className="col-6 ">
                  <span className="title-order">- Tên khách hàng:</span>{" "}
                  {fullName}
                </div>
                <div className="col-6 ">
                  <span className="title-order">- Số điện thoại:</span>{" "}
                  {phoneNumber}
                </div>
                <div className="col-6 mt-4">
                  <span className="title-order">- Email:</span> {email}
                </div>
                <div className="col-6 mt-4">
                  <span className="title-order">- Ghi chú:</span> {note}
                </div>
                <div className="col-6 mt-4">
                  <span className="title-order">- Ngày đặt hàng:</span>{" "}
                  {createdAt}
                </div>
                <div className="col-6 mt-4">
                  <span className="title-order">- Phương thức thanh toán:</span>{" "}
                  {payment}
                </div>
                <div className="col-12 mt-4">
                  <span className="title-order">- Địa chỉ:</span> {address}
                </div>
                <div className="col-12 product mt-4">
                  {arrProduct &&
                    arrProduct.length > 0 &&
                    arrProduct.map((item, index) => {
                      return (
                        <>
                          <div className="name">{item["Product.title"]}</div>
                          <div>
                            {" "}
                            {Number(item.totalPrice).toLocaleString("vi-VN") +
                              "đ"}
                          </div>
                          <div className="quantity">SL: x{item.quantity}</div>
                        </>
                      );
                    })}
                </div>

                <div className="col-12 mt-4 price">
                  - Tổng tiền: {Number(totalPrice).toLocaleString("vi-VN") + "đ"}
                </div>
                <select
                  className="col-6 mt-3"
                  value={statusId}
                  onChange={(event) => {
                    this.handleOnchange(event, "statusId");
                  }}
                >
                  {arrStatus &&
                    arrStatus.length > 0 &&
                    arrStatus.map((item, index) => {
                      return (
                        <option value={item.keyMap} key={index}>
                          {item.value}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                this.handleClose();
              }}
            >
              Close
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                this.handleSave();
              }}
            >
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  }
}
ModalOrder.propTypes = {
  show: PropTypes.bool.isRequired,
  detailOrder: PropTypes.object,
  arrProduct: PropTypes.array,
  toggleFromParent: PropTypes.func.isRequired,
  onHide: PropTypes.func.isRequired,
};

ModalOrder.defaultProps = {
  detailOrder: {},
  arrProduct: [],
};
const mapStateToProps = (state) => {
  return { statusIds: state.admin.statusId };
};

const mapDispatchToProps = (dispatch) => {
  return { fetchStatus: () => dispatch(actions.fetchStatus()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalOrder);
