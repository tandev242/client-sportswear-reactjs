import React from "react";
import ReactPlayer from "react-player";
import Layout from "../components/layout/Layout";
const Size = () => {
  return (
    <Layout>
      <div className="size">
        <div className="container">
          <div className="row  mgb-45">
            <div className="col-12">
              <div className="size-wrapper">
                <div className="size-header">
                  <h3>Hướng dẫn chọn size</h3>
                </div>
                <div className="size-body">
                  <div className="size-body__image">
                    <img
                      src={require("../assets/images/size/size.jpg").default}
                      alt=""
                    />
                  </div>
                  <div className="size-body__note">
                    <h5 className="size-body__note-title">
                      Lưu ý! Chú ý đến Form chân thon và chân bè
                    </h5>
                    <p>
                      Đối với những người chân thon, gang bàn chân nhỏ, việc
                      chọn mua giày bóng đá chính hãng khá dễ dàng vì chỉ cần
                      căn cứ vào chiều dài. Nhưng với những người chân bè, gang
                      bàn chân to và dầy, cần chú ý đến form đôi giày mình muốn
                      mua. Về thiết kế thì các mẫu giày Form tốc độ sẽ tương đối
                      ôm và bó bề ngang như <b>NIKE MERCURIAL, ADIDAS X</b> thế
                      nên Form chân bè bạn có thể chọn lên 1 Size để cảm thấy
                      thoải mái hơn. Còn những mẫu giày Form kỹ thuật, như{" "}
                      <b>NIKE TIEMPO, PHANTOM VSN, PHANTOM VENOM, MAGISTA...</b>
                      hay{" "}
                      <b>
                        ADIDAS NEMEZIZ, COPA, PREDATOR, PUMA ONE, PUMA FUTURE,
                        MIZUNO...
                      </b>
                      tương đối thoải mái và phù hợp hơn với những bàn chân bè.
                    </p>
                  </div>
                  <div className="size-body__video">
                    <div className="video">
                      <ReactPlayer
                        url="https://youtu.be/UnTgoZ3VbaM"
                        controls
                        width="640px"
                        height="360px"
                      />
                      <i>
                        Video hướng dẫn Canh Size của Giày bóng đá chính hãng
                        rất đơn giản và dễ thực hiện. Các mẹo hay giúp Fix Size
                        trong trường hợp mang không vừa.
                      </i>
                    </div>
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

export default Size;
