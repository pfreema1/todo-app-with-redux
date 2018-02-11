import React, { Component } from "react";
import styled, { keyframes } from "styled-components";
import stylingGlobals from "../StylingGlobals";
import { connect } from "react-redux";
import { Motion, TransitionMotion, spring } from "react-motion";

const Wrapper = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  box-sizing: border-box;
  // color: RGBA(80, 79, 92, 0.3);
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const AllWrapper = styled.div`
  &:hover {
    border: 1px solid RGBA(0, 0, 0, 0.1);
  }
  border: 1px solid
    ${props =>
      props.visibilityFilter === "all" ? "RGBA(0,0,0,0.1)" : "transparent"};
  border-radius: 5px;
  padding: 3px 10px 3px 10px;
  color: ${props =>
    props.visibilityFilter === "all"
      ? "RGBA(80, 79, 92, 0.7)"
      : "RGBA(80, 79, 92, 0.3)"};
`;

const ActiveWrapper = styled.div`
  &:hover {
    border: 1px solid RGBA(0, 0, 0, 0.1);
  }
  border: 1px solid
    ${props =>
      props.visibilityFilter === "active" ? "RGBA(0,0,0,0.1)" : "transparent"};
  border-radius: 5px;
  padding: 3px 10px 3px 10px;
  color: ${props =>
    props.visibilityFilter === "active"
      ? "RGBA(80, 79, 92, 0.7)"
      : "RGBA(80, 79, 92, 0.3)"};
`;

const CompletedWrapper = styled.div`
  &:hover {
    border: 1px solid RGBA(0, 0, 0, 0.1);
  }
  border: 1px solid
    ${props =>
      props.visibilityFilter === "completed"
        ? "RGBA(0,0,0,0.1)"
        : "transparent"};
  border-radius: 5px;
  padding: 3px 10px 3px 10px;
  color: ${props =>
    props.visibilityFilter === "completed"
      ? "RGBA(80, 79, 92, 0.7)"
      : "RGBA(80, 79, 92, 0.3)"};
`;

/*****************************/

class Filters extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleClick = event => {
    console.log(event.target.id);
    this.props.dispatch({ type: "CHANGE_FILTER", filter: event.target.id });
  };

  render() {
    return (
      <Wrapper>
        <AllWrapper
          id="all"
          onClick={this.handleClick}
          visibilityFilter={this.props.visibilityFilter}
        >
          All
        </AllWrapper>
        <ActiveWrapper
          id="active"
          onClick={this.handleClick}
          visibilityFilter={this.props.visibilityFilter}
        >
          Active
        </ActiveWrapper>
        <CompletedWrapper
          id="completed"
          onClick={this.handleClick}
          visibilityFilter={this.props.visibilityFilter}
        >
          Completed
        </CompletedWrapper>
      </Wrapper>
    );
  }
}

/*****************************/

const mapStateToProps = state => {
  return {
    visibilityFilter: state.visibilityFilter
  };
};
export default connect(mapStateToProps)(Filters);
