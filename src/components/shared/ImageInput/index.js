import React, { useState } from "react";
import { validateEmail } from "../../../utils/functions";
import * as classes from "./index.module.less";
import clip from "images/attach.svg"

export default ({
  onChange,
  name,
  type,
  disabled,
  required,
  validateNow,
}) => {

  let [label, setLabel] = useState()

  let handleFileChange = e => {
    console.log("file_array", e.target.files)
    const file = e.target.files?.length && Array.from(e.target.files)[0];
    if (file) {
      console.log("file_value", file)
      const { name } = file;
      console.log("file_name", name);
      setLabel(name)
      onChange(file, name)
    } else {
      setLabel("")
    }
  }

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
        {label || "IMAGE"}
      </label>

      <input
        id={name}
        className={classes.imageFile}
        type="file"
        name={name}
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
        disabled={disabled}
      />
    </div>
  );
};
