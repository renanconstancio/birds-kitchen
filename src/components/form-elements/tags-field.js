import "./style.scss";
import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import _ from "lodash";

import { Keys } from "../../core/constants";

const TagsField = ({
  label,
  info,
  name,
  placeholder,
  value,
  errorText,
  onChangeText,
  suggestions,
}) => {
  const [canDeletePrev, setCanDeletePrev] = useState(false);
  const [autoSuggest, setAutoSuggest] = useState([]);
  const [lastInputValue, setLastInputValue] = useState("");

  const refContainer = useRef();
  const refInput = useRef();

  // componentDidMount() {
  //     ;
  //     this.;
  // }

  // componentWillUnmount() {
  //     this.refContainer.removeEventListener( 'click', this.onFocusInput );
  //     this.refInput.removeEventListener( 'keyup', this.onKeyUpInput );
  // }

  const onDeleteItem = (item) => {
    const tags =
      "" !== value && null !== value && undefined !== value
        ? value.split(",")
        : [];

    tags.splice(tags.indexOf(item), 1);
    onChangeText && onChangeText(tags.join(","));
  };

  const onFocusInput = () => refInput.focus();

  const onKeyUpInput = (e) => {
    e.preventDefault();

    const inputTextValue = e.target.value;
    const tags =
      "" !== value && null !== value && undefined !== value
        ? value.split(",")
        : [];

    if (e.keyCode === Keys.enter) {
      if (
        inputTextValue &&
        "" !== inputTextValue &&
        -1 === tags.indexOf(inputTextValue)
      ) {
        tags.push(inputTextValue);
        onChangeText && onChangeText(tags.join(","));
        e.target.value = "";
        setCanDeletePrev(true);
        setAutoSuggest([]);
      }
    } else if (e.keyCode === Keys.backspace) {
      if (canDeletePrev && "" === inputTextValue && tags.length > 0) {
        tags.pop();
        onChangeText && onChangeText(tags.join(","));
      }
      if ("" === inputTextValue) {
        e.target.value = "";
        setCanDeletePrev(true);
      }
    } else if (e.keyCode === Keys.downArrow) {
      let index = autoSuggest.findIndex((o) => o.isActive);
      index = index + 1 === autoSuggest.length ? 0 : index + 1;

      _.forEach(autoSuggest, (val, ix) => {
        if (index === ix) {
          val.isActive = true;
          e.target.value = val.text;
        } else {
          val.isActive = false;
        }
      });

      setAutoSuggest(...autoSuggest);
    } else if (e.keyCode === Keys.upArrow) {
      let index = autoSuggest.findIndex((o) => o.isActive);
      index = index - 1 < 0 ? autoSuggest.length - 1 : index - 1;

      _.forEach(autoSuggest, (val, ix) => {
        if (index === ix) {
          val.isActive = true;
          e.target.value = val.text;
        } else {
          val.isActive = false;
        }
      });

      setAutoSuggest(...autoSuggest);
    }

    if (
      e.keyCode !== Keys.downArrow &&
      e.keyCode !== Keys.upArrow &&
      e.keyCode !== Keys.enter
    ) {
      setLastInputValue(inputTextValue);

      if ("" !== inputTextValue) {
        const autoSuggests = [];
        _.forEach(suggestions, (val) => {
          if (val.indexOf(inputTextValue) > -1 && value.indexOf(val) === -1) {
            autoSuggests.push({
              text: val,
              isActive: false,
            });
          }
        });
        setAutoSuggest(...autoSuggest);
        setCanDeletePrev(false);
      } else {
        setAutoSuggest([]);
        setCanDeletePrev(true);
      }
    }
  };

  const onClickAutoSuggestItem = (text) => {
    const { value, onChangeText } = text;
    const tags =
      "" !== value && null !== value && undefined !== value
        ? value.split(",")
        : [];

    if (tags.indexOf(text) === -1) {
      refInput.value = "";
      tags.push(text);
      onChangeText && onChangeText(tags.join(","));
      setCanDeletePrev(true);
      setAutoSuggest([]);
    }
  };

  const boldQuery = (str) => {
    const n = str.toUpperCase();
    const q = lastInputValue.toUpperCase();
    const x = n.indexOf(q);
    if (!q || x === -1) {
      return str;
    }
    const l = q.length;
    return `${str.substr(0, x)}<b>${str.substr(x, l)}</b>${str.substr(x + l)}`;
  };

  const tags =
    "" !== value && null !== value && undefined !== value
      ? value.split(",")
      : [];

  let formGroupClassName = "form-group";
  if ("" !== errorText) {
    formGroupClassName += " has-error";
  }

  //   useEffect(() => {
  //     refContainer.addEventListener("click", onFocusInput);
  //     refInput.addEventListener("keyup", onKeyUpInput);
  //   }, [onKeyUpInput]);

  return (
    <div className="comp_fe_tags-field">
      <div className={formGroupClassName}>
        <div className="title-area">
          {"" !== label ? (
            <label className="form-label" htmlFor={name}>
              {label}
            </label>
          ) : null}
          {"" !== info ? (
            <label className="info-text" htmlFor={name}>
              {info}
            </label>
          ) : null}
        </div>

        <div ref={(ref) => refContainer} className="tags-input-main-container">
          {tags.map((val, index) => {
            return (
              <div key={index} className="tag-wrapper">
                <span className="tag-text">{val}</span>
                <span onClick={() => onDeleteItem(val)} className="close-link">
                  <span>×</span>
                </span>
              </div>
            );
          })}
          <div className="input-container">
            <input
              ref={(ref) => refInput}
              type="text"
              className="form-element"
              placeholder={placeholder}
              id={name}
            />
            {autoSuggest.length > 0 ? (
              <div className="auto-suggestion-container">
                <ul>
                  {autoSuggest.map((value, index) => {
                    return (
                      <li
                        onClick={() => onClickAutoSuggestItem(value.text)}
                        className={value.isActive ? "active" : ""}
                        key={index}
                        dangerouslySetInnerHTML={{
                          __html: boldQuery(value.text),
                        }}
                      ></li>
                    );
                  })}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
        {"" !== errorText ? (
          <label className="error-label" htmlFor={name}>
            {errorText}
          </label>
        ) : null}
      </div>
    </div>
  );
};

TagsField.defaultProps = {
  errorText: "",
  info: "",
  label: "",
};

TagsField.propTypes = {
  info: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  errorText: PropTypes.string,
  suggestions: PropTypes.array,
};

export default TagsField;
