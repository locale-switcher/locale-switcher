import React from "react";
import classNames from "classnames";

import "./LocaleItem.css";

class LocaleItem extends React.Component {
  handleClick = () => {
    const { locale, onClick } = this.props;
    onClick(locale);
  };

  render() {
    const { locale, emoji, name, selected } = this.props;

    const classes = classNames("LocaleItem", {
      "LocaleItem--selected": selected
    });

    return (
      <li className={classes}>
        <button onClick={this.handleClick}>
          <div className="LocaleItem-Name">
            {emoji} {name}
          </div>
          <div className="LocaleItem-Code">{locale}</div>
        </button>
      </li>
    );
  }
}

export default LocaleItem;
