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

  handleEditClick = id => {
    //only dispatch if not already editing another field,
    //check this by making sure props.editText is ""
    //the if statement below doesn't let you click off edit!
    if (this.props.editText.length === 0) {
      //send todos' current text to update 'editText'
      let editText = this.props.todos.reduce((prevVal, todo) => {
        if (todo.id === id) {
          return todo.text;
        } else {
          return prevVal;
        }
      }, "");

      this.props.dispatch({ type: "TOGGLE_EDIT", id, editText: editText });
    }
  };

  render() {
    return (
      <Wrapper>
        <DeleteWrapper
          onClick={this.handleDeleteClick.bind(null, this.props.id)}
        >
          X
        </DeleteWrapper>
        <EditWrapper onClick={this.handleEditClick.bind(null, this.props.id)}>
          \\
        </EditWrapper>
      </Wrapper>
    );
  }
}

/*****************************/

const mapStateToProps = state => {
  return {
    todos: state.todos,
    editText: state.editText
  };
};

export default connect(mapStateToProps)(RemoveWrapper);
