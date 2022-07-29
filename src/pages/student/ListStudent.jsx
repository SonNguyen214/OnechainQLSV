import React, { useState } from "react";
import db from "../../firebase/firebase";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  CloseOutlined,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { storage } from "../../firebase/firebase";
import { Pagination } from "antd";
import TableStudent from "./TableStudent";
import GridStudent from "./GridStudent";
import AddStudent from "../RCUDStudent/AddStudent";
import TableMobile from "./TableMoble";

function ListStudent(props) {
  const [student, setstudent] = useState([]);
  const events = db.collection("student");
  const [displayModalDelete, setDisplayModalDelete] = useState(false);
  const [displayModalUpdate, setDisplayModalUpdate] = useState(false);
  const [currentIdDelete, setCurrentIdDelete] = useState();
  const [studentIDUpdate, setstudentIDUpdate] = useState("");
  const [studentNameUpdate, setStudentNameUpdate] = useState("");
  const [studentEmailUpdate, setstudentEmailUpdate] = useState("");
  const [genderUpdate, setgenderUpdate] = useState("");
  const [studentAgeUpdate, setstudentAgeUpdate] = useState("");
  const [studentStatusUpdate, setstudentStatusUpdate] = useState("");
  const [studentMajorUpdate, setstudentMajorUpdate] = useState("");
  const [phoneNumberUpdate, setphoneNumberUpdate] = useState("");
  const [studentHomeTownUpdate, setstudentHomeTownUpdate] = useState("");
  const [errorIDUpdate, seterrorIDUpdate] = useState("");
  const [errorNameUpdate, seterrorNameUpdate] = useState("");
  const [errorStatusUpdate, seterrorStatusUpdate] = useState("");
  const [errorEmail, seterrorEmail] = useState("");
  const [errorMajorUpdate, seterrorMajorUpdate] = useState("");
  const [errorAgeUpdate, seterrorAgeUpdate] = useState("");
  const [errorGenderUpdate, seterrorGenderUpdate] = useState("");
  const [errorPhoneNumberUpdate, seterrorPhoneNumberUpdate] = useState("");
  const [errorHometownUpdate, seterrorHometownUpdate] = useState("");
  const [currentIdUpdate, setcurrentIdUpdate] = useState("");
  const filterStatus = "";
  const fillterMajor = "";
  const [searchData, setSearchData] = useState("");
  const [currentIdImage, setcurrentIdImage] = useState();
  const [inforStudent, setInforStudent] = useState(false);
  const [displayTable, setDisplayTable] = useState(true);
  const [displayGrid, setDisplayGrid] = useState(false);
  const [displayImage, setdisplayImage] = useState(false);
  const [displayModalLogOut, setdisplayModalLogOut] = useState(false);
  const [displayModalAdd, setdisplayModalAdd] = useState(false);
  const [detailStudent, setDetailStudent] = useState(false);
  const [displayUpdateSuccess, setdisplayUpdateSuccess] = useState(false);
  const [displayUpdateError, setdisplayUpdateError] = useState(false);
  const [displayChangeImage, setdisplayChangeImage] = useState(false);
  const [displayDontFindStudent, setdisplayDontFindStudent] = useState(false);
  const [image, setImage] = useState(null);
  const [proccess, setProccess] = useState(0);
  const [dateJoinUpdate, setDateJoinUpdate] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const studentPerPage = 5

  const indexOfLastStudent = currentPage * studentPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentPerPage;
  const currentStudent = student.slice(indexOfFirstStudent, indexOfLastStudent);

  //Chuyển trang - Paginaion
  const onChangePage = (page) => {
    setCurrentPage(page);
  };

  const showModalUpdate = (element) => {
    setInforStudent(false);
    setcurrentIdUpdate(element.id);
    setstudentIDUpdate(element.code);
    setStudentNameUpdate(element.name);
    setstudentStatusUpdate(element.status);
    setstudentAgeUpdate(element.age);
    setstudentStatusUpdate(element.status);
    setstudentMajorUpdate(element.major);
    setDateJoinUpdate(element.dateJoin);
    setstudentEmailUpdate(element.email);
    setgenderUpdate(element.gender);
    setphoneNumberUpdate(element.phoneNumber);
    setstudentHomeTownUpdate(element.homeTown);
    setDisplayModalUpdate(!displayModalUpdate);
    setEmtyErrorValueUpdate();
  };

  const showModalDelete = (id) => {
    setInforStudent(false);
    setCurrentIdDelete(id);
    setDisplayModalDelete(!displayModalDelete);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    events.get().then((querySnapshot) => {
      const tempDoc = [];
      querySnapshot.forEach((doc) => {
        tempDoc.push({ id: doc.id, ...doc.data() });
      });
      setstudent(tempDoc);
    });
  };

  // Submit form
  const updateData = (id) => {
    if (
      errorIDUpdate === "" &&
      errorNameUpdate === "" &&
      errorAgeUpdate === "" &&
      errorStatusUpdate === "" &&
      errorMajorUpdate === "" &&
      errorGenderUpdate === "" &&
      errorPhoneNumberUpdate === "" &&
      errorHometownUpdate === "" &&
      studentIDUpdate !== "" &&
      studentNameUpdate !== "" &&
      genderUpdate !== "" &&
      studentAgeUpdate !== "" &&
      studentStatusUpdate !== "" &&
      studentMajorUpdate !== "" &&
      phoneNumberUpdate !== "" &&
      studentHomeTownUpdate !== ""
    ) {
      db.collection("student").doc(currentIdUpdate).update({
        age: studentAgeUpdate,
        status: studentStatusUpdate,
        code: studentIDUpdate,
        email: studentEmailUpdate,
        gender: genderUpdate,
        dateJoin: dateJoinUpdate,
        homeTown: studentHomeTownUpdate,
        major: studentMajorUpdate,
        name: studentNameUpdate,
        phoneNumber: phoneNumberUpdate,
      });
      getData();
      setdisplayUpdateSuccess(true);
      setDisplayModalUpdate(false);
    }
    if (
      studentIDUpdate === "" &&
      studentNameUpdate === "" &&
      genderUpdate === "" &&
      studentAgeUpdate === "" &&
      studentStatusUpdate === "" &&
      studentMajorUpdate === "" &&
      phoneNumberUpdate === "" &&
      studentHomeTownUpdate === ""
    ) {
      setdisplayUpdateError(true);
    }
  };

  const deleteStudent = async (id) => {
    await db.collection("student").doc(id).delete();
    showModalDelete();
    getData();
  };

  //  Check Emty Input
  const checkID = () => {
    if (studentIDUpdate.length === 0) {
      seterrorIDUpdate("Không được để trống");
    } else if (studentIDUpdate.length < 4 || studentIDUpdate.length > 8) {
      seterrorIDUpdate("Nhập từ 4-8 kí tự");
    } else {
      seterrorIDUpdate("");
    }
  };

  const checkName = () => {
    if (studentNameUpdate.length === 0) {
      seterrorNameUpdate("Không được để trống");
    } else if (studentNameUpdate.length > 40 || studentNameUpdate.length <= 1) {
      seterrorNameUpdate("Tên không hợp lệ");
    } else {
      seterrorNameUpdate("");
    }
  };

  const checkStatus = () => {
    if (studentStatusUpdate.length === 0) {
      seterrorStatusUpdate("Không được để trống");
    } else {
      seterrorStatusUpdate("");
    }
  };

  const checkGenderUpdate = () => {
    if (genderUpdate.length === 0) {
      seterrorGenderUpdate("Không được để trống");
    } else {
      seterrorGenderUpdate("");
    }
  };
  const checkPhoneNumberUpdate = () => {
    const regexPhoneNumber =
      /^(\+?[01])?[-.\s]?\(?[1-9]\d{2}\)?[-.\s]?\d{3}[-.\s]?\d{4}/.test(
        phoneNumberUpdate
      );
    if (phoneNumberUpdate === "") {
      seterrorPhoneNumberUpdate("Không được để trống");
    } else if (
      !regexPhoneNumber ||
      phoneNumberUpdate.length < 10 ||
      phoneNumberUpdate.length > 12
    ) {
      seterrorPhoneNumberUpdate("Số điện thoại không hợp lệ");
    } else {
      seterrorPhoneNumberUpdate("");
    }
  };
  const checkMajor = () => {
    if (studentMajorUpdate.length === 0) {
      seterrorMajorUpdate("Không được để trống");
    } else {
      seterrorMajorUpdate("");
    }
  };

  const checkAge = () => {
    if (studentAgeUpdate.length === 0) {
      seterrorAgeUpdate("Không được để trống");
    } else {
      seterrorAgeUpdate("");
    }
  };

  const checkHometown = () => {
    if (studentHomeTownUpdate.length === 0) {
      seterrorHometownUpdate("Không được để trống");
    } else {
      seterrorHometownUpdate("");
    }
  };

  const checkEmail = () => {
    const regexEmail = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
      studentEmailUpdate
    );
    if (studentEmailUpdate === "") {
      seterrorEmail("Không được để trống");
    } else if (!regexEmail) {
      seterrorEmail("Email không hợp lệ");
    } else {
      seterrorEmail("");
    }
  };

  //Change value when choose this
  const handleChangeGenderUpdate = (e) => {
    setgenderUpdate(e.target.value);
  };

  const handleChangeMajor = (e) => {
    setstudentMajorUpdate(e.target.value);
  };

  const handleChangeStatus = (e) => {
    setstudentStatusUpdate(e.target.value);
  };

  const setEmtyErrorValueUpdate = () => {
    seterrorIDUpdate("");
    seterrorNameUpdate("");
    seterrorAgeUpdate("");
    seterrorStatusUpdate("");
    seterrorGenderUpdate("");
    seterrorHometownUpdate("");
    seterrorMajorUpdate("");
    seterrorPhoneNumberUpdate("");
  };

  //fillter Student
  const handleChangeStatusFilter = async (e) => {
    const result = await fillterStudent("status", e.target.value);
    setstudent(result);
    setInforStudent(false);
  };

  const handleChangeMajorFilter = async (e) => {
    const result = await fillterStudent("major", e.target.value);
    setstudent(result);
    setInforStudent(false);
  };

  const searchStudent = async () => {
    const result = await fillterStudent("code", searchData);
    if (result.length === 0) {
      setdisplayDontFindStudent(true);
      getData();
    } else if (searchData === "") {
      setdisplayDontFindStudent(true);
    } else {
      setstudent(result);
    }
    setSearchData("");
    setInforStudent(false);
  };

  const showInforStudent = (id) => {
    const result = student.filter((element) => {
      return element.id === id;
    });
    setDetailStudent(result);
    setInforStudent(true);
  };

  const reloadpage = () => {
    getData();
    setInforStudent(false);
  };

  const fillterStudent = async (key, value) => {
    const tempDoc = [];
    await db
      .collection("student")
      .where(key, "==", value)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          tempDoc.push({ id: doc.id, ...doc.data() });
        });
      })
      .catch((error) => {
        console.log("Lỗi lấy dữ liệu: ", error);
      });
    return tempDoc;
  };

  const showGridStudent = () => {
    setDisplayTable(false);
    setDisplayGrid(true);
    setInforStudent(false);
  };

  const showTableStudent = () => {
    setDisplayGrid(false);
    setDisplayTable(true);
    setInforStudent(false);
  };

  const handleChangeFile = (event) => {
    if (event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  //Up Load Image
  const handleUpload = () => {
    console.log(currentIdImage);
    const upLoadTask = storage.ref(`images/${image.name}`).put(image);
    upLoadTask.on(
      "state_changed",
      (snapshot) => {
        const proccess = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProccess(proccess);
      },
      (error) => {
        console.log(error);
      },
      () => {
        storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then((url) => {
            // seturl(url)
            updateImage(url);
            getData();
          });
      }
    );
  };

  const toggleModalImage = (id) => {
    setcurrentIdImage(id);
    setdisplayImage(!displayImage);
  };

  const toggleModalLogOut = () => {
    setdisplayModalLogOut(!displayModalLogOut);
  };

  const updateImage = async (url) => {
    await db.collection("student").doc(currentIdImage).update({
      image: url,
    });
    setdisplayChangeImage(true);
    getData();
    setdisplayImage(false);
  };

  const toggleModalAdd = () => {
    setdisplayModalAdd(!displayModalAdd);
    getData();
  };

  return (
    <div className="container ">
      <div className="option flex">
        <div className="user"></div>
        <h1
          style={{
            marginBottom: "0",
          }}
        >
          Quản lý sinh viên
        </h1>
        {displayModalLogOut && (
          <div className="modal_logOut">
            <div className="modal_content">
              <h2>Bạn có chắc muốn đăng xuất?</h2>
              <Link to="/">
                <button>Có</button>
              </Link>
              <button onClick={toggleModalLogOut}>Không</button>
            </div>
          </div>
        )}
        <p className="LogOut" onClick={toggleModalLogOut}>
          {" "}
          Đăng xuất
          <LogoutOutlined style={{ marginLeft: "5px" }} />
        </p>
      </div>

      <div
        style={{
          margin: "0 2%",
        }}
      >
        <div>
          <div className="theme">
            {displayGrid ? (
              <div
                style={{
                  color: "rgb(252, 52, 62)",
                  border: "1px solid rgb(252, 52, 62)",
                }}
                onClick={showGridStudent}
              >
                Hiển thị sinh viên dưới dạng thẻ
              </div>
            ) : (
              <div onClick={showGridStudent}>
                Hiển thị sinh viên dưới dạng thẻ
              </div>
            )}

            {displayTable ? (
              <div
                style={{
                  color: "rgb(252, 52, 62)",
                  border: "1px solid rgb(252, 52, 62)",
                }}
                onClick={showTableStudent}
              >
                Hiển thị sinh viên dưới dạng bảng
              </div>
            ) : (
              <div onClick={showTableStudent}>
                Hiển thị sinh viên dưới dạng bảng
              </div>
            )}
          </div>

          {/* search StudentByCode */}
          <div className="flex" style={{}}>
            <div className="searchStudent">
              <input
                className="searchByCode"
                style={{
                  outline: "none",
                  padding: "5px 7px",
                }}
                value={searchData}
                onChange={(e) => {
                  setSearchData(e.target.value);
                }}
                type="text"
                placeholder="Nhập mã sinh viên"
              />
              <button className="btnSearchByCode" onClick={searchStudent}>
                <SearchOutlined />
              </button>
            </div>

            <div className="filterStudent ">
              <select
                value={filterStatus}
                onChange={(e) => handleChangeStatusFilter(e)}
              >
                <option value="">Chọn trạng thái</option>
                <option value="Đang học">Đang học</option>
                <option value="Đã học xong">Đã học xong ✔</option>
                <option value="Đã nghỉ học">Đã nghỉ học</option>
                <option value="Đình chỉ">Đình chỉ</option>
                <option value="Bảo lưu">Bảo lưu</option>
              </select>

              <select
                value={fillterMajor}
                onChange={(e) => handleChangeMajorFilter(e)}
                name=""
                id=""
              >
                <option value="">Chọn ngành học</option>
                <option value="CNTT">CNTT</option>
                <option value="Dược">Dược</option>
                <option value="Ngôn ngữ Anh">Ngôn ngữ Anh</option>
                <option value="Du lịch">Du lịch</option>
                <option value="Quản trị khách sạn">Quản trị khách sạn</option>
                <option value="Công nghệ ô tô">Công nghệ ô tô</option>
              </select>
            </div>
          </div>
        </div>

        <div>
          {inforStudent &&
            detailStudent.map((element, index) => {
              return (
                <div key={index} className="studentDetail userImage">
                   
                    <div
                      className="modal_content "
                      style={{ position: "relative" }}
                    >
                      <CloseOutlined
                        style={{
                          position: "absolute",
                          top: "5px",
                          right: "5px",
                          fontSize: "20px",
                          cursor: "pointer",
                        }}
                        onClick={() => setInforStudent(false)}
                      />
                      <h2 style={{ fontSize: "19px" }}>Thông tin sinh viên</h2>
                      {element.image ? (
                        <img src={element.image} alt="" />
                      ) : (
                        <img
                          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                          alt=""
                        />
                      )}
                      <h3
                        onClick={() => toggleModalImage(element.id)}
                        style={{
                          cursor: "pointer",
                        }}
                      >
                        Thay đổi ảnh
                      </h3>
                      <div>
                        <strong>Mã sinh viên: </strong> {element.code}
                      </div>
                      <div>
                        <strong>Họ tên: </strong> {element.name}
                      </div>
                      <div>
                        <strong>Tuổi: </strong> {element.age}
                      </div>
                      <div>
                        <strong>Trạng thái: </strong>
                        {element.status}
                      </div>
                      <div>
                        <strong>Email: </strong> {element.email}
                      </div>
                      <div>
                        <strong>Ngành học: </strong> {element.major}
                      </div>
                      <div>
                        <strong>Số điện thoại: </strong> {element.phoneNumber}
                      </div>
                      <div>
                        <strong>Ngày tham gia: </strong> {element.dateJoin}
                      </div>
                      <div>
                        <strong>Quên quán: </strong> {element.homeTown}
                      </div>
                      <button onClick={() => showModalUpdate(element)}>
                        {" "}
                        Sửa thông tin
                      </button>
                    </div>
                  </div>
                
              );
            })}
          {displayImage && (
            <div className="modalImage">
              <div
                className="modal_content"
                style={{
                  padding: "20px",
                  width: "300px",
                }}
              >
                {" "}
                <progress value={proccess} max="100" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => handleChangeFile(event)}
                />
                <div className="flex">
                  <button onClick={handleUpload}>Thay đổi</button>
                  <button onClick={toggleModalImage}>Thoát</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <form action="">
          <div className="title flex">
            <h2 onClick={reloadpage}>
              Danh sách sinh viên
              <span>Reload</span>
            </h2>
            <button
              onClick={() => setdisplayModalAdd(!displayModalAdd)}
              className="btnAdd"
              type="button"
            >
              Thêm mới +
            </button>
          </div>

          {displayTable && (
            <>
              <TableStudent
                studentTable={currentStudent}
                showInforStudent={showInforStudent}
                showModalUpdate={showModalUpdate}
                showModalDelete={showModalDelete}
              />

              <TableMobile
                studentTable={currentStudent}
                showInforStudent={showInforStudent}
                showModalUpdate={showModalUpdate}
                showModalDelete={showModalDelete}
              />
            </>
          )}

          {displayGrid && (
            <div>
              <GridStudent
                studentGrid={currentStudent}
                toggleModalImage={toggleModalImage}
                showInforStudent={showInforStudent}
                showModalDelete={showModalDelete}
              />
            </div>
          )}
          <div style={{ marginBottom: "10px" }}>
            <Pagination className="pagination"
              defaultCurrent={currentPage}
              total={student.length}
              onChange={onChangePage}
              pageSize={5}
            />
            ;
          </div>
        </form>
      </div>

      {/* Modal Add */}
      {displayModalAdd && <AddStudent toggleModalAdd={toggleModalAdd} />}

      {/* Modal Delete */}
      {displayModalDelete && currentIdDelete && (
        <div className="deleteStudent">
          <div className="modal_content p_20">
            <h2>Xóa khỏi danh sách?</h2>
            <div className="flex">
              <button
                type="button"
                onClick={() => {
                  deleteStudent(currentIdDelete);
                }}
              >
                Có
              </button>
              <button type="button" onClick={showModalDelete}>
                Không
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Update */}
      {displayModalUpdate && currentIdUpdate && (
        <div className="updateStudent">
          <div className="modal_content">
            <h2>Sửa Sinh Viên </h2>
            <span onClick={showModalUpdate}>
              <CloseOutlined />
            </span>
            <div className="flex">
              <div>
                <input
                  disabled
                  type="text"
                  className="studentIDUpdate"
                  placeholder="Mã sinh viên"
                  value={studentIDUpdate}
                  onBlur={checkID}
                  onChange={(e) => setstudentIDUpdate(e.target.value)}
                />{" "}
                <small>{errorIDUpdate}</small>
                <input
                  type="text"
                  className="studentNameUpdate"
                  placeholder="Tên sinh viên"
                  value={studentNameUpdate}
                  onBlur={checkName}
                  onChange={(e) => setStudentNameUpdate(e.target.value)}
                />{" "}
                <small>{errorNameUpdate}</small>
                <input
                  type="number"
                  className="studentAgeUpdate"
                  placeholder="Tuổi"
                  value={studentAgeUpdate}
                  onBlur={checkAge}
                  onChange={(e) => setstudentAgeUpdate(e.target.value)}
                />{" "}
                <small>{errorAgeUpdate}</small>
              </div>

              <div>
                <select
                  value={genderUpdate}
                  onBlur={checkGenderUpdate}
                  onChange={(e) => handleChangeGenderUpdate(e)}
                >
                  <option value="">Chọn giới tính</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>{" "}
                <small>{errorGenderUpdate}</small>
                <select
                  className="studentStatusUpdate"
                  value={studentStatusUpdate}
                  onBlur={checkStatus}
                  onChange={(e) => handleChangeStatus(e)}
                >
                  <option value="">Chọn trạng thái</option>
                  <option value="Đang học">Đang học</option>
                  <option value="Đã học xong">Đã học xong</option>
                  <option value="Đã nghỉ học">Đã nghỉ học</option>
                  <option value="Đình chỉ">Đình chỉ</option>
                  <option value="Bảo lưu">Bảo lưu</option>
                </select>
                <small>{errorStatusUpdate}</small>
                <select
                  className="studentMajorUpdate"
                  value={studentMajorUpdate}
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
                <small>{errorMajorUpdate}</small>
              </div>
            </div>
            <input
              type="email"
              placeholder="Email"
              value={studentEmailUpdate}
              onBlur={checkEmail}
              onChange={(e) => setstudentEmailUpdate(e.target.value)}
            />
            <small>{errorEmail}</small>
            <input
              type="number"
              className="phoneNumberUpdate"
              placeholder="Số điện thoại"
              value={phoneNumberUpdate}
              onBlur={checkPhoneNumberUpdate}
              onChange={(e) => setphoneNumberUpdate(e.target.value)}
            />
            <small>{errorPhoneNumberUpdate}</small>
            <input
              type="text"
              className="studentHomeTownUpdate"
              placeholder="Quê quán"
              onBlur={checkHometown}
              value={studentHomeTownUpdate}
              onChange={(e) => setstudentHomeTownUpdate(e.target.value)}
            />
            <small>{errorHometownUpdate}</small>

            <input
              type="date"
              className="studentHomeTownUpdate"
              value={dateJoinUpdate}
              onChange={(e) => setDateJoinUpdate(e.target.value)}
            />

            <button
              onClick={() => {
                updateData();
              }}
            >
              Sửa
            </button>
          </div>
        </div>
      )}
      {displayUpdateSuccess && (
        <div className="modalUpdateSuccess">
          <div className="modal_content">
            <h2>Sửa thành công</h2>
            <button onClick={() => setdisplayUpdateSuccess(false)}>
              Đồng ý
            </button>
          </div>
        </div>
      )}
      {displayUpdateError && (
        <div className="modalUpdateSuccess">
          <div className="modal_content">
            <h2>Vui lòng kiểm tra lại thông tin</h2>
            <button onClick={() => setdisplayUpdateError(false)}>Đồng ý</button>
          </div>
        </div>
      )}
      {displayDontFindStudent && (
        <div className="modalUpdateSuccess">
          <div className="modal_content">
            <h2>Không tìm thấy sinh viên</h2>
            <button onClick={() => setdisplayDontFindStudent(false)}>
              Đồng ý
            </button>
          </div>
        </div>
      )}
      {displayChangeImage && (
        <div className="modalUpdateSuccess">
          <div className="modal_content">
            <h2>Thay đổi ảnh thành công</h2>
            <button onClick={() => setdisplayChangeImage(false)}>Đồng ý</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ListStudent;
