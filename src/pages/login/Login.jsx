import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import db from "../../firebase/firebase";
import "../../style/login.css";
import { UserOutlined } from "@ant-design/icons";

function Login(props) {
  const events = db.collection("user");
  const [userNameEmail, setuserNameEmail] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");
  const [admin, setAdmin] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [displayLoginSuccess, setDisplayLoginSuccess] = useState(false);
  const [displayLoginError, setDisplayLoginError] = useState(false);

  useEffect(() => {
    events.get().then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      setAdmin(tempDoc);
    });
  }, []);

  const togglePassword = () => {
    if (passwordLogin === "") {
      setShowPassword(showPassword);
    } else {
      setShowPassword(!showPassword);
    }
  };

  const submit = () => {
    const result = admin.filter((element) => {
      if (element.email === userNameEmail) {
        localStorage.setItem("id", element.id);
      }
      return (
        element.email === userNameEmail && element.password === passwordLogin
      );
    });
    if (result.length > 0) {
      setDisplayLoginSuccess(true);
    }
    if (result.length <= 0) {
      setDisplayLoginError(true);
    }
  };

  return (
    <div className="login flex">
      <div className="leftLogin">
        <h1>KVS School</h1>
        <p>Chào mừng bạn đến với KVS School - Phần mềm quản lý sinh viên mới nhất hiện nay</p>
      </div>
      <div className="rightLogin">
        <h2>
          {" "}Đăng Nhập
        </h2>

        <span>Tài khoản Email</span>
        <input style={{
          marginBottom: '10px'
        }}
          type="email"
          className="userName_Login"
          value={userNameEmail}
          onChange={(e) => setuserNameEmail(e.target.value)}
        />
        <span>Mật khẩu</span>
        <input
          type={showPassword ? "text" : "password"}
          className="passWord_Login"
          value={passwordLogin}
          onChange={(e) => setPasswordLogin(e.target.value)}
        />
        <p onClick={togglePassword}>Hiện mật khẩu</p>
        <button onClick={submit}>Đăng nhập</button>
        <span>
          Chưa có tài khoản?{" "}
          <Link className="no_underline" to="/SignUpEmail">
            {" "}
            Đăng ký
          </Link>
        </span>
        {displayLoginSuccess && (
          <div className="modalLoginSuccess">
            <div className="modal_content">
              <h2>Bạn đã đăng nhập thành công</h2>
              <Link to="/Home">
                <button onClick={() => setDisplayLoginSuccess(false)}>
                  Vào trang chủ
                </button>
              </Link>
            </div>
          </div>
        )}

        {displayLoginError && (
          <div className="modalLoginError">
            <div className="modal_content">
              <h2>Vui lòng kiểm tra lại tài khoản</h2>
              <button onClick={() => setDisplayLoginError(false)}>
                Đồng ý
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
