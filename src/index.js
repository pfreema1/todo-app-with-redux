import React from "react";
import ReactDOM from "react-dom";
import App from "./Smart/App";
import registerServiceWorker from "./registerServiceWorker";
import { injectGlobal } from "styled-components";
import styledNormalize from "styled-normalize";
import stylingGlobals from "./StylingGlobals";

/*****************************
 ******************************
 **
 **		injectGlobal styling
 **
 ******************************
 ******************************/

injectGlobal`

  @import url('https://fonts.googleapis.com/css?family=Barlow+Condensed:200');

  ${styledNormalize}

  


  body {
    font-family: ${stylingGlobals.font};
    color: ${stylingGlobals.fontColor};
    font-size: ${stylingGlobals.primaryFontSize};
  }

  ul, li { margin: 0; padding: 0; }

  ul {
    list-style-type: none;
  }

  
`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
