import "./style.scss";
import React from "react";
import PropTypes from "prop-types";

const TextField = ({
  label,
  name,
  placeholder,
  value,
  onChangeText,
  errorText,
  readOnly,
}) => {
  // eslint-disable-next-line
  let formGroupClassName = "form-group" + ` ${name}`;
  if ("" !== errorText) {
    formGroupClassName += " has-error";
  }

  return (
    <div className="comp_fe_text-field">
      <div className={formGroupClassName}>
        {"" !== label ? (
          <label className="form-label" htmlFor={name}>
            {label}
          </label>
        ) : null}
        <input
          name={name}
          type="text"
          className="form-control"
          value={value || ""}
          id={name}
          placeholder={placeholder}
          onChange={(e) => {
            onChangeText && onChangeText(e.target.value);
          }}
          readOnly={readOnly}
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

TextField.defaultProps = {
  label: "",
  errorText: "",
  readOnly: false,
};

TextField.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  errorText: PropTypes.string,
  readOnly: PropTypes.bool,
};

export default TextField;
