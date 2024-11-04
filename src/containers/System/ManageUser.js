import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageUser.scss";
import * as actions from "../../store/actions";
import { CRUD_ACTION } from "../../utils/constant";
import ReactPaginate from "react-paginate";

class ManageUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUser: [],
      arrRole: [],

      firstName: "",
      lastName: "",
      phoneNumber: "",
      password: "",
      email: "",
      roleId: "",
      action: "",
      editUserId: "",

      currentPage: 1,
      currentLimit: 8,
      totalPage: 0,
    };
  }
  componentDidMount() {
    this.props.fetchAllUser(this.state.currentPage, this.state.currentLimit);
    this.props.fetchRoleId();
  }
  componentDidUpdate(prevProps, prevState, snapShot) {
    if (prevProps.users !== this.props.users) {
      this.setState({
        arrUser: this.props.users,
        firstName: "",
        lastName: "",
        phoneNumber: "",
        password: "",
        email: "",
        roleId: "",
        action: CRUD_ACTION.CREATE,
        totalPage: this.props.totalPage,
      });
    }
    if (prevProps.roleIds !== this.props.roleIds) {
      let arrRole = this.props.roleIds;
      this.setState({
        arrRole: arrRole,
        roleId: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
  }

  checkValidate = () => {
    let isValid = true;
    let arrInput = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
    ];
    for (let i = 0; i < arrInput.length; i++) {
      if (!this.state[arrInput[i]]) {
        isValid = false;
        alert("Input is require " + arrInput[i]);
        break;
      }
    }
    return isValid;
  };

  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleOnclickCreateUser = () => {
    let validate = this.checkValidate();
    if (validate === false) return;
    if (this.state.action === CRUD_ACTION.CREATE) {
      this.props.createUser(
        {
          email: this.state.email,
          password: this.state.password,
          phoneNumber: this.state.phoneNumber,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          roleId: this.state.roleId,
        },
        this.state.currentPage,
        this.state.currentLimit
      );
    }
    if (this.state.action === CRUD_ACTION.EDIT) {
      this.props.editUser(
        {
          id: this.state.editUserId,
          email: this.state.email,
          password: this.state.password,
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          phoneNumber: this.state.phoneNumber,
          roleId: this.state.roleId,
        },
        this.state.currentPage,
        this.state.currentLimit
      );
    }

    //console.log("Save: ", this.state);
  };

  handleEditUser = (user) => {
    this.setState({
      email: user.email,
      password: "asasasasass",
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      roleId: user.roleId,
      action: CRUD_ACTION.EDIT,
      editUserId: user.id,
    });
  };

  handleDeleteUser = (id) => {
    this.props.deleteUser(id, this.state.currentPage, this.state.currentLimit);
  };

  handlePageClick = (event) => {
    const currentPage = +event.selected + 1;
    this.setState(
      {
        currentPage: currentPage,
      },
      () => {
        this.props.fetchAllUser(
          this.state.currentPage,
          this.state.currentLimit
        );
      }
    );
  };

  render() {
    console.log("check data", this.state);
    let arrUser = this.state.arrUser;
    let arrRole = this.state.arrRole;
    let { email, password, lastName, firstName, phoneNumber, roleId, action } =
      this.state;
    return (
      <React.Fragment>

        <div className="title">Danh sách người dùng</div>
        <div className="col-2 logo">
                <i class="fab fa-pied-piper-alt"></i>
                <span>LOGGOO</span>
              </div>
        <div className="frm-input container">
          <div className="row">
            <div className="col-4 form-group">
              <label>Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                onChange={(event) => {
                  this.handleOnchangeInput(event, "email");
                }}
              />
            </div>
            <div className="col-4 form-group">
              <label>Mật khẩu</label>
              <input
                type="password"
                className="form-control"
                value={password}
                disabled={this.state.action === CRUD_ACTION.EDIT ? true : false}
                onChange={(event) => {
                  this.handleOnchangeInput(event, "password");
                }}
              />
            </div>
            <div className="col-4 form-group">
              <label>Số điện thoại</label>
              <input
                type="number"
                className="form-control"
                value={phoneNumber}
                onChange={(event) => {
                  this.handleOnchangeInput(event, "phoneNumber");
                }}
              />
            </div>
            <div className="col-4 form-group mt-3">
              <label>Họ</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(event) => {
                  this.handleOnchangeInput(event, "firstName");
                }}
              />
            </div>
            <div className="col-4 form-group mt-3">
              <label>Tên</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(event) => {
                  this.handleOnchangeInput(event, "lastName");
                }}
              />
            </div>
            <div className="col-4 form-group mt-3">
              <label>Quyền</label>
              <select
                className="form-control"
                value={roleId}
                onChange={(event) => {
                  this.handleOnchangeInput(event, "roleId");
                }}
              >
                {arrRole &&
                  arrRole.length > 0 &&
                  arrRole.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {item.value}
                      </option>
                    );
                  })}
              </select>
            </div>
          </div>
          <button
            className={action === CRUD_ACTION.CREATE ? "btn-save" : "btn-edit"}
            onClick={() => {
              this.handleOnclickCreateUser();
            }}
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
          <tbody>
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
          </tbody>
        </table>
        {this.state.totalPage > 0 && (
          <div className="footer">
            <ReactPaginate
              nextLabel=" >"
              onPageChange={(e) => {
                this.handlePageClick(e);
              }}
              pageRangeDisplayed={3}
              marginPagesDisplayed={2}
              pageCount={this.state.totalPage}
              previousLabel="< "
              pageClassName="page-item"
              pageLinkClassName="page-link"
              previousClassName="page-item"
              previousLinkClassName="page-link"
              nextClassName="page-item"
              nextLinkClassName="page-link"
              breakLabel="..."
              breakClassName="page-item"
              breakLinkClassName="page-link"
              containerClassName="pagination"
              activeClassName="active"
              renderOnZeroPageCount={null}
            />
          </div>
        )}
        
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    users: state.user.users,
    roleIds: state.user.roleIds,
    totalPage: state.user.totalPage,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllUser: (page, limit) => dispatch(actions.fetchAllUser(page, limit)),
    fetchRoleId: () => dispatch(actions.fetchRoleId()),
    createUser: (data, page, limit) =>
      dispatch(actions.createUser(data, page, limit)),
    deleteUser: (id, page, limit) =>
      dispatch(actions.deleteUser(id, page, limit)),
    editUser: (data, page, limit) =>
      dispatch(actions.editUser(data, page, limit)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageUser);
