// import React, { Component } from "react";
import styled from "styled-components";
import stylingGlobals from "../StylingGlobals";

/*****************************
 ******************************
 **
 **		Styling
 **
 ******************************
 ******************************/
const Header = styled.div`
  background: ${stylingGlobals.bgColor};
  font-family: ${stylingGlobals.font};
  color: ${stylingGlobals.headerFontColor};
  font-weight: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90px;
  font-size: 60px;
`;

export default Header;