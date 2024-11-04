import React, { Component } from "react";
import { connect } from "react-redux";

class ManageItem extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <React.Fragment>
        <div className="title">Danh sách sản phẩm</div>
        <div className="frm-input container">
          <div className="row">
            <div className="col-4 form-group">
              <label>Tên sản phẩm</label>
              <input
                type="email"
                className="form-control"
                // value={email}
                // disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                // onChange={(event) => {
                //   this.handleOnchangeInput(event, "email");
                // }}
              />
            </div>
            <div className="col-4 form-group">
              <label>Giá</label>
              <input
                type="password"
                className="form-control"
                // value={password}
                // disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                // onChange={(event) => {
                //   this.handleOnchangeInput(event, "password");
                // }}
              />
            </div>
            <div className="col-4 form-group">
              <label>Giá giảm</label>
              <input
                type="number"
                className="form-control"
                // value={phoneNumber}
                // onChange={(event) => {
                //   this.handleOnchangeInput(event, "phoneNumber");
                // }}
              />
            </div>
            <div className="col-4 form-group mt-3">
              <label>Loại sản phẩm</label>
              <input
                type="text"
                className="form-control"
                //value={firstName}
                // onChange={(event) => {
                //   this.handleOnchangeInput(event, "firstName");
                // }}
              />
            </div>
            <div className="col-4 form-group mt-3">
              <label>Tên</label>
              <input
                type="text"
                className="form-control"
                //value={lastName}
                // onChange={(event) => {
                //   this.handleOnchangeInput(event, "lastName");
                // }}
              />
            </div>
            <div className="col-4 form-group mt-3">
              <label>Quyền</label>
              <select
                className="form-control"
                // value={roleId}
                // onChange={(event) => {
                //   this.handleOnchangeInput(event, "roleId");
                // }}
              >
                {/* {arrRole &&
                  arrRole.length > 0 &&
                  arrRole.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {item.value}
                      </option>
                    );
                  })} */}
              </select>
            </div>
          </div>
          <button
            // className={action === CRUD_ACTION.CREATE ? "btn-save" : "btn-edit"}
            // onClick={() => {
            //   this.handleOnclickCreateUser();
            // }}
          >
            Lưu
          </button>
        </div>
        <table class="table">
          <thead>
            <tr>
              <th scope="col">Email</th>
              <th scope="col">Số điện thoại</th>
              <th scope="col">Họ </th>
              <th scope="col">Tên</th>
              <th scope="col"></th>
            </tr>
          </thead>
          {/* <tbody>
            {arrUser &&
              arrUser.length > 0 &&
              arrUser.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>{item.phoneNumber}</td>
                    <td>{item.firstName}</td>
                    <td>{item.lastName}</td>
                    <td>
                      <i
                        class="fas fa-pencil-alt edit"
                        onClick={() => {
                          this.handleEditUser(item);
                        }}
                      ></i>
                      <i
                        class="fas fa-trash delete"
                        onClick={() => {
                          this.handleDeleteUser(item.id);
                        }}
                      ></i>
                    </td>
                  </tr>
                );
              })}
          </tbody> */}
        </table>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageItem);
