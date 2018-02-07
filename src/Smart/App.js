import React, { Component } from "react";
import styled from "styled-components";
import stylingGlobals from "../StylingGlobals";
import Header from "../Dumb/Header";
import Input from "./Input";
import { Provider } from "react-redux";
import { createStore } from "redux";

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
  inputText: ""
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_TEXT":
      return {
        inputText: action.input
      };
    default:
      return state;
  }
};

const store = createStore(reducer);

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
        </AppWrapper>
      </Provider>
    );
  }
}

export default App;
