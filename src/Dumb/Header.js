// @flow
import styled from "styled-components";
import stylingGlobals from "../StylingGlobals";

const Header = styled.div`
  background: ${stylingGlobals.bgColor};
  font-family: ${stylingGlobals.font};
  color: ${stylingGlobals.headerFontColor};
  font-weight: 100;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 110px;
  font-size: 60px;

  @media (min-width: 767px) {
    border-radius: 5px;
  }
`;

export default Header;
