import { connect } from "react-redux";
import React, { Component } from "react";
import HomePageHeader from "./HomePageHeader";
import HomePageFooter from "./HomePageFooter";
import "./AllProductPage.scss";
import { Buffer } from "buffer";
import * as actions from "../../store/actions";
import { useParams } from "react-router-dom";
import { handleGetAllProductService } from "../../services/userServices";

class AllProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrProduct: [],
    };
  }

  componentDidMount() {
    this.handleGetAllProduct();
  }

  componentDidUpdate(prevProps, prevState, snapShot) {}

  handleGetAllProduct = async () => {
    const { id } = this.props;

    try {
      const res = await handleGetAllProductService(id);
      if (res.errCode === 0) {
        this.setState({
          arrProduct: res.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
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
    console.log("checkstate:", this.state);
    const { arrProduct } = this.state;
    return (
      <React.Fragment>
        <HomePageHeader />
        <div className="product-container">
          <div>
            <div className="list-product">
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
                    <div className="product ">
                      <div className="img">
                        <img src={imageBase64} />
                      </div>
                      <div className="detail">
                        <div className="name">
                          <p>{item.title}</p>
                        </div>
                        <div className="discount">
                          {Number(item.discount).toLocaleString("vi-VN") + "đ"}
                        </div>
                        <div className="price">
                   
                          {Number(item.price).toLocaleString("vi-VN") +
                            "đ"}
                          
                        </div>
                      </div>
                      <div className="btn-add-to-cart">
                        <button onClick={() => this.handleAddToCart(item)}>
                          Thêm vào giỏ hàng
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
        <HomePageFooter />
      </React.Fragment>
    );
  }
}
function WithParamsWrapper(props) {
  const { id } = useParams();
  console.log("check id:", id);
  return <AllProductPage {...props} id={id} />;
}
const mapStateToProps = (state) => {
  return {
    isLogin: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addProductToCart: (data, userId) =>
      dispatch(actions.addProductToCart(data, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WithParamsWrapper);
