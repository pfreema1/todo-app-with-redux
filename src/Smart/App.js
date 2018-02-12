import React, { Component } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import logger from "redux-logger";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppWrapper from "./AppWrapper";

/*****************************
 ******************************
 **
 **		Redux
 **
 ******************************
 ******************************/

const initialState = {
  visibilityFilter: "all",
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

      const tempEditText = state.todos
        .map(todo => {
          if (todo.id === action.id) {
            if (todo.isBeingEdited) {
              // tempEditText = "";
              return "";
            } else {
              // tempEditText = todo.text;
              return todo.text;
            }
          } else {
            return null;
          }
        })
        .filter(elem => {
          return elem !== null;
        })
        .join(); //changes array to string

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
    case "CHANGE_FILTER": {
      return {
        ...state,
        visibilityFilter: action.filter
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
  componentDidMount() {
    //this handles updating the stores' visibility field
    //when the back/forward button is hit, this function will run
    window.onpopstate = () => {
      const pathname = window.location.href.slice(
        window.location.href.lastIndexOf("/") + 1,
        window.location.href.length
      );

      if (pathname.indexOf("active") !== -1) {
        store.dispatch({ type: "CHANGE_FILTER", filter: "active" });
      } else if (pathname.indexOf("completed") !== -1) {
        store.dispatch({ type: "CHANGE_FILTER", filter: "completed" });
      } else if (pathname.length === 0) {
        store.dispatch({ type: "CHANGE_FILTER", filter: "all" });
      }
    };
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            {/*regex in path below makes it so the same component
            will be rendered if at any of these paths: (root), 'active', or 'completed'*/}
            <Route exact path="/(|active|completed)/" component={AppWrapper} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
