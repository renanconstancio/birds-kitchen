import React from "react";
import { shell } from "electron";
import PropTypes from "prop-types";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import { withTranslation } from "react-i18next";
import hoistStatics from "hoist-non-react-statics";

import "./style.scss";
import "react-markdown-editor-lite/lib/index.css";

const mdParser = new MarkdownIt();
const MarkdownFieldNotExtended = ({
  t,
  label,
  name,
  value,
  errorText,
  onChangeText,
}) => {
  let mdGuideLinkUrl = "https://www.markdownguide.org/basic-syntax/";

  const onChange = (item) => {
    onChangeText && onChangeText(item.text);
  };

  const onClickHelp = async () => await shell.openExternal(mdGuideLinkUrl);

  let formGroupClassName = "form-group";
  if ("" !== errorText) {
    formGroupClassName += " has-error";
  }

  return (
    <div className="comp_fe_markdown-field">
      <div className={formGroupClassName}>
        <div className="title-area">
          {"" !== label ? (
            <label className="form-label" htmlFor={name}>
              {label}
            </label>
          ) : null}
          <div
            className="md-link-text"
            title={mdGuideLinkUrl}
            onClick={onClickHelp}
          >
            <span>{t("Markdown Guide")}</span>
            <i className="fas fa-external-link-alt"> </i>
          </div>
        </div>

        <MdEditor
          renderHTML={(text) => mdParser.render(text)}
          style={{ height: "320px" }}
          onChange={onChange}
          plugins={[
            "header",
            "font-bold",
            "font-italic",
            "font-strikethrough",
            "list-unordered",
            "list-ordered",
            "block-quote",
            "block-wrap",
            "block-code-inline",
            "block-code-block",
            "table",
            "image",
            "link",
            "logger",
            "mode-toggle",
            "full-screen",
          ]}
          value={value}
          spellCheck={false}
        />

        {"" !== errorText ? (
          <label className="error-label" htmlFor={name}>
            {errorText}
          </label>
        ) : null}
      </div>
    </div>
  );
};

MarkdownFieldNotExtended.defaultProps = {
  label: "",
  errorText: "",
  info: "",
};

MarkdownFieldNotExtended.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  info: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  errorText: PropTypes.string,
};

const MarkdownField = hoistStatics(
  withTranslation()(MarkdownFieldNotExtended),
  MarkdownFieldNotExtended
);

export default MarkdownField;
