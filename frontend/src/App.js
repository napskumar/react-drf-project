import React from "react";
import axios from "axios";
import { Table, Form, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      details: [],
      titleValue: "",
      descValue: "",
      statusValue: "All",
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let data;
    // Get data from backend using Axios Library
    axios
      .get("http://127.0.0.1:8000/api/create/")
      .then((res) => {
        data = res.data;
        this.setState({
          details: data,
        });
      })
      .catch((err) => {});
  }

  // Remove a row from the list Onclick delete button using Axios DELETE Method

  handleDelete(id) {
    axios.delete(`http://127.0.0.1:8000/api/delete/${id}`).then((res) => {
      alert("Deleted Successfully");

      // After Remove a row list of data update
      const details = this.state.details.filter((item) => item.id !== id);
      this.setState({ details });
    });
  }

  // Field value are set on change
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  // New data row added onclick submit button by using axios POST method
  handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://127.0.0.1:8000/api/create/",

        {
          title: this.state.titleValue,
          description: this.state.descValue,
          status: this.state.statusValue,
        }
      )
      .then((res) => {
        this.setState({ titleValue: "", descValue: "", statusValue: "" });

        // Update list of data once new row added using Axios GET method
        let data;
        axios
          .get("http://127.0.0.1:8000/api/create/")
          .then((resp) => {
            data = resp.data;
            this.setState({
              details: data,
            });
          })
          .catch((err) => {
            console.log(err.response);
          });
      })
      .catch((error) => console.log(error.response));
  };

  render() {
    // To set Form Style create a constant variable
    const formStyle = {
      maxWidth: "400px",
      margin: "20px auto",
      padding: "20px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      backgroundColor: "#f5f5f5",
    };

    return (
      <div>
        <h1 className="text-center">Add Data</h1>

        <Form style={formStyle}>
          <Form.Group className="mb-3" controlId="formGroupTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              name="titleValue"
              placeholder="Enter Title"
              value={this.state.titleValue}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              name="descValue"
              placeholder="Description"
              value={this.state.descValue}
              onChange={this.onChange}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupStatus">
            <Form.Label>Status</Form.Label>
            <Form.Select
              name="statusValue"
              aria-label="Status"
              value={this.state.statusValue}
              onChange={this.onChange}
            >
              <option value="All">All</option>
              <option value="Done">Done</option>
              <option value="To-Do">To-Do</option>
              <option value="In-Progress">In-Progress</option>
            </Form.Select>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.handleSubmit}>
            Submit
          </Button>
        </Form>

        <div>
          <p></p>
          <hr />
          <p></p>
          <h4>Data List</h4>
        </div>

        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {/* List of data get from backend database */}
            {this.state.details.map((detail, id) => (
              <tr key={id}>
                <td title="Title">{detail.title}</td>
                <td title="Description">{detail.description}</td>
                <td title="Status">{detail.status}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => this.handleDelete(detail.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default App;
