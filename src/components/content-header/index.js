import "./style.scss";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { StorageHelpers } from "../../core/helpers";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

import SvgIcon from "../svgicon";

const ContentHeaderNotExtended = ({ t, icon, title, itemLength }) => {
  const [recipesdisplay, setRecipesdisplay] = useState("grid");

  const getItemLengthText = (itemLength) => {
    let text;

    if (0 === itemLength) {
      text = t("no") + " " + t("item");
    } else if (1 === itemLength) {
      text = "1 " + t("item");
    } else {
      text = `${itemLength} ` + t("items");
    }

    return text;
  };

  const changeDisplay = (display) => {
    document.body.classList.remove("grid-display");
    document.body.classList.remove("imglist-display");
    document.body.classList.remove("simplelist-display");
    document.body.classList.add(`${display}-display`);
    setRecipesdisplay(display);
  };

  const itemLengthText = getItemLengthText(itemLength);

  useEffect(() => {
    StorageHelpers.preference.set("recipesdisplay", recipesdisplay);
  }, [recipesdisplay]);

  return (
    <div className="comp_content-header">
      <div className="left-side">
        <div className="title-header">
          <SvgIcon name={icon} />
          <div className="title">{t(title)}</div>
        </div>
        <div className="sub-text">{t(itemLengthText)}</div>
      </div>
      <div className="right-side">
        <div className="icons-header">
          <div
            className="icon-wrapper"
            onClick={() => changeDisplay("imglist")}
          >
            <SvgIcon name="imglist" />
          </div>
          <div
            className="icon-wrapper"
            onClick={() => changeDisplay("simplelist")}
          >
            <SvgIcon name="simplelist" />
          </div>
          <div className="icon-wrapper" onClick={() => changeDisplay("grid")}>
            <SvgIcon name="grid" />
          </div>
        </div>
      </div>
    </div>
  );
};

ContentHeaderNotExtended.propTypes = {
  icon: PropTypes.string,
  title: PropTypes.string,
  itemLength: PropTypes.number,
};

const ContentHeader = hoistStatics(
  withTranslation()(ContentHeaderNotExtended),
  ContentHeaderNotExtended
);

export default ContentHeader;
