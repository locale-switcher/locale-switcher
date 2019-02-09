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
      focusedLocale: null,
      selectedLocale: null,
      visibleLocales: []
    };
  }

  componentDidMount() {
    chrome.storage.local.get("locale", ({ locale }) => {
      if (locale) {
        this.setState({ focusedLocale: locale, selectedLocale: locale }, () => {
          this.updateVisibleLocales();
        });
      } else {
        this.updateVisibleLocales();
      }
    });
  }

  updateVisibleLocales = searchResults => {
    const { selectedLocale } = this.state;

    const selectedAndPopularLocales =
      selectedLocale && POPULAR_LOCALES.indexOf(selectedLocale) === -1
        ? [selectedLocale, ...POPULAR_LOCALES]
        : POPULAR_LOCALES;

    const visibleLocales =
      searchResults && searchResults.length > 0
        ? searchResults
        : selectedAndPopularLocales;
    this.setState({ visibleLocales });
  };

  moveFocusedPosition = difference => {
    const { focusedLocale, visibleLocales } = this.state;

    const focusedIndex = visibleLocales.indexOf(focusedLocale);
    const nextIndex = (focusedIndex + difference) % visibleLocales.length;
    const nextLocale = visibleLocales[nextIndex];

    this.setState({
      focusedLocale: nextLocale
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
        break;
      case "ArrowDown":
        this.moveFocusedPosition(1);
        break;
      case "Escape":
        if (!value) window.close();
        break;
    }
  };

  handleLocaleClick = locale => {
    chrome.storage.local.set({ locale }, () => {
      this.setState({ selectedLocale: locale });
    });
  };

  handleLocaleMouseEnter = locale => {
    this.setState({
      focusedLocale: locale
    });
  };

  renderLocaleItems = () => {
    const { focusedLocale, selectedLocale, visibleLocales } = this.state;

    return visibleLocales.map((locale, i) => {
      const name = namesByLocale[locale];
      const emoji = localeEmoji(locale);
      const focused = focusedLocale === locale;
      const selected = selectedLocale === locale;

      const props = {
        locale,
        emoji,
        name,
        focused,
        selected,
        onMouseEnter: this.handleLocaleMouseEnter,
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
          maxLength={32}
          autoFocus={true}
          onChange={this.handleSearchChange}
          onKeyDown={this.handleSearchKeyDown}
        />
        <ul className="App-LocaleList">
          {this.renderLocaleItems(POPULAR_LOCALES)}
        </ul>
      </div>
    );
  }
}

export default App;
