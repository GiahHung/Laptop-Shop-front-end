import React, { Component } from "react";
import { connect } from "react-redux";
import ReactPaginate from "react-paginate";
import CommonUtils from "../../../utils/CommonUtils";
import "yet-another-react-lightbox/styles.css";
import Lightbox from "yet-another-react-lightbox";
import { Buffer } from "buffer";
import "./Product.scss";
import { CRUD_ACTION } from "../../../utils/constant";
import * as actions from "../../../store/actions";

class ManagePc extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrHot: [],
      arrStatus: [],
      arrProduct: [],
      totalPage: 0,
      currentPage: 1,
      currentLimit: 8,

      previewImg: "",
      isPreviewOpen: false,

      //product info
      nameProduct: "",
      price: "",
      discount: "",
      hotId: "",
      statusId: "",
      category: "c1",
      image: "",
      action: "",
      editProductId: "",
    };
  }
  componentDidMount() {
    this.props.fetchAllProduct(
      this.state.currentPage,
      this.state.currentLimit,
      "c1"
    );
    this.props.fetchHotId();
    this.props.fetchStatusProductId();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    let stateUpdates = {};

    if (prevProps.products !== this.props.products) {
      stateUpdates = {
        ...stateUpdates,
        nameProduct: "",
        price: "",
        discount: "",
       // hotId: "",
        //statusId: "",
        image: "",
        previewImg: "",
        action: CRUD_ACTION.CREATE,
        arrProduct: this.props.products,
        totalPage: this.props.totalPages,
      };
    }

    if (prevProps.hotIds !== this.props.hotIds) {
      const arrHot = this.props.hotIds;
      stateUpdates = {
        ...stateUpdates,
        arrHot: arrHot,
        hotId: arrHot && arrHot.length > 0 ? arrHot[0].keyMap : "",
      };
    }

    if (prevProps.statusProducts !== this.props.statusProducts) {
      const arrStatus = this.props.statusProducts;
      stateUpdates = {
        ...stateUpdates,
        arrStatus: arrStatus,
        statusId: arrStatus && arrStatus.length > 0 ? arrStatus[0].keyMap : "",
      };
    }

    if (Object.keys(stateUpdates).length > 0) {
      this.setState(stateUpdates);
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
          this.state.category
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
          statusId: this.state.statusId,
          categoryId: this.state.category,
          image: this.state.image,
        },
        this.state.currentPage,
        this.state.currentLimit,
        this.state.category
      );
    } else {
      this.props.updateProduct(
        {
          id: this.state.editProductId,
          title: this.state.nameProduct,
          price: this.state.price,
          discount: this.state.discount,
          hotId: this.state.hotId,
          statusId: this.state.statusId,
          categoryId: this.state.category,
          image: this.state.image,
        },
        this.state.currentPage,
        this.state.currentLimit,
        this.state.category
      );
    }
  };

  handleEditProduct = (product) => {
    let imageBase64 = "";
    if (product.image) {
      imageBase64 = Buffer.from(product.image, "base64").toString("binary");
    }
    this.setState({
      nameProduct: product.title,
      price: product.price,
      discount: product.discount,
      hotId: product.hotId,
      statusId: product.statusId,
      previewImg: imageBase64,
      action: CRUD_ACTION.EDIT,
      editProductId: product.id,
    });
  };

  handleDeleteProduct = (id) => {
    this.props.deleteProduct(
      id,
      this.state.currentPage,
      this.state.currentLimit,
      this.state.category
    );
  };

  handleOnchangePreviewImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let objectUrl = URL.createObjectURL(file);
      let base64 = await CommonUtils.getBase64(file);
      // console.log("base 64: ", base64)
      this.setState({
        previewImg: objectUrl,
        image: base64,
      });
    }
  };

  handlePreviewOpen = () => {
    this.setState({
      isPreviewOpen: true,
    });
  };
  render() {
    let arrHot = this.state.arrHot;
    let arrStatus = this.state.arrStatus;
    let arrProduct = this.state.arrProduct;
    let { nameProduct, price, discount, hotId, statusId, action } = this.state;
    console.log("check data", this.state);
    return (
      <React.Fragment>
        <div className="title">PC</div>
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
            <div className="col-3 mt-3 mb-5 upload-image">
            <label>Hình ảnh</label>
            <div className="image">
              <input
                id="upload"
                type="file"
                className="form-control"
                hidden
                onChange={(event) => {
                  this.handleOnchangePreviewImg(event);
                }}
              />
              <div
                className="preview-img"
                style={{ backgroundImage: `url(${this.state.previewImg})` }}
                onClick={() => {
                  this.handlePreviewOpen();
                }}
              ></div>
              <label htmlFor="upload" className="upload-btn">
                Tải ảnh<i className="fas fa-upload"></i>
              </label>
            </div>
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
                    <td> {Number(item.price).toLocaleString("vi-VN") + "đ"}</td>

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
        {this.state.isPreviewOpen && (
          <Lightbox
            open={this.state.isPreviewOpen}
            close={() => this.setState({ isPreviewOpen: false })}
            slides={[{ src: this.state.previewImg }]}
          />
        )}
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    hotIds: state.admin.hotIds,
    statusProducts: state.admin.statusProducts,
    products: state.admin.products,
    totalPages: state.admin.totalPages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchHotId: () => dispatch(actions.fetchHotId()),
    fetchStatusProductId: () => dispatch(actions.fetchStatusProductId()),
    fetchAllProduct: (page, limit, category) =>
      dispatch(actions.fetchAllProduct(page, limit, category)),
    createProduct: (data, page, limit, category) =>
      dispatch(actions.createProduct(data, page, limit, category)),
    deleteProduct: (id, page, limit, category) =>
      dispatch(actions.deleteProduct(id, page, limit, category)),
    updateProduct: (data, page, limit, category) =>
      dispatch(actions.updateProduct(data, page, limit, category)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePc);
