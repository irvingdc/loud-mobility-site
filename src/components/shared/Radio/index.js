import React from "react"
import * as classes from "./index.module.less"

export default ({ optionA, optionB, selectedValue, onChange }) => {
    return <div className={classes.container}>
        <button
            className={selectedValue === optionA?.value ? classes.selected : ""}
            onClick={() => !!onChange && onChange(optionA)}>
            {optionA?.label}
        </button>
        <button
            className={selectedValue === optionB?.value ? classes.selected : ""}
            onClick={() => !!onChange && onChange(optionB)}>
            {optionB?.label}
        </button>
    </div>
}