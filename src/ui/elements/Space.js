import React, { useEffect, useState } from 'react'
import styles from '../css/index.module.css'


export default function Space(props) {


    return (
        <div className={styles.Space}>
            {props.content.length > 0 ? props.content : ''}
        </div>
    )
}