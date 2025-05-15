import React, { Component } from "react";
import { connect } from "react-redux";
import Slider from "react-slick";
import "./Item.scss";
import * as actions from "../../../store/actions";
import { Buffer } from "buffer";
import { useNavigate } from "react-router-dom";

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProduct: [],
    };
  }

  componentDidMount() {
    this.props.fetchItem();
  }

  componentDidUpdate(prevProps, prevState, snapSho) {
    if (prevProps.arrItem !== this.props.arrItem) {
      this.setState({
        arrProduct: this.props.arrItem,
      });
    }
  }
  handleGetAllProduct = (id) => {
    this.props.navigate(`/all-product/${id}`);
  };

  saveProductToLocalStorage = (product) => {
    if (!product || !product.id) {
      console.error("Invalid product data");
      return;
    }
    let storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    const existingProduct = storedProducts.find(
      (item) => item.id === product.id
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.totalPrice = product.discount * existingProduct.quantity;
    } else {
      product.quantity = 1;
      product.totalPrice = product.discount * product.quantity;
      storedProducts.push(product);
    }
    localStorage.setItem("products", JSON.stringify(storedProducts));
  };

  addToCart = (data, userId) => {
    this.props.addProductToCart(
      {
        userId: userId,
        productId: data.id,
        price: data.discount,
      },
      userId
    );
  };

  handleAddToCart = (item) => {
    const { isLogin, userInfo } = this.props;
    if (isLogin && userInfo?.user?.id) {
      this.addToCart(item, userInfo.user.id);
    } else {
      this.saveProductToLocalStorage(item);
    }
  };
  render() {
    let arrProduct = this.state.arrProduct;
    return (
      <>
        <div className="item-container">
          <div className=" content">
            <div className="title">Linh kiện máy tính</div>
            <div className="see-more">
              <span
                onClick={() => {
                  this.handleGetAllProduct("c3");
                }}
              >
                Xem tất cả <i class="fas fa-arrow-right"></i>
              </span>
            </div>
          </div>
          <div className="slider">
            <Slider {...this.props.settings}>
              {arrProduct &&
                arrProduct.length > 0 &&
                arrProduct.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = Buffer.from(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div className="img-customize">
                      <img src={imageBase64}></img>

                      <div className="name">{item.title}</div>
                      <div className="price">
                        {Number(item.discount).toLocaleString("vi-VN") + "đ"}
                      </div>
                      <div className="discount">
                        {Number(item.price).toLocaleString("vi-VN") + "đ"}
                      </div>
                      <button onClick={() => this.handleAddToCart(item)}>
                        Thêm vào giỏ hàng
                      </button>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    arrItem: state.admin.arrItem,
    isLogin: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchItem: () => dispatch(actions.fetchItem()),
    addProductToCart: (data, userId) =>
      dispatch(actions.addProductToCart(data, userId)),
  };
};
function FunctionItem(props) {
  const navigate = useNavigate();
  return <Item {...props} navigate={navigate} />;
}
export default connect(mapStateToProps, mapDispatchToProps)(FunctionItem);
