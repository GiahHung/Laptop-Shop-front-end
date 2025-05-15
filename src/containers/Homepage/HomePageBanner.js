import React, { Component } from "react";
import "./HomePageBanner.scss";
import Slider from "react-slick";
import banner7 from "../../assets/banner/banner7.webp";
import banner8 from "../../assets/banner/banner8.webp";
import banner9 from "../../assets/banner/banner9.webp";
import banner10 from "../../assets/banner/banner10.webp";
import uuDai1 from "../../assets/section/uuDai1.gif";
import uuDai2 from "../../assets/section/uuDai2.gif";
import uuDai3 from "../../assets/section/uuDai3.gif";
import uuDai4 from "../../assets/section/uuDai4.gif";
import { useNavigate } from "react-router-dom";

class HomePageBanner extends Component {
  constructor(props) {
    super(props);
  }
  handleGetAllProduct = (id) => {
     this.props.navigate(`/all-product/${id}`);
  };
  render() {
    let settings = {
      dots: false,
      infinite: true,
      autoplay: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplaySpeed: 2000,
      cssEase: "linear",
    };
    return (
      <>
        <div className="banner-container">
          <div className="category-container ">
            <div className="content-down container">
              <div className="row">
                <div className="col-2 category">
                  <i class="fas fa-laptop"></i>
                  <span
                    onClick={() => {
                      this.handleGetAllProduct("c2");
                    }}
                  >
                    Laptop
                  </span>
                </div>
                <div className="col-1 category">
                  <i class="fas fa-desktop"></i>
                  <span
                    onClick={() => {
                      this.handleGetAllProduct("c1");
                    }}
                  >
                    Pc
                  </span>
                </div>
                <div className="col-2 category">
                  <i class="fas fa-plug"></i>
                  <span
                    onClick={() => {
                      this.handleGetAllProduct("c3");
                    }}
                  >
                    Linh kiện máy tính
                  </span>
                </div>
                <div className="col-2 category">
                  <i class="fas fa-keyboard"></i>
                  <span
                    onClick={() => {
                      this.handleGetAllProduct("c4");
                    }}
                  >
                    Phụ kiện máy tính
                  </span>
                </div>
                <div className="col-2 category">
                  <i class="fas fa-print"></i>
                  <span
                    onClick={() => {
                      this.handleGetAllProduct("c5");
                    }}
                  >
                    Máy in
                  </span>
                </div>
                <div className="col-3 hotline">
                  <i class="fas fa-headphones"></i>Hotline: 0918123762
                </div>
              </div>
            </div>
          </div>
          <div className="banner">
            <Slider {...settings}>
              <div className="img-customize1"></div>
              <div className="img-customize2"></div>
              <div className="img-customize3"></div>
              <div className="img-customize4"></div>
            </Slider>
            <div className="mini-banner">
              <div className="banner-left"></div>
              <div className="banner-right"></div>
            </div>
            <div className="voucher">
              <img src={banner7}></img>
              <img src={banner8}></img>
              <img src={banner9}></img>
              <img src={banner10}></img>
            </div>
          </div>
          <div className="promotion-container container">
            <div className="promotion row">
              <div className="col-3 promotion-content">
                <img src={uuDai1}></img>
                <span>Hàng chính hãng</span>
              </div>
              <div className="col-3 promotion-content">
                <img src={uuDai2}></img>
                <span>Tuần lễ AI</span>
              </div>
              <div className="col-3 promotion-content">
                <img src={uuDai3}></img>
                <span>Laptop độc quyền</span>
              </div>
              <div className="col-3 promotion-content">
                <img src={uuDai4}></img>
                <span>Ưu đãi học sinh sinh viên</span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

function WithNavigateWrapper(props) {
  const navigate = useNavigate();
  return <HomePageBanner {...props} navigate={navigate} />;
}

export default WithNavigateWrapper;


