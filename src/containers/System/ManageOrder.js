import * as actions from "../../store/actions";
import React, { Component } from "react";
import { connect } from "react-redux";
import ModalOrder from "./ModalOrder";
import ReactPaginate from "react-paginate";
import "./ManageOrder.scss";
import { handleSendEmail } from "../../services/adminServices";

class ManageOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailOrder: [],
      arrProduct: [],
      arrOrder: [],
      isModalOpen: false,
      currentPage: 1,
      currentLimit: 8,
      totalPage: 0,
    };
  }

  componentDidMount() {
    this.props.fetchOrder(this.state.currentPage, this.state.currentLimit);
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.arrOrder !== this.props.arrOrder) {
      this.setState({
        arrOrder: this.props.arrOrder,
        totalPage: this.props.totalOrderPage,
      });
    }
  }

  handleEdit = (order) => {
    this.props.fetchTransaction(order.id);
    this.setState({
      isModalOpen: true,
      detailOrder: order,
      arrProduct: this.props.arrTransaction,
    });
  };
  handlePageClick = (event) => {
    const currentPage = +event.selected + 1;
    this.setState(
      {
        currentPage: currentPage,
      },
      () => {
        this.props.fetchAllUser(
          this.state.currentPage,
          this.state.currentLimit
        );
      }
    );
  };
  toggleModalUser = () => {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  };

  handleEditStatus = async (order) => {
    console.log("a-------------",order)
    this.props.updateStatus(
      order,
      this.state.currentPage,
      this.state.currentLimit
    );
    this.setState({
      isModalOpen: false,
    });
    await handleSendEmail(
      order.email,
      order.fullName,
      order.phoneNumber,
      order.address
    );
  };

  render() {
    let { arrOrder } = this.state;
    console.log(this.state);
    return (
      <div className="container">
        <ModalOrder
          show={this.state.isModalOpen}
          onHide={this.toggleModalUser}
          detailOrder={this.state.detailOrder}
          arrProduct={this.state.arrProduct}
          handleEditStatus={this.handleEditStatus}
        />
        <div className="control">
          <div className="search">
            <input type="text" placeholder="Search..." />
            <i class="fas fa-search"></i>
          </div>
        </div>

        <div className="table-order">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Mã đơn hàng</th>
                <th scope="col">Số điện thoại</th>
                <th scope="col">Tổng tiền </th>
                <th scope="col">Ngày đặt</th>
                <th scope="col">Trạng thái</th>
                <th scope="col" className="sort">
                  <i class="fas fa-sort"></i>
                </th>
              </tr>
            </thead>
            <tbody>
              {arrOrder &&
                arrOrder.length > 0 &&
                arrOrder.map((item, index) => {
                  return (
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.phoneNumber}</td>
                      <td>
                        {Number(item.totalPrice).toLocaleString("vi-VN") + "đ"}
                      </td>
                      <td>{item.createdAt}</td>
                      <td className={item.statusId === "s1" ? "red" : "green"}>
                        {item["statusDt.value"]}
                      </td>
                      <td>
                        <i
                          class="fas fa-pencil-alt edit"
                          onClick={() => {
                            this.handleEdit(item);
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {this.state.totalPage > 0 && (
            <div className="footer">
              <ReactPaginate
                nextLabel=" >"
                onPageChange={(e) => {
                  this.handlePageClick(e);
                }}
                pageRangeDisplayed={3}
                marginPagesDisplayed={2}
                pageCount={this.state.totalPage}
                previousLabel="< "
                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakLabel="..."
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                renderOnZeroPageCount={null}
              />
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    arrOrder: state.admin.arrOrder,
    totalOrderPage: state.admin.totalOrderPage,
    arrTransaction: state.admin.arrTransaction,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrder: (page, limit) => dispatch(actions.fetchOrder(page, limit)),
    fetchTransaction: (id) => dispatch(actions.fetchTransaction(id)),
    updateStatus: (data, page, limit) =>
      dispatch(actions.updateStatus(data, page, limit)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(ManageOrder);
