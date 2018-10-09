import * as React from 'react';
import * as ReactDOM from 'react-dom';
import SlideCaptcha from './components/SlideCaptcha';
// render react DOM

const Demo = () => {
  return (
    <SlideCaptcha
      puzzleUrl="http://localhost:5000/puzzle.png"
      bgUrl="http://localhost:5000/bg.jpg"
      getResult={() => {}}
      containerClassName="test"
    />
  )
}

ReactDOM.render(
  <Demo />,
  document.getElementById('root'),
);
