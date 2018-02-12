// @flow

import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import Icon from "react-icons-kit";
import { ic_close } from "react-icons-kit/md/ic_close";
import { ic_edit } from "react-icons-kit/md/ic_edit";
import type { DispatchObject, TodoObject } from "../types";

export const Wrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 100%;
  box-sizing: border-box;
  padding: 10px 0 10px 0;

  @media (min-width: 800px) {
    opacity: 0;
    transition: all 0.3s;
  }
`;

const DeleteWrapper = styled.div`
  cursor: pointer;
`;

const EditWrapper = styled.div`
  cursor: pointer;
`;

/*****************************/

type RemoveWrapperProps = {
  dispatch: (obj: DispatchObject) => void,
  editText: string,
  todos: Array<TodoObject>,
  id: string
};

type RemoveWrapperState = {};

/*****************************/

class RemoveWrapper extends Component<RemoveWrapperProps, RemoveWrapperState> {
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
      <Wrapper className="meow">
        <DeleteWrapper
          onClick={this.handleDeleteClick.bind(null, this.props.id)}
        >
          <Icon icon={ic_close} style={{ opacity: 0.7 }} />
        </DeleteWrapper>
        <EditWrapper onClick={this.handleEditClick.bind(null, this.props.id)}>
          <Icon icon={ic_edit} style={{ opacity: 0.7 }} />
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
