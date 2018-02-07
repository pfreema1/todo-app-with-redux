import React, { Component } from "react";
import styled from "styled-components";
import stylingGlobals from "../StylingGlobals";
import Header from "../Dumb/Header";
import Input from "./Input";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import Todos from "./ToDos";

/*****************************
 ******************************
 **
 **		Styling
 **
 ******************************
 ******************************/
const AppWrapper = styled.div`
  background: ${stylingGlobals.bgColor};
  height: 100%;
  // font-family: ${stylingGlobals.font};
  color: ${stylingGlobals.fontColor};
  font-weight: 100;
`;

/*****************************
 ******************************
 **
 **		Redux
 **
 ******************************
 ******************************/

const initialState = {
  visibilityFilter: "SHOW_ALL",
  nextTodoId: 1,
  inputText: "",
  todos: [
    {
      id: 1,
      text: "foofoo",
      finished: false
    },
    {
      id: 2,
      text: "THE RAIN IN SPAIN FALLS MAINLY ON THE PLAIN",
      finished: false
    }
  ]
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_INPUT_TEXT":
      return {
        ...state,
        inputText: action.input
      };
    case "INSERT_TODO": {
      console.log("in reducer - state:  ", state);
      console.log("in reducer - action:  ", action);
      return {
        ...state,
        inputText: "",
        nextTodoId: action.id + 1,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            finished: false
          }
        ]
      };
    }
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(logger));

/*****************************/

interface AppProps {}

interface AppState {}

class App extends Component<AppProps, AppState> {
  render() {
    return (
      <Provider store={store}>
        <AppWrapper>
          <Header>todo</Header>
          <Input />
          <Todos />
        </AppWrapper>
      </Provider>
    );
  }
}

export default App;
