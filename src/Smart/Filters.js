//@flow

import React, { Component } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import type { DispatchObject } from "../types";

const Wrapper = styled.div`
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 15px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05);
`;

const AllWrapper = styled.div`
  &:hover {
    border: 1px solid
      ${props =>
        props.visibilityFilter === "all" ? "RGBA(0,0,0,0.1)" : "transparent"};
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
  transition: all 0.3s;
`;

const ActiveWrapper = styled.div`
  &:hover {
    border: 1px solid
      ${props =>
        props.visibilityFilter === "active"
          ? "RGBA(0,0,0,0.1)"
          : "transparent"};
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
  transition: all 0.3s;
  margin-left: 15px;
  margin-right: 15px;
  @media (min-width: 500px) {
    margin-left: 30px;
    margin-right: 30px;
  }
`;

const CompletedWrapper = styled.div`
  &:hover {
    border: 1px solid
      ${props =>
        props.visibilityFilter === "completed"
          ? "RGBA(0,0,0,0.1)"
          : "transparent"};
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
  transition: all 0.3s;
`;

/*****************************/
type FiltersProps = {
  dispatch: (obj: DispatchObject) => void,
  visibilityFilter: string
};

/*****************************/

class Filters extends Component<FiltersProps> {
  handleClick = event => {
    this.props.dispatch({ type: "CHANGE_FILTER", filter: event.target.id });
  };

  render() {
    return (
      <Wrapper>
        <Link to="/todo/" style={{ textDecoration: `none` }}>
          <AllWrapper
            id="all"
            onClick={this.handleClick}
            visibilityFilter={this.props.visibilityFilter}
          >
            All
          </AllWrapper>
        </Link>
        <Link to="/todo/active" style={{ textDecoration: `none` }}>
          <ActiveWrapper
            id="active"
            onClick={this.handleClick}
            visibilityFilter={this.props.visibilityFilter}
          >
            Active
          </ActiveWrapper>
        </Link>
        <Link to="/todo/completed" style={{ textDecoration: `none` }}>
          <CompletedWrapper
            id="completed"
            onClick={this.handleClick}
            visibilityFilter={this.props.visibilityFilter}
          >
            Completed
          </CompletedWrapper>
        </Link>
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
