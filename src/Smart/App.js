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
  nextTodoId: Date.now(),
  inputText: "",
  todos: [
    {
      id: 1,
      text: "foofoo",
      finished: false,
      keyTick: Date.now()
    },
    {
      id: 2,
      text: "THE RAIN IN SPAIN FALLS MAINLY ON THE PLAIN",
      finished: false,
      keyTick: Date.now()
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
      let tempTodo = {
        id: action.id,
        text: action.text,
        finished: false,
        keyTick: Date.now()
      };
      return {
        ...state,
        inputText: "",
        nextTodoId: action.id + 1,
        todos: [tempTodo].concat(state.todos)
      };
    }
    case "TOGGLE_TODO_FINISH": {
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id !== action.id) {
            //this isnt the item we care about - keep as is
            return todo;
          }
          //otherwise this is the one we want, return updated!
          return {
            id: todo.id,
            text: todo.text,
            finished: !todo.finished,
            keyTick: Date.now()
          };
        })
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
