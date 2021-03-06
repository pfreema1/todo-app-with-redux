// @flow

import React, { Component } from "react";
import styled from "styled-components";
import stylingGlobals from "../StylingGlobals";
import { connect } from "react-redux";
import type { DispatchObject } from "../types";

const Wrapper = styled.textarea`
  display: inline;
  height: 100%;
  width: 60%;
  font-family: ${stylingGlobals.font};
  font-style: italic;
  opacity: 0.5;
  outline: none;
  background: none;
  box-shadow: none;
  border: none;
  resize: none;
  vertical-align: middle;
  box-sizing: border-box;
  padding-top: 10px;
`;

/*****************************/
type EditInputProps = {
  dispatch: (obj: DispatchObject) => void,
  id: string,
  editText: string
};

/*****************************/

class EditInput extends Component<EditInputProps> {
  inputEl: any;

  componentDidMount() {
    this.inputEl.focus();
  }

  handleChange = event => {
    this.props.dispatch({
      type: "UPDATE_EDIT_TEXT",
      editInput: event.target.value
    });
  };

  handleOnBlur = () => {
    //toggle todo edit
    this.props.dispatch({ type: "TOGGLE_EDIT", id: this.props.id });
  };

  handleSubmit = event => {
    if (event.key === "Enter") {
      this.props.dispatch({
        type: "UPDATE_TODO",
        id: this.props.id,
        text: event.target.value
      });
    } else if (event.key === "Escape") {
      this.inputEl.blur();
    }
  };

  render() {
    return (
      <Wrapper
        innerRef={el => (this.inputEl = el)}
        onBlur={this.handleOnBlur}
        onChange={this.handleChange}
        value={this.props.editText}
        onKeyDown={this.handleSubmit}
      />
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

export default connect(mapStateToProps)(EditInput);
