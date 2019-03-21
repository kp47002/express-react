import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { user: [], value: "", editId: 0, editValue: "" };
    this.handleChange = this.handleChange.bind(this);
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
  handleEditChange(event) {
    console.log("handleEditChange");
    console.log(event);
    this.setState({ editValue: event.target.value });
  }

  editSubmit = () => {
    console.log("this.post");
    fetch("http://localhost:3001/edit", {
      method: "POST",
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
    fetch("http://localhost:3001")
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

            <td>{u.name}</td>
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
          <img src={logo} className="App-logo" alt="logo" />
          <table>
            <tr>
              <th>ID</th>
              <th>Name</th>
            </tr>
            {rows}
          </table>

          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button onClick={() => this.post()}>Add</button>
        </header>
      </div>
    );
  }
}

export default App;
