import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import stylingGlobals from "../StylingGlobals";
import { connect } from "react-redux";
import { Motion, TransitionMotion, spring } from "react-motion";

const Wrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0 10px 0;
`;

const DeleteWrapper = styled.div``;

const EditWrapper = styled.div``;

class RemoveWrapper extends Component {
  constructor(props) {
    super(props);
    console.log("props:  ", props);

    this.state = {};
  }

  handleDeleteClick = id => {
    this.props.dispatch({ type: "DELETE_TODO", id });
  };

  handleEditClick = () => {};

  render() {
    return (
      <Wrapper>
        <DeleteWrapper
          onClick={this.handleDeleteClick.bind(null, this.props.id)}
        >
          X
        </DeleteWrapper>
        <EditWrapper onClick={this.handleEditClick}>\\</EditWrapper>
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

export default connect(mapStateToProps)(RemoveWrapper);
