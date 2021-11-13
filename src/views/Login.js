import Layout from "../components/layout/Layout";
import React, { useState } from "react";
import GoogleLogin from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { login, loginByGoogle } from "../features/auth/authSlice";
import { emailSchema, passwordSchema } from "../validation/authValidations";

const Login = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);

  const dispatch = useDispatch();

  const checkEmailValidation = (value) => {
    emailSchema
      .validate({ email: value })
      .then(() => setEmailValid(true))
      .catch(() => setEmailValid(false));
  };
  //Validate password use Yub
  const checkPasswordValidation = (value) => {
    passwordSchema
      .validate({ password: value })
      .then(() => setPasswordValid(true))
      .catch(() => setPasswordValid(false));
  };
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const handleLoginByGoogle = async (googleData) => {
    await dispatch(loginByGoogle({ token: googleData.tokenId }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (
      emailValid === false ||
      email === "" ||
      passwordValid === false ||
      password === ""
    ) {
      alert("Vui lòng kiểm tra thông tin đăng nhập");
    } else {
      const user = { email, password };
      try {
        await dispatch(login(user)).unwrap();
      } catch (e) {
        alert("Thông tin đăng nhập không đúng!");
      }
    }
  };
  // console.log(auth?.user?._id);
  return (
    <Layout>
      {/* <LoginForm  /> */}
      <div className="form">
        <div className="container">
          <div className="wrapper mgb-45">
            <h2 className="wrapper-heading">Đăng nhập</h2>
            <div className="row">
              <div className="wrapper-body">
                <form className="form-control" onSubmit={(e) => handleLogin(e)}>
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
                      placeholder="Email của bạn"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={(e) => checkEmailValidation(e.target.value)}
                    />
                  </div>
                  {emailValid ? null : (
                    <div className="error-input">
                      Email không hợp lệ. Vui lòng nhập lại!
                    </div>
                  )}

                  <div className="form-control__input">
                    <span className="form-control__input-icon">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-shield-lock-fill"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 0c-.69 0-1.843.265-2.928.56-1.11.3-2.229.655-2.887.87a1.54 1.54 0 0 0-1.044 1.262c-.596 4.477.787 7.795 2.465 9.99a11.777 11.777 0 0 0 2.517 2.453c.386.273.744.482 1.048.625.28.132.581.24.829.24s.548-.108.829-.24a7.159 7.159 0 0 0 1.048-.625 11.775 11.775 0 0 0 2.517-2.453c1.678-2.195 3.061-5.513 2.465-9.99a1.541 1.541 0 0 0-1.044-1.263 62.467 62.467 0 0 0-2.887-.87C9.843.266 8.69 0 8 0zm0 5a1.5 1.5 0 0 1 .5 2.915l.385 1.99a.5.5 0 0 1-.491.595h-.788a.5.5 0 0 1-.49-.595l.384-1.99A1.5 1.5 0 0 1 8 5z"
                        />
                      </svg>
                    </span>
                    <input
                      className="form-control__input-text"
                      type={passwordShown ? "text" : "password"}
                      placeholder="Mật khẩu"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onBlur={(e) => checkPasswordValidation(e.target.value)}
                    />
                    <span
                      onClick={togglePasswordVisibility}
                      className="form-control__input-eye form-control__input-eye--hide"
                    >
                      {passwordShown ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye-slash-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7.029 7.029 0 0 0 2.79-.588zM5.21 3.088A7.028 7.028 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474L5.21 3.089z" />
                          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829l-2.83-2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12-.708.708z" />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-eye-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                        </svg>
                      )}
                    </span>
                  </div>
                  {passwordValid ? null : (
                    <div className="error-input">
                      Mật khẩu hợp lệ chỉ chứa từ 8-50 ký tự!
                    </div>
                  )}

                  <div className="form-control__link">
                    <Link to="/forget" className="form-control__link-forget">
                      Quên mật khẩu
                    </Link>
                    <Link
                      to="/register"
                      className="form-control__link-register"
                    >
                      Đăng ký
                    </Link>
                  </div>
                  <button className="btn form-control__btn" type="submit">
                    Đăng nhập
                  </button>
                  <div className="form-control__separate">Hoặc</div>
                  {/* <button className="btn form-control__gg">
                    <img
                      src={
                        require("../assets/icons/google-logo-9808-16x16.ico")
                          .default
                      }
                      alt=""
                      className="form-control__gg-icon"
                    />
                    Đăng nhập bằng Google
                  </button> */}
                  <GoogleLogin
                    clientId="707494384451-n2h8k22labbk1hqo3abuen1i5kdp40dn.apps.googleusercontent.com"
                    buttonText="Đăng nhập bằng Google"
                    onSuccess={handleLoginByGoogle}
                    onFailure={handleLoginByGoogle}
                    cookiePolicy={"single_host_origin"}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
