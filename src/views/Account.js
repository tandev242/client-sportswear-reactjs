import React from "react";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Select,
  FormControl,
  TextField,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import Layout from "../components/layout/Layout";
import ProvinceData from "../data/data.json";
import {
  addDeliveryInfo,
  getDeliveryInfo,
  deleteDeliveryInfo,
  setDefaultDeliveryInfo,
} from "../features/deliveryInfo/deliveryInfoSlice";
import { updateUserInfo } from "../features/user/userSlice";
import { sendOtpToEmail } from "../features/auth/authSlice";
import { ToastContainer, toast } from "react-toastify";
import { settings } from "../components/toasts/settingToast";
import { passwordSchema, nameSchema } from "../validation/authValidations";
import noImage from "../assets/images/account/images.png";

const Account = () => {
  const { user } = useSelector((state) => state.auth);
  const { deliveryInfo } = useSelector((state) => state.deliveryInfo);
  const [address, setAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [commune, setCommune] = useState("");
  const [newDeliveryInfo, setNewDeliveryInfo] = useState({});
  const [formAddressOpen, setFormAddressOpen] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [isDisabled, setDisabled] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    profilePicture: null,
    profilePictureToChange: null,
    password: "",
    email: "",
    otp: "",
  });

  useEffect(() => {
    if (user) {
      setUserInfo({
        ...userInfo,
        name: user.name,
        profilePicture: user.profilePicture,
        email: user.email,
      });
    }
  }, [user]);

  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordValid, setPasswordValid] = useState(true);

  const [nameValid, setNameValid] = useState(true);
  const checkNameValidation = (value) => {
    nameSchema
      .validate({ name: value })
      .then(() => setNameValid(true))
      .catch(() => setNameValid(false));
  };

  const checkPasswordValidation = (value) => {
    passwordSchema
      .validate({ password: value })
      .then(() => setPasswordValid(true))
      .catch(() => setPasswordValid(false));
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeliveryInfo());
  }, []);

  const handleChangeCommune = (event) => {
    const commune = event.target.value;
    setNewDeliveryInfo({
      ...newDeliveryInfo,
      address: `${address}, ${commune.Name}, ${district.Name}, ${province.Name}`,
    });
    setCommune(commune);
  };

  const handleDeleteAddress = (addressId) => {
    if (
      window.confirm("Bạn có chắc muốn xóa thông tin này ra khỏi danh sách ?")
    ) {
      const payload = {
        addressId,
      };
      dispatch(deleteDeliveryInfo({ payload }));
    }
  };

  const handleSetDefaultAddress = (addressId) => {
    const payload = {
      addressId,
    };

    dispatch(setDefaultDeliveryInfo({ payload }));
  };

  const handleCloseAddForm = () => {
    setFormAddressOpen(false);
  };
  const handleSubmitAddDeliveryInfoForm = (e) => {
    e.preventDefault();
    const info = {
      address: newDeliveryInfo,
    };
    dispatch(addDeliveryInfo(info));
    setFormAddressOpen(false);
  };

  const filteredAddressArr = (arr) => {
    const newArr = [...arr];
    const defaultAddress = newArr.find((address) => address.isDefault === true);
    if (defaultAddress) {
      const newArr2 = newArr.filter(
        (address) => address._id !== defaultAddress._id
      );
      return [defaultAddress, ...newArr2];
    }
    return arr;
  };

  const handleUpdateUserInfo = async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append("name", userInfo.name);
    if (userInfo.profilePictureToChange) {
      form.append("profilePicture", userInfo.profilePictureToChange);
    }
    if (showChangePassword) {
      if (
        userInfo.password.length !== 0 &&
        userInfo.password === confirmPassword &&
        userInfo.otp
      ) {
        form.append("password", userInfo.password);
        form.append("otp", userInfo.otp);
      } else {
        alert("Vui lòng kiểm tra lại OTP và mật khẩu !");
        return;
      }
    }
    try {
      const res = await dispatch(updateUserInfo(form)).unwrap();
      if (res.status === 202) alert("Cập nhật thông tin thành công !");
    } catch (err) {
      alert("Vui lòng kiểm tra lại các thông tin cho chính xác !");
    }
  };

  const handleSelectImage = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setUserInfo({
          ...userInfo,
          profilePicture: reader.result,
          profilePictureToChange: e.target.files[0],
        });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const notifySendOTP = () =>
    toast.info("Mã OTP đã được gửi về email của bạn !", settings);

  const sendOTPToEmail = async (e) => {
    e.preventDefault();
    setDisabled(true);
    e.target.disabled = true;
    const resp = await dispatch(sendOtpToEmail({ email: userInfo.email })).unwrap();
    notifySendOTP();
    setTimeout(() => {
      e.target.disabled = false;
      setDisabled(false);
    }, 60000);
  };
  return (
    <Layout>
      <div className="account">
        <div className="container mgb-45">
          <div className="row">
            <div className="account-wrapper">
              <div className="row">
                <div className="col-6">
                  <div className="account-wrapper__information ">
                    <h3 className="account-wrapper__information__heading">
                      Thông tin cá nhân
                    </h3>
                    <div className="account-wrapper__information__body">
                      <form onSubmit={(e) => handleUpdateUserInfo(e)}>
                        <div className="form-header">
                          <div className="form-header__img">
                            <img
                              src={userInfo.profilePicture || noImage}
                              alt=""
                            />

                            <label
                              htmlFor="img"
                              className="form-header__img-edit"
                            >
                              <input
                                type="file"
                                id="img"
                                name="img-btn"
                                accept="image/*"
                                className="form-header__img-edit-btn"
                                onChange={(e) => handleSelectImage(e)}
                              />
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                fill="currentColor"
                                class="bi bi-pencil-square"
                                viewBox="0 0 16 16"
                              >
                                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                <path
                                  fill-rule="evenodd"
                                  d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                                />
                              </svg>
                            </label>
                          </div>
                          <div className="form-header__username">
                            <h5>Tài khoản: {userInfo.email}</h5>
                          </div>
                        </div>
                        {/* <div className="form-control"> */}
                        <FormControl fullWidth style={{ marginBottom: "25px" }}>
                          <TextField
                            label="Họ và tên"
                            variant="outlined"
                            value={userInfo.name}
                            onChange={(e) =>
                              setUserInfo({ ...userInfo, name: e.target.value })
                            }
                            onBlur={(e) => checkNameValidation(e.target.value)}
                          />
                          {nameValid ? null : (
                            <div className="error-input">
                              Họ tên cần được điền !
                            </div>
                          )}
                        </FormControl>
                        <FormControl
                          fullWidth
                          style={{ height: "40px", marginBottom: "25px" }}
                        >
                          <span
                            className="form-password btn"
                            onClick={() =>
                              setShowChangePassword(!showChangePassword)
                            }
                          >
                            Đổi mật khẩu
                          </span>
                        </FormControl>
                        {showChangePassword && (
                          <>
                            <FormControl
                              fullWidth
                              style={{ marginBottom: "25px" }}
                            >
                              <TextField
                                type="password"
                                label="Mật khẩu mới"
                                variant="outlined"
                                value={userInfo.password}
                                onChange={(e) =>
                                  setUserInfo({
                                    ...userInfo,
                                    password: e.target.value,
                                  })
                                }
                                onBlur={(e) =>
                                  checkPasswordValidation(e.target.value)
                                }
                              />
                              {passwordValid ? null : (
                                <div className="error-input">
                                  Mật khẩu hợp lệ chỉ chứa từ 8-50 ký tự!
                                </div>
                              )}
                            </FormControl>
                            <FormControl
                              fullWidth
                              style={{ marginBottom: "25px" }}
                            >
                              <TextField
                                type="password"
                                label="Xác nhận mật khẩu"
                                variant="outlined"
                                value={confirmPassword}
                                onChange={(e) =>
                                  setConfirmPassword(e.target.value)
                                }
                              />
                            </FormControl>
                            <FormControl>
                              <div style={{ display: "flex" }}>
                                <TextField
                                  label="Mã OTP"
                                  variant="outlined"
                                  value={userInfo.otp}
                                  onChange={(e) =>
                                    setUserInfo({
                                      ...userInfo,
                                      otp: e.target.value,
                                    })
                                  }
                                />
                                <button
                                  className={
                                    isDisabled
                                      ? `btn btn-otp btn-otp--disbaled`
                                      : `btn btn-otp `
                                  }
                                  onClick={(e) => sendOTPToEmail(e)}
                                  disabled={isDisabled}
                                >
                                  Lấy mã
                                </button>
                              </div>
                            </FormControl>
                          </>
                        )}
                        <input
                          type="submit"
                          value="Cập nhật"
                          className="btn form-btn"
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className="account-wrapper__address ">
                    <div className="account-wrapper__address__heading">
                      <h3>Thông tin nhận hàng</h3>

                      <div
                        className="add-btn"
                        onClick={() => setFormAddressOpen(true)}
                      >
                        Thêm thông tin
                      </div>
                    </div>
                    {formAddressOpen ? (
                      <div className="account-wrapper__address__form">
                        <form
                          onSubmit={(e) => handleSubmitAddDeliveryInfoForm(e)}
                        >
                          <FormControl
                            required
                            fullWidth
                            style={{ marginBottom: "10px" }}
                            variant="standard"
                          >
                            <TextField
                              required
                              label="Tên người nhận"
                              variant="outlined"
                              value={newDeliveryInfo.name}
                              onChange={(e) =>
                                setNewDeliveryInfo({
                                  ...newDeliveryInfo,
                                  name: e.target.value,
                                })
                              }
                            />
                          </FormControl>
                          <FormControl
                            required
                            fullWidth
                            style={{ marginBottom: "10px" }}
                            variant="standard"
                          >
                            <TextField
                              required
                              label="Số điện thoại người nhận"
                              type="tel"
                              variant="outlined"
                              value={newDeliveryInfo.phoneNumber}
                              onChange={(e) =>
                                setNewDeliveryInfo({
                                  ...newDeliveryInfo,
                                  phoneNumber: e.target.value,
                                })
                              }
                            />
                          </FormControl>
                          <FormControl
                            fullWidth
                            style={{ marginBottom: "10px" }}
                          >
                            <TextField
                              required
                              label="Địa chỉ"
                              variant="outlined"
                              value={address}
                              onChange={(e) => setAddress(e.target.value)}
                            />
                          </FormControl>
                          <FormControl
                            required
                            fullWidth
                            style={{ marginBottom: "10px" }}
                            variant="standard"
                          >
                            <InputLabel id="province">
                              Tỉnh/Thành phố
                            </InputLabel>
                            <Select
                              labelId="province"
                              value={province}
                              onChange={(e) => setProvince(e.target.value)}
                              sx={{
                                width: 565,
                              }}
                              label="province"
                            >
                              {ProvinceData.map((item) => (
                                <MenuItem
                                  value={item}
                                  key={item.Id}
                                  sx={{
                                    "& .MuiList-root-MuiMenu-list": {
                                      maxHeight: "200px",
                                      maxWidth: "540px",
                                    },
                                  }}
                                >
                                  {item.Name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <FormControl
                            required
                            fullWidth
                            style={{ marginBottom: "10px" }}
                            variant="standard"
                          >
                            <InputLabel id="district">Quận/Huyện</InputLabel>
                            <Select
                              labelId="district"
                              value={district}
                              onChange={(e) => setDistrict(e.target.value)}
                              label="district"
                              sx={{ width: 565 }}
                            >
                              {province.Districts ? (
                                province.Districts.map((item) => (
                                  <MenuItem value={item} key={item.Id}>
                                    {item.Name}
                                  </MenuItem>
                                ))
                              ) : (
                                <MenuItem value={0}></MenuItem>
                              )}
                            </Select>
                          </FormControl>
                          <FormControl
                            required
                            fullWidth
                            style={{ marginBottom: "25px" }}
                            variant="standard"
                          >
                            <InputLabel id="commune">Xã/Phường</InputLabel>
                            <Select
                              labelId="commune"
                              value={commune}
                              onChange={handleChangeCommune}
                              label="commune"
                              sx={{ width: 565 }}
                            >
                              {district.Wards ? (
                                district.Wards.map((item) => (
                                  <MenuItem value={item} key={item.Id}>
                                    {item.Name}
                                  </MenuItem>
                                ))
                              ) : (
                                <MenuItem value={0}></MenuItem>
                              )}
                            </Select>
                          </FormControl>
                          <div className="add-form-btn">
                            <input
                              type="submit"
                              value="Thêm địa chỉ"
                              className="btn form-btn"
                            />
                            <input
                              type="submit"
                              value="Hủy"
                              className="btn form-btn form-btn--cancel"
                              onClick={() => handleCloseAddForm()}
                            />
                          </div>
                        </form>
                      </div>
                    ) : (
                      <div className="account-wrapper__address__body">
                        {deliveryInfo.address ? (
                          filteredAddressArr(deliveryInfo.address).map(
                            (address) => {
                              return (
                                <div className="address-item" key={address._id}>
                                  <div className="address-item__icon">
                                    <svg
                                      style={
                                        address.isDefault
                                          ? { color: "green" }
                                          : { color: "transparent" }
                                      }
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="24"
                                      height="24"
                                      fill="currentColor"
                                      class="bi bi-geo-alt-fill"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                                    </svg>
                                  </div>
                                  <div className="address-item__content">
                                    <p>{address.address}</p>
                                  </div>

                                  <div
                                    className="address-item__setup address-item__setup--config"
                                    style={
                                      address.isDefault
                                        ? {
                                            cursor: "default",
                                            visibility: "hidden",
                                          }
                                        : null
                                    }
                                    onClick={() =>
                                      handleSetDefaultAddress(address._id)
                                    }
                                  >
                                    Đặt làm mặc định
                                  </div>
                                  <div
                                    style={
                                      address.isDefault
                                        ? {
                                            cursor: "default",
                                            visibility: "hidden",
                                          }
                                        : null
                                    }
                                    className="address-item__setup address-item__setup--delete"
                                    onClick={() => {
                                      handleDeleteAddress(address._id);
                                    }}
                                  >
                                    Xóa
                                  </div>
                                </div>
                              );
                            }
                          )
                        ) : (
                          <h1 style={{ margin: "20px" }}>
                            {" "}
                            Chưa có thông tin nhận hàng được thêm{" "}
                          </h1>
                        )}
                      </div>
                    )}
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

export default Account;
