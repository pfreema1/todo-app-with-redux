import React from "react";
import ReactDOM from "react-dom";
import App from "./Smart/App";
import registerServiceWorker from "./registerServiceWorker";
import { injectGlobal } from "styled-components";
import styledNormalize from "styled-normalize";

/*****************************
 ******************************
 **
 **		injectGlobal to add normalize
 **
 ******************************
 ******************************/

injectGlobal`
  ${styledNormalize}

  body {
    background: yellow
  }
`;

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
