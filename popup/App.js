import React from "react";
import localeEmoji from "locale-emoji";

import namesByLocale from "./data/locales";

import LocaleItem from "./LocaleItem";

import "./App.css";

const POPULAR_LOCALES = [
  "en",
  "zh",
  "es",
  "ar",
  "pt",
  "id",
  "fr",
  "ja",
  "ru",
  "de"
];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedLocale: null
    };
  }

  handleLocaleClick = locale => {
    chrome.storage.local.set({ locale }, () => {
      this.setState({ selectedLocale: locale });
    });
  };

  renderLocaleItems = locales => {
    return locales.map(locale => {
      const name = namesByLocale[locale];
      const emoji = localeEmoji(locale);
      const selected = this.state.selectedLocale === locale;

      const props = {
        locale,
        emoji,
        name,
        selected,
        onClick: this.handleLocaleClick
      };

      return <LocaleItem key={locale} {...props} />;
    });
  };

  render() {
    return (
      <div className="App">
        <ul className="App-LocaleList">
          {this.renderLocaleItems(POPULAR_LOCALES)}
        </ul>
      </div>
    );
  }
}

export default App;
