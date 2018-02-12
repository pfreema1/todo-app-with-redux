import React, { Component } from "react";
import styled from "styled-components";
import stylingGlobals from "../StylingGlobals";
import Header from "../Dumb/Header";
import Input from "./Input";
import Todos from "./ToDos";
import Filters from "./Filters";
import { connect } from "react-redux";

const Wrapper = styled.div`
  background: ${stylingGlobals.bgColor};
  height: 100%;
  // max-width: 400px;
  // font-family: ${stylingGlobals.font};
  color: ${stylingGlobals.fontColor};
  font-weight: 100;

  @media(min-width: 767px) {
    width: 500px;
    max-width: 500px;
    min-height: 650px;
    border: 1px solid RGBA(0,0,0,0.05); 
    border-radius: 5px;
    margin-top: 50px;
    box-shadow: 0px 1px 10px 0px rgba(0,0,0,0.15);
  }
`;

class AppWrapper extends Component {
  constructor(props) {
    super(props);

    //this only runs if user goes directly to (for ex) '/active' or '/completed'
    this.matchFilterToRoute(props.location.pathname);
  }

  matchFilterToRoute = pathname => {
    if (pathname.indexOf("active") !== -1) {
      //set active filter

      this.props.dispatch({ type: "CHANGE_FILTER", filter: "active" });
    } else if (pathname.indexOf("completed") !== -1) {
      //set completed filter
      this.props.dispatch({ type: "CHANGE_FILTER", filter: "completed" });
    }
  };

  render() {
    return (
      <Wrapper>
        <Header>todo</Header>
        <Input />
        <Filters />
        <Todos />
      </Wrapper>
    );
  }
}

/*****************************/

export default connect()(AppWrapper);
