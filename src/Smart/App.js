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
  inputText: "",
  editText: "",
  todos: [
    {
      id: 1 + "str",
      text: "foofoo",
      finished: false,
      keyTick: Date.now() + "str",
      isBeingEdited: false
    },
    {
      id: 2 + "str",
      text: "THE RAIN IN SPAIN FALLS MAINLY ON THE PLAIN",
      finished: false,
      keyTick: Date.now() + "str",
      isBeingEdited: false
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
    case "UPDATE_EDIT_TEXT": {
      return {
        ...state,
        editText: action.editInput
      };
    }

    case "INSERT_TODO": {
      let tempTodo = {
        id: action.id + "str",
        text: action.text,
        finished: false,
        keyTick: Date.now() + "str",
        isBeingEdited: false
      };
      return {
        ...state,
        inputText: "",
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
            keyTick: Date.now() + "str",
            isBeingEdited: false
          };
        })
      };
    }
    case "DELETE_TODO": {
      return {
        ...state,
        todos: state.todos.filter(todo => {
          return todo.id !== action.id;
        })
      };
    }
    case "TOGGLE_EDIT": {
      //determine if editText should be "" or the
      //currently selected todos' text
      let tempEditText;
      state.todos.map(todo => {
        if (todo.id === action.id) {
          if (todo.isBeingEdited) {
            tempEditText = "";
          } else {
            tempEditText = todo.text;
          }
        }
      });

      return {
        ...state,
        editText: tempEditText,
        todos: state.todos.map(todo => {
          if (todo.id !== action.id) {
            return todo;
          }
          return {
            id: todo.id,
            text: todo.text,
            finished: todo.finished,
            keyTick: todo.keyTick,
            isBeingEdited: !todo.isBeingEdited
          };
        })
      };
    }
    case "UPDATE_TODO": {
      //note:  needs id and text (from action object)
      return {
        ...state,
        editText: "",
        todos: state.todos.map(todo => {
          if (todo.id !== action.id) {
            return todo;
          }
          return {
            id: todo.id,
            text: action.text,
            finished: todo.finished,
            keyTick: todo.keyTick,
            isBeingEdited: false
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
