//@flow

import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import stylingGlobals from "../StylingGlobals";
import { connect } from "react-redux";
import { Motion, TransitionMotion, spring } from "react-motion";
import RemoveWrapper from "./RemoveWrapper";
import EditInput from "./EditInput";
import type { DispatchObject, TodoObject } from "../types";

/*****************************
 ******************************
 **
 **		Styling
 **
 ******************************
 ******************************/

const TODO_HEIGHT = 90;

const TodoWrapper = styled.div`
  height: 100%;
  // border-top: 1px solid rgba(0, 0, 0, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-around;
  align-items: center;
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
  transition: all 0.5s;
`;

const CheckBox = styled.div`
  border-radius: 5px;
  height: 25px;
  width: 25px;
  border: 2px solid RGBA(156, 166, 211, 1);
  -webkit-backface-visibility: hidden;
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
  -webkit-backface-visibility: hidden;
`;

/*****************************
 ******************************
 **
 **		react-motion
 **
 ******************************
 ******************************/

const willEnter = () => {
  return {
    height: 0,
    opacity: 0
  };
};

const willLeave = () => {
  return {
    height: spring(0),
    opacity: spring(0, { stiffness: 700, damping: 50 })
  };
};

/*****************************/
type ToDosProps = {
  dispatch: (obj: DispatchObject) => void,
  todos: Array<TodoObject>
};

/*****************************/

class ToDos extends Component<ToDosProps> {
  handleCheckBoxClick = id => {
    this.props.dispatch({ type: "TOGGLE_TODO_FINISH", id: id });
  };

  /*****************************
   **	getDefaultStyles and getStyles- returns array of 'style configs'
   ******************************/

  getDefaultStyles = () => {
    return this.props.todos.map(todo => {
      return {
        key: todo.id,
        style: { height: 0, opacity: 0 },
        data: todo
      };
    });
  };

  getStyles = () => {
    //filter method does the....filtering
    return this.props.todos
      .filter(todo => {
        if (this.props.visibilityFilter === "all") {
          return true;
        } else if (this.props.visibilityFilter === "active") {
          if (!todo.finished) return true;
          else return false;
        } else if (this.props.visibilityFilter === "completed") {
          if (todo.finished) return true;
          else return false;
        } else {
          return false;
        }
      })
      .map(todo => {
        return {
          key: todo.id,
          style: {
            height: spring(TODO_HEIGHT),
            opacity: spring(1, { stiffness: 120, damping: 30 })
          },
          data: todo
        };
      });
  };

  render() {
    return (
      <TransitionMotion
        defaultStyles={this.getDefaultStyles()}
        styles={this.getStyles()}
        willLeave={willLeave}
        willEnter={willEnter}
      >
        {interpStyles => (
          <ul>
            {interpStyles.map((config: any) => {
              return (
                <li
                  style={{
                    height: config.style.height,
                    opacity: config.style.opacity
                  }}
                  key={config.data.id}
                >
                  <TodoWrapper>
                    <CompletionWrapper>
                      <Motion
                        key={config.data.keyTick}
                        defaultStyle={{ scale: 0.8 }}
                        style={{ scale: spring(1) }}
                      >
                        {interpStyle => (
                          <CheckBox
                            style={{ transform: `scale(${interpStyle.scale})` }}
                            onClick={this.handleCheckBoxClick.bind(
                              null,
                              config.data.id
                            )}
                          >
                            {config.data.finished ? (
                              <CheckMark style={{ opacity: 1 }} />
                            ) : (
                              <CheckMark style={{ opacity: 0 }} />
                            )}
                          </CheckBox>
                        )}
                      </Motion>
                    </CompletionWrapper>
                    {config.data.isBeingEdited ? (
                      <EditInput id={config.data.id} value={config.data.text} />
                    ) : (
                      <TodoText
                        style={
                          config.data.finished
                            ? { textDecoration: `line-through`, opacity: `0.3` }
                            : null
                        }
                      >
                        {config.data.text}
                      </TodoText>
                    )}

                    <RemoveWrapper id={config.data.id} />
                  </TodoWrapper>
                </li>
              );
            })}
          </ul>
        )}
      </TransitionMotion>
    );
  }
}

const mapStateToProps = state => {
  return {
    todos: state.todos,
    visibilityFilter: state.visibilityFilter
  };
};

export default connect(mapStateToProps)(ToDos);
