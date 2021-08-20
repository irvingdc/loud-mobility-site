import { Placeholder } from "gatsby-plugin-image";
import React from "react";
import { validateEmail } from "../../../utils/functions";
import * as classes from "./index.module.less";

let validateField = (type, value, validateNow, required) => {
  if (!validateNow) return null;
  if (type === "email") {
    return required && validateEmail(value)
      ? null
      : "Please enter a valid email.";
  } else {
    // return required && !!value ? null : "Required.";
    if (required) {
      return !!value ? null : "Required."
    } else {
      return null
    }
  }
};

export default ({
  placeholder,
  label,
  onChange,
  name,
  value,
  type,
  options,
  disabled,
  required,
  validateNow,
}) => {
  let error = validateField(type, value, validateNow, required);
  return (
    <div
      className={[
        classes.inputContainer,
        type === "checkbox" ? classes.checkbox : "",
      ].join(" ")}
    >
      {type !== "checkbox" ?
        <label
          htmlFor={name}>{label}
        </label> : null}
      {type === "textarea" ? (
        <textarea
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value, name)}
          name={name}
          value={value}
          disabled={disabled}
        ></textarea>
      ) : type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value, name)}
          disabled={disabled}
        >
          <option value="" disabled selected hidden>{placeholder}</option>
          {options.map((it, key) => (
            <option key={key} value={it}>
              {it}
            </option>
          ))}
        </select>
      ) : type === "checkbox" ? (
        <p className={classes.checkboxConatiner}>
          <input
            type="checkbox"
            name={name}
            checked={value}
            onChange={(e) => onChange(e.target.checked, name)}
            disabled={disabled}
          />
          <span>{label}</span>
        </p>
      ) : (
        <input
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value, name)}
          name={name}
          value={value}
          type={type === "number" ? "number" : "text"}
          disabled={disabled}
        />
      )}
      {error ? (
        <p className={classes.error}>{error}</p>
      ) : (
        <p className={classes.noerror}>correct</p>
      )}
    </div>
  );
};
