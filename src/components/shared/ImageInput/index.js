import React, { useState } from "react";
import { validateEmail } from "../../../utils/functions";
import * as classes from "./index.module.less";
import clip from "images/attach.svg"

export default ({
  onChange,
  name,
  disabled,
}) => {

  let [label, setLabel] = useState()

  let handleFileChange = e => {
    const file = e.target.files?.length && Array.from(e.target.files)[0];
    if (file) {
      setLabel(file.name)
      onChange(file, "image")
    } else {
      onChange(null, name)
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
