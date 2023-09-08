import React, { useEffect, useState } from 'react'
import styles from '../css/index.module.css'
import Navbar from './navbar.js';
import Button from './button';


export default function MainPage(props) {

    let a = 213
    const hello = ()=>{
        console.log("1234");
        console.warn(a)
    }

    return (
        <div className={styles.main}>
            <Navbar />
            <div className={styles.content}>
                <div className=''>
                    hello world
                </div>

                <Button text={"delete account".toUpperCase()} onClick={hello}/>
                <div className={styles.container}>
                <Button text="Test btn" onClick={hello}/>
                <Button text={"test btn".toUpperCase()} style={styles.red} onClick={hello}/>
                </div>
            </div>
        </div>
    )
}