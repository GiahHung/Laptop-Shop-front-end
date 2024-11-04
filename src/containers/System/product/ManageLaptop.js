import React, { Component } from "react";
import { connect } from "react-redux";
import "./Product.scss";
import * as actions from "../../../store/actions";
import { CRUD_ACTION } from "../../../utils/constant";
import ReactPaginate from "react-paginate";

class ManageLaptop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHot: [],
      arrStatus: [],
      arrBrand: [],
      arrProduct: [],
      totalPage: 0,
      currentPage: 1,
      currentLimit: 8,

      //product info
      nameProduct: "",
      price: "",
      discount: "",
      hotId: "",
      brandId: "",
      statusId: "",
      category: "c2",
      action: "",
      editProductId:''
    };
  }

  componentDidMount() {
    this.props.fetchHotId();
    this.props.fetchBrandId();
    this.props.fetchStatusProductId();
    this.props.fetchAllProduct(
      this.state.currentPage,
      this.state.currentLimit,
      "c2"
    );
  }

  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.products !== this.props.products) {
      this.setState({
        nameProduct: "",
        price: "",
        discount: "",
        hotId: "",
        brandId: "",
        statusId: "",
        action: CRUD_ACTION.CREATE,
        arrProduct: this.props.products,
        totalPage: this.props.totalPages,
      });
    }
    if (prevProps.hotIds !== this.props.hotIds) {
      let arrHot = this.props.hotIds;
      this.setState({
        arrHot: arrHot,
        // hotId: arrHot && arrHot.length > 0 ? arrHot[0].keyMap : ""
      });
    }
    if (prevProps.brandIds !== this.props.brandIds) {
      let arrBrandId = this.props.brandIds;
      this.setState({
        arrBrand: arrBrandId,
        // brandId:
        //  arrBrandId && arrBrandId.length > 0 ? arrBrandId[0].keyMap : "",
      });
    }
    if (prevProps.statusProducts !== this.props.statusProducts) {
      let arrStatus = this.props.statusProducts;
      this.setState({
        arrStatus: arrStatus,
        // statusId: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : "",
      });
    }
  }

  checkValidate = () => {
    let isValid = true;
    let arrInput = ["nameProduct", "price", "discount"];
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

  handlePageClick = (event) => {
    const currentPage = +event.selected + 1;
    this.setState(
      {
        currentPage: currentPage,
      },
      () => {
        this.props.fetchAllProduct(
          this.state.currentPage,
          this.state.currentLimit,
          "c2"
        );
      }
    );
  };

  handleOnclickCreateProduct = () => {
    let validate = this.checkValidate();
    if (validate === false) return;
    if (this.state.action === CRUD_ACTION.CREATE) {
      this.props.createProduct(
        {
          title: this.state.nameProduct,
          price: this.state.price,
          discount: this.state.discount,
          hotId: this.state.hotId,
          brandId: this.state.brandId,
          statusId: this.state.statusId,
          categoryId: this.state.category,
        },
        this.state.currentPage,
        this.state.currentLimit
      );
    } else {
      this.props.updateProduct(
        {
          id: this.state.editProductId,
          title: this.state.nameProduct,
          price: this.state.price,
          discount: this.state.discount,
          hotId: this.state.hotId,
          brandId: this.state.brandId,
          statusId: this.state.statusId,
          categoryId: this.state.category,
        },
        this.state.currentPage,
        this.state.currentLimit
      );
    }
  };

  handleEditProduct = (product) => {
    this.setState({
      nameProduct: product.title,
      price: product.price,
      discount: product.discount,
      hotId: product.hotId,
      brandId: product.brandId,
      statusId: product.statusId,
      action: CRUD_ACTION.EDIT,
      editProductId: product.id,
    });
  };

  handleDeleteProduct = (id) => {
    this.props.deleteProduct(
      id,
      this.state.currentPage,
      this.state.currentLimit
    );
  };
  render() {
    let arrHot = this.state.arrHot;
    let arrStatus = this.state.arrStatus;
    let arrBrand = this.state.arrBrand;
    let arrProduct = this.state.arrProduct;
    let { nameProduct, price, discount, hotId, brandId, statusId, action } =
      this.state;
    console.log("check data", this.state);
    return (
      <React.Fragment>
        <div className="title">Danh sách sản phẩm</div>
        <div className="col-2 logo">
          <i class="fab fa-pied-piper-alt"></i>
          <span>LOGGOO</span>
        </div>
        <div className="frm-input container">
          <div className="row">
            <div className="col-4 form-group">
              <label>Tên sản phẩm</label>
              <input
                type="text"
                className="form-control"
                value={nameProduct}
                onChange={(event) => {
                  this.handleOnchangeInput(event, "nameProduct");
                }}
              />
            </div>
            <div className="col-4 form-group">
              <label>Giá</label>
              <input
                type="number"
                className="form-control"
                value={price}
                onChange={(event) => {
                  this.handleOnchangeInput(event, "price");
                }}
              />
            </div>
            <div className="col-4 form-group">
              <label>Giá giảm</label>
              <input
                type="number"
                className="form-control"
                value={discount}
                onChange={(event) => {
                  this.handleOnchangeInput(event, "discount");
                }}
              />
            </div>
            <div className="col-4 form-group mt-3">
              <label>Thương hiệu</label>
              <select
                className="form-control"
                value={brandId}
                onChange={(event) => {
                  this.handleOnchangeInput(event, "brandId");
                }}
              >
                {arrBrand &&
                  arrBrand.length > 0 &&
                  arrBrand.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {item.value}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-4 form-group mt-3">
              <label>Bán chạy</label>
              <select
                className="form-control"
                value={hotId}
                onChange={(event) => {
                  this.handleOnchangeInput(event, "hotId");
                }}
              >
                {arrHot &&
                  arrHot.length > 0 &&
                  arrHot.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {item.value}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="col-4 form-group mt-3">
              <label>Trạng thái</label>
              <select
                className="form-control"
                value={statusId}
                onChange={(event) => {
                  this.handleOnchangeInput(event, "statusId");
                }}
              >
                {arrStatus &&
                  arrStatus.length > 0 &&
                  arrStatus.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {item.value}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <button
            className={action === CRUD_ACTION.CREATE ? "btn-save" : "btn-edit"}
            onClick={() => {
              this.handleOnclickCreateProduct();
            }}
          >
            Lưu
          </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Tên sản phẩm</th>
              <th scope="col">Giá</th>
              <th scope="col">Thương hiệu </th>
              <th scope="col">Trạng thái</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {arrProduct &&
              arrProduct.length > 0 &&
              arrProduct.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.title}</td>
                    <td>{item.price}VND</td>
                    <td>{item.brandData.value}</td>
                    <td>{item.statusData.value}</td>
                    <td>
                      <i
                        class="fas fa-pencil-alt edit"
                        onClick={() => {
                          this.handleEditProduct(item);
                        }}
                      ></i>
                      <i
                        class="fas fa-trash delete"
                        onClick={() => {
                          this.handleDeleteProduct(item.id);
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
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    hotIds: state.admin.hotIds,
    statusProducts: state.admin.statusProducts,
    brandIds: state.admin.brandIds,
    products: state.admin.products,
    totalPages: state.admin.totalPages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHotId: () => dispatch(actions.fetchHotId()),
    fetchBrandId: () => dispatch(actions.fetchBrandId()),
    fetchStatusProductId: () => dispatch(actions.fetchStatusProductId()),
    fetchAllProduct: (page, limit, category) =>
      dispatch(actions.fetchAllProduct(page, limit, category)),
    createProduct: (data, page, limit) =>
      dispatch(actions.createProduct(data, page, limit)),
    deleteProduct: (id, page, limit) =>
      dispatch(actions.deleteProduct(id, page, limit)),
    updateProduct: (data, page, limit) =>
      dispatch(actions.updateProduct(data, page, limit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageLaptop);
