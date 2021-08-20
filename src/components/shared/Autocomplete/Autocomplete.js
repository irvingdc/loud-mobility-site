import React, { useState, useEffect } from "react"
import * as classes from "./index.module.less"
import close_icon from "images/error.png"
import Spinner from "../Spinner/Spinner";

let validateField = (value, validateNow, required = true) => {
  if (!validateNow) return null;

  if (required) {
    return !!value ? null : "Required."
  } else {
    return null
  }
};

export default ({
  placeholder,
  label,
  name,
  value,
  validateNow,
  required,
  disabled,
  formOnChange }) => {

  const messagestList = {
    "input_prompt": "Enter at least three charcaters to get suggestions.",
    "no_suggestions": "No suggestions found."
  }

  let [suggestions, setSuggestions] = useState([]);
  let [activeSuggestion, setActiveSuggestion] = useState(-1);
  let [showSuggestions, setShowSuggestions] = useState(false);
  let [showSpinner, setShowSpinner] = useState(false);
  const [inputMessage, setInputMessage] = useState(messagestList["input_prompt"]);

  let error = validateField(value, validateNow, required);

  const onChange = e => {

    if (e.keyCode === 38 || e.keyCode === 40 || e.keyCode === 13) {
      //console.log("Arrow!!");
      return;
    }

    formOnChange(e.target.value, "address")

    let API_KEY = "ak_ksdk4bsyiEE6rl63vzXtJLk5kXu4E";
    let query = e.target.value;

    if (query.length >= 3) {
      setShowSpinner(true);
      setShowSuggestions(false);
      setTimeout(() => {
        //
      }, 300);

      // TODO: move API key to env variables
      fetch(`https://api.ideal-postcodes.co.uk/v1/autocomplete/addresses?api_key=${API_KEY}&query=${query}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: 'cors',
      })
        .then((response) => response.json())
        .then((data) => {
          setSuggestions(data.result.hits);
          setActiveSuggestion(0);
          setShowSpinner(false);
          setShowSuggestions(true);
          //console.log(data.result.hits);
        })
        .catch((error) => {
          console.error("Error:", error);
          //setLoading(false);
          alert(
            "An error happened, please send us an email to info@loudmobility.com"
          );
        });
    } else {
      setShowSpinner(false);
      setShowSuggestions(false);
      setInputMessage(messagestList["input_prompt"]);
    }
  };

  const onClick = e => {
    // console.log("CLICK!!");

    formOnChange(e.target.innerText, "address")
    setShowSuggestions(false);
    setInputMessage(null);
  };

  const onKeyDown = e => {
    // User pressed the enter key
    if (e.keyCode === 13) {
      // console.log("ENTER!!!");
      formOnChange(suggestions[activeSuggestion].suggestion, "address");
      setShowSuggestions(false);
      setInputMessage(null);
    }
    // User pressed the up arrow
    else if (e.keyCode === 38) {
      if (activeSuggestion === 0) {
        return;
      }
      setActiveSuggestion(activeSuggestion - 1);
    }
    // User pressed the down arrow
    else if (e.keyCode === 40) {
      if (activeSuggestion + 1 === suggestions.length) {
        return;
      }
      setActiveSuggestion(activeSuggestion + 1);
    }
  };

  const clearInput = () => {
    formOnChange("", "address");
    setInputMessage(messagestList["input_prompt"]);
    setShowSuggestions(false);
    setSuggestions([]);
    setActiveSuggestion(-1);
  }

  function SuggestionList({ showSuggestions, suggestions, activeSuggestion }) {
    //console.log(suggestions);
    // useEffect(() => {
    //   //console.log("show-sugg:", showSuggestions);
    //   //console.log("sugg:", suggestions);
    //   console.log("active:", activeSuggestion);
    // }, []);

    if (showSuggestions) {
      if (suggestions.length) {
        return (
          <ul className={classes.suggestionsList}>
            {suggestions.map((item, index) => {
              let isActive;
              // Flag the active suggestion with a class
              if (index === activeSuggestion) {
                isActive = true;
              }

              return (
                <li
                  className={isActive ? classes.activeSuggestion : classes.suggestion}
                  key={item.suggestion}
                  onClick={onClick}
                >
                  {item.suggestion}
                </li>
              );
            })}
          </ul>
        );
      } else {
        setInputMessage("No suggestions found");
        return (

          // <ul className={classes.suggestionsList}>
          //   <li 
          //     className={classes.suggestion} 
          //     key={"no_suggestions_li"} 
          //     onClick={onClick}
          //     style={{textAlign:"center"}}
          //   >
          //     No suggestions found.
          //   </li>
          // </ul>
          // <div className={classes.noSuggestions}>
          //     <em>No suggestions!</em>
          // </div>
          <></>
        );
      }
    } else {
      return <></>
    }
  }

  return (
    <>
      <div className={classes.inputContainer}>
        <label
          htmlFor={"address"}>{label}
        </label>

        {value != ""
          ? <img
            className={classes.closeIcon}
            src={close_icon}
            alt="clear"
            onClick={clearInput}
          />
          : <></>
        }

        {showSpinner
          ? <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
          : <></>
        }

        {showSpinner
          ? <div className={classes.spinnerContainer}>
            <Spinner />
          </div>
          : <></>
        }

        <input
          className={classes.postCodeInput}
          name={name}
          type="text"
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={"off"}
          disabled={disabled}
          onKeyDown={onKeyDown}
          value={value}
        />

        <SuggestionList
          showSuggestions={showSuggestions}
          suggestions={suggestions}
          activeSuggestion={activeSuggestion}
        />

        {error ? (
          <p className={classes.error}>{error}</p>
        ) : (
          inputMessage ? (
            <p className={classes.message}>{inputMessage}</p>
          ) : (
            <p className={classes.nomessage}>---</p>
          )
        )}

      </div>
    </>
  );
};
