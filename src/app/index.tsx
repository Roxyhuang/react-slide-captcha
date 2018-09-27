import * as React from 'react';
import './index.css';

export interface HeaderState {
  /* empty */
}

export class App extends React.Component<HeaderState> {
  private handleSave = (text: string): void => {
    console.log(text);
  }

  render() {
    return (
      <header>
        <div className="test" onClick={() => this.handleSave('123')}>123</div>
      </header>
    );
  }
}

export default App;
