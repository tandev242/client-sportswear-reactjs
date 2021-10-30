import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/layout/Layout";
import { useDispatch } from "react-redux";
import { register } from "../features/auth/authSlice";
import {
  nameSchema,
  emailSchema,
  passwordSchema,
} from "../validation/authValidations";

const Register = () => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmShown, setConfirmShown] = useState(false);
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [confirmPass, setConfirmPass] = useState("");
  const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  };

  const toggleConfirmVisibility = () => {
    setConfirmShown(confirmShown ? false : true);
  };

  //Validate
  const [nameValid, setNameValid] = useState(true);
  const checkNameValidation = (value) => {
    nameSchema
      .validate({ name: value })
      .then(() => setNameValid(true))
      .catch(() => setNameValid(false));
    console.log(nameValid);
  };
  const [emailValid, setEmailValid] = useState(true);
  const checkEmailValidation = (value) => {
    emailSchema
      .validate({ email: value })
      .then(() => setEmailValid(true))
      .catch(() => setEmailValid(false));
  };

  const [passwordValid, setPasswordValid] = useState(true);
  const checkPasswordValidation = (value) => {
    passwordSchema
      .validate({ password: value })
      .then(() => setPasswordValid(true))
      .catch(() => setPasswordValid(false));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const userObject = {
      name: user.fullName,
      email: user.email,
      password: user.password,
    };
    if (
      nameValid === false ||
      user.fullName === "" ||
      emailValid === false ||
      user.email === "" ||
      passwordValid === false ||
      user.password === ""
    ) {
      alert("Vui lòng kiểm tra lại thông tin đăng ký !");
    } else if (confirmPass !== userObject.password) {
      alert("Xác nhận mật khẩu không trùng khớp !");
    } else {
      console.log(userObject);
      dispatch(register(userObject));
    }
  };
  return (
    <Layout>
      {/* <RegisterForm /> */}
      <div className="form">
        <div className="container">
          <div className="wrapper mgb-45">
            <h2 className="wrapper-heading">Đăng ký</h2>
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
                        class="bi bi-person"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                      </svg>
                    </span>
                    <input
                      className="form-control__input-text"
                      type="name"
                      value={user.fullName}
                      onChange={(e) =>
                        setUser({ ...user, fullName: e.target.value })
                      }
                      onBlur={(e) => checkNameValidation(e.target.value)}
                      placeholder="Họ tên đầy đủ của bạn"
                    />
                  </div>
                  {nameValid ? null : (
                    <div className="error-input">
                      Vui lòng nhập tên của bạn!
                    </div>
                  )}
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
                      value={user.email}
                      onChange={(e) =>
                        setUser({ ...user, email: e.target.value })
                      }
                      onBlur={(e) => checkEmailValidation(e.target.value)}
                      placeholder="Email của bạn"
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
                      value={user.password}
                      onChange={(e) =>
                        setUser({ ...user, password: e.target.value })
                      }
                      onBlur={(e) => checkPasswordValidation(e.target.value)}
                      placeholder="Mật khẩu"
                    />
                    <span
                      className="form-control__input-eye"
                      onClick={togglePasswordVisibility}
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
                      type={confirmShown ? "text" : "password"}
                      value={confirmPass}
                      onChange={(e) => setConfirmPass(e.target.value)}
                      placeholder="Xác nhận mật khẩu"
                    />
                    <span
                      className="form-control__input-eye"
                      onClick={toggleConfirmVisibility}
                    >
                      {confirmShown ? (
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

                  <button className="btn form-control__btn" type="submit">
                    Đăng ký
                  </button>

                  <div className="form-control__go-login">
                    Bạn có tài khoản chưa?
                    <Link to="/login">Đăng nhập</Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Register;
