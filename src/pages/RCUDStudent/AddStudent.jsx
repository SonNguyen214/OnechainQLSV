import React, { useEffect, useState } from "react";
import db from "../../firebase/firebase";

function AddStudent(props) {
  const [studentCode, setstudentCode] = useState("");
  const [studentName, setStudentName] = useState("");
  const [gender, setgender] = useState("");
  const [studentEmail, setstudentEmail] = useState("");
  const [studentAge, setstudentAge] = useState("");
  const [studentStatus, setstudentStatus] = useState("");
  const [studentMajor, setstudentMajor] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [studentHomeTown, setstudentHomeTown] = useState("");
  const [errorID, seterrorID] = useState("");
  const [errorName, seterrorName] = useState("");
  const [errorStatus, seterrorStatus] = useState("");
  const [errorMajor, seterrorMajor] = useState("");
  const [errorGender, seterrorGender] = useState("");
  const [errorAge, seterrorAge] = useState("");
  const [errorHomeTown, seterrorHomeTown] = useState("");
  const [errorPhoneNumber, seterrorPhoneNumber] = useState("");
  const [students, setStudent] = useState([]);
  const [errorEmail, seterrorEmail] = useState("");
  const [dateJoin, setDateJoin] = useState();
  const events = db.collection("student");
  const [displayAddSuccess, setDisplayAddSuccess] = useState(false);
  const [displayAddError, setDisplayAddError] = useState(false);

  useEffect(() => {
    getData();
  },[]);

  //Get Data from DB
  const getData = () => {
    events.get().then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      setStudent(tempDoc);
    });
  };

  //submit form
  const submit = () => {
    const checkIdSimilar = students.filter((student) => {
      return student.code === studentCode;
    });
    const checkEmailSimilar = students.filter((student) => {
      return student.email === studentEmail;
    });
    if (checkIdSimilar.length > 0) {
      seterrorID("Mã sinh viên đẫ tồn tại");
    }
    if (checkEmailSimilar.length > 0) {
      seterrorEmail("Email đã tồn tại");
    }
    if (
      checkIdSimilar.length === 0 &&
      checkEmailSimilar.length === 0 &&
      errorID === "" &&
      errorName === "" &&
      errorAge === "" &&
      errorStatus === "" &&
      errorMajor === "" &&
      errorGender === "" &&
      errorPhoneNumber === "" &&
      errorHomeTown === "" &&
      studentCode !== "" &&
      studentName !== "" &&
      gender !== "" &&
      studentAge !== "" &&
      studentStatus !== "" &&
      studentMajor !== "" &&
      phoneNumber !== "" &&
      studentHomeTown !== ""
    ) {
      db.collection("student").add({
        image: null,
        code: studentCode,
        name: studentName,
        gender: gender,
        email: studentEmail,
        age: studentAge,
        status: studentStatus,
        major: studentMajor,
        dateJoin: dateJoin,
        phoneNumber: phoneNumber,
        homeTown: studentHomeTown,
      });
      setDisplayAddSuccess(true);
      getData();
    }
    if (
      errorID !== "" ||
      errorName !== "" ||
      errorAge !== "" ||
      errorStatus !== "" ||
      errorMajor !== "" ||
      errorGender !== "" ||
      errorPhoneNumber !== "" ||
      errorHomeTown !== ""
    ) {
      setDisplayAddError(true);
    }
    if (
      studentCode === "" ||
      studentName === "" ||
      gender === "" ||
      studentAge === "" ||
      studentStatus === "" ||
      studentMajor === "" ||
      phoneNumber === "" ||
      studentHomeTown === ""
    ) {
      setDisplayAddError(true);
    }
  };

  //Validate Value
  const checkID = () => {
    if (studentCode === "") {
      seterrorID("Không được để trống");
    } else if (studentCode.length > 10) {
      seterrorID("Không nhập quá 10 kí tự");
    } else {
      seterrorID("");
    }
  };
  const checkEmail = () => {
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
      studentEmail
    );
    if (studentEmail === "") {
      seterrorEmail("Không được để trống");
    } else if (!regexEmail) {
      seterrorEmail("Email không hợp lệ");
    } else {
      seterrorEmail("");
    }
  };
  const checkName = () => {
    let result = /^[a-zA-Z ]+$/.test(studentName);
    if (studentName === "") {
      seterrorName("Không được để trống");
    } else if (!result) {
      seterrorName("Tên người dùng không hợp lệ");
    } else {
      seterrorName("");
    }
  };
  const checkAge = () => {
    if (studentAge === "") {
      seterrorAge("Không được để trống");
    } else if (studentAge.length > 3 || studentAge > 200) {
      seterrorAge("Tuổi không hợp lệ");
    } else {
      seterrorAge("");
    }
  };
  const checkStatus = () => {
    if (studentStatus === "") {
      seterrorStatus("Không được để trống");
    } else {
      seterrorStatus("");
    }
  }
  const checkGender = () => {
    if (gender === "") {
      seterrorGender("Không được để trống");
    } else {
      seterrorGender("");
    }
  };
  const checkMajor = () => {
    if (studentMajor === "") {
      seterrorMajor("Không được để trống");
    } else {
      seterrorMajor("");
    }
  };
  const checkPhoneNumber = () => {
    const regexPhoneNumber =
      /^(\+?[01])?[-.\s]?\(?[1-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(
        phoneNumber
      );
    if (phoneNumber === "") {
      seterrorPhoneNumber("Không được để trống");
    } else if (!regexPhoneNumber || phoneNumber.length < 10 || phoneNumber.length >12) {
      seterrorPhoneNumber("Số điện thoại không hợp lệ");
    } else {
      seterrorPhoneNumber("");
    }
  };
  const checkHomeTown = () => {
    if (studentHomeTown === "") {
      seterrorHomeTown("Không được để trống");
    } else {
      seterrorHomeTown("");
    }
  };

  // change Value Select-Option
  const handleChangeGender = (e) => {
    setgender(e.target.value);
  };

  const handleChangeMajor = (e) => {
    setstudentMajor(e.target.value);
  };

  const handleChangeClass = (e) => {
    setstudentStatus(e.target.value);
  };

  return (
    <div className="addStudent">
      <div className="modal_content">
        <h2 className="p_20">Thêm Sinh Viên</h2>
        <div className="p_20">
          <div className="flex">
            <div>
              <input
                type="text"
                className="studentCode"
                placeholder="Mã sinh viên"
                value={studentCode}
                onBlur={checkID}
                onChange={(e) => setstudentCode(e.target.value)}
              />{" "}
              <small>{errorID}</small>
              <input
                type="text"
                className="studentName"
                placeholder="Tên sinh viên"
                value={studentName}
                onBlur={checkName}
                onChange={(e) => setStudentName(e.target.value)}
              />{" "}
              <small>{errorName}</small>
              <input
                type="text"
                className="studentAge"
                placeholder="Tuổi"
                onBlur={checkAge}
                value={studentAge}
                onChange={(e) => setstudentAge(e.target.value)}
              />{" "}
              <small>{errorAge}</small>
            </div>

            <div>
              <select
                value={gender}
                onBlur={checkGender}
                onChange={(e) => handleChangeGender(e)}
              >
                <option value="">Chọn giới tính</option>
                <option value="Nam">Nam</option>
                <option value="Nữ">Nữ</option>
              </select>{" "}
              <small>{errorGender}</small>
              <select
                className="studentStatus"
                value={studentStatus}
                onBlur={checkStatus}
                onChange={(e) => handleChangeClass(e)}
              >
                <option value="">Chọn trạng thái</option>
                <option value="Đang học">Đang học</option>
                <option value="Đã học xong">Đã học xong</option>
                <option value="Đã nghỉ học">Đã nghỉ học</option>
                <option value="Đình chỉ">Đình chỉ</option>
                <option value="Bảo lưu">Bảo lưu</option>
              </select>
              <small>{errorStatus}</small>
              <select
                className="studentMajor"
                value={studentMajor}
                onBlur={checkMajor}
                onChange={(e) => handleChangeMajor(e)}
              >
                <option value="">Chọn ngành</option>
                <option value="CNTT">CNTT</option>
                <option value="Dược">Dược</option>
                <option value="Ngôn ngữ Anh">Ngôn ngữ Anh</option>
                <option value="Du lịch">Du lịch</option>
                <option value="Quản trị khách sạn">Quản trị khách sạn</option>
                <option value="Công nghệ ô tô">Công nghệ ô tô</option>
              </select>
              <small>{errorMajor}</small>
            </div>
          </div>
          <input
            type="email"
            className="studentEmail"
            placeholder="Email"
            onBlur={checkEmail}
            value={studentEmail}
            onChange={(e) => setstudentEmail(e.target.value)}
            required
          />{" "}
          <small>{errorEmail}</small>
          <input
            type="number"
            className="phoneNumber"
            onBlur={checkPhoneNumber}
            placeholder="Số điện thoại"
            value={phoneNumber}
            onChange={(e) => setphoneNumber(e.target.value)}
          />
          <small>{errorPhoneNumber}</small>
          <input
            type="text"
            className="studentHomeTown"
            placeholder="Quê quán"
            onBlur={checkHomeTown}
            value={studentHomeTown}
            onChange={(e) => setstudentHomeTown(e.target.value)}
          />
          <small>{errorHomeTown}</small>

          <div style={{textAlign: 'left'}}>Ngày nhập học</div>
          <input type="date" onChange={(e) => setDateJoin(e.target.value)} />
          <button onClick={submit}>Thêm</button>
          <button onClick={props.toggleModalAdd}>Thoát</button>
        </div>

        {/* Add success */}
        {displayAddSuccess && (
          <div className="modalAddSuccess">
            <div className="modal_content">
              <h2>Thêm Sinh viên thành công</h2>
              <button onClick={props.toggleModalAdd}>Thoát</button>
              <button onClick={() => setDisplayAddSuccess(false)}>Ở lại</button>
            </div>
          </div>
        )}

        {/* Add Error */}
        {displayAddError && (
          <div className="modalAddSuccess">
            <div className="modal_content">
              <h2>Vui lòng kiểm tra lại thông tin</h2>
              <button onClick={() => setDisplayAddError(false)}>Đồng ý</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AddStudent;
