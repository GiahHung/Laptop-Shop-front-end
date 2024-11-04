import React, { Component } from "react";
import { connect } from "react-redux";
import "./Category.scss";
import laptop from "../../assets/category/laptop.webp";
import pc from "../../assets/category/pc.webp";
import mouse from "../../assets/category/mouse.jpg";
import keyboard from "../../assets/category/keyBoard.webp";
import item from "../../assets/category/item.webp";
import printer from "../../assets/category/printer.webp";

class Category extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <div className="cate-container">
          <div className="title">
            <span>Danh Mục Sản Phảm</span>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-2 product">
                <img src={laptop}></img>
                <div className="name">
                  <div>Laptop</div>
                </div>
              </div>
              <div className="col-2 product">
                <img src={pc}></img>
                <div className="name">
                  <div>Pc</div>
                </div>
              </div>
              <div className="col-2 product">
                <img src={mouse}></img>
                <div className="name">
                  <div>Chuột</div>
                </div>
              </div>
              <div className="col-2 product">
                <img src={keyboard}></img>
                <div className="name">
                  <div>Bàn phím</div>
                </div>
              </div>
              <div className="col-2 product">
                <img src={printer}></img>
                <div className="name">
                  <div>máy in</div>
                </div>
              </div>
              <div className="col-2 product">
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
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
