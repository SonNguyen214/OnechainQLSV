import React from "react";
import { EyeOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

function TableStudent(props) {
  return (
    <table className="tablePC">
      <thead>
        <tr>
          <th>Số thứ tự</th>
          <th>Mã sinh viên</th>
          <th>Họ và tên</th>
          <th>Trạng thái</th>
          <th>Ngành học</th>
          <th>Email</th>
          <th>Tùy chọn</th>
        </tr>
      </thead>
      <tbody className="list_student">
        {props.studentTable.map((element, index) => {
          return (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{element.code}</td>
              <td>{element.name}</td>
              <td>{element.status}</td>
              <td>{element.major}</td>
              <td>{element.email}</td>
              <td>
                <button
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => props.showInforStudent(element.id)}
                  type="button"
                  className="b_1_solid_grey"
                >
                  <EyeOutlined />
                </button>
                <button
                  onClick={() => props.showModalUpdate(element)}
                  type="button"
                  className="b_1_solid_grey"
                >
                  {" "}
                  <EditOutlined />
                </button>
                <button
                  onClick={() => props.showModalDelete(element.id)}
                  type="button"
                  className="b_1_solid_grey"
                >
                  <DeleteOutlined />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default TableStudent;
