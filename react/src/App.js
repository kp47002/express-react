import React, { Component } from "react";
import "./App.css";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class App extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
  };

  constructor(props) {
    super(props);
    const { cookies } = props;
    console.log("ck: " + cookies);
    this.state = {
      user: [],
      value: "",
      valueLogin: cookies.get("loginCookie") || "",
      valueLoginInput: "",
      editId: 0,
      editValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginChange = this.handleLoginChange.bind(this);
    this.handleEditChange = this.handleEditChange.bind(this);
  }

  componentDidMount() {
    this.getUsers();
  }
  handleChange(event) {
    console.log("handleChange");
    console.log(event);
    this.setState({ value: event.target.value });
  }
  handleLoginChange(event) {
    console.log("handleChange");
    console.log(event);
    this.setState({ valueLoginInput: event.target.value });
  }
  handleEditChange(event) {
    console.log("handleEditChange");
    console.log(event);
    this.setState({ editValue: event.target.value });
  }

  editSubmit = () => {
    console.log("this.post");
    fetch("http://localhost:3001/edit", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: this.state.editId,
        name: this.state.editValue
      })
    }).then(response => {
      console.log(response);
      this.setState({ editId: 0 });
      this.getUsers();
      //this.forceUpdate();
    });
  };

  edit(editId) {
    this.setState({ editId: editId });
  }
  editCancel(editId) {
    this.setState({ editId: 0 });
  }

  post = () => {
    console.log("this.post");

    fetch("http://localhost:3001/data", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: this.state.value
      })
    }).then(response => {
      console.log(response);
      this.getUsers();
      //this.forceUpdate();
    });
  };

  getUsers = () => {
    fetch("http://localhost:3001", { credentials: "include" })
      .then(response => {
        return response.json();
      })
      .then(myJson => {
        this.setState({ user: myJson.user });
        console.log(this.state.user);
      })

      .catch(error => console.log(error));
  };
  delete = id => {
    console.log("delete");
    fetch("http://localhost:3001/delete", {
      method: "POST",
      credentials: "include",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id: id
      })
    }).then(response => {
      console.log(response);
      this.getUsers();
      //this.forceUpdate();
    });
  };

  render() {
    let rows = [];

    this.state.user.forEach(u => {
      let name;
      if (this.state.editId === u.id) {
        rows.push(
          <tr id={u.id}>
            <td>{u.id}</td>

            <td>
              <input
                type="text"
                value={this.state.editValue}
                onChange={this.handleEditChange}
              />
            </td>
            <td>
              <button onClick={() => this.editSubmit()}>Submit</button>
              <button onClick={() => this.editCancel(u.id)}>Cancel</button>
            </td>
          </tr>
        );
      } else {
        rows.push(
          <tr id={u.id}>
            <td>{u.id}</td>

            <td>{u.username}</td>
            <td>{u.password}</td>
            <td>
              <button onClick={() => this.delete(u.id)}>Delete</button>
              <button onClick={() => this.edit(u.id)}>Edit</button>
            </td>
          </tr>
        );
      }
    });

    return (
      <div className="App">
        <header className="App-header">
          <table>
            <tbody>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Password</th>
              </tr>
              {rows}
            </tbody>
          </table>
        </header>
      </div>
    );
  }
}

export default withCookies(App);
