import React from "react";
import { FormControl, TextField } from "@material-ui/core";
import Layout from "../components/layout/Layout";
import { ToastContainer, toast } from "react-toastify";
import { settings } from "../components/toasts/settingToast";
const Contact = () => {
  const notify = () => toast.info("Tính năng đang được phát triển", settings);
  return (
    <Layout>
      {/* <ContactContainer /> */}
      <div className="contact">
        <div className="container mgb-45">
          <div className="row">
            <div className="col-12">
              <div className="wrapper">
                <h3 className="wrapper-heading">Liên hệ</h3>
                <div className="wrapper-body">
                  <div className="row">
                    <div className="col-6">
                      <div className="wrapper-body__info">
                        <p className="wrapper-body__info-title">
                          Địa chỉ chúng tôi
                        </p>
                        <p className="wrapper-body__info-content">
                          Công ty TNHH DOUBLET SPORT : 1 Võ Văn Ngân ,Phường
                          Linh Chiểu, Thành Phố Thủ Đức
                        </p>
                      </div>
                      <div className="wrapper-body__info">
                        <p className="wrapper-body__info-title">
                          Email chúng tôi
                        </p>
                        <p className="wrapper-body__info-content">
                          doubletsport@gmail.com
                        </p>
                      </div>
                      <div className="wrapper-body__info">
                        <p className="wrapper-body__info-title">
                          Số điện thoại
                        </p>
                        <p className="wrapper-body__info-content">
                          039-888-999 - 036-444-666
                        </p>
                      </div>
                      <div className="wrapper-body__info">
                        <p className="wrapper-body__info-title">
                          Thời gian làm việc
                        </p>
                        <p className="wrapper-body__info-content">
                          Từ 8:00 đến 20:00 hằng ngày
                        </p>
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="wrapper-body__wonder">
                        <h3 className="wrapper-body__wonder-heading">
                          Bạn cần tư vấn ?
                        </h3>
                        <div action="">
                          <FormControl fullWidth sx={{ mt: 2 }}>
                            <div className="row">
                              <div className="col-6">
                                <TextField
                                  label="Họ và tên"
                                  variant="outlined"
                                  fullWidth
                                />
                              </div>
                              <div className="col-6">
                                <TextField
                                  label="Số điện thoại"
                                  variant="outlined"
                                  fullWidth
                                />
                              </div>
                            </div>
                          </FormControl>
                          <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField fullWidth label="Email của bạn" />
                          </FormControl>
                          <FormControl fullWidth sx={{ mt: 2 }}>
                            <TextField
                              multiline
                              rows={4}
                              fullWidth
                              label="Nội dung"
                            />
                          </FormControl>
                          <div className="form-btn">
                            <button
                              className="btn wonder-btn"
                              onClick={() => notify()}
                            >
                              Gửi cho chúng tôi
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Layout>
  );
};

export default Contact;
