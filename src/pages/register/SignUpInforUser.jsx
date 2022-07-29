import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import db from "../../firebase/firebase";

function SignUpInforUser(props) {
  const [userName, setUserName] = useState("");
  const [userAge, setUserAge] = useState("");
  const [userGender, setUserGender] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [errorUserName, seterrorUserName] = useState("");
  const [errorUserAge, seterrorUserAge] = useState("");
  const [erroUserGender, seterroUserGender] = useState("");
  const [cookie] = useCookies(["user"]);
  const [errorUserPhoneNumber, seterrorUserPhoneNumber] = useState("");
  const [userSignUp, setUserSignUp] = useState([]);
  const [displayErrorInput, setdisplayErrorInput] = useState(false);
  const events = db.collection("user");
  const navigate = useNavigate();

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
    if (
      (errorUserName === "" &&
        errorUserAge === "" &&
        erroUserGender !== "" &&
        errorUserPhoneNumber === "") ||
      userName !== "" ||
      userAge !== "" ||
      userGender !== "" ||
      userPhoneNumber !== ""
    ) {
      await db.collection("user").doc(userAccount[0].id).set({
        image: null,
        email: userAccount[0].email,
        name: userName,
        gender: userGender,
        age: userAge,
        phoneNumber: userPhoneNumber,
      });
      navigate("/SignUpPassword");
    } else {
      setdisplayErrorInput(true);
    }
  };

  const checkName = () => {
    let result = /^[a-zA-Z ]+$/.test(userName);
    if (userName === "") {
      seterrorUserName("Không được để trống");
    } else if (!result || userName.length <= 1) {
      seterrorUserName("Tên người dùng không hợp lệ");
    } else {
      seterrorUserName("");
    }
  };

  const checkAge = () => {
    if (userAge === "") {
      seterrorUserAge("Không được để trống");
    } else if (userAge < 0 || userAge > 150) {
      seterrorUserAge("Tuổi không hợp lệ");
    } else {
      seterrorUserAge("");
    }
  };
  const checkGender = () => {
    if (userGender === "") {
      seterroUserGender("Không được để trống");
    } else {
      seterroUserGender("");
    }
  };
  const checkPhoneNumber = () => {
    const regexPhoneNumber =
      /^(\+?[01])?[-.\s]?\(?[1-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(
        userPhoneNumber
      );
    if (userPhoneNumber === "") {
      seterrorUserPhoneNumber("Không được để trống");
    } else if (!regexPhoneNumber || userPhoneNumber.length < 10 || userPhoneNumber.length > 12) {
      seterrorUserPhoneNumber("Số điện thoại không hợp lệ");
    } else {
      seterrorUserPhoneNumber("");
    }
  };

  const deleteEmail = async () => {
    await db.collection("user").doc(cookie.id).delete();
  };
  const handleChangeGender = (e) => {
    setUserGender(e.target.value);
  };

  return (
    <div>
      <div>
        <div className="sign_up">
          <h2>
            {" "}
            <UserOutlined style={{ display: "block" }} /> Đăng Ký{" "}
          </h2>
          <p>Nhập tên</p>
          <input
            type="text"
            className="userName_signUp"
            placeholder="Nhập tên của bạn"
            value={userName}
            onBlur={checkName}
            onChange={(e) => setUserName(e.target.value)}
          />
          <small>{errorUserName}</small>
          <p>Nhập tuổi</p>
          <input
            type="text"
            className="userName_signUp"
            placeholder="Nhập tuổi"
            value={userAge}
            onBlur={checkAge}
            onChange={(e) => setUserAge(e.target.value)}
          />
          <small>{errorUserAge}</small>

          <select
            value={userGender}
            onBlur={checkGender}
            onChange={(e) => handleChangeGender(e)}
          >
            <option value="">Giới tính</option>
            <option value="Nam">Nam</option>
            <option value="Nữ">Nữ</option>
          </select>
          <small>{erroUserGender}</small>

            <p>Số điện thoại</p>
          <input
            type="number"
            className="userName_signUp"
            placeholder="Nhập số điện thoại"
            value={userPhoneNumber}
            onBlur={checkPhoneNumber}
            onChange={(e) => setUserPhoneNumber(e.target.value)}
          />
          <small>{errorUserPhoneNumber}</small>

          <Link to="/SignUpEmail">
            <button onClick={deleteEmail}>Quay lại</button>
          </Link>
          <button onClick={submit}>Tiếp tục </button>

          <div>
            Bạn đã có tài khoản?
            <Link className="no_underline" to="/">
              <div> Đăng nhập tại đây </div>
            </Link>
          </div>
        </div>
        {displayErrorInput && (
          <div className="modalSiginErrorEmail">
            <div className="modal_content">
              <h2>Vui lòng kiểm tra lại thông tin</h2>
              <button onClick={() => setdisplayErrorInput(false)}>
                Đồng ý
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SignUpInforUser;
