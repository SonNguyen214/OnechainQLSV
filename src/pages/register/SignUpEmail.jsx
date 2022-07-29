import React, { useEffect } from "react";
import { useState } from "react";
import db from "../../firebase/firebase.js";
import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../style/sign-up.css";

function SignUp(props) {
  const events = db.collection("user");
  const [userEmail, setuserEmail] = useState("");
  const [errorEmail, SeterrorEmail] = useState("");
  const [user, setuser] = useState([]);
  const navigate = useNavigate();
  const [displaySiginEmailError, setDisplaySiginEmailError] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    events.get().then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
        setuser(tempDoc);
      });
    });
  };

  //Check email invailid in database
  const submit = async (e) => {
    if (userEmail !== "" && errorEmail === "") {
      const result = user.filter((element) => {
        return element.email === userEmail;
      });
      if (result.length > 0) {
        setDisplaySiginEmailError(true);
      } else {
        await db.collection("user").add({
          email: userEmail,
        });
        SeterrorEmail("");
        navigate("/SignUpInforUser");
      }
    }
    checkuserEmail();
  };

  getData();
  user.forEach((element) => {
    if (element.email === userEmail) {
      setCookies("id", element.id, 3);
    }
  });

  function setCookies(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  const checkuserEmail = () => {
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(userEmail);
    if (userEmail.length === 0) {
      SeterrorEmail("Không được để trống");
    } else if (!regexEmail) {
      SeterrorEmail("Email không hợp lệ");
    } else {
      SeterrorEmail("");
    }
  };

  return (
    <div>
      <div className="sign_up">
        <h2>
          {" "}
          <UserOutlined style={{ display: "block" }} /> Đăng Ký{" "}
        </h2>
        <p
          style={{
            textAlign: "left",
          }}
        >
          Nhập Email đăng ký
        </p>
        <input
          type="text"
          className="userName_signUp"
          value={userEmail}
          onChange={(e) => setuserEmail(e.target.value)}
        />
        <small>{errorEmail}</small>

        <button onClick={submit}>Tiếp tục </button>

        <div>
          Bạn đã có tài khoản?
          <Link className="no_underline" to="/">
            <div> Đăng nhập tại đây </div>
          </Link>
        </div>
      </div>
      {displaySiginEmailError && (
        <div className="modalSiginErrorEmail">
          <div className="modal_content">
            <h2>Email đã tồn tại</h2>
            <Link to="/">
              <button>Đi tới đăng nhập</button>
            </Link>
            <button onClick={() => setDisplaySiginEmailError(false)}>
              Thoát
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SignUp;
