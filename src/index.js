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

  // font-family: ${stylingGlobals.font};


  // body {
  //   background: yellow;
  // }
`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
