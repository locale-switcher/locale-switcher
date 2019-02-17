import React from "react";
import localeEmoji from "locale-emoji";
import Fuse from "fuse.js";

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

const SEARCH_ITEMS = Object.keys(namesByLocale).map(locale => {
  return {
    locale,
    name: namesByLocale[locale]
  };
});
const SEARCH_OPTIONS = {
  id: "locale",
  shouldSort: true,
  threshold: 0.6,
  location: 0,
  distance: 100,
  maxPatternLength: 32,
  minMatchCharLength: 1,
  keys: [{ name: "locale", weight: 0.3 }, { name: "name", weight: 0.7 }]
};
const fuse = new Fuse(SEARCH_ITEMS, SEARCH_OPTIONS);

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedIndex: 0,
      selectedLocale: null,
      visibleLocales: POPULAR_LOCALES
    };
  }

  componentDidMount() {
    chrome.storage.local.get("locale", ({ locale }) => {
      if (locale) {
        this.setState({ selectedLocale: locale }, () => {
          this.updateVisibleLocales();
        });
      }
    });
  }

  updateVisibleLocales = searchResults => {
    const { focusedIndex, selectedLocale, visibleLocales } = this.state;

    const selectedAndPopularLocales =
      selectedLocale && POPULAR_LOCALES.indexOf(selectedLocale) === -1
        ? [selectedLocale, ...POPULAR_LOCALES]
        : POPULAR_LOCALES;

    const newVisibleLocales =
      searchResults && searchResults.length > 0
        ? searchResults
        : selectedAndPopularLocales;
    const newFocusedIndex =
      focusedIndex >= newVisibleLocales.length ? 0 : focusedIndex;
    this.setState({
      visibleLocales: newVisibleLocales,
      focusedIndex: newFocusedIndex
    });
  };

  moveFocusedPosition = difference => {
    const { focusedIndex, visibleLocales } = this.state;

    const nextFocusedIndex =
      (focusedIndex + difference + visibleLocales.length) %
      visibleLocales.length;
    this.setState({
      focusedIndex: nextFocusedIndex
    });
  };

  updateSelectedLocale = locale => {
    chrome.storage.local.set({ locale }, () => {
      this.setState({ selectedLocale: locale });
    });
  };

  handleSearchChange = e => {
    const value = e.target.value;
    const searchResults = fuse.search(value);

    this.updateVisibleLocales(searchResults);
  };

  handleSearchKeyDown = e => {
    const value = e.target.value;
    switch (e.key) {
      case "ArrowUp":
        this.moveFocusedPosition(-1);
        e.preventDefault();
        break;
      case "ArrowDown":
        this.moveFocusedPosition(1);
        e.preventDefault();
        break;
      case "Enter":
        this.updateSelectedLocale(
          this.state.visibleLocales[this.state.focusedIndex]
        );
        break;
      case "Escape":
        if (!value) window.close();
        break;
    }
  };

  handleReset = () => {
    this.updateSelectedLocale(null);
  };

  handleLocaleFocus = index => () => {
    this.setState({
      focusedIndex: index
    });
  };

  renderLocaleItems = () => {
    const { focusedIndex, selectedLocale, visibleLocales } = this.state;

    return visibleLocales.map((locale, i) => {
      const name = namesByLocale[locale];
      const emoji = localeEmoji(locale);
      const focused = focusedIndex === i;
      const selected = selectedLocale === locale;

      const props = {
        locale,
        emoji,
        name,
        focused,
        selected,
        onMouseEnter: this.handleLocaleFocus(i),
        onFocus: this.handleLocaleFocus(i),
        onClick: this.updateSelectedLocale
      };

      return <LocaleItem key={locale} {...props} />;
    });
  };

  render() {
    return (
      <div className="App" tabIndex="0" onKeyDown={this.handleSearchKeyDown}>
        <div className="App-SearchAndReset">
          <input
            className="App-Search"
            type="search"
            placeholder="Search..."
            maxLength={32}
            autoFocus={true}
            onChange={this.handleSearchChange}
          />
          <button
            className="App-Reset"
            title="Reset locale"
            onClick={this.handleReset}
          >
            Reset
          </button>
        </div>
        <ul className="App-LocaleList">{this.renderLocaleItems()}</ul>
      </div>
    );
  }
}

export default App;
