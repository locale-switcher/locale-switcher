import React from "react";
import classNames from "classnames";

class LocaleItem extends React.Component {
  handleClick = () => {
    const { locale, onClick } = this.props;
    onClick(locale);
  };

  render() {
    const { locale, emoji, name, selected } = this.props;

    const classes = classNames("LocaleItem", {
      selected
    });

    return (
      <li className={classes}>
        <button id={locale} onClick={this.handleClick}>
          <div className="locale-name">
            {emoji} {name}
          </div>
          <div className="locale-code">{locale}</div>
        </button>
      </li>
    );
  }
}

export default LocaleItem;
