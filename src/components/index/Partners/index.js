import React from "react"
import * as classes from "./index.module.less"

import bfb from "images/bfb.png"
import lbk from "images/lbk.png"
import cie from "images/cie.png"
import tryd from "images/tryd.png"

export default () => {
    return <div className={classes.container}>

        <h3> Partners </h3>

        <img src={bfb}></img>
        <img src={lbk}></img>
        <img src={cie}></img>
        <img src={tryd}></img>
    </div>
}