import React from "react";
import Layout from "../components/layout/Layout";

const About = () => {
  return (
    <Layout>
      {/* <AboutContainer /> */}
      <div className="about">
        <div className="container mgb-45">
          <div className="row">
            <div className="col-12">
              <div className="wrapper">
                <div className="about-3">
                  {/* Lock 100% cua 1/3 */}
                  <div className="about-3-1">
                    <img
                      src={
                        require("../assets/images/slides/slideshow_1.jpg")
                          .default
                      }
                      alt=""
                    />
                  </div>

                  <div className="about-3-1">
                    {/* Lock 50% cua 1/3 */}
                    <div className="about-3-1-2">
                      <img
                        src={
                          require("../assets/images/about/about_1.jpg").default
                        }
                        alt=""
                      />
                    </div>
                    <div className="about-3-1-2">
                      <img
                        src={
                          require("../assets/images/about/about_2.png").default
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="about-3-1">
                    <div className="about-3-1-2">
                      <img
                        src={
                          require("../assets/images/about/about_4.png").default
                        }
                        alt=""
                      />
                    </div>
                    <div className="about-3-1-2">
                      <img
                        src={
                          require("../assets/images/about/about_5.jpg").default
                        }
                        alt=""
                      />
                    </div>
                  </div>
                </div>

                <div className="about-3">
                  <h3 className="about-heading">Giới thiệu về DOUBLET SPORT</h3>
                  <div className="about-content">
                    <p>
                      DOUBLET SPORT là cửa hàng cung cấp các sản phẩm Giày thể
                      thao chính hãng NIKE, ADIDAS, MINUZO, KAMITO,... Tất cả
                      sản phẩm đều được nhập khẩu và phân phối chính hãng tại
                      Việt Nam với đầy đủ tem, nhãn, hộp.
                    </p>
                    <p>
                      {" "}
                      Cam kết các sản phẩm chính hãng 100% được nhập khẩu
                      Fullbox từ các nhà phân phối chính hãng tại Việt Nam – Quý
                      khách có thể kiểm tra Tem, nhãn trên sản phẩm, và tham
                      khảo ý kiến mọi người trước khi quyết định mua hàng tại
                      DOUBLET SPORT.
                    </p>
                  </div>
                </div>
                <div className="about-3">
                  <div className="about-3-1">
                    {/* Lock 50% cua 1/3 */}
                    <div className="about-3-1-2">
                      <img
                        src={
                          require("../assets/images/about/about_fit1.jpg")
                            .default
                        }
                        alt=""
                      />
                    </div>
                    <div className="about-3-1-2">
                      <img
                        src={
                          require("../assets/images/about/about_7.jpg").default
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  <div className="about-3-1">
                    <div className="about-3-1-2">
                      <img
                        src={
                          require("../assets/images/about/about_2.png").default
                        }
                        alt=""
                      />
                    </div>
                    <div className="about-3-1-2">
                      <img
                        src={
                          require("../assets/images/about/about_fit2.jpg")
                            .default
                        }
                        alt=""
                      />
                    </div>
                  </div>
                  {/* Lock 100% cua 1/3 */}
                  <div className="about-3-1">
                    <img
                      src={
                        require("../assets/images/slides/slideshow_4.jpg")
                          .default
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
