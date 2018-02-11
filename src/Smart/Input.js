import React, { Component } from "react";
import styled from "styled-components";
import stylingGlobals from "../StylingGlobals";
import { connect } from "react-redux";
import { Motion, spring } from "react-motion";

/*****************************
 ******************************
 **
 **		Styling
 **
 ******************************
 ******************************/
const InputWrapper = styled.div`
  // outline: 1px solid red;
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: inset 0px 0px 30px -13px rgba(0, 0, 0, 0.3);
  border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const ChevronWrapper = styled.div`
  // outline: 1px solid red;
  width: 20%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  opacity: 0.3;
  padding-top: 5px;
`;

const ToDoInput = styled.input`
  // outline: 1px solid red;
  display: inline;
  height: 100%;
  width: 80%;
  font-family: ${stylingGlobals.font};
  font-style: ${props => (props.hasText ? "normal;" : "italic;")}
  font-size: ${stylingGlobals.primaryFontSize};
  opacity: ${props => (props.hasText ? "1;" : "0.3;")};
  outline: none;
  background: none;
  box-shadow: none;
  border: none;
`;

/*****************************/

const inputSpringConfig = {
  stiffness: 270,
  damping: 20
};

interface InputProps {}

interface InputState {}

class Input extends Component<InputProps, InputState> {
  constructor(props: InputProps) {
    super(props);

    this.state = {
      isFocused: false
    };
  }

  handleChange = event => {
    if (event.target.value.length < 45) {
      this.props.dispatch({
        type: "UPDATE_INPUT_TEXT",
        input: event.target.value
      });
    }
  };

  handleFocus = () => {
    this.setState({
      isFocused: !this.state.isFocused
    });
  };

  handleSubmit = event => {
    if (event.key === "Enter" && event.target.value) {
      this.props.dispatch({
        type: "INSERT_TODO",
        id: Date.now(),
        text: this.props.inputText
      });
      event.target.blur();
    } else if (event.key === "Enter") {
      this.setState({ isFocused: false });
      event.target.blur();
    }
  };

  render() {
    return (
      <Motion
        style={{
          height: spring(this.state.isFocused ? 80 : 50, inputSpringConfig)
        }}
      >
        {interpStyle => {
          return (
            <InputWrapper style={{ height: interpStyle.height }}>
              <ChevronWrapper>❯</ChevronWrapper>
              <ToDoInput
                placeholder="What needs to be done?"
                onChange={this.handleChange}
                value={this.props.inputText}
                onFocus={this.handleFocus}
                onBlur={this.handleFocus}
                hasText={this.props.inputText ? true : false}
                onKeyDown={this.handleSubmit}
              />
            </InputWrapper>
          );
        }}
      </Motion>
    );
  }
}

const mapStateToProps = state => {
  return {
    inputText: state.inputText
  };
};

export default connect(mapStateToProps)(Input);
