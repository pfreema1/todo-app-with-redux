import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
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

const TodoWrapper = styled.div`
  min-height: 90px;
  // border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 10px;
`;

const CompletionWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  position: relative;
`;

const TodoText = styled.div`
  width: 60%;
  display: flex;
  // justify-content: center;
  align-items: center;
  height: 100%;
  overflow: hidden;
`;

const RemoveWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const CheckBox = styled.div`
  border-radius: 5px;
  height: 25px;
  width: 25px;
  border: 2px solid RGBA(156, 166, 211, 1);
`;

const checkAnimation = keyframes`
  0% {
    width: 0px;
    height: 0px;
  }

  50% {
    width: 0px;
    height: 10px;
  }

  100% {
    width: 30px;
    height: 10px;
  }
`;

const CheckMark = styled.div`
  width: 30px;
  height: 10px;
  transform: rotate(-45deg);
  border-left: 2px solid ${stylingGlobals.fontColor};
  border-bottom: 2px solid ${stylingGlobals.fontColor};
  animation: ${checkAnimation} 0.2s ease-out;
  position: absolute;
  top: 50%;
  transform-origin: left top;
  border-radius: 1px;
  opacity: 0.7;
`;

/*****************************/
const inputSpringConfig = {
  stiffness: 270,
  damping: 20
};

class ToDos extends React.Component {
  constructor(props) {
    super(props);
  }

  handleCheckBoxClick = id => {
    this.props.dispatch({ type: "TOGGLE_TODO_FINISH", id: id });
  };

  render() {
    return (
      <ul>
        {this.props.todos.map(elem => {
          return (
            <li key={elem.id}>
              <TodoWrapper>
                <CompletionWrapper>
                  <Motion
                    key={elem.id}
                    defaultStyle={{ scale: 0.8 }}
                    style={{ scale: spring(1) }}
                  >
                    {interpStyle => (
                      <CheckBox
                        style={{ transform: `scale(${interpStyle.scale})` }}
                        onClick={this.handleCheckBoxClick.bind(null, elem.id)}
                      >
                        {elem.finished ? (
                          <CheckMark style={{ opacity: 1 }} />
                        ) : (
                          <CheckMark style={{ opacity: 0 }} />
                        )}
                      </CheckBox>
                    )}
                  </Motion>
                </CompletionWrapper>

                <TodoText>{elem.text}</TodoText>
                <RemoveWrapper>X</RemoveWrapper>
              </TodoWrapper>
            </li>
          );
        })}
      </ul>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};

export default connect(mapStateToProps)(ToDos);
