/// <reference path='../../types/global.d.ts'/>
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter as Router, Route  }from "react-router-dom";

import Desktop from './Desktop/index';
import Mobile from './Mobile/index';

const Demo = () => {
  return (
    <Router>
      <Route path="/" exact component={Desktop} />
      <Route path="/mobile" component={Mobile} />
    </Router>
  )
};



ReactDOM.render(
  <Demo />,
  document.getElementById('root'),
);
