import React, { useEffect, useState } from 'react'
import styles from '../css/index.module.css'


export default function Button(props) {

    return (
        <div className={styles.btn + (props.style ? " " + props.style : "")} onClick={(props.onClick ? props.onClick : ()=>{}) }>
            {props.text}
        </div>
    )
}