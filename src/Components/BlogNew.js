import React, { Component } from "react";
import { Container, Row, Button } from "react-bootstrap";
import { Calendar3, Folder } from "react-bootstrap-icons";

export default class Blog_New extends Component {
  render() {
    return (
      <div>
        <Container>
          <h3>{this.props.header}</h3>
          <Row className="details align-items-center">
            <Calendar3 />
            <strong>{this.props.date}</strong>
            <Folder />
            <strong>{this.props.category}</strong>
          </Row>
          <img src={this.props.image} alt="Here's some pic"></img>
          <div className="description">
            <p>{this.props.description}</p>
          </div>
          <Button><a href={this.props.pdf}>Read more</a></Button>
        </Container>
      </div>
    );
  }
}
