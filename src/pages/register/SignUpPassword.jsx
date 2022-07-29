import React, { useEffect } from "react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import db from "../../firebase/firebase.js";
import { Link } from "react-router-dom";
import "../../style/sign-up.css";
import Password from "antd/lib/input/Password.js";

function SignUpPassword(props) {
  const events = db.collection("user");
  const [userPassword, setuserPassword] = useState("");
  const [errorPassword, SetErrorPassword] = useState("");
  const [errorConfirm, SetErrorConFirm] = useState("");
  const [userSignUp, setUserSignUp] = useState([]);
  const [cookie] = useCookies(["user"]);
  const [showPassword, setShowPassword] = useState(false);
  const [displaySiginSuccess, setDisplaySiginSuccess] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    events.get().then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
        setUserSignUp(tempDoc);
      });
    });
  };

  const userAccount = userSignUp.filter((element) => {
    return element.id === cookie.id;
  });

  const submit = async () => {
    if (errorPassword === "" && errorConfirm === "" && userPassword !== "") {
      await db.collection("user").doc(userAccount[0].id).set({
        image: null,
        email: userAccount[0].email,
        password: userPassword,
        name: userAccount[0].name,
        gender: userAccount[0].gender,
        age: userAccount[0].age,
        phoneNumber: userAccount[0].phoneNumber,
      });
      setDisplaySiginSuccess(true);
      setuserPassword("");
      document.querySelector(".confirmPassword_signUp").value = "";
    }
  };

  const checkPassword = () => {
    if (userPassword.length === 0) {
      SetErrorPassword("Không được để trống");
    } else if (userPassword.length < 6 || userPassword.length > 20) {
      SetErrorPassword("Nhập 6-20 kí tự");
    } else {
      SetErrorPassword("");
    }
  };

  const checkConfirm = () => {
    if (document.querySelector(".confirmPassword_signUp").value === "") {
      SetErrorConFirm("Không được để trống");
    }
    if (
      document.querySelector(".passWord_signUp").value ===
      document.querySelector(".confirmPassword_signUp").value
    ) {
      SetErrorConFirm("");
    } else {
      SetErrorConFirm("mật khẩu không trùng khớp");
    }
  };

  const togglePassword = () => {
    if (Password === "") {
      setShowPassword(showPassword);
    } else {
      setShowPassword(!showPassword);
    }
  };

  return (
    <div className="sign_up">
      <h2>Đăng Ký</h2>
      <input
        type={showPassword ? "text" : "password"}
        className="passWord_signUp"
        placeholder="Mật khẩu"
        value={userPassword}
        onBlur={checkPassword}
        onChange={(e) => setuserPassword(e.target.value)}
      />
      <small>{errorPassword}</small>

      <input
        type={showPassword ? "text" : "password"}
        onBlur={checkConfirm}
        className="confirmPassword_signUp"
        placeholder="Nhập lại mật khẩu"
      />
      <small>{errorConfirm}</small>
      <p
        style={{ textAlign: "right", cursor: "pointer", marginBottom: "0" }}
        onClick={togglePassword}
      >
        Hiện mật khẩu
      </p>

      <Link className="no_underline" to="/SignUpInforUser">
        <button>Quay lại</button>
      </Link>
      <button onClick={submit}> Đăng Ký </button>
      {displaySiginSuccess && (
        <div className="modalSiginErrorEmail">
          <div className="modal_content">
            <h2>Đăng ký tài khoản thành công</h2>
            <Link to="/">
              <button>Đăng nhập</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUpPassword;
