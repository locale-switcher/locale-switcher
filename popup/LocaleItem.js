import React from "react";
import classNames from "classnames";

import "./LocaleItem.css";

class LocaleItem extends React.Component {
  handleClick = () => {
    const { locale, onClick } = this.props;
    onClick(locale);
  };

  render() {
    const { locale, emoji, name, focused, selected } = this.props;

    const classes = classNames("LocaleItem", {
      "LocaleItem--focused": focused,
      "LocaleItem--selected": selected,
      "LocaleItem--no-emoji": !emoji
    });

    return (
      <li className={classes} onMouseEnter={this.props.onMouseEnter}>
        <button
          onFocus={this.props.onFocus}
          onClick={this.handleClick}
          title={`${name} (${locale})`}
        >
          <div className="LocaleItem-Name">
            <span className="LocaleItem-Emoji">{emoji || "🇺🇳"} </span>
            {name}
          </div>
          <div className="LocaleItem-Code">{locale}</div>
        </button>
      </li>
    );
  }
}

export default LocaleItem;
