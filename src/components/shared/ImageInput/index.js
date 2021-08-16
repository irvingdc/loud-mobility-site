import React from "react";
import { validateEmail } from "../../../utils/functions";
import * as classes from "./index.module.less";
import clip from "images/attach.svg"

let validateField = (type, value, validateNow, required) => {
  if (!validateNow) return null;
  if(required){
    return !!value ? null : "Required."
  }else{
    return null
  }
};

let getFileName = (e) => {
  const [file] = e.target.files;
  if(file){
    // Get the file name and size
    const { name } = file;
    console.log(name);
    return name;
  }else{
    return undefined;
  }
  
}

export default ({
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
      className={classes.inputContainer}
    >
      <label 
        className={classes.fileLabel}
        htmlFor={name}
      >
          <span>
              <img src={clip} alt="attach" />
          </span>
          {label}
      </label>

      <input
        id={name}
        className={classes.imageFile}
        type="file"
        name={name}
        accept="image/png, image/jpeg"
        onChange={(e) => onChange(getFileName(e), name)}
        disabled={disabled}
      />
      {error ? (
        <p className={classes.error}>{error}</p>
      ) : (
        <p className={classes.noerror}>correct</p>
      )}
    </div>
  );
};
