import React from 'react';

function GridStudent({studentGrid, toggleModalImage, showInforStudent, showModalDelete}) {
    return (
        <div className="gridStudent flex">
        {studentGrid.map((element, index) => {
          return (
            <div
              className="item userImage"
              style={
                {
                  // backgroundImage: `url(${element.image})`,
                  // backgroundRepeat: 'no-repeat',
                  // backgroundSize: 'contain'
                }
              }
              key={element.id}
            >
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
              <div
                // onClick={() => showInforStudent(element.id)}
                style={{ color: "red", cursor: "pointer" }}
              >
                <b>MSV: </b>
                {element.code}
              </div>
              <div>
                <b>Họ và tên: </b>
                {element.name}
              </div>
              <div>
                <b>Trạng thái: </b>
                {element.status}
              </div>
              <div>
                <b>Ngành học: </b>
                {element.major}
              </div>
              <div>
                <b>Số điện thoại: </b>
                {element.phoneNumber}
              </div>
              <div>
                <b>Email: </b>
                {element.email}
              </div>
              <div className="center">
                <button
                  //   onClick={() => showModalUpdate(element)}
                  onClick={() => showInforStudent(element.id)}
                  type="button"
                  className="b_1_solid_grey"
                >
                  Xem
                </button>
                <button
                  onClick={() => showModalDelete(element.id)}
                  type="button"
                  className="b_1_solid_grey"
                >
                  Xóa
                </button>
              </div>
            </div>
          );
        })}
      </div>
    );
}

export default GridStudent;