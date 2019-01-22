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
      selectedLocale: null,
      showingAll: false
    };
  }

  searchInput = null;

  componentDidMount() {
    chrome.storage.local.get("locale", ({ locale }) => {
      if (locale) {
        this.setState({ locale });
      }
    });

    this.searchInput.focus();
  }

  handleSearch = e => {
    const value = e.target.value;
  };

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
        <input
          className="App-Search"
          type="search"
          placeholder="Search..."
          autofocus={true}
          onChange={this.handleSearch}
          ref={i => (this.searchInput = i)}
        />
        <ul className="App-LocaleList">
          {this.renderLocaleItems(POPULAR_LOCALES)}
        </ul>
        {!this.state.showingAll ? (
          <button className="App-ShowAll" onClick={this.handleShowAll}>
            Show all locales...
          </button>
        ) : null}
      </div>
    );
  }
}

export default App;
