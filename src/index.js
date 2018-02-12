import React from "react";
import ReactDOM from "react-dom";
import App from "./Smart/App";
// import registerServiceWorker from "./registerServiceWorker";
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
    min-height: 100vh;

    @media(min-width: 767px) {
      background: RGBA(151, 152, 158, 1);
      background-image: -ms-linear-gradient(top, #A3B5B5 0%, #97989D 100%);

      background-image: -moz-linear-gradient(top, #A3B5B5 0%, #97989D 100%);

      background-image: -o-linear-gradient(top, #A3B5B5 0%, #97989D 100%);

      background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #A3B5B5), color-stop(100, #97989D));

      background-image: -webkit-linear-gradient(top, #A3B5B5 0%, #97989D 100%);

      background-image: linear-gradient(to bottom, #A3B5B5 0%, #97989D 100%);

    }

  }

  ul, li { margin: 0; padding: 0; }

  ul {
    list-style-type: none;
  }

  
`;

ReactDOM.render(<App />, document.getElementById("root"));
// registerServiceWorker();
