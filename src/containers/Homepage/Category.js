import React, { Component } from "react";
import { connect } from "react-redux";
import "./Category.scss";
import laptop from "../../assets/category/laptop.webp";
import pc from "../../assets/category/pc.webp";
import mouse from "../../assets/category/mouse.jpg";
import keyboard from "../../assets/category/keyBoard.webp";
import item from "../../assets/category/item.webp";
import printer from "../../assets/category/printer.webp";
import { useNavigate } from "react-router-dom";

class Category extends Component {
  constructor(props) {
    super(props);
  }
  handleGetAllProduct = (id) => {
    this.props.navigate(`/all-product/${id}`);
  };
  render() {
    return (
      <>
        <div className="cate-container">
          <div className="title">
            <span>Danh Mục Sản Phảm</span>
          </div>
          <div className="container">
            <div className="row">
              <div
                className="col-2 product-category"
                onClick={() => {
                  this.handleGetAllProduct("c2");
                }}
              >
                <img src={laptop}></img>
                <div className="name">
                  <div>Laptop</div>
                </div>
              </div>
              <div
                className="col-2 product-category"
                onClick={() => {
                  this.handleGetAllProduct("c1");
                }}
              >
                <img src={pc}></img>
                <div className="name">
                  <div>Pc</div>
                </div>
              </div>
              <div
                className="col-2 product-category"
                onClick={() => {
                  this.handleGetAllProduct("c4");
                }}
              >
                <img src={mouse}></img>
                <div className="name">
                  <div>Chuột</div>
                </div>
              </div>
              <div
                className="col-2 product-category"
                onClick={() => {
                  this.handleGetAllProduct("c4");
                }}
              >
                <img src={keyboard}></img>
                <div className="name">
                  <div>Bàn phím</div>
                </div>
              </div>
              <div
                className="col-2 product-category"
                onClick={() => {
                  this.handleGetAllProduct("c5");
                }}
              >
                <img src={printer}></img>
                <div className="name">
                  <div>máy in</div>
                </div>
              </div>
              <div
                className="col-2 product-category"
                onClick={() => {
                  this.handleGetAllProduct("c3");
                }}
              >
                <img src={item}></img>
                <div className="name">
                  <div>Linh kiện</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
function FunctionCategory(props) {
  const navigate = useNavigate();
  return <Category {...props} navigate={navigate} />;
}
export default FunctionCategory;
