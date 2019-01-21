import React from "react";

import "./App.css";

class App extends React.Component {
  render() {
    return (
      <ul class="locale-list">
        <li>
          <button id="en-US">
            <div class="locale-name">🇺🇸 English (US)</div>
            <div class="locale-code">en-US</div>
          </button>
        </li>
        <li>
          <button id="de-DE">
            <div class="locale-name">🇩🇪 German</div>
            <div class="locale-code">de-DE</div>
          </button>
        </li>
        <li>
          <button id="fr-FR">
            <div class="locale-name">🇫🇷 French</div>
            <div class="locale-code">fr-FR</div>
          </button>
        </li>
      </ul>
    );
  }
}

export default App;
