import React, { useState } from "react";

import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { emailSchema } from "../validation/authValidations";
const Forget = () => {
  const [email, setEmail] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const checkEmailValidation = (value) => {
    emailSchema
      .validate({ email: value })
      .then(() => setEmailValid(true))
      .catch(() => setEmailValid(false));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailValid !== false) {
      console.log(emailValid);
    }
  };
  return (
    <Layout>
      <div className="form">
        <div className="container">
          <div className="wrapper mgb-45">
            <h2 className="wrapper-heading">Quên mật khẩu</h2>
            <div className="row">
              <div className="wrapper-body">
                <form
                  className="form-control"
                  onSubmit={(e) => handleSubmit(e)}
                >
                  <div className="form-control__input">
                    <span className="form-control__input-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-envelope"
                        viewBox="0 0 16 16"
                      >
                        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2zm13 2.383-4.758 2.855L15 11.114v-5.73zm-.034 6.878L9.271 8.82 8 9.583 6.728 8.82l-5.694 3.44A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.739zM1 11.114l4.758-2.876L1 5.383v5.73z" />
                      </svg>
                    </span>
                    <input
                      className="form-control__input-text"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={(e) => checkEmailValidation(e.target.value)}
                      placeholder="Email của bạn"
                    />
                  </div>
                  {emailValid ? null : (
                    <div className="error-input">
                      Email không hợp lệ. Vui lòng nhập lại!
                    </div>
                  )}
                  <div className="form-control__link">
                    <Link to="/login" className="form-control__link-forget">
                      Đăng nhập
                    </Link>
                    <Link
                      to="/register"
                      className="form-control__link-register"
                    >
                      Đăng ký
                    </Link>
                  </div>
                  <button className="btn form-control__btn" type="submit">
                    Gửi yêu cầu
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Forget;
